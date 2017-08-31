/**
 * Created by LDQ on 2017/8/29
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class ShoppingList{
    constructor(rem2pxRate,productHeight,typeHeight,login){

        this.rem2pxRate = rem2pxRate;
        this.productHeight = productHeight;
        this.typeHeight = typeHeight;

        this.customerSelectedIndex = false;

        let self = this;
        //  请求 商品列表
        let ajax = _h.ajax.resource('/shop/shoppingcart/:action');


        this.getProductList = function(postInfo){
            return ajax.save({action:"productList"},postInfo)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
    }

    @action getList(shopId){
        this.getProductList({
            shopId:shopId
        }).then((list)=>{
            this._list = list;

            let typeList = new TypeList(list);
            let productList = new ProductList(list);

        });
    }

    @observable _list;


    //  切换 tag 的高度
    @computed get cutTagHeight(){
        let list = [0];

        return list;
    }

}

class TypeList{
    constructor(list){
        this._typeList = list;
    }

    @observable _typeList;

    @computed get typeList(){
        let list = [];
        for(let i = 0,len = this._typeList.length; i < len;i++){
            list.push(new Type(this._typeList[i]));
        }

        return list;
    }
}

class Type{
    constructor(type){
        this._info = type;
    }

    @observable _info;

    @computed get info(){

    }
    @computed get selectCount(){
        return 0;
    }
}
class Product{
    constructor(product){
        this._info = product;
        let ajax = _h.ajax.resource('');


        this.increaseNum = function(postInfo){
            return ajax.save({action:"productList"},postInfo)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
    }
    @observable _info;
    @computed get info(){
        return {}
    }

    @action increase(){
        this.increaseNum().then(()=>{

        });

        this._info.count++;
    }
}

class WaterTicket{
    constructor(ticket){
        this._info = ticket;
    }
    @observable _info;
    @computed get info(){
        let info = Object.assign({},this._info);
        let list = [];
        for(let i = 0,len = this._info.strategyList.length;i < len;i++){
            let product = new Product(this._info.strategyList[i].info);
            list.push(product);
        }
        info.strategyList = list;
        return info;
    }
}


module.exports = ShoppingList;



