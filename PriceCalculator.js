// https://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it?rq=1
// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";

// The teams are simply JavaScript objects rather than using a database for this. This is simply just so I could show the use of objects in JS.

// Want to hide the paragraphs with the summary before we start
$('#ticket, #food, #drink, #total, #average, #resultsHeader').hide();

$('#aboutButton').on('click', function () {
    alert("Calculate the price of supporting your team through the year! \n\nPartially inspired by the BBC.\n\nThis was created entirely with JavaScript, read the source for more :-).")
});

// Button click handeler. Honestly, it's just so much easier in jQuery!
$('#submitButton').on('click', function () {
    // Instantiate the class, and then get the values the user has input.
    var calc = new calculator();
    var numberOfGames = $('#numberOfGames').val();
    var amountOfFood = $('#amountOfFood').val();
    var amountOfDrink = $('#amountOfDrink').val();
    var team = $('#team').val();

    // Call the class function with the approptiate correct parameters
    calc.calculate(team, numberOfGames, amountOfFood, amountOfDrink);
});

// This is a 'class'
var calculator = function () {
    var that = this; // some people write this as var self = this; - this is used to keep a scope to the calling object

    // The main calculation part used by calling calculator.calculate('string of team name', number, number, number);
    that.calculate = function (team, numberOfGames, amountOfFood, amountOfDrink) {

        if (numberOfGames < 0 || amountOfDrink < 0 || amountOfFood < 0) { return false; }
        var chosen = getTeam(team);
        var gameCost = numberOfGames * chosen.ticket;

        // These check if the number of games is greater than 0 and the amount is not 0 (loosley check this also accounts for null etc.). 
        // If # of games > 0 then times the price by the amount, then this by the number of games
        // Otherwise if the number of games is 0, then the food/drink is then times by the amount.
        var foodCost = (numberOfGames > 0 && amountOfFood != 0) ? (chosen.food * amountOfFood) * numberOfGames : chosen.food * amountOfFood;

        var drinkCost = (numberOfGames > 0 && amountOfDrink != 0) ? (chosen.drink * amountOfDrink) * numberOfGames : chosen.drink * amountOfDrink;

        var totalCost = gameCost + foodCost + drinkCost;

        var averageCost = totalCost / numberOfGames;

        $('#total').show(function () {
            // mixing jQuery with vanilla JS :-)
            document.getElementById('totalCost').innerHTML = "&pound;" + totalCost;
        });

        $('#ticket').show(function () {
            document.getElementById('ticketCost').innerHTML = "&pound;" + chosen.ticket;
        });

        $('#drink').show(function () {
            document.getElementById('drinkCost').innerHTML = "&pound;" + chosen.drink;
        });

        $('#food').show(function () {
            document.getElementById('foodCost').innerHTML = "&pound;" + chosen.food;
        });

        $('#supportedTeam').show(function () {
            document.getElementById('supportedTeam').innerHTML = "You chosen team is " + team;
        });

        $('#average').show(function () {
            document.getElementById('averageCost').innerHTML = "&pound;" + averageCost;
        });

        $('#resultsHeader').show();
    }

    // This is where it gets the costs for each team. This could be stored in a database with a POST to get the values.
    // but as said above I wanted just a pure JS approach.
    // Parameter of string of which team to find and return. 
    // Using var here to make this a private method, since I don't want people to be able to use this out of the class.
    var getTeam = function (team) {
        var chosen;
        switch (team) {
            // Obviously none of these prices are accurate!
            case 'Manchester':
                chosen = {
                    ticket: 30,
                    food: 5,
                    drink: 5
                };
                break;

            case 'Liverpool':
                chosen = {
                    ticket: 10,
                    food: 8,
                    drink: 2
                };
                break;

            case 'Cardiff':
                chosen = {
                    ticket: 15,
                    food: 6,
                    drink: 5
                };
                break;

            case 'Swansea':
                chosen = {
                    ticket: 10,
                    food: 5,
                    drink: 10
                };
                break;

            default:
                // Should never be hit (since all these options should be in the dropdown!), but its for the best!
                return;
                break;
        }

        return chosen;
    };
}
