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
        let list = [];
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


        for(let i = 0; i < useTicketList.length; i++){
            function canUseTicket(item){
                if(item.userTicketId === useTicketList[i].ticketId){
                    return item;
                }
            }
            let ticket = this.list.find(canUseTicket);

            if(ticket){
                this._userTicket.push(new Ticket(ticket,true,useTicketList[i]));
            }else{
                this._userTicket.push(new Ticket(ticket,false));
            }

        }
    }
    @observable _userTicket = [];
    //  使用水漂列表
    @computed get userTicket(){
        return this._userTicket;
    }

}
class Ticket{
    constructor(ticketInfo,isCanUse,useTicketInfo = {}){
        this.isCanUse = isCanUse;

        this.ticketId = ticketInfo.userTicketId;
        this.totalCount = ticketInfo.count;
        this.brandName = ticketInfo.brandName;
        this.canUseCount = ticketInfo.canUseCount;


        this.productItem = useTicketInfo.productItem;
        this._selectUseCount = useTicketInfo.selectUseCount;
    }
    @observable _selectUseCount;
    @computed get selectUseCount(){
        return this._selectUseCount;
    }
    @action increase(){
        if(this._selectUseCount < this.canUseCount){
            this._selectUseCount++;
        }
    }
    @action reduce(){
        if(this._selectUseCount > 0){
            this._selectUseCount--;
        }
    }
}

module.exports = UserWaterTicketList;