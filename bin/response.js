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

const validatorResponse = function(validates){

    var colums = Object.keys(validates);

    this.exists = function(){

        if(!colums.length){
            return false;
        }

        return true;
    };

    this.get = function(){

        if(!colums.length){
            return null;
        }

        return validates;
    };

}
module.exports = validatorResponse;