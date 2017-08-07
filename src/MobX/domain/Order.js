/**
 * Created by LDQ on 2017/6/29.
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class Order {

    constructor(login) {
        this.login = login;
        let self = this;
        this.settleOrder = function(postInfo){
            return _h.ajax.resource('/order/client/order/:action')
                .save({action:"settleOrderInfo"},postInfo)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
            postInfo.userId = self.login.postDataAccessInfo.user_id;
            postInfo.clientType = "web";
        });
    }
    @observable _settleInfo = {
        list:[{
            productList:[]
        }],
        totalPrice:0,
        totalProductCount:0
    };
    @computed get settleInfo(){
        return this._settleInfo;
    }
    @action getSettleOrder(list){
        let settleList = this.toSettleList(list);

        let postInfo = {
            list:settleList
        };

        this.settleOrder(postInfo).then((data)=>{
            this._settleInfo = data;
        })
    }
    toSettleList(product){

        if(Array.isArray(product)){
            let productList = [];
            for(let i = 0,len = product.length;i < len;i++){
                productList.push({
                    count:product[i].count,
                    distributeProductId:product[i].distributeProductId,
                    selfProductId:product[i].selfProductId,
                    purchaseProductType:product[i].purchaseProductType
                })
            }
            return [{
                provideShopId:product[0].provideShopId,
                saleShopId:product[0].saleShopId,
                productList:productList
            }]

        }else{
            let basicInfo = product.showProduct.productBasicInfo;
            let settleProduct = {
                count:product.count,
                distributeProductId:basicInfo.distributeProductId,
                selfProductId:basicInfo.selfProductId,
                purchaseProductType:basicInfo.purchaseProductType
            };
            return [{
                provideShopId:basicInfo.provideShopId,
                saleShopId:basicInfo.saleShopId,
                productList:[settleProduct]
            }];
        }
    }
}
module.exports = Order;