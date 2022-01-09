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
|[@minDateToday](#rule_minDateToday)|string|〇※1|-||
|[maxDate](#rule_maxDate)|string|〇|-||
|[maxDateToday](#rule_maxDateToday)|〇※1|-||
|[betweenDate](#rule_betweenDate)|〇|〇||
|[time](#rule_time)|-|-||
|[minTime](#rule_minTime)|〇|-||
|[maxTime](#rule_maxTime)|〇|-||
|[betweenTime](#rule_betweenTime)|〇|〇||
|[isInt](#rule_isInt)|-|-||
|[isBool](#rule_isBool)|-|-||
|[isEmail](#rule_isEmail)|-|-||
|[isTel](#rule_isTel)|-|-||
|[isIp](#rule_isIp)|-|-||
|[isUrl](#rule_isUrl)|-|-||
|[regex](#rule_regex)|〇|-||
|[isJpZip](#rule_isJpZip)|〇※1|-||
|[isJpKatakana](#rule_isJpKatakana)|〇※1|-||

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
username:[
    "numeric",
],
```

In the case of this rule, if you use half-width spaces or other special characters (+,-, =, etc.), an error will be judged.

To enable permission even if some special characters are included, list only the permitted characters as arguments as shown below.

```javascript
username:[
    "numeric| ,+,-,=",
],
```

This will allow half-width spaces and special characters (+, -, =).


<a id="rule_length"></a>

### - length

<a id="rule_minLength"></a>

### - minLength

<a id="rule_maxLength"></a>

### - maxLength

<a id="rule_betweenLength"></a>

### - betweenLength

<a id="rule_value"></a>

### - value

<a id="rule_minValue"></a>

### - minValue

<a id="rule_maxValue"></a>

### - maxValue

<a id="rule_betweenValue"></a>

### - selectedCount

<a id="rule_minSelectedCount"></a>

### - minSelectedCount

<a id="rule_maxSelectedCount"></a>

### - maxSelectedCount

<a id="rule_betweenSelectedCount"></a>

### - betweenSelectedCount	

<a id="rule_like"></a>

### ^ like

<a id="rule_any"></a>

### - any
