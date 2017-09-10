/**
 * Created by LDQ on 2017/8/29
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';


class ShoppingList{
    constructor(rem2pxRate,login){
        this.rem2pxRate = rem2pxRate;
        this.login = login;
        this._recordProductList = [];
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
            this._tagModelList = list.tagModelList;
        });
    }

    @observable _tagModelList = [];

    @computed get tagModelList(){
        let list = [];
        for(let i = 0,len = this._tagModelList.length; i < len;i++){
            list.push(new TypeItem(this._tagModelList[i],this.noRepeatProductList));
        }
        return list;
    }
    @observable _noRepeatProductList;
    @computed get noRepeatProductList(){
        let list = [];
        for(let i = 0;i < this._tagModelList.length;i++){       //  tag

            let productList = this._tagModelList[i].productList;
            for(let j = 0; j < productList.length;j++){         //  productList

                let product = productList[j].productItemModels;
                for(let k = 0;k < product.length;k++){          //  productItem
                    let hasProductItem = function(productItem){
                        if(productItem.productItemId === product[k].productItemId){
                            return productItem;
                        }
                    };

                    let productItem = list.find(hasProductItem);
                    if(!productItem){
                        productItem = new Product(productList[j].type,productList[j].imageUrl,product[k]);
                        list.push(productItem);
                    }
                }
            }
        }
        return list;
    }

    @computed get shoppingCart(){
        let list = [];
        for(let i = 0;i < this.noRepeatProductList.length;i++){
            if(this.noRepeatProductList[i].selectCount > 0){
                list.push(this.noRepeatProductList[i]);
            }
        }
        return list;
    }

}

class TypeItem{
    constructor(type,noRepeatProductList){
        this.id = type.id;
        this.name = type.name;
        this._selectCount = type.selectCount;
        //  productList是一个 对象{}
        this._productList = new ProductList(type.productList,noRepeatProductList);
    }
    @observable _selectCount;
    @observable _productList = {};
    //  selectCount是【productList对象】的属性
    @computed get selectCount(){
        return this.productList.totalCount();
    }
    @computed get productList(){
        return this._productList;
    }

}
class ProductList{
    constructor(list,noRepeatProductList){
        this._list = list;
        this.noRepeatProductList = noRepeatProductList;

        //  从recordProductList中 找是否有相同的商品
        function findFromNoRepeatProductList(product){
            let productItem;
            let hasProductItem = function(productItem){
                if(product.productItemId === productItem.productItemId){
                    return productItem;
                }
            };
            productItem = noRepeatProductList.find(hasProductItem);

            return productItem;
        }
        this.findProduct = (product)=>{

            let productItem; //  单个商品
            let productItemModels = [];

            //  遍历 商品
            for(let i = 0;i < product.productItemModels.length;i++){
                productItem = findFromNoRepeatProductList(product.productItemModels[i]);
                productItemModels.push(productItem);
            }

            if(product.type === "waterTicket"){
                productItem = new WaterTicket(product.name,product.type,product.imageUrl,productItemModels);
            }
            console.log(productItem);
            return productItem;
        }

    }
    @observable _totalCount = 0;
    @observable _list = [];

    @computed get list(){
        let list = [];
        for(let i = 0;i < this._list.length;i++){
            let product = this.findProduct(this._list[i]);
            list.push(product);
        }
        return list;
    }
    @computed get totalCount(){

        return 0;
    }
    //  切换type的高度
    @computed get cutProductListHeight(){

    }

}


class Product{
    constructor(productType,productImageUrl,itemModel){
        this.imageUrl = productImageUrl;
        this.type = productType;
        this.name = itemModel.name;
        this.productItemId = itemModel.productItemId;
        this.originalPrice = itemModel.originalPrice;
        this.currentPrice = itemModel.currentPrice;
        this.saleMount = itemModel.saleMount;
        this._selectCount = itemModel.selectCount;
    }
    @observable _selectCount;
    @computed get selectCount(){
        return this._selectCount;
    }

    @action increase(){
        this._selectCount++;
    }
    @action reduce(){
        this._selectCount--;
    }
}

class WaterTicket{
    constructor(productName,productType,productImageUrl,itemModel){
        this.name = productName;
        this.imageUrl = productImageUrl;
        this.type = productType;
        this._productItemModels = itemModel;
    }
    @observable _productItemModels = [];
    @computed get productItemModels(){
        return this._productItemModels;
    }

    @computed get selectCount(){
        let count = 0;
        for(let i = 0;i < this.productItemModels.length;i++){
            count += this.productItemModels[i].selectCount;
        }
        return count;
    }
    @action showProductList(){
        this._show = true;
    }
    @action closeProductList(){
        this._show = false;
    }
    @observable _show = false;
    @computed get show(){
        return this._show;
    }

}


module.exports = ShoppingList;



