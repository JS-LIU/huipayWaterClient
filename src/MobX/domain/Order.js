/**
 * Created by LDQ on 2017/6/29.
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class Order {

    constructor(login) {
        this.login = login;
        let self = this;
        this.settleOrder = function(action,postInfo){
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
    @observable _orderInfo = {productItemModels:[]};
    @computed get orderInfo(){
        return this._orderInfo;
    }
    @computed get totalUsedTicket(){
        return this._totalUsedTicket;
    }
    @observable _totalUsedTicket;
    @observable _shopName = "";
    @action getSettleOrder(action,postData,history){
        this.settleOrder(postData).then((data)=>{
            this._orderInfo = data.orderProductInfo;
            this._ticketList = data.orderTicketInfo.userTicketModels;
            this._totalUsedTicket = data.orderTicketInfo.totalUsed;
            this._shopName = data.shopName;
        }).catch((data)=>{
            console.log(data);
            history.push('/login');
        })

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

}
module.exports = Order;