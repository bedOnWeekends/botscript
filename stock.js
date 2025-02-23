const bot = BotManager.getCurrentBot();

const stockList = ["주침정보통신"];
const stockPath = "/sdcard/bot/stock/";
const myStockPath = "/sdcard/bot/mystock/";
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
}


const getStockInfo = (chat) => {
    let stockInfo = "";
    for (let i = 0; i < stockList.length; i++) {
        let stockName = stockList[i];
        stockInfo += `${stockName} 주식 정보\n`;
        stockInfo += "====================\n";
        let date = new Date();
        let yearMonthDay = getYearMonthDay();
        let filePath = `${stockPath}${stockName}_${yearMonthDay}.json`;
        const file = FS.read(filePath);
        if (file) {
            const timestamp = getTimestamp();
            chat.reply(timestamp);
            const recentPrice = JSON.parse(file)["stockPricePerTimeMap"][timestamp]["price"];
            if (recentPrice) {
                stockInfo += `최근 가격: ${recentPrice}포인트\n`;
            }
        }
    }
    chat.reply(stockInfo);
}

const getMyStockInfo = (chat) => {
}

const buyStock = (chat) => {
    const username = chat.author.name;
    const msg = chat.content;
    const stockName = msg.split(" ")[1];
    const stockAmount = msg.split(" ")[2];
    if (!stockName || !stockAmount) {
        chat.reply("주식 이름과 주식 수량을 입력해주세요.");
        return;
    }
    if (stockList.indexOf(stockName) === -1) {
        chat.reply("해당 주식은 존재하지 않습니다.");
        return;
    }
    const yearMonthDay = getYearMonthDay();
    const filePath = `${myStockPath}${stockName}_${yearMonthDay}.json`;
    const file = FS.read(filePath);
    const timestamp = getTimestamp();
    const recentPrice = JSON.parse(file)["stockPricePerTimeMap"][timestamp]["price"];
    const totalPrice = recentPrice * stockAmount;
    const point = JSON.parse(FS.read(pointPath))[username];
    if (point < totalPrice) {
        chat.reply("포인트가 부족합니다.");
        return;
    }

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