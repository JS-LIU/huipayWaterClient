/**
 * Created by LDQ on 2017/9/11
 */
import {observable, computed,action,autorun} from "mobx";
import WaterTicket from './WaterTicket';

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
        let count = 0;
        for(let i = 0;i < this.list.length;i++){
            count += this.list[i].selectCount;
        }
        return count;
    }

}
module.exports = ProductList;