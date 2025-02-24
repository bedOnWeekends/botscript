const bot = BotManager.getCurrentBot();

const stockList = ["주침정보통신"];
const stockPath = "/sdcard/bot/stock/";
const myStockPath = "/sdcard/bot/mystock/stock_status.json";
const FS = FileStream;
const pointPath = "/sdcard/attendance/exp.json";


const onMessage = (chat) => {
    const msg = chat.content;
    switch (msg) {
        case "1주식":
            getStockInfo(chat);
            break;

        case "1내주식":
            getMyStockInfo(chat);
            break;
    }
    if (msg.startsWith("1사기 ")) {
        buyStock(chat);
    }
    if (msg.startsWith("1팔기 ")) {
        sellStock(chat);
    }
}

const addBlank = "\u200b".repeat(500);


const getStockInfo = (chat) => {
    let stockInfo = "주식 정보\n\n" + addBlank;
    for (let i = 0; i < stockList.length; i++) {
        let stockName = stockList[i];
        stockInfo += `${stockName} 주식 정보\n`;
        stockInfo += "====================\n";
        let yearMonthDay = getYearMonthDay();
        let filePath = `${stockPath}${stockName}_${yearMonthDay}.json`;
        const file = FS.read(filePath);
        if (file) {
            const timestamp = getTimestamp();
            const recentPrice = JSON.parse(file)["stockPricePerTimeMap"][timestamp];
            if (recentPrice) {
                stockInfo += `최근 가격: ${recentPrice}포인트\n\n`;
            }
        }
    }
    chat.reply(stockInfo);
}

const getMyStockInfo = (chat) => {
    const userHash = chat.author.hash;
    if (!FS.read(myStockPath)) {
        chat.reply("보유한 주식이 없습니다.");
        FS.write(myStockPath, JSON.stringify({}));
        return;
    }
    const stockStatus = JSON.parse(FS.read(myStockPath));
    if (!stockStatus[userHash]) {
        chat.reply("보유한 주식이 없습니다.");
        return;
    }
    let myStockInfo = "내 주식 정보\n\n" + addBlank;
    for (let key in stockStatus[userHash]) {
        const history = stockStatus[userHash][key];
        myStockInfo += `${key}\n`;
        myStockInfo += "====================\n";
        const filePath = `${stockPath}${key}_${getYearMonthDay()}.json`;
        const stockPrice = JSON.parse(FS.read(filePath))["stockPricePerTimeMap"][getTimestamp()];
        const stockAmount = getStockAmount(history);
        if (stockAmount > 0) {
            myStockInfo += `보유 주식 수: ${stockAmount}주\n`;
            const profitRate = calculateProfitRate(history, stockPrice);
            if (profitRate) {
                myStockInfo += `수익률: ${profitRate.toFixed(2)}%\n`;
                myStockInfo += `현재 가격: ${stockPrice}포인트\n`;
            } else {
                myStockInfo += "수익률: 0%\n";
                myStockInfo += `현재 가격: ${stockPrice}포인트\n`;
            }
        }else {
            myStockInfo += "보유 주식 수: 0주\n";
        }
    }
    chat.reply(myStockInfo);
}

function getStockAmount(transactions) {
    let totalQuantity = 0;
    transactions.forEach(tx => {
        if (tx.type === "buy") {
            totalQuantity += tx.quantity;
        } else if (tx.type === "sell") {
            totalQuantity -= tx.quantity;
        }
    });
    return totalQuantity;
}

function calculateProfitRate(transactions, currentPrice) {
    let totalQuantity = 0;
    let totalCost = 0;

    transactions.forEach(tx => {
        if (tx.type === "buy") {
            // 매수: 보유 주식 수와 투자 금액 누적.
            totalQuantity += tx.quantity;
            totalCost += tx.quantity * tx.price;
        } else if (tx.type === "sell") {
            // 매도: 매도 수량 만큼 평균 단가로 계산하여 차감.
            if (totalQuantity <= 0) return;
            const averageCost = totalCost / totalQuantity;
            totalQuantity -= tx.quantity;
            totalCost -= tx.quantity * averageCost;
            // 음수가 나오지 않도록 처리.
            if (totalQuantity < 0) {
                totalQuantity = 0;
                totalCost = 0;
            }
        }
    });

    if (totalQuantity <= 0) return null; // 보유 주식 없음.

    const averageCost = totalCost / totalQuantity;
    const profitRate = ((currentPrice - averageCost) / averageCost) * 100;
    return profitRate;
}

const buyStock = (chat) => {
    const username = chat.author.name;
    const userHash = chat.author.hash;
    const msg = chat.content;
    const stockName = msg.split(" ")[1];
    const stockAmount = Number(msg.split(" ")[2]);
    if (!stockName || !stockAmount) {
        chat.reply("주식 이름과 주식 수량을 입력해주세요.");
        return;
    }
    if (stockList.indexOf(stockName) === -1) {
        chat.reply("해당 주식은 존재하지 않습니다.");
        return;
    }
    if (isNaN(stockAmount) || stockAmount <= 0) {
        chat.reply("주식 수량은 숫자로 입력해주세요.");
        return;
    }
    if (Number.isInteger(stockAmount) === false) {
        chat.reply("주식 수량은 정수로 입력해주세요.");
        return;
    }
    let stockStatus = JSON.parse(FS.read(myStockPath));
    if (!stockStatus) {
        stockStatus = {};
    }
    const yearMonthDay = getYearMonthDay();
    const filePath = `${stockPath}${stockName}_${yearMonthDay}.json`;
    const file = FS.read(filePath);
    const timestamp = getTimestamp();

    const recentPrice = JSON.parse(file)["stockPricePerTimeMap"][timestamp];
    const totalPrice = recentPrice * stockAmount;
    let point = JSON.parse(FS.read(pointPath));
    let userPoint = point[username];
    if (userPoint < totalPrice) {
        chat.reply("포인트가 부족합니다.");
        return;
    }
    if (!stockStatus[userHash]) {
        stockStatus[userHash] = {};
    }
    if (!stockStatus[userHash][stockName]) {
        stockStatus[userHash][stockName] = [];
    }
    stockStatus[userHash][stockName].push({
        type: "buy",
        quantity: stockAmount,
        price: recentPrice
    });
    FS.write(myStockPath, JSON.stringify(stockStatus));
    userPoint -= totalPrice;
    point[username] = userPoint;
    FS.write(pointPath, JSON.stringify(point));
    const result = `주식 구매 완료\n구매 주식: ${stockName}\n구매 수량: ${stockAmount}주\n구매 가격: ${totalPrice}포인트\n남은 포인트: ${userPoint}포인트`;
    chat.reply(result);
}

const sellStock = (chat) => {
    const username = chat.author.name;
    const msg = chat.content;
    const stockName = msg.split(" ")[1];
    const stockAmount = Number(msg.split(" ")[2]);
    if (!stockName || !stockAmount) {
        chat.reply("주식 이름과 주식 수량을 입력해주세요.");
        return;
    }
    if (stockList.indexOf(stockName) === -1) {
        chat.reply("해당 주식은 존재하지 않습니다.");
        return;
    }
    if (isNaN(stockAmount) || stockAmount <= 0) {
        chat.reply("주식 수량은 숫자로 입력해주세요.");
        return;
    }
    if (Number.isInteger(stockAmount) === false) {
        chat.reply("주식 수량은 정수로 입력해주세요.");
        return;
    }
    const stockStatus = JSON.parse(FS.read(myStockPath));
    const userHash = chat.author.hash;
    if (!stockStatus || !stockStatus[userHash] || !stockStatus[userHash][stockName]) {
        chat.reply("해당 주식을 보유하고 있지 않습니다.");
        return;
    }
    const yearMonthDay = getYearMonthDay();
    const filePath = `${stockPath}${stockName}_${yearMonthDay}.json`;
    const file = FS.read(filePath);
    const timestamp = getTimestamp();

    const recentPrice = JSON.parse(file)["stockPricePerTimeMap"][timestamp];
    const totalPrice = recentPrice * stockAmount;
    let point = JSON.parse(FS.read(pointPath));
    let userPoint = point[username];
    stockStatus[userHash][stockName].push({
        type: "sell",
        quantity: stockAmount,
        price: recentPrice
    });
    FS.write(myStockPath, JSON.stringify(stockStatus));
    userPoint += totalPrice;
    point[username] = userPoint;
    FS.write(pointPath, JSON.stringify(point));
    const result = `주식 판매 완료\n판매 주식: ${stockName}\n판매 수량: ${stockAmount}주\n판매 가격: ${totalPrice}포인트\n남은 포인트: ${userPoint}포인트`;
    chat.reply(result);
}


const getYearMonthDay = () => {
    let date = new Date();
    return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
}

const getTimestamp = () => {
    let date = new Date();
    return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}${String(date.getSeconds()).padStart(2, "0")}`;
}




























bot.addListener(Event.MESSAGE, onMessage);
