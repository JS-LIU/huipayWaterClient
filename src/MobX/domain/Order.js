/**
 * Created by LDQ on 2017/6/29.
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class Order {

    constructor(login,shoppingList) {
        this.login = login;
        this.shoppingList = shoppingList;
        let self = this;
        this.settleOrder = function(postInfo,action){
            return _h.ajax.resource('/order/confirmOrderInfo/:action')
                .save({action:action},postInfo)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
        this.createOrder = function(postInfo){
            return _h.ajax.resource('/order/:action')
                .save({action:"create"},postInfo)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
    }


    @observable _totalUsedTicket;
    @observable _shopName = "";
    @action getSettleOrder(postData,action,history){
        this.settleOrder(postData,action).then((data)=>{
            this._totalUsedTicket = data.orderTicketInfo.totalUsed;
            this._shopName = data.shopName;


            //  使用的水票
            this._ticketList = data.orderTicketInfo.userTicketModels;

            let orderProductInfo = data.orderProductInfo;
            this._totalCount =  orderProductInfo.totalCount;
            this._totalPayMount = orderProductInfo.totalPayMount;
            this._totalPrice = orderProductInfo.totalPrice;

            /***
             * productList实际应该是activeShoppingCart
             * 如果没有直接用水票购买的话，可以没有这个tricky的方法
             * 如果直接用水票购买的返回值中有该商品是哪个店铺的哪个种类的话也可以没有这个tricky的方法
             */
            this._productList = [];
            let list = orderProductInfo.productItemModels;
            for(let i = 0,len = list.length;i < len;i++){

                if(this.orderType.userTicketId){
                    this._productList.push(new OrderProduct(this.login,list[i],true,this._orderType));
                }else{
                    this._productList.push(new OrderProduct(this.login,list[i]));
                }
            }
        }).catch((data)=>{
            console.log(data);
            history.push('/login');
        })

    }

    @observable _orderType;
    @action setOrderType(type){
        this._orderType = type;
    }
    @computed get orderType(){
        return this._orderType;
    }

    //  结算商品列表
    @observable _productList = [];
    @computed get productList(){
        return this._productList;
    }
    @computed get totalUsedTicket(){
        return this._totalUsedTicket;
    }
    @computed get shopName(){
        return this._shopName;
    }

    @action createOrderId(addressId,payType,shopId){
        let postData = {
            deliveryAddressId:addressId,
            payType:payType,
            shopId:shopId
        };
        this.createOrder(postData).then((data)=>{
            this._info = data;
        })
    }
    @observable _info = {};
    @computed get info(){
        return this._info;
    }

    //  view销毁时 调用防止 再次结算出现闪屏现象
    @action clearList(){
        this._productList = [];
    }

    @observable _ticketList = [];
    @computed get ticketList(){
        return this._ticketList;
    }
    @observable _totalCount;
    @computed get totalCount(){
        return this._totalCount;
    }
    @observable _totalPayMount;
    @computed get totalPayMount(){
        return this._totalPayMount;
    }
    @observable _totalPrice;
    @computed get totalPrice(){
        return this._totalPrice;
    }
}
class OrderProduct{
    constructor(login,info,isCanOperate = false,orderType){
        this.name = info.name;
        this.currentPrice = info.currentPrice;
        this.originalPrice = info.originalPrice;
        this.productImage = info.productImage;
        this.productItemId = info.productItemId;
        this.saleMount = info.saleMount;
        this._selectCount = info.selectCount;
        this.totalPayRmb = info.totalPayRmb;
        this.totalPrice = info.totalPrice;
        this.isCanOperate = isCanOperate;
        this.orderType = orderType;

        this.login = login;
        let self = this;
        let ajax = _h.ajax.resource('/shop/shoppingcart/:action');
        this.increaseProduct = function (postInfo) {
            return ajax.save({action: "increase"}, postInfo)
        }.before(function (postInfo) {
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
        this.decreaseProduct = function (postInfo) {
            return ajax.save({action: "decrease"}, postInfo)
        }.before(function (postInfo) {
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
        this.settleOrder = function(postInfo,action){
            return _h.ajax.resource('/order/confirmOrderInfo/:action')
                .save({action:action},postInfo)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
    }

    @observable _selectCount;
    @computed get selectCount(){
        return this._selectCount;
    }
    @action increase(){
        this._selectCount++;


        this.increaseProduct({
            shopId:1,           //  todo shopId始终为1
            productItemId:this.productItemId
        }).then((data)=>{
            this.settleOrder(this.orderType,"default")
        })
    }
    @action reduce(){
        if(this._selectCount > 1){
            this._selectCount--;
        }
        this.decreaseProduct({
            shopId:1,           //  todo shopId始终为1
            productItemId:this.productItemId
        }).then((data)=>{
            this.settleOrder(this.orderType,"default")
        })
    }
}

module.exports = Order;