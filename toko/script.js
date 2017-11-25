var cards = [];
var captainCards = [];
var currentCard;
var currentCaptainCard;
var url = "https://script.google.com/macros/s/AKfycbz0LvYgFR8Jub4mbJQfLzTvksHO7fjTc2tATfdEiX2168vf6mc/exec";
var Card = function (text) {
    this.text = text;
};

function loadCards() {
    $.getJSON(url, function (data) {
        for (var i = 0; i < data.length; i++) {
            var obj = JSON.parse(data[i]);
            if (obj["possibleValues"].length === 0) {
                cards.push(new Card(obj["text"]));
                console.log(obj["text"])
            } else {
                for (var j = 0; j < obj["possibleValues"].length; j++) {
                    var text = obj["text"].replace(/\sX\s/ig, " x ").replace(/\sx\s/ig, " " + obj["possibleValues"][j] + " ");
                    cards.push(new Card(text))
                }
            }
        }
        getNextCard();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + errorThrown.toString());
    })
}

function loadCaptainCards() {
    $.getJSON(url + "?captain=true", function (data) {
        for (var i = 0; i < data.length; i++) {
            var obj = JSON.parse(data[i]);
            if (obj["possibleValues"].length === 0) {
                cards.push(new Card(obj["text"]));
                console.log(obj["text"])
            } else {
                for (var j = 0; j < obj["possibleValues"].length; j++) {
                    var text = obj["text"].replace(/\sX\s/ig, " x ").replace(/\sx\s/ig, " " + obj["possibleValues"][j] + " ");
                    cards.push(new Card(text))
                }
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + errorThrown.toString());
    })
}

function getNextCaptainCard() {
    if (captainCards.length === 0) {
        console.log("can't load cards")
    }
    currentCaptainCard = captainCards[randomIntBetween(0, cards.length-1)];

    $('#cardText').text(currentCaptainCard.text);
}

function getNextCard() {
    if (cards.length === 0) {
        console.log("can't load cards")
    }
    currentCard = cards[randomIntBetween(0, cards.length-1)];

    $('#cardText').text(currentCard.text);
}

function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

$(function () {
    console.log("ready");
    loadCaptainCards();
    loadCards();
});

