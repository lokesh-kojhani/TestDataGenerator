var casual = require('casual').en_US;
var fs = require('fs-extra');
/**
 * 
 */
let template = JSON.parse(fs.readFileSync('templates/template1.json')) || {};

/***
 * Read the DataSet from settings.json file;
 * It will allow to control the number of datasets.
 * If there is no "DataSet" defined, default value is 5.
 */
let _settings = JSON.parse(fs.readFileSync('settings.json'));
let length = _settings.DataSet || 5
let result = []; // Array to store the result set.

function main() {
    // Let's define custom generator over here, these generators will be used later in this code.
    casual.define('service_description', function() {
        let servicedescription = JSON.parse(fs.readFileSync('templates/service_description.json')) || [];
        if (servicedescription.length > 0)
        {
            return casual.random_element(servicedescription);
        }
        else
        {
            return string.empty;
        }
    });
    casual.define('currency', function() {
        return casual.random_element(["USD", "CAD", "GBP"])
    });
    casual.define('performed_by', function() {
        let titles = ["Dr.", ""]
        let performedby = casual.random_element(titles) + casual.populate(' {{full_name}}');
        return performedby.trim();
    });

    /* Okay, we are all set to generate the test data.
    
    */
    for (let index = 0; index < length; index++) {
        let tempObject = {};
        for (key in template) {
            /**
             * 
             */
            try{
                /* Get the value of individual key from template, because they are mapped one-one with either custom generator or casual fields.
                Once you have the value, build a string with casual syntax

                e.g
                if the value is first_name, it will build following to get random first name
                casual.first_name

                for custome genertor, it will casual.[function name]
                */
                let _casualstring = "".concat('casual.',template[key] === ""? "catch_phrase" : template[key]) //Failsafe, if there is no response from eval function, set a random catch phrase.
                tempObject[key]  = eval(_casualstring); //evalute casual string to get the value
                result.push(tempObject); // push the temp object to results array.
            }
            catch(ex){
                console.error("exception occurred, please check the values in the template file.",ex);
            }
    }

    }
    console.log(result);

    // Let's create the file
    fs.writeFile ("TestData.json", JSON.stringify(result, null, 4), function(err) {
        if (err)
            console.error("TestData.json exists, please delete it first.");
        else
            console.log('complete');
        }
    );
  }
  
  if (require.main === module) {
    main();
  }