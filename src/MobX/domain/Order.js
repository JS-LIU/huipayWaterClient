/**
 * Created by LDQ on 2017/6/29.
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class Order {

    constructor(login) {
        this.login = login;
        this.settleOrder = function(postInfo){
            return _h.ajax.resource('/order/client/order/:action')
                .save({action:"settleOrderInfo"},postInfo)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
            postInfo.user_id = self.login.postDataAccessInfo.user_id;
        });
    }
    @observable settleList = [];
    @observable settleInfo = {
        list:[{
            productList:[]
        }],
        totalPrice:0,
        totalProductCount:0
    };
    @action getSettleOrder(list){
        let postInfo = {
            list:[]
        };

        this.settleOrder(postInfo).then((data)=>{
            this.settleInfo = data;
        })
    }

}
module.exports = Order;