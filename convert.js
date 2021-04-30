// import the array of symbols
const alphabet = require("./alphabet")

// this function converts a passed string of text into numbers
var convertStringToNumbers = function(inputString) {
    var letters = alphabet.AlphabetList;
    
    // split every letter of string into array
    var inputArray = inputString.split("");
    console.log(inputArray);
    
    // declare an output string
    var outputString = "";
    
    for (let letter of inputArray)
    {
        // check that the symbol is actually included in the symbol array
        if(letters.includes(letter))
        {
            // get the number by searching the array for the symbol,
            // and returning the index
            var convertedNumber = letters.indexOf(letter).toString();
            
            // add a zero to the end if index is only 1 digit long
            if(convertedNumber.length == 1)
            {
                convertedNumber = "0".concat(convertedNumber);
            }
            
            // concatenate the number into the output string
            outputString = outputString.concat(convertedNumber);
        }

    }
    return outputString;
};

// this converts a passed string of numbers into text
var convertNumbersToString = function(inputString) {
    var letters = alphabet.AlphabetList;
    
    // split every 2 numbers into an array
    inputArray = inputString.match(/.{1,2}/g);
    console.log(inputArray);
    
    var outputString = "";
    for (let number of inputArray)
    {
        // check that the number exists, by comparing it to the length of the array
        if(letters.length >= number)
        {
            // get the right letter by returning the array's index corresponding
            // to the splitted number
            var convertedLetter = letters[parseInt(number)];
            
            // concatenate into output string
            outputString = outputString.concat(convertedLetter);
        }

    }
    return outputString;
};

exports.convertStringToNumbers = convertStringToNumbers;
exports.convertNumbersToString = convertNumbersToString;
