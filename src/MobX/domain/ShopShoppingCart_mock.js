import {observable, computed,action,autorun} from "mobx";

class ShopShoppingCart_mock{
    constructor(productList){
        this._list = productList;
    }
    @observable _list = [];
    @computed get list(){
        let list = [];
        for(let i = 0;i < this._list.length;i++){
            for(let j = 0;j < this._list.productList.length;j++){
                if(this._list[i].productList[j].count > 0){
                    let isHas = function(item){
                        return this._list[i].productList[j].id === item.id;
                    };
                    let product = list.find(isHas);
                    if(!product){
                        list.push(product)
                    }
                }
            }

        }
        return list;
    }
}
module.exports = ShopShoppingCart_mock;