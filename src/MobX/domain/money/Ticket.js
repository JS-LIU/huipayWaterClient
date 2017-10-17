/**
 * Created by LDQ on 2017/10/16
 */
import {observable, computed,action,autorun} from "mobx";
import Currency from './Currency';


class Ticket extends Currency{
    constructor(ticketInfo,login){
        super(ticketInfo.count,0);
        this.name = ticketInfo.brandName;
        this.restDay = ticketInfo.restDay;
        this.id = ticketInfo.userTicketId;
        this.status = ticketInfo.status;
        this._canUsed = false;
    }
    @observable _canUsed = false;
    @computed get canUsed(){
        return this._canUsed;
    }
}

module.exports = Ticket;
