/**
 * Created by LDQ on 2017/7/19.
 */
/**
 * Created by LDQ on 2017/7/4.
 */


let shoppingCartService = {};
shoppingCartService.clientList = {};
shoppingCartService.listen = function(key,fn){
    if(!this.clientList[key]){
        this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
};
shoppingCartService.trigger = function(){
    let key = Array.prototype.shift.call( arguments ),
        fns = this.clientList[key];
    for(let i = 0,fn;fn = fns[i++];){
        fn.apply(this,arguments);
    }
};
module.exports = shoppingCartService;



