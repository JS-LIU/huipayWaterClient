/**
 * Created by LDQ on 2017/10/16
 */
import {observable, computed,action} from "mobx";
import _h from '../../Util/HB';

class UserWaterTicketList{
    constructor(login){
        this.login = login;
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
        this._userTicket = [];
        this.getTicketList({}).then((data)=>{
            this._list = data.userWaterTicketModelList;
            for(let i = 0; i < useTicketList.length; i++){
                function canUseTicket(item){
                    if(item.userTicketId === useTicketList[i].ticketId){
                        return item;
                    }
                }
                let ticket = this.list.find(canUseTicket);

                if(ticket){
                    this._userTicket.push(new Ticket(this.login,ticket,true,useTicketList[i]));
                }else{
                    this._userTicket.push(new Ticket(this.login,ticket,false));
                }

            }
        });
    }
    @observable _userTicket;
    //  使用水漂列表
    @computed get userTicket(){
        return this._userTicket;
    }

}
class Ticket{
    constructor(login,ticketInfo,isCanUse,useTicketInfo = {}){

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
        this._selectUseCount++;
        this.increaseTicket({
            productItemId:this.productItemId,
            ticketId:this.ticketId,
            shopId:1                //  todo shopId始终为1
        }).then((data)=>{
            console.log(data)
        }).catch((data)=>{
            console.log(data);
        })
    }


    @action reduce(){
        this._selectUseCount--;
        this.reduceTicket({
            productItemId:this.productItemId,
            ticketId:this.ticketId,
            shopId:1                //  todo shopId始终为1
        }).then((data)=>{
            console.log(data)
        }).catch((data)=>{
            console.log(data);
        })
    }
}

module.exports = UserWaterTicketList;