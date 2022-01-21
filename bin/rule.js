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

const ValidateRule = function(data){

	/**
	 * convertArg
	 * @param {*} name 
	 * @returns 
	 */
	const convertArg = function(name){

		var res = name;

		if(Array.isArray(name)){
			var target = name[0];			
		}
		else{
			var target = name;
		}

		if(target.toString().substring(0,1) == "@"){
			var field = target.toString().substring(1);
			res = data[field];
		}

		return res;
	};

	/**
	 * required
	 * @param {*} value 
	 * @returns 
	 */
	this.required = function(value){

		if(value){
			return true;
		}

		return false;
	};

	/**
	 * requiredIf
	 * @param {*} value 
	 * @param {*} args
	 * @returns 
	 */
	this.requiredIf = function(value, args){

		if(!data[args[0]]){
			return true;
		}

		if(data[args[0]] != args[1]){
			return true;
		}

		if(value){
			return true;
		}
		return false;
	};

	/**
	 * confirmed
	 * @param {*} value 
	 * @param {*} args 
	 * @returns 
	 */
	this.confirmed = function(value, args){

		if(!value){
			return true;
		}

		if(value == data[args[0]]){
			return true;
		}

		return false;
	};

	/**
	 * alphaNumeric
	 * @param {*} value 
	 * @param {*} args 
	 * @returns 
	 */
	this.alphaNumeric = function(value, args){
		
		if(!value){
			return true;
		}

		if(args.length){
			var words = convertArg(args);
			
			for(var n = 0 ; n < words.length ;n++){
				var word = words[n];
				value = value.split(word).join("");
			}
		}

		var reg = "^[a-zA-Z0-9]+$";

		if(this.regex(value, [reg])){
			return true;
		}

		return false;
	};

	/**
	 * numeric
	 * @param {*} value 
	 * @param {*} args 
	 * @returns 
	 */
	this.numeric = function(value,args){
		
		if(!value){
			return true;
		}

		if(args.length){
			var words = convertArg(args);

			for(var n = 0 ; n < words.length ; n++){
				var word = words[n];
				value = value.split(word).join("");
			}
		}
		
		var reg = "^[0-9]+$";

		if(this.regex(value,reg)){
			return true;
		}

		return false;
	};

	/**
	 * length
	 * @param {*} value 
	 * @param {*} args 
	 * @returns 
	 */
	this.length = function(value, args){

		if(!value){
			return true;
		}
		
		var lengthValue = convertArg(args[0]);

		if(value.length == parseInt(lengthValue)){
			return true;
		}

		return false;
	};

	/**
	 * minLength
	 * @param {*} value 
	 * @param {*} args 
	 * @returns 
	 */
	this.minLength = function(value, args){

		if(!value){
			return true;
		}

		var lengthValue = convertArg(args[0]);

		if(value.length >= parseInt(lengthValue)){
			return true;
		}
		return false;
	};

	/**
	 * maxLength
	 * @param {*} value 
	 * @param {*} args 
	 * @returns 
	 */
	this.maxLength = function(value, args){

		if(!value){
			return true;
		}

		var lengthValue = convertArg(args[0]);

		if(value.length <= parseInt(lengthValue)){
			return true;
		}

		return false;
	};

	/**
	 * betweenLength
	 * @param {*} value 
	 * @param {*} args
	 * @returns 
	 */
	this.betweenLength = function(value, args){

		if(!value){
			return true;
		}

		var juge1 = this.minLength(value,[args[0]]);
		var juge2 = this.maxLength(value,[args[1]]);

		if(juge1 && juge2){
			return true;
		}

		return false;
	};

	/**
	 * value
	 * @param {*} value 
	 * @param {*} args 
	 * @returns 
	 */
	this.value = function(value, args){

		if(!value){
			return true;
		}

		var targetValue = convertArg(args[0]);

		if(value == parseFloat(targetValue)){
			return true;
		}

		return false;

	};

	/**
	 * minValue
	 * @param {*} value 
	 * @param {*} args 
	 * @returns 
	 */
    this.minValue = function(value, args){

		if(!value){
			return true;
		}

		var targetValue = convertArg(args[0]);

		if(value >= parseFloat(targetValue)){
			return true;
		}

		return false;
	};

	/**
	 * maxValue
	 * @param {*} value 
	 * @param {*} args
	 * @returns 
	 */
	this.maxValue = function(value, args){

		if(!value){
			return true;
		}

		var targetValue = convertArg(args[0]);

		if(value <= parseFloat(targetValue)){
			return true;
		}
	
		return false;
	};

	/**
	 * betweenValue
	 * @param {*} value 
	 * @param {*} args
	 * @returns 
	 */
	this.betweenValue = function(value,args){

		if(!value){
			return true;
		}

		var juge1 = this.minValue(value,[args[0]]);
		var juge2 = this.maxValue(value,[args[1]]);

		if(juge1 && juge2){
			return true;
		}

		return false;	
	};

	/**
	 * selectedCount
	 * @param {*} values
	 * @param {*} args 
	 * @returns 
	 */
	this.selectedCount = function(values, args){

		if(!values){
			return true;
		}

		var targetSelectCount = convertArg(args[0]);

		if(values.length == parseInt(targetSelectCount)){
			return true;
		}

		return false;
	};

	/**
	 * minSelectedCount
	 * @param {*} values
	 * @param {*} args 
	 * @returns 
	 */
	this.minSelectedCount = function(values, args){

		if(!values){
			return true;
		}

		var targetSelectCount = convertArg(args[0]);

		if(values.length >= parseInt(targetSelectCount)){
			return true;
		}

		return false;
	};

	/**
	 * maxSelectedCount
	 * @param {*} values 
	 * @param {*} args 
	 * @returns 
	 */
	this.maxSelectedCount = function(values, args){

		if(!values){
			return true;
		}

		var targetSelectCount = convertArg(args[0]);

		if(values.length <= parseInt(targetSelectCount)){
			return true;
		}

		return false;
	};

	/**
	 * betweenSelectedCount
	 * @param {*} value 
	 * @param {*} args
	 * @returns 
	 */
	this.betweenSelectedCount = function(values, args){

		if(!values){
			return true;
		}

		var juge1 = this.minSelectedCount(value,[args[0]]);
		var juge2 = this.maxSelectedCount(value,[args[1]]);

		if(juge1 && juge2){
			return true;
		}

		return false;
	};

	/**
	 * like
	 * @param {*} value 
	 * @param {*} args 
	 * @returns 
	 */
	this.like = function(value, args){

		if(!value){
			return true;
		}

		var targetLike = convertArg(args[0]);

		if(value.indexOf(targetLike) > -1){
			return true;
		}

		return false;	
	};

	/**
	 * any
	 * @param {*} values 
	 * @param {*} args 
	 * @returns 
	 */
	this.any = function(values, args){

		if(!values){
			return true;
		}

		if(
			typeof values == "string" ||
			typeof values == "number" || 
			typeof values == "boolean"
		){
			values = [ values ];
		}

		var targetAny = convertArg(args);

		var juges = false;
		for(var n = 0 ; n < targetAny.length ; n++){
			for(var n2 = 0  ; n2 < values.length ; n2++){
				if(targetAny[n] == values[n2]){
					juges = true;
					break;
				}
			}
		}

		return juges;
	};

	/**
	 * date
	 * @param {*} value 
	 * @returns 
	 */
	this.date = function(value){

		if(!value){
			return true;
		}

		var tims = new Date(value);
		var juges = parseInt(tims.getTime());

		if(juges > 0){
			return true;
		}

		return false;
	};

	/**
	 * minDate
	 * @param {*} value 
	 * @param {*} args 
	 * @returns 
	 */
	this.minDate = function(value, args){

		if(!value){
			return true;
		}

		var tims = new Date(value);
		var target_date = parseInt(tims.getTime());

		var targetDate = convertArg(args[0]);
		var tims2 = new Date(targetDate);

		var mindate = parseInt(tims2.getTime());

		if(target_date >= mindate){
			return true;
		}

		return false;
	};

	/**
	 * minDateToday
	 * @param {*} value 
	 * @param {*} args 
	 * @returns 
	 */
	this.minDateToday = function(value, args){

		if(!value){
			return true;
		}

		var tims = new Date(value);
		var target_date = parseInt(tims.getTime());

		var tims2 = new Date();
		tims2.setHours(0);
		tims2.setMinutes(0);
		tims2.setSeconds(0);
		tims2.setMilliseconds(0);

		if(args[0]){
			var incrementDay = convertArg(args[0]);
			tims2.setDate(tims2.getDate() + parseInt(incrementDay));
		}

		var mindate = parseInt(tims2.getTime());
		
		if(target_date >= mindate){
			return true;
		}

		return false;
	};

	/**
	 * maxDate
	 * @param {*} value 
	 * @param {*} args
	 * @returns 
	 */
	this.maxDate = function(value, args){

		if(!value){
			return true;
		}

		var tims = new Date(value);
		var target_date = parseInt(tims.getTime());

		var targetDate = convertArg(args[0]);
		var tims2 = new Date(targetDate);

		var mindate = parseInt(tims2.getTime());

		if(target_date <= mindate){
			return true;
		}

		return false;
	};

	/**
	 * maxDateToday
	 * @param {*} value 
	 * @param {*} args
	 * @returns 
	 */
	this.maxDateToday = function(value, args){

		if(!value){
			return true;
		}

		var tims = new Date(value);
		var target_date = parseInt(tims.getTime());

		var tims2 = new Date();
		tims2.setHours(0);
		tims2.setMinutes(0);
		tims2.setSeconds(0);
		tims2.setMilliseconds(0);

		if(args[0]){
			var incrementDay = convertArg(args[0]);
			tims2.setDate(tims2.getDate() + parseInt(incrementDay));
		}

		var mindate = parseInt(tims2.getTime());
		
		if(target_date <= mindate){
			return true;
		}

		return false;
	};

	/**
	 * betweenDate
	 * @param {*} value 
	 * @param {*} args
	 * @returns 
	 */
	this.betweenDate = function(value, args){

		if(!value){
			return true;
		}

		var juge1 = this.minDate(value, [args[0]]);
		var juge2 = this.maxDate(value, [args[1]]);

		if(juge1 && juge2){
			return true;
		}
		
		return false;
	};

	/**
	 * time
	 * @param {*} value 
	 */
	this.time = function(value){

		if(!value){
			return true;
		}

		var tims = new Date("0000-01-01 " + value);
		var juges = parseInt(tims.getTime());

		if(juges > 0){
			return true;
		}

		return false;

	};

	/**
	 * minTime
	 * @param {*} value 
	 * @param {*} args 
	 */
	this.minTime = function(value, args){

		if(!value){
			return true;
		}

		var tims = new Date("0000-01-01 " + value);
		var target_date = parseInt(tims.getTime());

		var targetTime = convertArg(args[0]);
		var tims2 = new Date("0000-01-01 " + targetTime);
		var minTime = parseInt(tims2.getTime());

		if(target_date >= minTime){
			return true;
		}

		return false;
	};

	/**
	 * maxTime
	 * @param {*} value 
	 * @param {*} args 
	 */
	this.maxTime = function(value, args){

		if(!value){
			return true;
		}

		var tims = new Date("0000-01-01 " + value);
		var target_date = parseInt(tims.getTime());

		var targetTime = convertArg(args[0]);
		var tims2 = new Date("0000-01-01 " + targetTime);
		var minTime = parseInt(tims2.getTime());

		if(target_date <= minTime){
			return true;
		}

		return false;
	};

	/**
	 * betweenTime
	 * @param {*} value 
	 * @param {*} args 
	 */
	this.betweenTime = function(value, args){

		if(!value){
			return true;
		}

		var juge1 = this.minTime(value, [args[0]]);
		var juge2 = this.maxTime(value, [args[1]]);

		if(juge1 && juge2){
			return true;
		}
		
		return false;
	};

	/**
	 * isInt
	 * @param {*} value 
	 * @returns 
	 */
	this.isInt = function(value){

		if(!value){
			return true;
		}

		if(value[0] == 0){
			return false;
		}

		if(!isNaN(value)){
			return true;
		}

		return false;
	};

	/**
	 * isBool
	 * @param {*} value 
	 * @returns 
	 */
	this.isBool = function(value){

		if(!value){
			return true;
		}

		if(value==0 || value==1){
			return true;
		}

		return false;
	};

	/**
	 * isEmail
	 * @param {*} value 
	 * @returns 
	 */
	this.isEmail = function(value){

		if(!value){
			return true;
		}

		if(value.match(/^[0-9a-z_./?-]+@([0-9a-z_./?-]+\.)+[0-9a-z-]+$/)){
			return true;
		}

		return false;
	};

	/**
	 * isTel
	 * @param {*} value 
	 * @returns 
	 */
	this.isTel = function(value){

		if(!value){
			return true;
		}

		if(value.match(/^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/)){
			return true;
		}

		if(value.match(/^[0-9]{1,15}$/)){
			return true;
		}

		return false;
	};

	/**
	 * isIp
	 * @param {*} value 
	 * @returns 
	 */
	this.isIp = function(value){

		if(!value){
			return true;
		}

		if(value.match(/(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/)){
			return true;
		}

		return false;
	};

	/**
	 * isUrl
	 * @param {*} value 
	 * @returns 
	 */
	this.isUrl = function(value){

		if(!value){
			return true;
		}

		if(value.match(/^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i)){
			return true;
		}

		return false;	
	};

	/**
	 * regex
	 * @param {*} value 
	 * @param {*} args
	 * @returns 
	 */
	this.regex = function(value, args){

		if(!value){
			return true;
		}

		var targetRegex = convertArg(args[0]);

		if(targetRegex.substring(targetRegex.length-2) == "/i"){
			targetRegex = targetRegex.substring(0,(targetRegex.length-2));
		}
		if(targetRegex == "/"){
			targetRegex = targetRegex.substring(1);
		}

		regExp = new RegExp(targetRegex,"i");
		if(value.match(regExp)){
			return true;
		}

		return false;	
	};

	/**
	 * isJpZip
	 * @param {*} value 
	 * @param {*} arg1 
	 * @param {*} arg2 
	 * @returns 
	 */
	this.isJpZip = function(value){

		if(!value){
			return true;
		}

		if(value.match(/^([0-9]{3}-[0-9]{4})?$|^[0-9]{7}$/)){
			return true;
		}

		return false;
	};

	/**
	 * isJpKatakana
	 * @param {*} value 
	 * @param {*} args
	 * @returns 
	 */
	this.isJpKatakana = function(value, args){

		if(!value){
			return true;
		}

		if(args.length){
			var words = convertArg(args);

			for(var n = 0 ; n < words.length ; n++){
				value = value.split(words[n]).join("");
			}	
		}

		if(value.match(/^[ァ-ヶー]+$/u)){
			return true;
		}

		return false;
	};

	/**
	 * isJpHiragana
	 * @param {*} value 
	 * @param {*} args
	 * @returns 
	 */
	this.isJpHiragana = function(value, args){

		if(!value){
			return true;
		}

		if(args.length){
			var words = convertArg(args);

			for(var n = 0 ; n < words.length ; n++){
				value = value.split(words[n]).join("");
			}	
		}

		if(value.match(/^[ぁ-ん]+$/u)){
			return true;
		}

		return false;
	};

};
module.exports = ValidateRule;