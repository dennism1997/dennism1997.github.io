var cards = [];
var currentCard;
var url = "https://script.googleusercontent.com/macros/echo?user_content_key=90i1qC32R8b3dW5D9SZwmnzkjxiZ60L8VR9EOKxDfWJFCUj4Y9OD3KK4cEoEeRFjKIOkvKBPhOcBEtYSQw1USIrz-qU15sxbm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDXz6AdXwcYUEn5ETzIlFMtC29csn6VMVGJaySZF2ld3c5Fkl1iEcbXHMZAlQ0iUVUqhI51p3q1_&lib=Mkf6MsqJjED1JJRRQW3Ecy0T5On9ab5Tj";
var Card = function (text) {
    this.text = text;
};

function loadCards() {
    $.getJSON(url, function (data) {
        for (var i = 0; i < data.length; i++) {
            var obj = JSON.parse(data[i]);
            if(obj["possibleValues"].length === 0) {
                cards.push(new Card(obj["text"]));
                console.log(obj["text"])
            } else {
                for(var j = 0; j < obj["possibleValues"].length ; j++) {
                    var text = obj["text"].replace(/\sX\s/ig, " x ").replace(/\sx\s/ig, " " + obj["possibleValues"][j] + " ");
                    console.log(text);
                    cards.push(new Card(text))
                }
            }
        }
        getNextCard();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + errorThrown.toString());
    })
}


function getNextCard() {
    if (cards.length === 0) {
        console.log("can't load cards")
    }
    currentCard = cards[randomIntBetween(0, cards.length)];

    $('#cardText').text(currentCard.text);
}

function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

$(function () {
    console.log("ready");
    loadCards();
});

