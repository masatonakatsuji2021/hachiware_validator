const validator = require("hachiware_validator");
const rules = require("./bin/rule.js");
const response = require("./bin/response.js");
const fs = require("fs");

module.exports = function(rootPath){

    var str = "";
    str += "const validator = " + validator.toString() + ";\n";
    str += "const ValidateRule = " + rules.toString() + ";\n";
    str += "const ValidatorResponse = " + response.toString() + ";\n"

    fs.writeFileSync(rootPath, str);
};