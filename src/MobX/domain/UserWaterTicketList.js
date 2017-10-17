/**
 * Created by LDQ on 2017/10/16
 */
import {observable, computed,action} from "mobx";
import _h from '../../Util/HB';
import Ticket from './money/Ticket';

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
            for(let i = 0,len = data.userWaterTicketModelList.length;i < len;i++){
                let ticketInfo = data.userWaterTicketModelList[i];
                list.push(new Ticket(ticketInfo,this.login));
            }
            this._list = list;
        })
    }
    @observable _list = [];
    @computed get list(){
        return this._list;
    }
    @computed get activeTicket(){
        return this._activeTicket;
    }
    @action setActiveTicket(waterTicket){
        this._activeTicket = waterTicket;
    }
    @observable _activeTicket = {};


}
module.exports = UserWaterTicketList;