/**
 * Created by LDQ on 2017/9/11
 */

import {observable, computed,action,autorun} from "mobx";
import _h from '../../../Util/HB';
import TypeItem from './TypeItem';
import Product from './Product';


class ShoppingList {
    constructor(rem2pxRate, login,shopInfo) {
        this.rem2pxRate = rem2pxRate;
        this.login = login;
        this.shopId = shopInfo.shopId;
        this._recordProductList = [];
        this.customerSelectedIndex = false;
        let self = this;
        //  请求 商品列表
        let ajax = _h.ajax.resource('/shop/shoppingcart/:action');

        this.getProductList = function (postInfo) {
            return ajax.save({action: "productList"}, postInfo)
        }.before(function (postInfo) {
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
        this.clearProductList = function (postInfo) {
            return ajax.save({action: "clear"}, postInfo)
        }.before(function (postInfo) {
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });

        this.productItemHeight = this.rem2pxRate * 2.41;
        this.waterTicketHeight = this.rem2pxRate * 1.76;
        this.productListTitleHeight = this.rem2pxRate * 0.61;
    }

    @action getList() {
        this.getProductList({shopId:this.shopId}).then((list) => {
            this._tagModelList = list.tagModelList;
        });
    }

    //  去除重复的 商品列表
    @computed get noRepeatProductList() {
        let list = [];
        for (let i = 0; i < this._tagModelList.length; i++) {       //  tag

            let productList = this._tagModelList[i].productList;
            for (let j = 0; j < productList.length; j++) {         //  productList

                let product = productList[j].productItemModels;
                for (let k = 0; k < product.length; k++) {          //  productItem
                    let hasProductItem = function (productItem) {
                        if (productItem.productItemId === product[k].productItemId) {
                            return productItem;
                        }
                    };

                    let productItem = list.find(hasProductItem);
                    if (!productItem) {
                        productItem = new Product(this.shopId,productList[j].name,productList[j].type, productList[j].imageUrl, product[k],this.login);
                        list.push(productItem);
                    }
                }
            }
        }
        return list;
    }
    //  商品列表
    @observable _tagModelList = [];

    @computed get tagModelList() {
        let list = [];
        for (let i = 0, len = this._tagModelList.length; i < len; i++) {
            if(this._tagModelList[i].name === "水票"){
                list.unshift(new TypeItem(this._tagModelList[i], this.noRepeatProductList,true));
            }else{
                list.push(new TypeItem(this._tagModelList[i], this.noRepeatProductList,false));
            }
        }
        return list;
    }

    @computed get tagModelListHeight(){
        let list = [0];
        for(let i = 0;i < this.tagModelList.length;i++){
            let startH = list[i];
            let productList = this.tagModelList[i].productList.list;
            for(let j = 0;j < productList.length;j++){
                if(productList[j].type === "entityProduct"){
                    startH += this.productItemHeight;
                }else if(productList[j].type === "waterTicket"){
                    startH += this.waterTicketHeight;
                }
            }
            startH += this.productListTitleHeight;
            list.push(startH);
        }
        return list;
    }


    @computed get maxScroll(){
        let minH = parseFloat(document.body.clientHeight) - (this.rem2pxRate * 0.8);
        let maxH = 0;
        for(let i = 0;i < this.tagModelList.length;i++){
            let productList = this.tagModelList[i].productList.list;
            for(let j = 0;j < productList.length;j++){
                if(productList[j].type === "entityProduct"){
                    maxH += this.productItemHeight;
                }else if(productList[j].type === "waterTicket"){
                    maxH += this.waterTicketHeight;
                }
            }
            maxH += this.productListTitleHeight;
        }
        return maxH - minH;
    }
    @action autoSelectedType(scrollTop){

        //  从【tagModelListHeight】中定位到移动到哪个type了
        function witchTypeItem(item){
            return scrollTop < item;
        }
        let index = this.tagModelListHeight.findIndex(witchTypeItem);

        //  iphone的滚动条 有自己的弹性 可以小于0 也可以大于最大
        if(index < 1){
            index = 1;
        }else if(index > this.tagModelList.length - 2){
            index = this.tagModelList.length - 2
        }

        for(let i = 0;i < this.tagModelList.length;i++){
            this.tagModelList[i]._selected = false;
        }
        if(scrollTop >= this.maxScroll){
            let customerSelectedIndex = this.customerSelectedIndex;
            if(customerSelectedIndex){
                this.tagModelList[customerSelectedIndex]._selected = true;
            }else{
                this.tagModelList[index - 1]._selected = true;
            }
            this.customerSelectedIndex = false;
        }else{
            this.tagModelList[index - 1]._selected = true;
        }
    }
    @action selectedType(dom,type) {
        function isEqualId(item) {
            return item.id === type.id;
        }

        let index = this.tagModelList.findIndex(isEqualId);
        this.customerSelectedIndex = index;
        this.setProductListScrollTop(dom, index);
    }
    setProductListScrollTop(dom){

        //  浏览器渲染好像有误差 小数点部分会被四舍五入 + 1来拟补
        let key = 1;
        dom.scrollTop = this.tagModelListHeight[this.customerSelectedIndex]+key;

        for(let i = 0,len = this.tagModelList.length;i < len;i++){
            this.tagModelList[i]._selected = false
        }

        this.tagModelList[this.customerSelectedIndex]._selected = true;
    }

    @observable _activeProductItem = {};
    @computed get activeProductItem(){
        return this._activeProductItem;
    }
    @action selectedProductItem(productItem){
        return this._activeProductItem = productItem;
    }



    //  todo 拿出来 购物车列表
    @computed get shoppingCart(){
        let list = [];
        for(let i = 0;i < this.noRepeatProductList.length;i++){
            if(this.noRepeatProductList[i].selectCount > 0){
                list.push(this.noRepeatProductList[i]);
            }
        }
        return list;
    }
    @computed get totalCount(){
        let count = 0;
        for(let i = 0;i < this.shoppingCart.length;i++){
            count += this.shoppingCart[i].selectCount;
        }
        return count;
    }

    @computed get totalPrice(){
        let price = 0;
        for(let i = 0;i < this.shoppingCart.length;i++){
            price += (this.shoppingCart[i].selectCount * this.shoppingCart[i].currentPrice);
        }
        return price;
    }
    @observable _show = false;
    @action showShoppingCart(){
        this._show = !this._show;
    }
    @computed get show(){
        return this._show;
    }
    @action clearShoppingCart(){
        for(let i = 0;i < this.noRepeatProductList.length;i++){
            this.noRepeatProductList[i]._selectCount = 0;
        }
        this.clearProductList({shopId:this.shopId}).then((data)=>{
            console.log(data);
        });

        this._show = false;
    }
}
module.exports = ShoppingList;