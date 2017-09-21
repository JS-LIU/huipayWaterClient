/**
 * Created by LDQ on 2017/9/21
 */
import {observable, computed,action} from "mobx";
import _h from '../../Util/HB';
class OrderList{
    constructor(login){
        this.login = login;
        let self = this;
        this.getOrder = function(postInfo){
            return _h.ajax.resource('/order/:action')
                .save({action:"orderList"},postInfo)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
    }
    @action getOrderList(type){
        this.getOrder({
            orderType:type
        }).then((data)=>{
            this._list = data;
        })
    }
    @observable _list = [{productItemModels:[]}];
    @computed get list(){
        return this._list;
    }
    @observable _tagList = [{name:"全部",selected:true},{name:"待付款",selected:false},{name:"待收货",selected:false},{name:"待评价",selected:false}];
    @action cutTag(name){
        for(let i = 0 ;i < this._tagList.length;i ++){
            if(this._tagList[i].name === name){
                this._tagList[i].selected = true;
            }else{
                this._tagList[i].selected = false;
            }
        }
    }
    @computed get tagList(){
        return this._tagList;
    }

}
module.exports = OrderList;