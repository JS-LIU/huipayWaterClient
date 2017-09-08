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
            this._tagModelList = list.tagModelList;
        });
    }

    @observable _tagModelList = [];
    @observable _recordProductList = [];

    @computed get tagModelList(){
        let list = [];
        for(let i = 0,len = this._tagModelList.length; i < len;i++){
            list.push(new TypeItem(this._tagModelList[i],this._recordProductList));
        }
        return list;
    }

}

class TypeItem{
    constructor(type,recordProductList){
        this.id = type.id;
        this.name = type.name;
        this._selectCount = type.selectCount;
        this._recordProductList = recordProductList;
        //  productList是一个 对象{}
        this._productList = new ProductList(type.productList,this._recordProductList);
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
    constructor(list,recordProductList){
        this._list = list;
        this._recordProductList = recordProductList;

        //  从recordProductList中 找是否有相同的商品
        function findFromRecordProductList(product,recordProductList){
            let recordProduct;
            let isEqualProductItemId = function(productItem){
                if(product.productItemId === productItem.productItemId){
                    return productItem;
                }
            };
            recordProduct = recordProductList.find(isEqualProductItemId);

            return recordProduct;
        }
        this.findOrCreateProduct = (product)=>{

            let newProduct;  //  水票商品/商品

            let productItem; //  单个商品
            let productItemModels = [];

            //  遍历 商品
            for(let i = 0;i < product.productItemModels.length;i++){
                productItem = findFromRecordProductList(product.productItemModels[i],this._recordProductList);

                if(!productItem){
                    productItem = new Product(product.type,product.imageUrl,product.productItemModels[i]);
                    productItemModels.push(productItem);
                    this._recordProductList.push(productItem);
                }
            }

            if(product.type === "waterTicket"){
                newProduct = new WaterTicket(product.name,product.type,product.imageUrl,productItemModels);
            }else{
                newProduct = productItem;
            }
            return newProduct;
        }

    }
    @observable _totalCount = 0;
    @observable _list = [];

    @computed get list(){
        let list = [];
        for(let i = 0;i < this._list.length;i++){
            let product = this.findOrCreateProduct(this._list[i]);
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



