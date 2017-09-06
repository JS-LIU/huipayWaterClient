/**
 * Created by LDQ on 2017/8/29
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class ShoppingList{
    constructor(rem2pxRate,login){
        this.rem2pxRate = rem2pxRate;
        this.login = login;
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
            this._list = list.tagModelList;
        });
    }

    @observable _list;
    @computed get list(){
        return new TypeList(this._list);
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
            list.push(new TypeItem(this._typeList[i]));
        }

        return list;
    }
}

class TypeItem{
    constructor(type){
        this.id = type.id;
        this.name = type.name;
        this._selectCount = type.selectCount;

        //  productList是一个 对象{}
        this._productList = new ProductList(type.productList);
    }
    @observable _selectCount;
    @observable _productList;
    //  selectCount是【productList对象】的属性
    @computed get selectCount(){
        return this.productList.totalCount();
    }
    @computed get productList(){
        return this._productList;
    }

}
class ProductList{
    constructor(list){
        this._list = list;
    }
    @observable _totalCount = 0;
    @observable _list = [];

    @computed get list(){
        let list = [];
        for(let i = 0;i < this._list.length;i++){
            let product;
            if(this._list[i].type === "waterTicket"){
                product = new WaterTicket(this._list[i]);
            }else{
                product = new Product(this._list[i]);
            }
            list.push(product);
        }
        return list;
    }
    @computed get totalCount(){
        return 0;
    }
    @computed get shoppingCart(){
        let shoppingCart = [];
        for(let i = 0;i < this.list.length;i++){
            let isHasProduct = function(product){
                if(product.productItemId === this.list[i].productItemId){
                    return this.list[i];
                }
            };

            let product = shoppingCart.find(isHasProduct);
            if(!product){
                shoppingCart.push(product);
            }
        }
        return shoppingCart
    }

    //  切换type的高度
    @computed get cutProductListHeight(){

    }

}


class Product{
    constructor(product){
        this._info = product;
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



