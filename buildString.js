/**
 * =========================================================================================
 * hachiware_validator
 * 
 * nput validation for Node.js.
 * 
 * License : MIT License. 
 * Since   : 2022.01.08
 * Author  : Nakatsuji Masato 
 * GitHub  : https://github.com/masatonakatsuji2021/hachiware_validator
 * npm     : https://www.npmjs.com/package/hachiware_validator
 * =========================================================================================
 */

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