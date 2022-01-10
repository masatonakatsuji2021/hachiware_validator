const validator = require("hachiware_validator");
const rules = require("./bin/rule.js");
const response = require("./bin/response.js");
const fs = require("fs");

module.exports = function(){

    var str = "";
    str += "const HachiwareValidator = " + validator.toString() + ";\n";
    str += "const HachiwareValidatorRule = " + rules.toString() + ";\n";
    str += "const HachiwareValidatorResponse = " + response.toString() + ";\n"

    return str;
};