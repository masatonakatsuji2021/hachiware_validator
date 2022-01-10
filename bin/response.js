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