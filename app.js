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
            if(name == "☁ get new line")
            {   
                if(keyword !== "")
                {
                    var text = convert.convertNumbersToString(keyword);
                    var isArticle = false;

                    wiki()
                    .page(text)
                    .then(page => page.summary())
                    .then(function(pageSummary){
                        isArticle = true;
                        var summary = "";
                        var sentenceArray = pageSummary.split(".");
                        var editedSentence = "";
                        for (var i = 0; summary.length < 330; i++)
                        {
                            if(sentenceArray[i] == undefined)
                            {
                                break;
                            }
                            else if (sentenceArray[i].length + summary.length > 330)
                            {
                                break;
                            }
                            else
                            {
                                editedSentence = sentenceArray[i]
                                if(sentenceArray[i].substring(0,1) !== " ")
                                {
                                    editedSentence = " " + sentenceArray[i];
                                }
                                summary = summary.concat(editedSentence + ".");
                            }
                            
                        }
                        console.log(summary);
                        cloudControl.setCloudVariable(cloud, summary);
                    
                    })
                    .catch(setTimeout(() => { 
                        if(isArticle == false)
                        {
                            cloudControl.setCloudVariable(cloud, "Sorry, I couldn't find an article of that. Try something else."); 
                        } 
                        
                    }, 2000));
                    
                }

            }
            
          });
    });
});

