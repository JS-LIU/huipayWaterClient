/**
 * Created by LDQ on 2017/10/16
 */
import {observable, computed,action} from "mobx";
import _h from '../../Util/HB';

class UseWaterTicketList{
    constructor(login,shopInfo){
        this.login = login;
        this.shopId = shopInfo.shopId;
        let self = this;
        this.getTicketList = function(postInfo){
            return _h.ajax.resource('/user/:action')
                .save({action:"watertickets"},postInfo)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
    }

    @action getList(){
        this.getTicketList({}).then((data)=>{
            this._list = data.userWaterTicketModelList;
        })
    }
    @observable _list = [];
    //  水票列表
    @computed get list(){
        return this._list;
    }
    @action getUseTicket(useTicketList){
        /**
         * 重新获取水票列表 防止水票列表有变化（被使用了 购买了等情况）
         */
        this._useTicket = [];
        this.getTicketList({}).then((data)=>{
            this._list = data.userWaterTicketModelList;
            for(let i = 0; i < this._list.length; i++){
                let self = this;
                function canUseTicket(item){
                    if(item.ticketId === self._list[i].userTicketId){
                        return item;
                    }
                }
                let useTicket = useTicketList.find(canUseTicket);

                if(useTicket){
                    this._useTicket.push(new Ticket(this.shopId,this.login,this._list[i],true,useTicket));
                }else{
                    console.log(this._list[i]);
                    this._useTicket.push(new Ticket(this.shopId,this.login,this._list[i],false));
                }

            }
        });
    }
    @observable _useTicket;
    //  使用水漂列表
    @computed get useTicket(){
        return this._useTicket;
    }

}
class Ticket{
    constructor(shopId,login,ticketInfo,isCanUse,useTicketInfo = {}){
        this.shopId = shopId;
        this.ticketId = ticketInfo.userTicketId;
        this.count = ticketInfo.count;
        this.brandName = ticketInfo.brandName;


        this.productItemId = useTicketInfo.productItemId;
        this.canUseCount = useTicketInfo.canUseCount;
        this._selectUseCount = useTicketInfo.selectUseCount;
        this.isCanUse = isCanUse;


        this.login = login;
        this.increaseTicket = function(postInfo){
            return _h.ajax.resource('/ticket/:action')
                .save({action:"increase"},postInfo)
        }.before((postInfo)=>{
            postInfo.accessInfo = this.login.postDataAccessInfo.accessInfo;
        });
        this.reduceTicket = function(postInfo){
            return _h.ajax.resource('/ticket/:action')
                .save({action:"decrease"},postInfo)
        }.before((postInfo)=>{
            postInfo.accessInfo = this.login.postDataAccessInfo.accessInfo;
        });
    }


    @observable _selectUseCount;
    @computed get selectUseCount(){
        return this._selectUseCount;

    }
    @action increase(){

        let postInfo = {
            shopId:this.shopId,
            productItemId:this.productItemId,
            ticketId:this.ticketId,
        };
        this._selectUseCount++;
        this.increaseTicket(postInfo).then((data)=>{
            console.log(data)
        }).catch((data)=>{
            console.log(data);
        })
    }


    @action reduce(){
        let postInfo = {
            shopId:this.shopId,
            productItemId:this.productItemId,
            ticketId:this.ticketId,
        };

        this._selectUseCount--;
        this.reduceTicket(postInfo).then((data)=>{
            console.log(data)
        }).catch((data)=>{
            console.log(data);
        })
    }
}

module.exports = UseWaterTicketList;