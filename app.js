// The main entry point for the application

// Import libraries and declare some constants
var Scratch = require('scratch-api');
const cloudControl = require("./cloudcontrol");
const convert = require("./convert")
const wiki = require("wikijs").default;
var keyword = "";
var isInitialized = false;

// Load the UserSession with username and password
// Credentials are initialized in a prompt and then saved in .scratchSession file
Scratch.UserSession.load(function(err, user) {
    user.cloudSession(520880966, function(err, cloud) {
        cloud.on('set', function(name, value) {
            
            // save the keyword to a variable
            // also use it to display initialization
            if(name == "☁ keyword")
            {
                keyword = value;
                console.log("Keyword is: " + keyword);
                if(!isInitialized)
                {
                    console.log("initialized");
                    isInitialized = true;
                }
            }
            
            // when scratch requests for line refresh
            if(name == "☁ get new line")
            {   
                if(keyword !== "")
                {
                    // converts keyword to text
                    var text = convert.convertNumbersToString(keyword);
                    var isArticle = false;

                    // uses keyword to search wikipedia
                    wiki()
                    .page(text)
                    .then(page => page.summary())
                    .then(function(pageSummary){
                        
                        isArticle = true;
                        var summary = "";
                        
                        // split page summary into sentences by the period
                        var sentenceArray = pageSummary.split(".");
                        var editedSentence = "";
                        for (var i = 0; summary.length < 330; i++)
                        {
                            // if paragraph ends before speech bubble limit, break
                            if(sentenceArray[i] == undefined)
                            {
                                break;
                            }
                            // if sentences length + other sentences length is over speech bubble limit, break
                            else if (sentenceArray[i].length + summary.length > 330)
                            {
                                break;
                            }
                            else
                            {
                                // if there is no space after period, add one
                                editedSentence = sentenceArray[i]
                                if(sentenceArray[i].substring(0,1) !== " ")
                                {
                                    editedSentence = " " + sentenceArray[i];
                                }
                                
                                // add edited sentence to summary
                                summary = summary.concat(editedSentence + ".");
                            }
                            
                        }
                        
                        // send summary to the cloud variables
                        console.log(summary);
                        cloudControl.setCloudVariable(cloud, summary);
                    
                    })
                    
                    // if no article is found, display this
                    .catch(setTimeout(() => { 
                        // check for a confirmation variable
                        if(isArticle == false)
                        {
                            cloudControl.setCloudVariable(cloud, "Sorry, I couldn't find an article of that. Try something else."); 
                        } 
                    
                    // add a delay, so it doesn't get displayed before wikijs has time to load
                    }, 2000));
                    
                }

            }
            
          });
    });
});

