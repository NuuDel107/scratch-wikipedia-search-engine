const alphabet = require("./alphabet")

var convertStringToNumbers = function(inputString) {
    var letters = alphabet.AlphabetList;
    var inputArray = inputString.split("");
    console.log(inputArray);
    var outputString = "";
    for (let letter of inputArray)
    {
        if(letters.includes(letter))
        {
            var convertedNumber = letters.indexOf(letter).toString();
            if(convertedNumber.length == 1)
            {
                convertedNumber = "0".concat(convertedNumber);
            }
            outputString = outputString.concat(convertedNumber);
        }

    }
    return outputString;
};

var convertNumbersToString = function(inputString) {
    var letters = alphabet.AlphabetList;
    inputArray = inputString.match(/.{1,2}/g);
    console.log(inputArray);
    
    var outputString = "";
    for (let number of inputArray)
    {
        if(letters.length >= number)
        {
            var convertedLetter = letters[parseInt(number)];
            outputString = outputString.concat(convertedLetter);
        }

    }
    return outputString;
};

exports.convertStringToNumbers = convertStringToNumbers;
exports.convertNumbersToString = convertNumbersToString;