/**
 * Created by LDQ on 2017/6/29.
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class Order {

    constructor(login) {
        this.login = login;
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

    @observable _shopId = "";
    @computed get shopId(){
        return this._shopId;
    }
    @observable _shopName = "";
    @action getSettleOrder(postData,action,history){
        this.settleOrder(postData,action).then((data)=>{
            this._shopName = data.shopName;

            //  使用的水票
            this._orderTicket = new OrderTicket(data.orderTicketInfo);

            let orderProductInfo = data.orderProductInfo;
            this._totalCount =  orderProductInfo.totalCount;
            this._totalPayMount = orderProductInfo.totalPayMount;
            this._totalPrice = orderProductInfo.totalPrice;

            this._shopId = data.shopId;
            //  要被结算的商品列表
            this._productList = [];
            let list = orderProductInfo.productItemModels;
            for(let i = 0,len = list.length;i < len;i++){

                if(this.orderType.userTicketId){    //  从水票列表结算单个商品
                    this._productList.push(new OrderProduct(this.shopId,this.login,list[i],true,this._orderType,this._orderTicket));
                    this._productItemId = this._productList[0].productItemId;
                }else{
                    this._productList.push(new OrderProduct(this.shopId,this.login,list[i]));
                    this._productItemId = null;
                }
            }
        }).catch((data)=>{
            console.log(data);
            // g.checkError(data.message,history);
            history.push('/login');
        })
    }
    //  从水票列表结算单个商品
    @observable _productItemId = "";

    @observable _orderTicket = {};
    @computed get orderTicket(){
        console.log(this._orderTicket);
        return this._orderTicket;
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
    @computed get shopName(){
        return this._shopName;
    }

    @action createOrderId(addressId,payType){

        let postData = {
            shopId:this.shopId,
            deliveryAddressId:addressId,
            payType:payType,
            productItemId:this._productItemId
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


class OrderTicket{
    constructor(info){
        this._totalUsedTicket = info.totalUsed;
        this._list = info.userTicketModels;
    }
    @observable _totalUsedTicket;
    @computed get totalUsedTicket(){
        return this._totalUsedTicket;
    }
    @observable _list = [];
    @computed get list(){
        return this._list;
    }
}

class OrderProduct{
    constructor(shopId,login,info,isCanOperate = false,orderType,orderTicket){
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
        this.orderTicket = orderTicket;
        this.shopId = shopId;

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

        if(this.selectCount <= this.orderTicket.list[0].totalCount){
            this.orderTicket._totalUsedTicket = this._selectCount;
            this.orderTicket.list[0].canUseCount = this._selectCount;
            this.orderTicket.list[0].selectUseCount = this._selectCount;
        }
        let postInfo = {
            shopId:this.shopId,
            productItemId:this.productItemId
        };
        this.increaseProduct(postInfo).then((data)=>{
            this.settleOrder(this.orderType,"default")
        })
    }
    @action reduce(){
        this._selectCount--;
        if(this.selectCount <= this.orderTicket.list[0].totalCount){
            this.orderTicket._totalUsedTicket = this._selectCount;
            this.orderTicket.list[0].canUseCount = this._selectCount;
            this.orderTicket.list[0].selectUseCount = this._selectCount;
        }

        let postInfo = {
            shopId:this.shopId,
            productItemId:this.productItemId
        };
        this.decreaseProduct(postInfo).then((data)=>{
            this.settleOrder(this.orderType,"default")
        })
    }
}

module.exports = Order;