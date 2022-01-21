/**
 * =========================================================================================
 * hachiware_validator
 * 
 * nput validation for Node.js.
 * 
 * License : MIT License. 
 * Since   : 2022.01.08
 * Author  : Nakatsuji Masato 
 * Email   : nakatsuji@teastalk.jp
 * HP URL  : https://hachiware-js.com/
 * GitHub  : https://github.com/masatonakatsuji2021/hachiware_validator
 * npm     : https://www.npmjs.com/package/hachiware_validator
 * =========================================================================================
 */

const HachiwareValidatorRule = require("./rule.js");
const HachiwareValidatorResponse = require("./response.js");

const validator = function(context){

    if(!context){
        context = {};
    }

    var _rules = {};

    const arrayShift = function(data){
        var result = [];
        for(var n = 1 ; n <data.length ; n++){
            result.push(data[n]);
        }
        return result;
    };

    /**
     * verify
     * @param {*} data 
     * @param {*} rules
     * @param {*} option 
     * @returns 
     */
    this.verify=function(data, rules, option){

        if(context.beforeValidate){
            context.beforeValidate(data, rules);
        }

        if(!option){
            option = {};
        }

        var targetRules = _rules;
        if(rules){
            targetRules = rules;
        }
        else{
            if(context.rules){
                targetRules = context.rules;
            }
        }

        var validateRule = new HachiwareValidatorRule(data);

        var resBuffer = {};

        var colum = Object.keys(targetRules);
        for(var n = 0 ; n < colum.length ; n++){

            var field = colum[n];
            var r_ = targetRules[field];

            var colum2 = Object.keys(r_);
            for(var n2 = 0 ; n2 < colum2.length ; n2++){

                var ruleField = colum2[n2];
                var rr_ = r_[ruleField];

                var rule = null;

                if(typeof rr_ == "string"){
                    var rr2_ = rr_.split("|");
                    var buff = [];

                    buff.push(rr2_[0]);

                    if(rr2_[1]){
                        var rr22_ = rr2_[1].split(",");
                        for(var n3 = 0 ; n3 < rr22_.length ; n3++){
                            buff.push(rr22_[n3]);
                        }
                    }

                    rule = {
                        rule: buff,
                    };
                }
                else if(typeof rr_ == "function"){

                    // funciton
                    rule = {
                        rule: [ rr_ ],
                    };
                }
                else if(typeof rr_ == "object"){

                    if(Array.isArray(rr_)){

                        // Array
                        rule = {
                            rule: rr_,
                        };
                    }
                    else{

                        // object
                        rule = rr_;
                    }
                }

                var ruleList = rule.rule;

                if(typeof ruleList == "string"){
                    ruleList = [ruleList];
                }
                
                var args = arrayShift(rule.rule);

                var jugement=true;
                if(typeof ruleList[0] === "function"){
                    jugement = ruleList[0](data[field], args);
                }
                else{
                    if(validateRule[ruleList[0]]){
                        jugement = validateRule[ruleList[0]](data[field], args);
                    }
                    else if(context[ruleList[0]]){
                        jugement = context[ruleList[0]](data[field], args);
                    }    
                }

                var message = rule.message;
                if(!message){
                    var ruleStr="";
                    var argStr = "";

                    if(typeof ruleList[0] === "function"){
                        ruleStr = "rule=[FUNCTION]";
                    }
                    else{
                        ruleStr = "rule=" + ruleList[0].toString() + "";
                    }
                    
                    if(args.length){
                        var argStr = " args=[";
                        for(var n = 0 ; n < args.length ; n++){
                            if(n != 0){
                                argStr += ", ";
                            }
                            argStr += args[n];
                        }
                        argStr += "]";
                    }

                    message = "index=" + ruleField + ", " + ruleStr + argStr;
                }

                if(!jugement){
                    
                    if(!resBuffer[field]){
                        resBuffer[field]=[];
                    }

                    resBuffer[field].push(message);    
                }
            }
        }

        var response = new HachiwareValidatorResponse(resBuffer);

        return response;
    };

    /**
     * addRule
     * @param {*} field 
     * @param {*} rule 
     * @param {*} message 
     * @returns 
     */
    this.addRule=function(field, rule, message){
        var Length = 0;
        if(context.rules){
            if(context.rules[field]){
                Length = Object.keys(context.rules[field]).length;
            }    
        }
        return this.addRuleWithIndex(Length, field, rule, message);
    };

    /**
     * addRuleWithIndex
     * @param {*} indexName 
     * @param {*} field 
     * @param {*} rule 
     * @param {*} message 
     * @returns 
     */
    this.addRuleWithIndex=function(indexName, field, rule, message){

        if(!context.rules){
            context.rules = {};
        }
        if(!context.rules[field]){
            context.rules[field] = {};
        }

        var values = {};
        values.rule = rule;
        if(message){
            values.message = message;
        }

        context.rules[field][indexName] = values;

        return this;
    };

    /**
     * deleteRule
     * @param {*} field 
     * @param {*} index 
     * @returns 
     */
    this.deleteRule=function(field, index){

        if(index == undefined){
            delete context.rules[field];
        }
        else{
            delete context.rules[field][index];
        }

        return this;
    };

};
module.exports = validator;