const convert = require("./convert")

var setCloudVariable = function(cloud, value) {
    // TO-DO: make this less bad and terrible
    // this script sets all the cloud variables to portions of the string after turning it into numbers
    // and lastly set update line to 1 so that scratch knows to update variables

    var variableName = "☁ input";
    var variableName2 = "☁ input2";
    var variableName3 = "☁ input3";
    var variableName4 = "☁ input4";
    
    var numberedValue = convert.convertStringToNumbers(value);

    cloud.set(variableName, numberedValue.substring(0, 256))
    cloud.set(variableName2, numberedValue.substring(256, 512))
    cloud.set(variableName3, numberedValue.substring(512, 768))
    cloud.set(variableName4, numberedValue.substring(768, 1024))
    
    var projectValue = cloud.get(variableName);
    var projectValue2 = cloud.get(variableName2);
    var projectValue3 = cloud.get(variableName3);
    var projectValue4 = cloud.get(variableName4);

    console.log(`${variableName} = ${projectValue}`);
    console.log(`${variableName2} = ${projectValue2}`);
    console.log(`${variableName3} = ${projectValue3}`);
    console.log(`${variableName4} = ${projectValue4}`);

    cloud.set("☁ update line", 1);
    
};

exports.setCloudVariable = setCloudVariable;