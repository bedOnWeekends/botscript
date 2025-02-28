// Description: 게임 관련 기능을 담당하는 파일입니다.
const bot = BotManager.getCurrentBot();
const FS = FileStream;
const pointPath = "/sdcard/attendance/exp.json";
const attemptPath = "/sdcard/attempt.json";
const coolTimePath = "/sdcard/coolTime.json";
const dicePath = "/sdcard/dice.json";
const slotPath = "/sdcard/slot.json";
const rockPath = "/sdcard/rock.json";
const diceMulPath = "/sdcard/diceMul.json";
const diceMulResultPath = "/sdcard/diceMulResult.json";
const monthlyTokenPath = "/sdcard/bot/monthlyToken.json";
const roulettePath = "/sdcard/roulette.json";
const rouletteGamePath = "/sdcard/rouletteGame.json";
const rouletteResultPath = "/sdcard/rouletteResult.json";
const blackjackRoomPath = "/sdcard/blackjackRoom.json";
const blackjackGamePath = "/sdcard/blackjackGame.json";
const blackjackRecordPath = "/sdcard/blackjackRecord.json";
const pointRecordPath = "/sdcard/pointRecord.json";
const titlePath = "/sdcard/attendance/user_titles.json";
const admin = ["유시훈", "이시우", "주말은침대에서", "방장", "김엔류"];

const addBlank = "\u200b".repeat(500);

function onMessage(chat) {
    if(chat.content === "1ㄷㅂ"){
        const notice = "ㄷㅂ목록\n" + addBlank +
            "포인트랭킹 - 1포인트랭킹\n" +
            "기부 - 1기부 [거지] [돈]\n" +
            "1. 블랙잭 : " +
            "\n방 생성 - 1블랙잭 [베팅액]" +
            "\n방 참가 - 1블랙잭참가 [베팅액]" +
            "\n방 나가기 - 1블랙잭방나가기" +
            "\n방 삭제(방장) - 1블랙잭방삭제" +
            "\n방 상태 - 1블랙잭방상태" +
            "\n전적검색 - 1블랙잭전적" +
            "\n----------\n" +
            "2. 러시안 룰렛 : " +
            "\n방 생성 - 1러시안룰렛 [베팅액] [총알갯수]" +
            "\n참가 - 1룰렛참가 [방장이름]" +
            "\n참가취소 - 1룰렛방나가기" +
            "\n방 폭파(방장) - 1룰렛방삭제" +
            "\n게임시작(방장) - 1룰렛시작" +
            "\n게임중단(방장) - 1룰렛중단" +
            "\n방목록 - 1룰렛방목록" +
            "\n전적 - 1룰렛전적" +
            "\n----------\n" +
            "3. 슬롯머신 : 1슬롯머신\n" + "" + "200포인트 소비\n" +
            "같은 과일 3개 뜨면 15000포인트\n" +
            "별모양 3개 뜨면 100000포인트\n" +
            "오늘 5회까지 가능\n" +
            "쿨타임 1분\n" +
            "----------\n" +
            "4. 주사위 : 1주사위\n----------\n" +
            "5. 주사위 멀티 :" +
            "\n방생성 - 1주사위멀티 [베팅액]" +
            "\n 방 목록 - 1주멀방목록" +
            "\n 게임참가 - 1주멀참가 [방장이름]" +
            "\n 게임시작(방장) - 1주멀시작" +
            "\n 방 폭파(방장) - 1주멀방삭제" +
            "\n 참가 취소 - 1주멀방나가기" +
            "\n 랭킹 - 1주멀전적\n----------\n" +
            "5. 가위바위보 : *업뎃예정\n----------\n" +
            "6. 사다리 타기 : *업뎃예정\n----------\n" +
            "모든 게임은 출석 포인트로 이용할 수 있습니다.";
        chat.reply(notice);
    }
    switch (chat.content) {
        case "1룰렛":
            roulette(chat);
            break;
        case "1슬롯머신":
            slotMachine(chat);
            break;
        case "1주사위":
            diceStake(chat);
            break;
        case "1가위바위보":
            rockPaperScissors(chat);
            break;
        case "1사다리":
            ladder(chat);
            break;
        case "1판돈해제":
            diceCancel(chat);
            break;
        case "1주멀방삭제":
            diceMulCancelRoom(chat);
            break;
        case "1주멀방목록":
            diceMulList(chat);
            break;
        case "1주멀전적":
            diceMulRecord(chat);
            break;
        case "1폭-발":
            deleteDiceMul(chat);
            break;
        case "하복이폭-발":
            deleteStat(chat);
            break;
        case "1주멀시작":
            diceMulStart(chat);
            break;
        case "1주멀방나가기":
            diceMulCancel(chat);
            break;
        case "하복이통계":
            havocStat(chat);
            break;
        case "1룰렛방나가기":
            rouletteCancel(chat);
            break;
        case "1룰렛방삭제":
            rouletteCancelRoom(chat);
            break;
        case "1룰렛시작":
            rouletteStart(chat);
            break;
        case "1발사":
            rouletteGame(chat);
            break;
        case "1룰렛중단":
            rouletteGameQuit(chat);
            break;
        case "1룰렛방목록":
            rouletteList(chat);
            break;
        case "1룰렛전적":
            rouletteRecord(chat);
            break;
        case "1힛":
            blackjackHit(chat);
            break;
        case "1스탠드":
            blackjackStand(chat);
            break;
        case "1더블":
            doubleDown(chat);
            break;
        case "1아니요":
            insuranceOff(chat);
            break;
        case "1블랙잭방삭제":
            blackjackCancelRoom(chat);
            break;
        case "1블랙잭시작":
            blackjackStart(chat);
            break;
        case "1블랙잭방나가기":
            blackjackCancel(chat);
            break;
        case "1블랙잭전적":
            blackjackRecord(chat);
            break;
        case "1블랙잭방상태":
            blackjackRoomStatus(chat);
            break;
        /*
        case "1포인트랭킹":
            pointRanking(chat);
            break;
            */
        case "1아이거왜안됨":
            shit(chat);
            break;
        case "1정상화":
            normalize(chat);
            break;

    }
    if(chat.content.startsWith("1판돈설정")){
        diceCheck(chat);
    }
    if (chat.content.startsWith("1주사위멀티")) {
        diceMultiRoom(chat);
    }
    if (chat.content.startsWith("1주멀참가")) {
        diceMulAttend(chat);
    }
    if (chat.content.startsWith("1러시안룰렛")) {
        roulette(chat);
    }
    if (chat.content.startsWith("1룰렛참가")) {
        rouletteAttend(chat);
    }
    if (chat.content.startsWith("1블랙잭") && !chat.content.startsWith("1블랙잭참가") && !chat.content.startsWith("1블랙잭방삭제") && !chat.content.startsWith("1블랙잭시작") && !chat.content.startsWith("1블랙잭방나가기") && !chat.content.startsWith("1블랙잭전적") && !chat.content.startsWith("1블랙잭방상태")) {
        blackjack(chat);
    }
    if (chat.content.startsWith("1블랙잭참가")){
        blackjackAttend(chat);
    }
    if (chat.content.startsWith("1예")){
        insuranceOn(chat);
    }
    if (chat.content.startsWith("1기부")){
        donate(chat);
    }
    pointRecord(chat);
}

const shit = (chat) => {
    if (!admin.includes(chat.author.name)){
        chat.reply("권한이 없습니다.");
        return;
    }
    const point = JSON.parse(FS.read(pointPath));
    chat.reply(JSON.stringify(point));
}





const deck = [
    "♠A", "♠2", "♠3", "♠4", "♠5", "♠6", "♠7", "♠8", "♠9", "♠10", "♠J", "♠Q", "♠K",
    "♣A", "♣2", "♣3", "♣4", "♣5", "♣6", "♣7", "♣8", "♣9", "♣10", "♣J", "♣Q", "♣K",
    "♥A", "♥2", "♥3", "♥4", "♥5", "♥6", "♥7", "♥8", "♥9", "♥10", "♥J", "♥Q", "♥K",
    "♦A", "♦2", "♦3", "♦4", "♦5", "♦6", "♦7", "♦8", "♦9", "♦10", "♦J", "♦Q", "♦K"
];

function blackjack(chat) {
    if (!checkAttempt(chat)){
        return;
    }
    const username = chat.author.name;
    let userPoint = JSON.parse(FS.read(pointPath)) || {};
    let point = userPoint[username] || 0;
    let bet = chat.content.split(" ")[1];
    if (isNaN(bet)) {
        chat.reply("베팅액: 숫자만 입력해주세요.");
        return;
    }
    bet = parseInt(bet);
    if (point < 100 || point < bet) {
        chat.reply("포인트가 부족합니다.");
        return;
    }
    let blackjackRoom = JSON.parse(FS.read(blackjackRoomPath));
    if (blackjackRoom !== null && blackjackRoom !== undefined) {
        chat.reply("이미 방이 생성되었습니다. 방에 참여 해 주세요.");
        return;
    }
    point -= bet;
    userPoint[username] = point;
    blackjackRoom = {"user": [username], "roomName": username};
    blackjackRoom["bet"] = {};
    blackjackRoom["bet"][username] = bet;
    FS.write(pointPath, JSON.stringify(userPoint));
    FS.write(blackjackRoomPath, JSON.stringify(blackjackRoom));
    chat.reply("블랙잭 방을 생성했습니다.\n" + "방에 참여하려면 1블랙잭참가 [베팅금액] 을 입력해주세요.");
}

function blackjackAttend(chat) {
    const blackjackRoom = JSON.parse(FS.read(blackjackRoomPath));
    const blackjackGame = JSON.parse(FS.read(blackjackGamePath));
    if (!checkAttempt(chat)){
        return;
    }
    const username = chat.author.name;
    let userPoint = JSON.parse(FS.read(pointPath)) || {};
    let point = userPoint[username] || 0;
    let bet = chat.content.split(" ")[1];
    if (isNaN(bet)) {
        chat.reply("베팅액: 숫자만 입력해주세요.");
        return;
    }
    bet = parseInt(bet);
    if (point < 100 || point < bet) {
        chat.reply("포인트가 부족합니다.");
        return;
    }
    if (blackjackRoom === null || blackjackRoom === undefined) {
        chat.reply("방이 존재하지 않습니다. 방을 만들어주세요");
        return;
    }
    if (blackjackRoom["user"].includes(username)) {
        chat.reply("이미 참가하셨습니다.");
        return;
    }
    if (blackjackGame !== null && blackjackGame !== undefined) {
        chat.reply("게임이 진행중입니다. 게임이 종료된 후 참가해주세요.");
        return;
    }
    point -= bet;
    userPoint[username] = point;
    blackjackRoom["user"].push(username);
    blackjackRoom["bet"][username] = bet;
    FS.write(pointPath, JSON.stringify(userPoint));
    FS.write(blackjackRoomPath, JSON.stringify(blackjackRoom));
    chat.reply("블랙잭 방에 참가했습니다.");
}

function blackjackStart(chat) {
    const username = chat.author.name;
    const blackjackRoom = JSON.parse(FS.read(blackjackRoomPath));
    if (blackjackRoom === null || blackjackRoom === undefined) {
        chat.reply("방이 존재하지 않습니다.");
        return;
    }
    if (blackjackRoom["roomName"] !== username) {
        chat.reply("방장만 게임을 시작할 수 있습니다.");
        return;
    }
    if (blackjackRoom["user"].length < 1) {
        chat.reply("참가자가 부족합니다.");
        return;
    }

    let blackjackGame = JSON.parse(FS.read(blackjackGamePath)) || {};

    let currentDeck = deck.slice();
    currentDeck = currentDeck.concat(currentDeck).concat(currentDeck).concat(currentDeck).concat(currentDeck).concat(currentDeck);

    for (let i = 0; i < blackjackRoom["user"].length; i++) {
        let user = blackjackRoom["user"][i];
        let bet = blackjackRoom["bet"][user];

        let firstCard = currentDeck[getRandom(0, deck.length - 1)];
        let secondCard = currentDeck[getRandom(0, deck.length - 1)];
        currentDeck.splice(currentDeck.indexOf(firstCard), 1);
        currentDeck.splice(currentDeck.indexOf(secondCard), 1);
        let firstCardValue = getCardValue(firstCard);
        let secondCardValue = getCardValue(secondCard);

        let sum = firstCardValue + secondCardValue;
        let aceOneCount = 0;
        let aceCount = 0;
        if (firstCard.includes("A")) {
            aceCount++;
        }
        if (secondCard.includes("A")) {
            aceCount++;
        }
        if (sum > 21 && firstCard.includes("A")) {
            sum -= 10;
            aceOneCount++;
        }else if (sum > 21 && secondCard.includes("A")) {
            sum -= 10;
            aceOneCount++;
        }
        if (sum === 21) {
            blackjackGame[user] = {"card": [firstCard, secondCard], "sum": sum, "bet": bet, "blackjack": true, "aceOneCount": aceOneCount, "aceCount": aceCount};
            continue;
        }
        blackjackGame[user] = {"card": [firstCard, secondCard], "sum": sum, "bet": bet, "blackjack": false , "aceOneCount": aceOneCount, "aceCount": aceCount};
    }

    let dealerHiddenCard = deck[getRandom(0, deck.length - 1)];
    let dealerOpenCard = deck[getRandom(0, deck.length - 1)];
    currentDeck.splice(currentDeck.indexOf(dealerHiddenCard), 1);
    currentDeck.splice(currentDeck.indexOf(dealerOpenCard), 1);
    let dealerOpenCardValue = getCardValue(dealerOpenCard);
    let dealerHiddenCardValue = getCardValue(dealerHiddenCard);

    let dealerSum = dealerHiddenCardValue + dealerOpenCardValue;
    let dealerAceOneCount = 0;
    let dealerAceCount = 0;
    if (dealerHiddenCard.includes("A")) {
        dealerAceCount++;
    }
    if (dealerOpenCard.includes("A")) {
        dealerAceCount++;
    }
    if (dealerSum > 21 && dealerHiddenCard.includes("A")) {
        dealerSum -= 10;
        dealerAceOneCount++;
    }else if (dealerSum > 21 && dealerOpenCard.includes("A")) {
        dealerSum -= 10;
        dealerAceOneCount++;
    }
    if (dealerSum === 21) {
        blackjackGame["dealer"] = {"card": [dealerHiddenCard, dealerOpenCard], "sum": dealerSum, "blackjack": true, "aceOneCount": dealerAceOneCount, "aceCount": dealerAceCount};
    }else {
        blackjackGame["dealer"] = {"card": [dealerHiddenCard, dealerOpenCard], "sum": dealerSum, "blackjack": false, "aceOneCount": dealerAceOneCount, "aceCount": dealerAceCount};
    }
    blackjackGame["deck"] = currentDeck;
    if (dealerOpenCard.includes("A")) {
        blackjackGame["insurance"] = true;
        blackjackGame["mode"] = "insurance";
        blackjackGame["turn"] = blackjackRoom["user"];
        blackjackGame["insuranceUser"] = {};
    }else {
        blackjackGame["insurance"] = false;
        blackjackGame["mode"] = "normal";
        blackjackGame["turn"] = blackjackRoom["user"];
    }
    let rep = "카드 분배 페이즈";
    rep += addBlank;
    rep = drawLine(rep);
    for (let i = 0; i < blackjackRoom["user"].length; i++) {
        let user = blackjackRoom["user"][i];
        let card = blackjackGame[user]["card"];
        let sum = blackjackGame[user]["sum"];
        rep += "[ " + user + " ] 님의 카드 : [" + card.join("], [") + "]\n" + "합계 : " + sum + "\n";
        if (blackjackGame[user]["blackjack"]) {
            rep += "블랙잭!\n";
            rep += "블랙잭이므로 게임에서 제외됩니다.";
            blackjackGame["turn"].splice(blackjackGame["turn"].indexOf(user), 1);
        }
        rep = drawLine(rep);
    }
    chat.reply(rep);
    rep = "딜러 카드 페이즈";
    rep += addBlank;
    rep = drawLine(rep);
    rep += "딜러의 카드 : [" + dealerOpenCard + "], [??]";
    rep = drawLine(rep);
    let flag = false;
    if (blackjackGame["insurance"]) {
        rep += "딜러의 오픈 카드가 A입니다. 보험을 구매하시겠습니까?\n보험금은 베팅액의 절반 이하로 설정 할 수 있습니다.";
        rep = drawLine(rep);
        rep += "[" + blackjackGame["turn"].join(", ") + "] 순서대로 진행해 주십시오.\n";
        rep += "[" + blackjackGame["turn"][0] + "] 님의 턴입니다.";
        rep = drawLine(rep);
        rep += "▪︎1예 [보험금]\n" + "▪︎1아니요";
    }else {
        if (blackjackGame["turn"].length === 0) {
            flag = true;
        }else {
            rep += "[" + blackjackGame["turn"].join(", ") + "] 순서대로 진행해 주십시오.\n";
            rep += "[" + blackjackGame["turn"][0] + "] 님의 턴입니다.\n";
            rep += "[" + blackjackGame["turn"][0] + "] 님의 카드 : [" + blackjackGame[blackjackGame["turn"][0]]["card"].join("], [") + "]\n" + "합계 : " + blackjackGame[blackjackGame["turn"][0]]["sum"];
            rep = drawLine(rep);
            rep += "▪︎1힛\n" + "▪︎1스탠드\n" + "▪︎1더블";
        }
    }
    blackjackGame["burst"] = {};
    FS.write(blackjackGamePath, JSON.stringify(blackjackGame));
    if (flag) {
        dealerTurn(chat);
    }else {
        chat.reply(rep);
    }
}

function insuranceOn(chat) {
    const username = chat.author.name;
    let blackjackGame = JSON.parse(FS.read(blackjackGamePath));
    let blackjackRoom = JSON.parse(FS.read(blackjackRoomPath));
    if (blackjackGame === null || blackjackGame === undefined) {
        chat.reply("게임이 존재하지 않습니다.");
        return;
    }
    if (blackjackGame["mode"] !== "insurance") {
        chat.reply("보험 구매가 불가능합니다.");
        return;
    }
    if (blackjackGame["turn"][0] !== username) {
        chat.reply("차례가 아닙니다.");
        return;
    }
    let bet = chat.content.split(" ")[1];
    if (isNaN(bet)) {
        chat.reply("보험금: 숫자만 입력해주세요.");
        return;
    }
    bet = parseInt(bet);
    let userPoint = JSON.parse(FS.read(pointPath)) || {};
    let point = userPoint[username] || 0;
    if (point < bet) {
        chat.reply("포인트가 부족합니다.");
        return;
    }
    if (bet > blackjackGame[username]["bet"] / 2) {
        chat.reply("베팅금의 절반 이하로 보험금을 설정해주세요.");
        return;
    }
    point -= bet;
    userPoint[username] = point;
    blackjackGame["insuranceUser"][username] = bet;
    blackjackGame["turn"].splice(0, 1);
    let rep = "[" + username + "] 님의 보험 구매 페이즈";
    rep += addBlank;
    rep = drawLine(rep);
    rep += "[" + username + "] 님이 보험을 구매했습니다.";
    rep = drawLine(rep);
    if (blackjackGame["turn"].length === 0) {
        rep += "보험 구매가 완료되었습니다.\n";
        blackjackGame["mode"] = "normal";
        blackjackGame["turn"] = blackjackRoom["user"];
        for (let i = 0; i < blackjackRoom["user"].length; i++) {
            if (blackjackGame[blackjackRoom["user"][i]]["blackjack"]) {
                blackjackGame["turn"].splice(blackjackGame["turn"].indexOf(blackjackRoom["user"][i]), 1);
            }
        }
        rep += "[" + blackjackGame["turn"].join(", ") + "] 순서대로 진행해 주십시오.\n" + "[" + blackjackGame["turn"][0] + "] 님의 턴입니다.\n";
        rep += "[" + blackjackGame["turn"][0] + "] 님의 카드 : [" + blackjackGame[blackjackGame["turn"][0]]["card"].join("], [") + "]\n" + "합계 : " + blackjackGame[blackjackGame["turn"][0]]["sum"];
        rep = drawLine(rep);
        rep += "▪︎1힛\n" + "▪︎1스탠드\n" + "▪︎1더블";
    }else {
        rep += "\n[" + blackjackGame["turn"][0] + "] 님의 턴입니다.";
        rep = drawLine(rep);
        rep += "▪︎1예 [보험금]\n" + "▪︎1아니요";
    }
    FS.write(pointPath, JSON.stringify(userPoint));
    FS.write(blackjackGamePath, JSON.stringify(blackjackGame));
    chat.reply(rep);
}

function insuranceOff(chat) {
    const username = chat.author.name;
    let blackjackGame = JSON.parse(FS.read(blackjackGamePath));
    let blackjackRoom = JSON.parse(FS.read(blackjackRoomPath));
    if (blackjackGame === null || blackjackGame === undefined) {
        chat.reply("게임이 존재하지 않습니다.");
        return;
    }
    if (blackjackGame["mode"] !== "insurance") {
        chat.reply("보험 구매가 불가능합니다.");
        return;
    }
    if (blackjackGame["turn"][0] !== username) {
        chat.reply("차례가 아닙니다.");
        return;
    }
    blackjackGame["turn"].splice(0, 1);
    let rep = "[" + username + "] 님의 보험 구매 페이즈";
    rep += addBlank;
    rep = drawLine(rep);
    rep += "[" + username + "] 님이 보험을 구매하지 않았습니다.";
    rep = drawLine(rep);
    if (blackjackGame["turn"].length === 0) {
        rep += "보험 구매가 완료되었습니다.\n";
        blackjackGame["mode"] = "normal";
        blackjackGame["turn"] = blackjackRoom["user"];
        for (let i = 0; i < blackjackRoom["user"].length; i++) {
            if (blackjackGame[blackjackRoom["user"][i]]["blackjack"]) {
                blackjackGame["turn"].splice(blackjackGame["turn"].indexOf(blackjackRoom["user"][i]), 1);
            }
        }
        rep += "[" + blackjackGame["turn"].join(", ") + "] 순서대로 진행해 주십시오.\n" + "[" + blackjackGame["turn"][0] + "] 님의 턴입니다.\n";
        rep += "[" + blackjackGame["turn"][0] + "] 님의 카드 : [" + blackjackGame[blackjackGame["turn"][0]]["card"].join("], [") + "]\n" + "합계 : " + blackjackGame[blackjackGame["turn"][0]]["sum"];
        rep = drawLine(rep);
        rep += "▪︎1힛\n" + "▪︎1스탠드\n" + "▪︎1더블";
    }else {
        rep += "\n[" + blackjackGame["turn"][0] + "] 님의 턴입니다.";
        rep = drawLine(rep);
        rep += "▪︎1예 [보험금]\n" + "▪︎1아니요";
    }
    FS.write(blackjackGamePath, JSON.stringify(blackjackGame));
    chat.reply(rep);
}

function blackjackHit(chat) {
    const username = chat.author.name;
    let blackjackGame = JSON.parse(FS.read(blackjackGamePath));
    if (blackjackGame === null || blackjackGame === undefined) {
        chat.reply("게임이 존재하지 않습니다.");
        return;
    }
    if (blackjackGame["mode"] !== "normal") {
        chat.reply("히트가 불가능합니다.");
        return;
    }
    if (blackjackGame["turn"][0] !== username) {
        chat.reply("차례가 아닙니다.");
        return;
    }
    let userCard = blackjackGame[username]["card"];
    let currentDeck = blackjackGame["deck"];
    let card = currentDeck[getRandom(0, currentDeck.length - 1)];
    userCard.push(card);
    currentDeck.splice(currentDeck.indexOf(card), 1);
    let sum = blackjackGame[username]["sum"] + getCardValue(card);
    let aceOneCount = blackjackGame[username]["aceOneCount"];
    let aceCount = blackjackGame[username]["aceCount"];
    if (card.includes("A")) {
        aceCount++;
    }
    while (sum > 21 && aceOneCount < aceCount) {
        sum -= 10;
        aceOneCount++;
    }
    blackjackGame[username]["card"] = userCard;
    blackjackGame[username]["sum"] = sum;
    blackjackGame[username]["aceOneCount"] = aceOneCount;
    blackjackGame[username]["aceCount"] = aceCount;
    blackjackGame["deck"] = currentDeck;
    let rep = "";
    rep += "[" + username + "] 님의 히트 페이즈";
    rep += addBlank;
    rep = drawLine(rep);
    rep += "[" + username + "] 님이 히트했습니다.";
    rep = drawLine(rep);
    rep += "[" + username + "] 님의 카드 : [" + userCard.join("], [") + "]\n" + "합계 : " + sum;
    rep = drawLine(rep);
    let flag = false;
    if (sum > 21) {
        rep += "버스트!";
        rep = drawLine(rep);
        chat.reply(rep);
        rep = "";
        blackjackGame["turn"].splice(0, 1);
        if (!blackjackGame["burst"]) {
            blackjackGame["burst"] = {};
        }
        blackjackGame["burst"][username] = blackjackGame[username];
        if (blackjackGame["turn"].length === 0) {
            flag = true;
        }else {
            rep = "[" + blackjackGame["turn"][0] + "] 님의 턴 페이즈";
            rep += addBlank;
            rep = drawLine(rep);
            rep += "[" + blackjackGame["turn"][0] + "] 님의 카드 : [" + blackjackGame[blackjackGame["turn"][0]]["card"].join("], [") + "]\n" + "합계 : " + blackjackGame[blackjackGame["turn"][0]]["sum"];
            rep = drawLine(rep);
            rep += "▪︎1힛\n" + "▪︎1스탠드\n" + "▪︎1더블";
        }
    }else {
        if (sum === 21) {
            rep += "21입니다. 스탠드를 하세요.";
        }else {
            rep += "추가 행동을 선택하세요.\n";
            rep += "▪︎1힛\n" + "▪︎1스탠드\n" + "▪︎1더블";
        }
    }
    FS.write(blackjackGamePath, JSON.stringify(blackjackGame));
    if (flag) {
        dealerTurn(chat);
    }else {
        chat.reply(rep);
    }
}

function blackjackStand(chat) {
    const username = chat.author.name;
    let blackjackGame = JSON.parse(FS.read(blackjackGamePath));
    if (blackjackGame === null || blackjackGame === undefined) {
        chat.reply("게임이 존재하지 않습니다.");
        return;
    }
    if (blackjackGame["mode"] !== "normal") {
        chat.reply("스탠드가 불가능합니다.");
        return;
    }
    if (blackjackGame["turn"][0] !== username) {
        chat.reply("차례가 아닙니다.");
        return;
    }
    blackjackGame["turn"].splice(0, 1);
    let rep = "[" + username + "] 님의 스탠드 페이즈";
    rep += addBlank;
    rep = drawLine(rep);
    rep += "[" + username + "] 님이 스탠드했습니다.";
    rep = drawLine(rep);
    chat.reply(rep);
    rep = "";
    let flag = false;
    if (blackjackGame["turn"].length === 0) {
        flag = true;
    }else {
        rep += "[" + blackjackGame["turn"][0] + "] 님의 턴 페이즈";
        rep += addBlank;
        rep = drawLine(rep);
        rep += "[" + blackjackGame["turn"][0] + "] 님의 카드 : [" + blackjackGame[blackjackGame["turn"][0]]["card"].join("], [") + "]\n" + "합계 : " + blackjackGame[blackjackGame["turn"][0]]["sum"];
        rep = drawLine(rep);
        rep += "▪︎1힛\n" + "▪︎1스탠드\n" + "▪︎1더블";
    }
    FS.write(blackjackGamePath, JSON.stringify(blackjackGame));
    if (flag) {
        dealerTurn(chat);
    }else {
        chat.reply(rep);
    }
}

function drawLine(rep) {
    rep += "\n\n━━━━━━━━━━━━━━\n\n";
    return rep;
}

function doubleDown(chat) {
    const username = chat.author.name;
    let blackjackGame = JSON.parse(FS.read(blackjackGamePath));
    if (blackjackGame === null || blackjackGame === undefined) {
        chat.reply("게임이 존재하지 않습니다.");
        return;
    }
    if (blackjackGame["mode"] !== "normal") {
        chat.reply("더블이 불가능합니다.");
        return;
    }
    if (blackjackGame["turn"][0] !== username) {
        chat.reply("차례가 아닙니다.");
        return;
    }
    let userPoint = JSON.parse(FS.read(pointPath)) || {};
    let point = userPoint[username] || 0;
    let bet = blackjackGame[username]["bet"];
    if (point < bet) {
        chat.reply("포인트가 부족합니다.");
        return;
    }
    point -= bet;
    userPoint[username] = point;
    bet *= 2;
    let currentDeck = blackjackGame["deck"];
    let card = currentDeck[getRandom(0, currentDeck.length - 1)];
    currentDeck.splice(currentDeck.indexOf(card), 1);
    let userCard = blackjackGame[username]["card"];
    userCard.push(card);
    let sum = blackjackGame[username]["sum"] + getCardValue(card);
    let aceOneCount = blackjackGame[username]["aceOneCount"];
    let aceCount = blackjackGame[username]["aceCount"];
    if (card.includes("A")) {
        aceCount++;
    }
    while (sum > 21 && aceOneCount < aceCount) {
        sum -= 10;
        aceOneCount++;
    }
    blackjackGame[username]["card"] = userCard;
    blackjackGame[username]["sum"] = sum;
    blackjackGame[username]["aceOneCount"] = aceOneCount;
    blackjackGame[username]["aceCount"] = aceCount;
    blackjackGame[username]["bet"] = bet;
    blackjackGame["deck"] = currentDeck;
    let rep = "";
    rep += "[" + username + "] 님의 더블다운 페이즈";
    rep += addBlank;
    rep = drawLine(rep);
    rep += "[" + username + "] 님이 더블했습니다.\n";
    rep += "베팅금이 2배로 증가했습니다. 카드 한 장을 뽑습니다.";
    rep = drawLine(rep);
    rep += "[" + username + "] 님의 카드 : [" + userCard.join("], [") + "]\n" + "합계 : " + sum;
    rep = drawLine(rep);
    if (sum > 21) {
        rep += "버스트!";
        rep = drawLine(rep);
        if (!blackjackGame["burst"]) {
            blackjackGame["burst"] = {};
        }
        blackjackGame["burst"][username] = blackjackGame[username];
    }
    chat.reply(rep);
    rep = "";
    blackjackGame["turn"].splice(0, 1);
    let flag = false;
    if (blackjackGame["turn"].length === 0) {
        flag = true;
    }else {
        rep += "[" + blackjackGame["turn"][0] + "] 님의 턴 페이즈";
        rep += addBlank;
        rep = drawLine(rep);
        rep += "[" + blackjackGame["turn"][0] + "] 님의 카드 : [" + blackjackGame[blackjackGame["turn"][0]]["card"].join("], [") + "]\n" + "합계 : " + blackjackGame[blackjackGame["turn"][0]]["sum"];
        rep = drawLine(rep);
        rep += "▪︎1힛\n" + "▪︎1스탠드\n" + "▪︎1더블";
    }
    FS.write(pointPath, JSON.stringify(userPoint));
    FS.write(blackjackGamePath, JSON.stringify(blackjackGame));
    if (flag) {
        dealerTurn(chat);
    }else {
        chat.reply(rep);
    }
}

function dealerTurn(chat) {
    let blackjackGame = JSON.parse(FS.read(blackjackGamePath));
    let blackjackRoom = JSON.parse(FS.read(blackjackRoomPath));
    let currentDeck = blackjackGame["deck"];
    let dealerCard = blackjackGame["dealer"]["card"];
    let sum = blackjackGame["dealer"]["sum"];
    let aceOneCount = blackjackGame["dealer"]["aceOneCount"];
    let aceCount = blackjackGame["dealer"]["aceCount"];
    let rep = "딜러의 히트 & 스탠드 페이즈";
    rep += addBlank;
    rep = drawLine(rep);
    rep += "딜러의 카드 : [" + dealerCard.join("], [") + "]\n" + "합계 : " + sum;
    rep = drawLine(rep);
    while (sum < 17) {
        rep += "딜러의 카드가 17이하입니다. 카드를 한 장 더 뽑습니다.";
        rep = drawLine(rep);
        let card = currentDeck[getRandom(0, currentDeck.length - 1)];
        dealerCard.push(card);
        currentDeck.splice(currentDeck.indexOf(card), 1);
        sum += getCardValue(card);
        if (card.includes("A")) {
            aceCount++;
        }
        while (sum > 21 && aceOneCount < aceCount) {
            sum -= 10;
            aceOneCount++;
        }
        rep += "딜러의 카드 : [" + dealerCard.join("], [") + "]\n" + "합계 : " + sum;
        rep = drawLine(rep);
    }
    blackjackGame["deck"] = currentDeck;
    blackjackGame["dealer"]["card"] = dealerCard;
    blackjackGame["dealer"]["sum"] = sum;
    blackjackGame["dealer"]["aceOneCount"] = aceOneCount;
    blackjackGame["dealer"]["aceCount"] = aceCount;
    chat.reply(rep);
    rep = "블랙잭 결산 페이즈";
    rep += addBlank;
    rep = drawLine(rep);
    let player = blackjackRoom["user"];
    let burst = blackjackGame["burst"];
    let dealerSum = blackjackGame["dealer"]["sum"];
    if (dealerSum > 21) {
        chat.reply("딜러가 버스트했습니다.");
    }
    let attempt = JSON.parse(FS.read(attemptPath)) || {};
    const date = new Date().toLocaleDateString();
    let todayAttempt = attempt[date] || {};
    let record = JSON.parse(FS.read(blackjackRecordPath)) || {};
    let userPoint = JSON.parse(FS.read(pointPath)) || {};
    if (blackjackGame["dealer"]["blackjack"]) {
        rep += "딜러의 블랙잭!";
        rep = drawLine(rep);
        for (let i = 0; i < player.length; i++) {
            let user = player[i];
            let userSum = blackjackGame[user]["sum"];
            let userBet = blackjackGame[user]["bet"];
            let point = userPoint[user] || 0;
            let userAttempt = todayAttempt[user] || 0;
            userAttempt++;
            todayAttempt[user] = userAttempt;
            if (record[user] === undefined || record[user] === null) {
                record[user] = {};
            }
            if (blackjackGame[user]["blackjack"]) {
                rep += "[" + user + "] 님의 카드 : [" + blackjackGame[user]["card"].join("], [") + "]\n" + "합계 : " + userSum + "\n";
                rep += "블랙잭 무승부: 베팅금 반환\n\n";
                record[user]["draw"] = record[user]["draw"] + 1 || 1;
                record[user]["blackjack"] = record[user]["blackjack"] + 1 || 1;
                point += userBet;
            }else if (blackjackGame["insuranceUser"][user] !== undefined && blackjackGame["insuranceUser"][user] !== null) {
                rep += "[" + user + "] 님의 카드 : [" + blackjackGame[user]["card"].join("], [") + "]\n" + "합계 : " + userSum + "\n";
                rep += "보험금 : " + blackjackGame["insuranceUser"][user] + "\n";
                rep += "패배-인슈어런스: 보험금의 2배 반환\n\n";
                record[user]["lose"] = record[user]["lose"] + 1 || 1;
                point += blackjackGame["insuranceUser"][user] * 2;
            }else {
                rep += "[" + user + "] 님의 카드 : [" + blackjackGame[user]["card"].join("], [") + "]\n" + "합계 : " + userSum + "\n";
                rep += "패배: 베팅금 몰수\n\n";
                record[user]["lose"] = record[user]["lose"] + 1 || 1;
                if (burst[user] !== undefined && burst[user] !== null) {
                    record[user]["burst"] = record[user]["burst"] + 1 || 1;
                }
            }
            rep += "현재 포인트 : " + point + "\n";
            userPoint[user] = point;
            rep += "남은 시도 횟수 : " + (10 - userAttempt);
            rep = drawLine(rep);
        }
        chat.reply(rep);
    }else if (dealerSum > 21) {
        rep += "딜러의 버스트!";
        rep = drawLine(rep);
        for (let i = 0; i < player.length; i++) {
            let user = player[i];
            let userSum = blackjackGame[user]["sum"];
            let userBet = blackjackGame[user]["bet"];
            let point = userPoint[user] || 0;
            let userAttempt = todayAttempt[user] || 0;
            userAttempt++;
            todayAttempt[user] = userAttempt;
            if (record[user] === undefined || record[user] === null) {
                record[user] = {};
            }
            if (blackjackGame[user]["blackjack"]) {
                rep += "[" + user + "] 님의 카드 : [" + blackjackGame[user]["card"].join("], [") + "]\n" + "합계 : " + userSum + "\n";
                rep += "블랙잭 승리: 베팅금의 2.5배 반환\n\n";
                record[user]["blackjack"] = record[user]["blackjack"] + 1 || 1;
                record[user]["win"] = record[user]["win"] + 1 || 1;
                point += userBet * 2.5;
            }else if (blackjackGame["burst"][user] !== undefined && blackjackGame["burst"][user] !== null) {
                rep += "[" + user + "] 님의 카드 : [" + blackjackGame[user]["card"].join("], [") + "]\n" + "합계 : " + userSum + "\n";
                rep += "버스트: 베팅금 몰수\n\n";
                record[user]["burst"] = record[user]["burst"] + 1 || 1;
                record[user]["lose"] = record[user]["lose"] + 1 || 1;
            }else{
                rep += "[" + user + "] 님의 카드 : [" + blackjackGame[user]["card"].join("], [") + "]\n" + "합계 : " + userSum + "\n";
                rep += "승리: 베팅금의 2배 반환\n\n";
                record[user]["win"] = record[user]["win"] + 1 || 1;
                point += userBet * 2;
            }
            rep += "현재 포인트 : " + point + "\n";
            userPoint[user] = point;
            rep += "남은 시도 횟수 : " + (10 - userAttempt);
            rep = drawLine(rep);
        }
        chat.reply(rep);
    }else {
        rep += "딜러의 카드 : [" + blackjackGame["dealer"]["card"].join("], [") + "]\n" + "합계 : " + dealerSum;
        rep = drawLine(rep);
        for (let i = 0; i < player.length; i++) {
            let user = player[i];
            let userSum = blackjackGame[user]["sum"];
            let userBet = blackjackGame[user]["bet"];
            let point = userPoint[user] || 0;
            let userAttempt = todayAttempt[user] || 0;
            userAttempt++;
            todayAttempt[user] = userAttempt;
            if (record[user] === undefined || record[user] === null) {
                record[user] = {};
            }
            if (blackjackGame[user]["blackjack"]) {
                rep += "[" + user + "] 님의 카드 : [" + blackjackGame[user]["card"].join("], [") + "]\n" + "합계 : " + userSum + "\n";
                rep += "블랙잭 승리: 베팅금의 2.5배 반환\n\n";
                record[user]["blackjack"] = record[user]["blackjack"] + 1 || 1;
                record[user]["win"] = record[user]["win"] + 1 || 1;
                point += userBet * 2.5;
            }else if (blackjackGame["burst"][user] !== undefined && blackjackGame["burst"][user] !== null) {
                rep += "[" + user + "] 님의 카드 : [" + blackjackGame[user]["card"].join("], [") + "]\n" + "합계 : " + userSum + "\n";
                rep += "버스트: 베팅금 몰수\n\n";
                record[user]["burst"] = record[user]["burst"] + 1 || 1;
                record[user]["lose"] = record[user]["lose"] + 1 || 1;
            }else if (userSum > dealerSum) {
                rep += "[" + user + "] 님의 카드 : [" + blackjackGame[user]["card"].join("], [") + "]\n" + "합계 : " + userSum + "\n";
                rep += "승리: 베팅금의 2배 반환\n\n";
                record[user]["win"] = record[user]["win"] + 1 || 1;
                point += userBet * 2;
            }else if (userSum < dealerSum) {
                rep += "[" + user + "] 님의 카드 : [" + blackjackGame[user]["card"].join("], [") + "]\n" + "합계 : " + userSum + "\n";
                rep += "패배: 베팅금 몰수\n\n";
                record[user]["lose"] = record[user]["lose"] + 1 || 1;
            }else {
                rep += "[" + user + "] 님의 카드 : [" + blackjackGame[user]["card"].join("], [") + "]\n" + "합계 : " + userSum + "\n";
                rep += "무승부: 베팅금 반환\n\n";
                record[user]["draw"] = record[user]["draw"] + 1 || 1;
                point += userBet;
            }
            rep += "현재 포인트 : " + point + "\n";
            userPoint[user] = point;
            rep += "남은 시도 횟수 : " + (10 - userAttempt);
            rep = drawLine(rep);
        }
        chat.reply(rep);
    }
    attempt[date] = todayAttempt;
    FS.write(pointPath, JSON.stringify(userPoint));
    FS.write(attemptPath, JSON.stringify(attempt));
    FS.write(blackjackRecordPath, JSON.stringify(record));
    FS.remove(blackjackRoomPath);
    FS.remove(blackjackGamePath);
}

function blackjackCancelRoom(chat) {
    const username = chat.author.name;
    let blackjackRoom = JSON.parse(FS.read(blackjackRoomPath));
    let point = JSON.parse(FS.read(pointPath)) || {};
    if (blackjackRoom === null || blackjackRoom === undefined) {
        chat.reply("방이 존재하지 않습니다.");
        return;
    }
    if (blackjackRoom["roomName"] === username) {
        let bet = blackjackRoom["bet"];
        for (let key in bet) {
            if (point[key] === undefined || point[key] === null) {
                point[key] = 0;
            }
            point[key] += bet[key];
        }
        FS.write(pointPath, JSON.stringify(point));
        FS.remove(blackjackRoomPath);
        chat.reply("방을 삭제했습니다.");
    }else {
        chat.reply("방장만 방을 삭제할 수 있습니다.");
    }
}

function blackjackCancel(chat) {
    const username = chat.author.name;
    let blackjackRoom = JSON.parse(FS.read(blackjackRoomPath));
    if (blackjackRoom === null || blackjackRoom === undefined) {
        chat.reply("방이 존재하지 않습니다.");
        return;
    }
    if (blackjackRoom["roomName"] === username) {
        chat.reply("방장은 나가실 수 없습니다. [1블랙잭방삭제]를 이용하세요.");
        return;
    }
    if (!blackjackRoom["user"].includes(username)) {
        chat.reply("참가중인 방이 없습니다.");
        return;
    }
    blackjackRoom["user"].splice(blackjackRoom["user"].indexOf(username), 1);
    let bet = blackjackRoom["bet"];
    let point = JSON.parse(FS.read(pointPath)) || {};
    if (point[username] === undefined || point[username] === null) {
        point[username] = 0;
    }
    point[username] += bet[username];
    FS.write(pointPath, JSON.stringify(point));
    FS.write(blackjackRoomPath, JSON.stringify(blackjackRoom));
    chat.reply("방을 나갔습니다.");
}

function blackjackRoomStatus(chat) {
    const blackjackRoom = JSON.parse(FS.read(blackjackRoomPath));
    if (blackjackRoom === null || blackjackRoom === undefined) {
        chat.reply("방이 존재하지 않습니다.");
        return;
    }
    let rep = "블랙잭 방 상태";
    rep = drawLine(rep);
    rep += "방장 : " + blackjackRoom["roomName"];
    rep = drawLine(rep);
    for (let i = 0; i < blackjackRoom["user"].length; i++) {
        rep += "참가자 : " + blackjackRoom["user"][i] + "\n";
        rep += "베팅금 : " + blackjackRoom["bet"][blackjackRoom["user"][i]];
        rep = drawLine(rep);
    }
    chat.reply(rep);
}

function blackjackRecord(chat) {
    let record = JSON.parse(FS.read(blackjackRecordPath));
    if (record === null || record === undefined) {
        chat.reply("기록이 존재하지 않습니다.");
        return;
    }
    let rep = "블랙잭 기록";
    rep = drawLine(rep);
    for (let key in record) {
        rep += "[" + key + "]\n";
        rep += "승리 : " + (record[key]["win"] || 0) + "회\n";
        rep += "패배 : " + (record[key]["lose"] || 0) + "회\n";
        rep += "무승부 : " + (record[key]["draw"] || 0) + "회\n";
        rep += "블랙잭 : " + (record[key]["blackjack"] || 0) + "회\n";
        rep += "버스트 : " + (record[key]["burst"] || 0) + "회";
        rep = drawLine(rep);
    }
    chat.reply(rep);
}



function getCardValue(card) {
    if (card.includes("A")) {
        return 11;
    } else if (card.includes("2")) {
        return 2;
    } else if (card.includes("3")) {
        return 3;
    } else if (card.includes("4")) {
        return 4;
    } else if (card.includes("5")) {
        return 5;
    } else if (card.includes("6")) {
        return 6;
    } else if (card.includes("7")) {
        return 7;
    } else if (card.includes("8")) {
        return 8;
    } else if (card.includes("9")) {
        return 9;
    } else {
        return 10;
    }
}

function donate(chat) {
    const username = chat.author.name;
    const receiver = chat.content.split(" ")[1];
    let point = chat.content.split(" ")[2];
    let userPoint = JSON.parse(FS.read(pointPath)) || {};
    if (point === undefined || point === null) {
        chat.reply("포인트: 숫자를 입력해주세요.");
        return;
    }
    if (receiver === undefined || receiver === null) {
        chat.reply("받는 사람: 이름을 입력해주세요.");
        return;
    }
    if (point === undefined || point === null) {
        chat.reply("포인트: 숫자를 입력해주세요.");
        return;
    }
    if (!point){
        chat.reply("포인트: 숫자를 입력해주세요.");
        return;
    }
    if (!receiver){
        chat.reply("받는 사람: 이름을 입력해주세요.");
        return;
    }
    if (isNaN(point)) {
        chat.reply("포인트: 숫자만 입력해주세요.");
        return;
    }
    point = parseInt(point);
    if (point < 1) {
        chat.reply("포인트는 1포인트 이상부터 가능합니다.");
        return;
    }
    if (userPoint[username] < point) {
        chat.reply("포인트가 부족합니다.");
        return;
    }
    if (userPoint[receiver] === undefined || userPoint[receiver] === null) {
        chat.reply("받는 사람이 존재하지 않습니다.");
        return;
    }
    if (username === receiver) {
        chat.reply("자신에게 포인트를 기부할 수 없습니다.");
        return;
    }
    userPoint[username] -= point;
    userPoint[receiver] += point;
    let rep = "[" + username + "] 님이 [" + receiver + "] 님에게 " + point + "포인트를 기부했습니다.";
    rep = drawLine(rep);
    rep += "기부 후 [" + username + "] 님의 포인트 : " + userPoint[username] + "포인트\n";
    rep += "기부 후 [" + receiver + "] 님의 포인트 : " + userPoint[receiver] + "포인트";
    chat.reply(rep);
    FS.write(pointPath, JSON.stringify(userPoint));
}

function pointRecord(chat) {
    const roomName = chat.room;
    if (roomName !== "🏥 정신병동 🏥"){
        return;
    }
    const username = chat.author.name;
    let record = JSON.parse(FS.read(pointRecordPath)) || {};
    record[username] = new Date().getTime();
    for (let key in record){
        if (new Date().getTime() - record[key] > 1000 * 60 * 60 * 24 * 7){
            delete record[key];
        }
    }
    FS.write(pointRecordPath, JSON.stringify(record));
}

function pointRanking(chat) {
    const roomName = chat.room;
    if (roomName !== "🏥 정신병동 🏥"){
        return;
    }
    let record = JSON.parse(FS.read(pointRecordPath)) || {};
    let userPoint = JSON.parse(FS.read(pointPath)) || {};
    let point = [];
    for (let key in record){
        if (userPoint[key] !== undefined){
            point.push({"name": key, "point": userPoint[key]});
        }
    }
    point.sort(function(a, b){
        return b.point - a.point;
    });
    let rep = "포인트 랭킹" + "\u200b".repeat(500);
    rep = drawLine(rep);
    for (let i = 0; i < point.length; i++){
        if (i === 0){
            rep += "🥇 - ";
        }else if (i === 1){
            rep += "🥈 - ";
        }else if (i === 2){
            rep += "🥉 - ";
        }else {
            rep += i + 1 + "위- ";
        }
        rep += point[i].name + " : " + point[i].point + "포인트\n\n";
    }
    chat.reply(rep);
}

function roulette(chat) {
    const username = chat.author.name;

    if (!checkAttempt(chat)){
        return;
    }
    let stake = chat.content.split(" ")[1];
    let bullet = chat.content.split(" ")[2];
    if (isNaN(stake)) {
        chat.reply("베팅액 : 숫자만 입력해주세요.");
        return;
    }
    if (isNaN(bullet)) {
        chat.reply("총알갯수 : 숫자만 입력해주세요.");
        return;
    }
    stake = parseInt(stake);
    bullet = parseInt(bullet);

    if (bullet < 1 || bullet > 3) {
        chat.reply("총알갯수는 1~3개까지 가능합니다.");
        return;
    }
    if (stake < 100) {
        chat.reply("최소 100포인트부터 가능합니다.");
        return;
    }
    let userPoint = JSON.parse(FS.read(pointPath)) || {};
    let point = userPoint[username] || 0;
    if (point < stake) {
        chat.reply("포인트가 부족합니다.");
        return;
    }
    let roulette = JSON.parse(FS.read(roulettePath)) || {};
    let room = roulette[username];
    if (room !== undefined){
        chat.reply("이미 방을 만들었습니다.");
        return;
    }



    room = {"stake": stake, "user": [], "bullet": bullet};
    room["user"].push(username);
    roulette[username] = room;
    FS.write(roulettePath, JSON.stringify(roulette));

    chat.reply("방을 만들었습니다.\n" + "방에 입장하려면 [ 1룰렛참가 방장이름 ]을 입력해주세요.");
}

function rouletteAttend(chat) {
    const username = chat.author.name;
    if (!checkAttempt(chat)){
        return;
    }
    const roomName = chat.content.split(" ")[1];
    let roulette = JSON.parse(FS.read(roulettePath)) || {};
    let room = roulette[roomName];
    if (room === null || room === undefined){
        chat.reply("방이 존재하지 않습니다.");
        return;
    }
    for (let key in roulette){
        let room = roulette[key];
        let user = room["user"];
        if (user.includes(username)){
            chat.reply("이미 참가했습니다.");
            return;
        }
    }
    if (room["user"].length >= 2){
        chat.reply("방이 꽉 찼습니다.");
        return;
    }
    let stake = room["stake"];
    let userPoint = JSON.parse(FS.read(pointPath)) || {};
    let point = userPoint[username] || 0;
    if (point < stake) {
        chat.reply("포인트가 부족합니다.");
        return;
    }
    room["user"].push(username);
    roulette[roomName] = room;
    FS.write(roulettePath, JSON.stringify(roulette));
    chat.reply("참가했습니다.");
    chat.reply("방장 : " + roomName + "\n" + "참가자 : " + room["user"].join(", ") + "\n" + "배팅금액 : " + stake + "P" + "\n" + "총알갯수 : " + room["bullet"] + "개");
}

function rouletteCancel(chat) {
    const username = chat.author.name;
    let roulette = JSON.parse(FS.read(roulettePath)) || {};
    for(let key in roulette){
        let room = roulette[key];
        let user = room["user"];
        if (user.includes(username)){
            user.splice(user.indexOf(username), 1);
            room["user"] = user;
            roulette[key] = room;
            FS.write(roulettePath, JSON.stringify(roulette));
            chat.reply("참가를 취소했습니다.");
            return;
        }
    }
    chat.reply("참가중인 방이 없습니다.");
}

function rouletteCancelRoom(chat) {
    const username = chat.author.name;
    let roulette = JSON.parse(FS.read(roulettePath)) || {};
    let room = roulette[username];
    if (room === null || room === undefined){
        chat.reply("방이 존재하지 않습니다.");
        return;
    }
    delete roulette[username];
    FS.write(roulettePath, JSON.stringify(roulette));
    chat.reply("방을 삭제했습니다.");
}

function rouletteStart(chat) {
    try {
        const username = chat.author.name;
        let roulette = JSON.parse(FS.read(roulettePath)) || {};
        let room = roulette[username];
        if (room === null || room === undefined){
            chat.reply("방이 존재하지 않습니다.");
            return;
        }
        let user = room["user"];
        if (user.length < 2){
            chat.reply("참가자가 부족합니다.");
            return;
        }
        let stake = room["stake"];
        let bullet = room["bullet"];

        let rouletteGame = JSON.parse(FS.read(rouletteGamePath)) || {};
        let game = rouletteGame[username];
        if (game !== undefined){
            chat.reply("이미 게임을 시작하셨습니다.");
            return;
        }
        let gun = [];
        for (let i = 0; i < 6; i++){
            gun.push(0);
        }
        let choice = getRandomItems([0, 1, 2, 3, 4, 5], bullet);
        for (let i = 0; i < choice.length; i++){
            gun[choice[i]] = 1;
        }

        game = {"user": user, "bullet": bullet, "stake": stake, "gun": gun, "turn": 0};
        rouletteGame[username] = game;
        FS.write(rouletteGamePath, JSON.stringify(rouletteGame));
        let rep = "🔫 러시안룰렛을 시작합니다. 🔫\n" + "방장 : " + username + "\n" + "참가자 : " + user.join(", ") + "\n" + "배팅금액 : " + stake + "P" + "\n" + "총알갯수 : " + bullet + "개";
        rep += "\n" + user.join(", ") + " 순서대로 [ 1발사 ]를 입력해 주십시오.";
        rep += "\n[" + user[0] + "] 님 차례입니다.";
        delete roulette[username];
        FS.write(roulettePath, JSON.stringify(roulette));
        chat.reply(rep);
    } catch (e) {
        chat.reply("오류가 발생했습니다.");
        chat.reply(e);
    }
}

function rouletteGame(chat) {
    const username = chat.author.name;
    let rouletteGame = JSON.parse(FS.read(rouletteGamePath)) || {};
    let roomName = "";
    for (let key in rouletteGame){
        let game = rouletteGame[key];
        let user = game["user"];
        if (user.includes(username)){
            roomName = key;
            break;
        }
    }
    if (roomName === ""){
        chat.reply("게임에 참가중이 아닙니다.");
        return;
    }
    let game = rouletteGame[roomName];
    let user = game["user"];
    let stake = game["stake"];
    let bullet = game["bullet"];
    let gun = game["gun"];
    let turn = game["turn"];
    if (user[turn] !== username){
        chat.reply("차례가 아닙니다.");
        return;
    }

    if (gun[0] === 1){
        chat.reply("펑!");
        let rouletteGame = JSON.parse(FS.read(rouletteGamePath)) || {};
        delete rouletteGame[roomName];
        FS.write(rouletteGamePath, JSON.stringify(rouletteGame));
        let userPoint = JSON.parse(FS.read(pointPath)) || {};
        let point = userPoint[username] || 0;
        point -= stake;
        userPoint[username] = point;
        let winner = user[(turn + 1) % user.length];
        let winnerPoint = userPoint[winner] || 0;
        winnerPoint += stake;
        userPoint[winner] = winnerPoint;
        let rouletteResult = JSON.parse(FS.read(rouletteResultPath)) || {};
        let winnerResult = rouletteResult[winner] || 0;
        winnerResult++;
        rouletteResult[winner] = winnerResult;
        let attempt = [];
        for (let i = 0; i < user.length; i++){
            let userAttempt = increaseAttemptByName(user[i]);
            attempt.push({"user": user[i], "attempt": userAttempt});
        }
        FS.write(rouletteResultPath, JSON.stringify(rouletteResult));
        FS.write(pointPath, JSON.stringify(userPoint));
        chat.reply( "🔫 러시안룰렛 결과 🔫" + winner + "님 승리!" + "\u200b".repeat(500) + username + "님 현재 포인트 : " + point + "P" + "( -" + stake + "P )\n" +
            winner + "님 현재 포인트 : " + winnerPoint + "P" + "( +" + stake + "P )");
    }else {
        gun.shift();
        gun.push(0);
        game["gun"] = gun;
        game["turn"] = (turn + 1) % user.length;
        rouletteGame[roomName] = game;
        FS.write(rouletteGamePath, JSON.stringify(rouletteGame));
        chat.reply("찰칵");
        chat.reply("[ " + user[game["turn"]] + " ] 님 차례입니다.");
    }
}

function rouletteGameQuit(chat) {
    const username = chat.author.name;
    let rouletteGame = JSON.parse(FS.read(rouletteGamePath)) || {};
    let game = rouletteGame[username];
    if (game === null || game === undefined){
        chat.reply("게임에 참가중이 아닙니다.");
        return;
    }
    delete rouletteGame[username];
    FS.write(rouletteGamePath, JSON.stringify(rouletteGame));
    chat.reply("게임을 종료했습니다.");
}

function rouletteList(chat) {
    let roulette = JSON.parse(FS.read(roulettePath)) || {};
    let rep = "방 목록\n";
    for (let key in roulette){
        let room = roulette[key];
        rep += "방장 : " + key + "\n" + "참가자 : " + room["user"].join(", ") + "\n" + "배팅금액 : " + room["stake"] + "P" + "\n" + "총알갯수 : " + room["bullet"] + "개\n";
    }
    chat.reply(rep);
}

function rouletteRecord(chat) {
    let rouletteResult = JSON.parse(FS.read(rouletteResultPath)) || {};
    let record = [];
    for (let key in rouletteResult){
        record.push({"user": key, "count": rouletteResult[key]});
    }
    record.sort((a, b) => b.count - a.count);
    let rep = "룰렛 전적\n";
    for (let i = 0; i < record.length; i++){
        rep += (i + 1) + "위: " + record[i].user + " - " + record[i].count + "승\n";
    }
    chat.reply(rep);
}

function getRandomItems(arr, num) {
    // 원본 배열의 복사본 생성
    var copy = arr.slice();
    var result = [];
    var len = copy.length;

    // num이 배열의 길이보다 크면 배열의 길이로 제한
    num = Math.min(num, len);

    for (var i = 0; i < num; i++) {
        var randomIndex = Math.floor(Math.random() * (len - i));
        result.push(copy[randomIndex]);
        // 선택된 요소를 배열의 마지막 요소와 교환
        var temp = copy[randomIndex];
        copy[randomIndex] = copy[len - 1 - i];
        copy[len - 1 - i] = temp;
    }

    return result;
}



function slotMachine(chat) {
    try {
        const user = chat.author.name;
        let totalPoint = JSON.parse(FS.read(pointPath)) || {};
        let coolTime = JSON.parse(FS.read(coolTimePath)) || {};
        let point = totalPoint[user] || 0;
        let lastTime = coolTime[user] || 0;
        const currentTime = new Date().getTime();
        if (currentTime - lastTime < 60000) {
            const remain = 60 - Math.floor((currentTime - lastTime) / 1000);
            chat.reply("쿨타임이 남았습니다. " + remain + "초 후에 다시 시도해주세요.");
            return;
        }
        if (!checkAttempt(chat)) {
            return;
        }
        const price = 500;
        if (point < price) {
            chat.reply("포인트가 부족합니다.");
            return;
        }
        point -= price;
        let attempt = JSON.parse(FS.read(slotPath)) || {};
        let userAttempt = attempt[user] || 0;
        let max = 5 - Math.floor(userAttempt / 16);
        const slot = [getRandom(0, max), getRandom(0, max), getRandom(0, max)];
        let flag = false;
        let lucky = false;
        if (slot[0] === slot[1] && slot[1] === slot[2]) {
            flag = true;
            if (slot[0] === 5) {
                lucky = true;
                point += 100000;
            }else {
                point += 15000;
            }
        }
        const fruit = ["🍒", "🍋", "🍇", "🍉", "🍊", "🌟"];
        const result = slot.map((value) => fruit[value]);

        let dialog1;
        let dialog2;
        if(flag){
            if(lucky) {
                dialog1 = "🎉 대박! 🎉";
            }else {
                dialog1 = "🎉 당첨! 🎉";
            }
        }else {
            dialog1 = "❌️꽝!";
        }
        if(flag){
            if(lucky) {
                dialog2 = "( + 100000P )";
            }else {
                dialog2 = "( +15000P )";
            }
        }else {
            dialog2 = "( -500P )";
        }
        const todayCount = increaseAttempt(chat);
        const rep = "🎰 " + user + "님의 슬롯머신 결과 🎰\n" + result.join("┃") + "\n" + dialog1 + "\u200b".repeat(500) +
            "\n\n현재 포인트 : " + point + "P " + dialog2 + "\n오늘 남은 시도 횟수 : " + (10 - todayCount) + "회";
        chat.reply(rep);
        totalPoint[user] = point;
        coolTime[user] = currentTime;
        userAttempt++;
        if(flag){
            userAttempt = 0;
        }
        attempt[user] = userAttempt;
        FS.write(slotPath, JSON.stringify(attempt));
        FS.write(coolTimePath, JSON.stringify(coolTime));
        FS.write(pointPath, JSON.stringify(totalPoint));
    }catch (e) {
        chat.reply("오류가 발생했습니다.");
        chat.reply(e);
    }
}

function dice(chat) {
    const username = chat.author.name;
    const dealer = getRandom(1, 6);
    const user = getRandom(1, 6);
    const userDice = username + " : 🎲" + user;
    const dealerDice = "딜러 : 🎲" + dealer;
    let result;
    let increaseFlag = false;
    if (dealer === user) {
        result = "📜 " + username + "님의 주사위 결과 📜\n" + userDice + "  VS  " + dealerDice + "\n비겼습니다. 다시 굴립니다.";
        chat.reply(result);
        dice(chat);
    }else if(dealer > user) {
        increaseFlag = true;
        let diceStake = JSON.parse(FS.read(dicePath)) || {};
        let userStake = diceStake[username] || {};
        let userDec = userStake["point"] || 0;
        let totalPoint = JSON.parse(FS.read(pointPath)) || {};
        let userPoint = totalPoint[username] || 0;
        userPoint -= userDec;
        totalPoint[username] = userPoint;
        FS.write(pointPath, JSON.stringify(totalPoint));
        result = "📜 " + username + "님의 주사위 결과 📜\n" +
            userDice + "  VS  " + dealerDice +
            "\n딜러 승리!" + "\u200b".repeat(500) +
            "\n현재 포인트 : " + userPoint + "P ( -" + userDec + "P )";
        chat.reply(result);
    }else if(dealer < user) {
        increaseFlag = true;
        let diceStake = JSON.parse(FS.read(dicePath)) || {};
        let userStake = diceStake[username] || {};
        let userInc = userStake["point"] || 0;
        let totalPoint = JSON.parse(FS.read(pointPath)) || {};
        let userPoint = totalPoint[username] || 0;
        userPoint += userInc;
        totalPoint[username] = userPoint;
        FS.write(pointPath, JSON.stringify(totalPoint));
        result = "📜 " + username + "님의 주사위 결과 📜\n" +
            userDice + "  VS  " + dealerDice +
            "\n" + username + "님 승리!" + "\u200b".repeat(500) +
            "\n현재 포인트 : " + userPoint + "P ( +" + userInc + "P )";
        chat.reply(result);
    }
    if (increaseFlag) {
        let attempt = JSON.parse(FS.read(attemptPath)) || {};
        let today = new Date().toLocaleDateString();
        let todayAttempt = attempt[today] || {};
        let count = todayAttempt[username] || 0;
        count++;
        todayAttempt[username] = count;
        attempt[today] = todayAttempt;
        FS.write(attemptPath, JSON.stringify(attempt));
        let diceStake = JSON.parse(FS.read(dicePath)) || {};
        diceStake[username] = null;
        FS.write(dicePath, JSON.stringify(diceStake));
        chat.reply("오늘 " + count + "회째 이용하셨습니다.\n" + "현재 남은 이용 횟수 : " + (10 - count) + "회")

    }
}

function diceStake(chat) {
    chat.reply("주사위 게임을 시작합니다.\n" + "포인트를 걸어주세요.\n" + "명령어 : [ 1판돈설정 포인트 ]\n" + "ex ) 1판돈설정 100\n" + "최소 100포인트부터 가능합니다.");
    chat.reply("판돈 모드를 해제하시려면 1판돈해제를 입력해주세요.");
    let diceStake = JSON.parse(FS.read(dicePath)) || {};
    let user = chat.author.name;
    let userStake = diceStake[user] || {};
    let userPoint = userStake["point"] || 0;
    let stakeFlag = userStake["stakeFlag"] || false;
    stakeFlag = true;
    diceStake[user] = {"point": userPoint, "stakeFlag": stakeFlag};
    FS.write(dicePath, JSON.stringify(diceStake));
}

function diceCheck(chat) {
    let diceStake = JSON.parse(FS.read(dicePath)) || {};
    let user = chat.author.name;
    let userStake = diceStake[user] || {};
    let userPoint = userStake["point"] || 0;
    let totalMoney = JSON.parse(FS.read(pointPath)) || {};
    let userMoney = totalMoney[user] || 0;
    let stakeFlag = userStake["stakeFlag"] || false;
    if (!stakeFlag) {
        chat.reply("주사위 게임을 활성화 하지 않았습니다.");
        return;
    }
    if (!checkAttempt(chat)) {
        return;
    }
    let msg = chat.content;
    let point = parseInt(msg.split(" ")[1]);
    if (isNaN(point)) {
        chat.reply("숫자만 입력해주세요.");
        return;
    }
    if (point < 100) {
        chat.reply("최소 100포인트부터 가능합니다.");
        return;
    }
    if (point > userMoney) {
        chat.reply("포인트가 부족합니다.");
        return;
    }
    userPoint = point;
    userStake = {"point": userPoint, "stakeFlag": true};
    diceStake[user] = userStake;
    FS.write(dicePath, JSON.stringify(diceStake));
    dice(chat);
}

function diceCancel(chat) {
    let diceStake = JSON.parse(FS.read(dicePath)) || {};
    let user = chat.author.name;
    if (!diceStake[user]["stakeFlag"]) {
        chat.reply("주사위 게임을 활성화 하지 않았습니다.");
        return;
    }
    diceStake[user] = null;
    FS.write(dicePath, JSON.stringify(diceStake));
    chat.reply("주사위 게임을 해제했습니다.");
}



function rockPaperScissors(chat) {
}


function ladder(chat) {

}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkAttempt(chat) {
    const today = new Date().toLocaleDateString();
    const attempt = JSON.parse(FS.read(attemptPath)) || {};
    let todayAttempt = attempt[today] || {};
    let count = todayAttempt[chat.author.name] || 0;
    if (count >= 10) {
        chat.reply("하루 10회만 이용 가능합니다.");
        return false;
    }
    return true;
}

function increaseAttempt(chat) {
    const today = new Date().toLocaleDateString();
    const attempt = JSON.parse(FS.read(attemptPath)) || {};
    let todayAttempt = attempt[today] || {};
    todayAttempt[chat.author.name] = (todayAttempt[chat.author.name] || 0) + 1;
    attempt[today] = todayAttempt;
    FS.write(attemptPath, JSON.stringify(attempt));
    return todayAttempt[chat.author.name];
}

function increaseAttemptByName(name) {
    const today = new Date().toLocaleDateString();
    const attempt = JSON.parse(FS.read(attemptPath)) || {};
    let todayAttempt = attempt[today] || {};
    todayAttempt[name] = (todayAttempt[name] || 0) + 1;
    attempt[today] = todayAttempt;
    FS.write(attemptPath, JSON.stringify(attempt));
    return todayAttempt[name];
}

function lose(chat, amount) {
    let point = JSON.parse(FS.read(pointPath)) || {};
    let user = chat.author.name;
    let userPoint = point[user] || 0;
    userPoint -= amount;
    point[user] = userPoint;
    FS.write(pointPath, JSON.stringify(point));
    return userPoint;
}

function win(chat, amount) {
    let point = JSON.parse(FS.read(pointPath)) || {};
    let user = chat.author.name;
    let userPoint = point[user] || 0;
    userPoint += amount;
    point[user] = userPoint;
    FS.write(pointPath, JSON.stringify(point));
    return userPoint;
}

function diceMultiRoom(chat) {
    const username = chat.author.name;
    if (!checkAttempt(chat)){
        return;
    }
    let stake = chat.content.split(" ")[1];
    if (isNaN(stake)) {
        chat.reply("숫자만 입력해주세요.");
        return;
    }
    stake = parseInt(stake);
    if (stake < 100) {
        chat.reply("최소 100포인트부터 가능합니다.");
        return;
    }
    let userPoint = JSON.parse(FS.read(pointPath)) || {};
    let point = userPoint[username] || 0;
    if (point < stake) {
        chat.reply("포인트가 부족합니다.");
        return;
    }
    let diceMul = JSON.parse(FS.read(diceMulPath)) || {};
    let room = diceMul[username];
    if (room !== undefined){
        chat.reply("이미 방을 만드셨습니다.");
        return;
    }
    room = {};
    room["stake"] = stake;
    room["user"] = [];
    room["user"].push(username);
    diceMul[username] = room;
    FS.write(diceMulPath, JSON.stringify(diceMul));
    chat.reply("방을 만들었습니다.\n" + "방에 입장하려면 1주멀참가 [방장이름]을 입력해주세요.");
}

function diceMulAttend(chat) {
    const username = chat.author.name;
    if (!checkAttempt(chat)){
        return;
    }
    const roomName = chat.content.split(" ")[1];
    let diceMul = JSON.parse(FS.read(diceMulPath)) || {};
    let room = diceMul[roomName];
    if (room === null || room === undefined){
        chat.reply("방이 존재하지 않습니다.");
        return;
    }
    let user = room["user"];
    if (user.includes(username)){
        chat.reply("이미 참가하셨습니다.");
        return;
    }
    let stake = room["stake"];
    let userPoint = JSON.parse(FS.read(pointPath)) || {};
    let point = userPoint[username] || 0;
    if (point < stake) {
        chat.reply("포인트가 부족합니다.");
        return;
    }
    user.push(username);
    room["user"] = user;
    diceMul[roomName] = room;
    FS.write(diceMulPath, JSON.stringify(diceMul));
    chat.reply("참가했습니다.");
    chat.reply("방장: " + roomName + "\n" + "참가자: " + user.join(", ") + "\n" + "배팅금액: " + stake + "포인트");
}

function diceMulCancel(chat) {
    const username = chat.author.name;
    let diceMul = JSON.parse(FS.read(diceMulPath)) || {};
    for(let key in diceMul){
        let room = diceMul[key];
        let user = room["user"];
        if (user.includes(username)){
            user.splice(user.indexOf(username), 1);
            room["user"] = user;
            diceMul[key] = room;
            FS.write(diceMulPath, JSON.stringify(diceMul));
            chat.reply("참가를 취소했습니다.");
            return;
        }
        chat.reply("방이 존재하지 않습니다.");
    }
}

function diceMulCancelRoom(chat) {
    const username = chat.author.name;
    let diceMul = JSON.parse(FS.read(diceMulPath)) || {};
    let room = diceMul[username];
    if (room === undefined || room === null){
        chat.reply("방이 존재하지 않습니다.");
        return;
    }
    delete diceMul[username];
    FS.write(diceMulPath, JSON.stringify(diceMul));
    chat.reply("방을 삭제했습니다.");
}

function diceMulStart(chat) {
    const username = chat.author.name;
    let diceMul = JSON.parse(FS.read(diceMulPath)) || {};
    let room = diceMul[username];
    if (room === undefined || room === null){
        chat.reply("방이 존재하지 않습니다.");
        return;
    }
    let user = room["user"];
    if (user.length < 2){
        chat.reply("참가자가 부족합니다.");
        return;
    }
    let stake = room["stake"];
    let prize = stake * user.length;
    let totalPoint = JSON.parse(FS.read(pointPath)) || {};
    let point = {};
    user.forEach(e => point[e] = totalPoint[e] - stake);
    let result = {};
    user.forEach(e => result[e] = getRandom(1, 6));
    let max = 0;
    let winner = [];
    for (let key in result){
        if (result[key] > max){
            max = result[key];
            winner = [key];
        }else if(result[key] === max){
            winner.push(key);
        }
    }
    let diceMulResult = JSON.parse(FS.read(diceMulResultPath)) || {};
    for(let winnerName of winner){
        let winnerResult = diceMulResult[winnerName] || 0;
        winnerResult++;
        diceMulResult[winnerName] = winnerResult;
    }
    FS.write(diceMulResultPath, JSON.stringify(diceMulResult));
    let rep = "🎲주사위 멀티 결과🎲\n\n";
    user.forEach(e => rep += e + ": 🎲" + result[e] + "\n");
    rep += "\n";
    if (winner.length > 1) {
        rep += "동점자가 있습니다.\n";
        winner.forEach(e => rep += e + " ");
        rep += "님의 승리입니다.\n";
        winner.forEach(e => point[e] += Math.floor(prize / winner.length));
        rep += "상금 " + Math.floor(prize / winner.length) + "포인트를 받았습니다.";
    }else {
        rep += winner[0] + "님의 승리입니다.\n";
        point[winner[0]] += prize;
        rep += "상금 " + prize + "포인트를 받았습니다.";
    }
    user.forEach(e => rep += "\n" + e + "님의 현재 포인트 : " + point[e] + "포인트");
    for (let i = 0; i < user.length; i++){
        const todayAttempt = increaseAttemptByName(user[i]);
        rep += "\n\n" + user[i] + "님은 오늘 " + todayAttempt + "회째 이용하셨습니다.";
        rep += "\n" + "현재 남은 이용 횟수 : " + (10 - todayAttempt) + "회";
    }
    chat.reply(rep);
    user.forEach(e => totalPoint[e] = point[e]);
    FS.write(pointPath, JSON.stringify(totalPoint));
    delete diceMul[username];
    FS.write(diceMulPath, JSON.stringify(diceMul));
}

function diceMulRecord(chat) {
    let diceMulResult = JSON.parse(FS.read(diceMulResultPath)) || {};
    let rep = "🎲주사위 멀티 전적🎲\n\n";
    let record = [];
    for (let key in diceMulResult){
        record.push({name: key, result: diceMulResult[key]});
    }
    record.sort((a, b) => b.result - a.result);
    for (let i = 0; i < record.length; i++){
        rep += "[" + (i + 1) + "] " + record[i].name + " - " + record[i].result + "승\n";
    }
    chat.reply(rep);
}

function diceMulList(chat) {
    let diceMul = JSON.parse(FS.read(diceMulPath)) || {};
    let rep = "🎲주사위 멀티 방 목록🎲\n\n";
    let count = 0;
    for (let key in diceMul){
        let room = diceMul[key];
        count++;
        rep += "[" + count + "] " + "\n";
        rep += "방장: " + key + "\n";
        rep += "참가자: " + room["user"].join(", ") + "\n";
        rep += "배팅금액: " + room["stake"] + "포인트\n\n";
    }
    chat.reply(rep);
}

function deleteDiceMul(chat) {
    const username = chat.author.name;
    if (!admin.includes(username)){
        chat.reply("권한이 없습니다.");
        return;
    }
    const diceMul = JSON.parse(FS.read(diceMulPath));
    if (diceMul){
        FS.remove(diceMulPath);
    }
}

function havocStat(chat) {
    const username = chat.author.name;
    if (!admin.includes(username)){
        chat.reply("권한이 없습니다.");
        return;
    }
    const monthlyToken = JSON.parse(FS.read(monthlyTokenPath)) || {};
    let rep = "📈 하복이 통계 📈\n\n";
    for (let key in monthlyToken){
        const price = (0.000005 * monthlyToken[key]['input'] + 0.000015 * monthlyToken[key]['output']).toFixed(7);
        rep += key + " - " + price + "달러\n\n";
    }
    chat.reply(rep);
}

function deleteStat(chat) {
    const username = chat.author.name;
    if (!admin.includes(username)){
        chat.reply("권한이 없습니다.");
        return;
    }
    const monthlyToken = JSON.parse(FS.read(monthlyTokenPath));
    if (monthlyToken !== undefined){
        FS.remove(monthlyTokenPath);
    }
}

const normalize = (chat) => {
    if (!admin.includes(chat.author.name)){
        chat.reply("권한이 없습니다.");
        return;
    }
    let point = JSON.parse(FS.read(pointPath));
    for (let key in point){
        if (point[key] === null || point[key] === undefined){
            chat.reply(key + " : " + point[key]);
            point[key] = 0;
            chat.reply(key + " : " + point[key]);
        }else if (isNaN(point[key])){
            chat.reply(key + " : " + point[key]);
            let tmp = point[key];
            point[key] = parseInt(tmp.replace(/[^0-9]/g, ""));
            chat.reply(key + " : " + point[key]);
        }
    }
    FS.write(pointPath, JSON.stringify(point));
}

const givePoint = () => {

}



bot.addListener(Event.MESSAGE, onMessage);


