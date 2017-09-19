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
            return _h.ajax.resource('/order/confirmOrderInfo/:action')
                .save({action:"init"},postInfo)
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
    @action getSettleOrder(shopId){
        this.settleOrder({
            shopId:shopId
        }).then((data)=>{
            this._orderInfo = data.orderProductInfo;
            this._ticketList = data.orderTicketInfo.userTicketModels;
            this._totalUsedTicket = data.orderTicketInfo.totalUsed;
            this._shopName = data.shopName;
        })

    }
    @computed get shopName(){
        return this._shopName;
    }
}
module.exports = Order;