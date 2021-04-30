# Scratch Wikipedia Search Engine
## Scratch-project: https://scratch.mit.edu/projects/520880966/
## Information
This program uses the [scratch-api](https://www.npmjs.com/package/scratch-api) module for interfacing with Scratch
and the [wikijs](https://www.npmjs.com/package/wikijs) module to interface with Wikipedia.

In the Scratch project, user input is converted into numbers, and converted back into string in the Node.js-code.
This is because Scratch's cloud variables cannot be used to store letters.

The program then takes the user input and uses that as a keyword for the Wikipedia API.
It then returns a summary (basically the first paragraph) of the page and uses string splitting to
display as much of the text as possible in the Scratch side, without ending the sentence without a period.

The text is then converted into numbers, split into 4 different input variables and joined together in Scratch.
It's then converted back to letters and displayed in the cat's text bubble.
