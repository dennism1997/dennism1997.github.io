// ==UserScript==
// @name        Ticketswap
// @namespace   dennismouwen.nl
// @include     https://www.ticketswap.nl/*
// @version     1
// @grant       none
// ==/UserScript==
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
console.log("script initialized");
var element = $('.counter-available').find('.counter-value');
// Make red, so we are sure we got the right element
element.css('background-color', 'red');

// Get the value of the element
var val = Number(element.text());
console.log("value found: " + val);

// If there are tickets available
if(val > 1) {
    //Open music video as alarm sound
    window.open("https://www.youtube.com/watch?v=kxopViU98Xo", "_blank", "width=200,height=200");
    //Bring window to front
    console.log("request window focus");
    window.focus();
} else {
    //Reload the page after 3 seconds
    setTimeout(function(){ window.location.reload(true); }, 5000);
}