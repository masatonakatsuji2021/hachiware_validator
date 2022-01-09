<p align="center">
    <img alt="hachiware server" src="https://github.com/masatonakatsuji2021/hachiware_validator/raw/main/logo.png" alt="hachiware validator">
</p>

# hachiware_validator

<img src="https://img.shields.io/badge/author-Nakatsuji%20Masato-brightgreen" alt="author Nakatsuji Masato">
<img src="https://img.shields.io/badge/made%20in-Japan-brightgreen" alt="made in japan">

Input validation for Node.js.

---


## # How do you use this?

First, install the npm package with the following command.

```
npm i hachiware_validator
```

All you have to do is add the package require code to index.js etc. and you're ready to go.

```javascript
const validator = require("hachiware_validator");
```

Be sure to prepare an initialized object for validation.

```javascript
const validator = require("hachiware_validator");

var Validate = new validator();
```

---

## # Input data validation

To validate the input data based on the specified rule, first write the following code.

```javascript
const validator = require("hachiware_validator");

var Validate = new validator();

var data ={};   // <= Input data

var rules = {
    name: [
        "required",
    ],
    value: [
        "required",
        "maxLength|100",
    ],
};  // <= Validation rules to apply>

var result = Validate.verify(data, rules);  // <= Perform validation check

console.log(result);
```

In the ``verify`` method, set the input data and validation rule settings in the arguments.  
The result of validation is returned as a return value, the above code outputs it to the console.

The result of the return value is output including the error message only when the error judgment in each validation occurs.  
Therefore, if there is no error judgment (= normal), it will be an empty object.

It is also possible to implement a preset rule name or customized validation as a callback in the rule setting.  
See [Click here for details on various rules](#rules) and [Click here for customized validation](#cusotm).

---

## # Validation rule settings

Describe the rules given for each column as follows.  

First of all, the simplest implementation.

```javascript
var rules = {
    name: [
        "required",
    ],
    value: [
        "required",
        "maxLength|100",
    ],
};
```

The item of the object is used as the column name, and the rule name or callback of the preset to be applied in the array value is set to the value.  
(In the above case, required and maxLength (100 characters) are associated with each of the name and value items.)

maxlength has a character limit (upper limit), but if you want to hit the rule for the specified value like this,
Separate the text with ``| ``.

It is also possible to set up customized validation using callbacks instead of preset rule names.    
The input value is passed as an argument.

If the return value is true, it is regarded as through, and if it is false, it is regarded as an error.

```javascript
value2: [
    function(value){

        if(value == 1 || value == 3){
            return true;
        }

        return false;
    },
],
```

If you want to set strict rules, you can also do the following.

```javascript
var rules = {
    name: [
        {
            rule:"required",
        },
    ]
    value: [
        {
            rule:"required",
        },
        {
            rule:["maxLength", 100],
        },
    ],
};
```

In the above case, you can further customize the error judgment message.

```javascript
var rules = {
    name: [
        {
            rule:"required",
            message: "name not entered",
        },
    ]
    value: [
        {
            rule:"required",
            message: "value is not entered",
        },
        {
            rule:["maxLength", 100],
            message: "Enter within 100 characters",
        },
    ],
};
```




---

## # List of preset rules

Below is a list of preset rules

* 1 is optional.

|preset rule|value(type)|args 1|args 2|Overview|
|:--|:--|:--|:--|:--|
|[required](#rule_required)|any|-|-|Required items.<br>Returns an error if the value is empty or null, etc.|
|[requireIf](#rule_requiredIf)|any|〇|〇|Conditionally required items<br>Required when the value of the specified item reaches the specified value|
|[confirmed](#rule_confirmed)|any|〇|-|If the specified item does not contain the same value, <br>it is judged as an error.|
|[alphaNumeric](#rule_alphaNumeric)|string|〇※1|-|Only single-byte alphanumerical characters are allowed<br>However, if the character specified by specifying the option value is included, it is allowed.|
|[numeric](#rule_numeric)|string|〇※1|-|Only half-width numbers are allowed<br>However, if the character specified by specifying the option value is included, it is allowed.|
|[length](#rule_length)|string (or number))|〇|-|Error judgment if it is not a specified length character string,|
|[minLength](#rule_minLength)|string (or number)|〇|-|Error judgment if less than the specified length character string,|
|[maxLength](#rule_maxLength)|string (or number)|〇|-|Error judgment when the specified length is longer than the character string,|
|[betweenLength](#rule_betweenLength)|string (or number)|〇|〇|Error judgment if out of range of specified length character string.|
|[value](#rule_value)|number|〇|-|If it is not the specified value, error judgment.|
|[minValue](#rule_minValue)|number|〇|-|Error judgment if less than the specified value.|
|[maxValue](#rule_maxValue)|number|〇|-|If it is more than the specified value, it is judged as an error.|
|[betweenValue](#rule_betweenValue)|number|〇|〇|Error judgment if outside the specified numerical range.|
|[selectedCount](#rule_selectedCount)|Array|〇|-|Error judgment for a list of numbers other than the specified value.|
|[minSelectedCount](#rule_minSelectedCount)|Array|〇|-|Error judgment if the list is less than the specified number|
|[maxSelectedCount](#rule_maxSelectedCount)|Array|〇|-|Error judgment when the list is more than the specified number.|
|[betweenSelectedCount](#rule_betweenSelectedCount)|Array|〇|〇|If the list is out of the specified number, error judgment.|
|[like](#rule_like)|string|〇|-|Error judgment if the specified character string does not exist.|
|[any](#rule_any)|string (or number)|〇|-|Error judgment if the value does not exist in the default value list.|
|[date](#rule_date)|string|-|-||
|[minDate](#rule_minDate)|string|〇|-|||
|[minDateToday](#rule_minDateToday)|string|〇※1|-||
|[maxDate](#rule_maxDate)|string|〇|-||
|[maxDateToday](#rule_maxDateToday)|string|〇※1|-||
|[betweenDate](#rule_betweenDate)|string|〇|〇||
|[time](#rule_time)|string|-|-||
|[minTime](#rule_minTime)|string|〇|-||
|[maxTime](#rule_maxTime)|string|〇|-||
|[betweenTime](#rule_betweenTime)|string|〇|〇||
|[isInt](#rule_isInt)|string|-|-||
|[isBool](#rule_isBool)|string|-|-||
|[isEmail](#rule_isEmail)|string|-|-||
|[isTel](#rule_isTel)|string|-|-||
|[isIp](#rule_isIp)|string|-|-||
|[isUrl](#rule_isUrl)|string|-|-||
|[regex](#rule_regex)|string|〇|-||
|[isJpZip](#rule_isJpZip)|string|〇※1|-||
|[isJpKatakana](#rule_isJpKatakana)|string|〇※1|-||

<a id="rule_required"></a>

### - required

Required items.  
Returns an error if the value is empty or null, etc.

```javascript
name:[
    "required",
],
```

<a id="rule_requiredIf"></a>

### - requireIf

Conditionally required items.  
Required when the value of the specified item reaches the specified value

In the following cases, it is required when mode becomes 1.

```javascript
value1:[
    "requiredIf|mode,1",
],
```

<a id="rule_confirmed"></a>

### - confirmed

If the specified item does not contain the same value,   
it is judged as an error.

Mainly used for re-entering passwords, etc.

```javascript
password:[
    "confirmed|password_2",
],
```

<a id="rule_alphaNumeric"></a>

### - alphaNumeric

Only single-byte alphanumerical characters are allowed.  
However, if the character specified by specifying the option value is included, it is allowed.

First of all, if you normally allow only half-width alphanumerical characters, specify as follows.  
No arguments.

```javascript
username:[
    "alphaNumeric",
],
```

In the case of this rule, if you use half-width spaces or other special characters (+,-, =, etc.), an error will be judged.

To enable permission even if some special characters are included, list only the permitted characters as arguments as shown below.

```javascript
username:[
    "alphaNumeric| ,+,-,=",
],
```

This will allow half-width spaces and special characters (+, -, =).

<a id="rule_numeric"></a>

### - numeric

Only single-byte numeric characters are allowed.  
However, if the character specified by specifying the option value is included, it is allowed.

First of all, if you normally allow only half-width numeric characters, specify as follows.  
No arguments.

```javascript
tel:[
    "numeric",
],
```

In the case of this rule, if you use half-width spaces or other special characters (+,-, =, etc.), an error will be judged.

To enable permission even if some special characters are included, list only the permitted characters as arguments as shown below.

```javascript
tel:[
    "numeric| ,+,-,=",
],
```

This will allow half-width spaces and special characters (+, -, =).


<a id="rule_length"></a>

### - length

Judges an error if the string length of the value is not the specified value.  
Be sure to set the specified length in the argument.

In the following cases, only a 20-character string is allowed.

```javascript
code:[
    "length|20",
],
```

<a id="rule_minLength"></a>

### - minLength


If the length of the value string is less than the specified value, an error is determined.  
Be sure to set the specified length for the argument.

In the following cases, only strings of 5 or more characters are allowed.

```javascript
code:[
    "minLength|5",
],
```

<a id="rule_maxLength"></a>

### - maxLength

If the length of the value string is long than the specified value, an error is determined.  
Be sure to set the specified length for the argument.

In the following cases, only strings of 50 characters or less are allowed.

```javascript
code:[
    "maxLength|50",
],
```

<a id="rule_betweenLength"></a>

### - betweenLength

If the length of the value string is outside the specified range, an error is determined.  
Be sure to set the specified range (minimum value and maximum value) for the argument.  

In the following cases, only strings of 5 to 50 characters are allowed.

```javascript
code:[
    "betweenLength|5,50",
],
```

<a id="rule_value"></a>

### - value

If the value is not the same as the specified value, an error is judged.  
Be sure to set the specified value in the argument.

Only 200 numbers (or strings) are allowed in the following cases.

```javascript
number:[
    "value|200",
],
```

<a id="rule_minValue"></a>

### - minValue

If the value is smaller than the specified value, an error is judged.  
Be sure to set the specified value in the argument.

Only numbers (or strings) greater than or equal to 10 are allowed in the following cases

```javascript
number:[
    "minValue|10",
],
```

<a id="rule_maxValue"></a>

### - maxValue

If the value is larger than the specified value, an error is judged.  
Be sure to set the specified value in the argument.

Only numbers (or strings) less than or equal to 200 are allowed in the following cases

```javascript
number:[
    "maxValue|200",
],
```

<a id="rule_betweenValue"></a>

### - betweenValue

If the value is not within the specified range, an error is judged.  
Be sure to set the specified values (minimum value and maximum value) in the argument.

Only numbers (or strings) in the range 10-200 are allowed in the following cases

```javascript
number:[
    "maxValue|200",
],
```

<a id="rule_selectedCount"></a>

### - selectedCount

Array of values If the number of values is other than the specified value, an error is judged.  
Be sure to set the specified value in the argument.

In the following cases, it is allowed only when the number of array values of values is four.

```javascript
selects:[
    "selectedCound|4",
],
```

<a id="rule_minSelectedCount"></a>

### - minSelectedCount

If the number of values is less than the specified value, an error is judged.  
Be sure to set the specified value in the argument.

In the following cases, it is allowed only when the number of array values of values is 3 or more.

```javascript
selects:[
    "minSelectedCound|3",
],
```

<a id="rule_maxSelectedCount"></a>

### - maxSelectedCount


If the number of values is greater than the specified value, an error is judged.  
Be sure to set the specified value in the argument.

In the following cases, it is allowed only when the number of array values of values is 8 or less.

```javascript
selects:[
    "maxSelectedCound|8",
],
```

<a id="rule_betweenSelectedCount"></a>

### - betweenSelectedCount	

Array of values If the number of values is not within the specified value range, an error is judged.  
Be sure to set the specified values (Minimum number and maximum number) in the argument.

In the following cases, it is allowed only when the number of array values of values is between 3 and 8.

```javascript
selects:[
    "betweenSelectedCount|3,8",
],
```

<a id="rule_like"></a>

### ^ like

If the specified value is not included in the value, an error is determined.    
The value is a string or a number. (Excluding array values)

In the following cases, it is allowed only when the value (string) contains "have to".

```javascript
memo:{
    "like:have to",
},
```

<a id="rule_any"></a>

### - any

If the value is not included in the specified value (list) candidates, an error is judged.  
It is used for the purpose of preventing undefined values from being entered in status etc.

In the following cases, allow only if the value is one of "apple, orange, kiwi".

```javascript
favorite_food:{
    "any:apple,orange,kiwi",
},
```

### - date

### - minDate

### - minDateToday