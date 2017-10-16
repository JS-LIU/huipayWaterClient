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
        this.id = ticketInfo.id;
        this.status = ticketInfo.status;
        this._using = false;
    }
    @observable _using = false;
    @action useTicket(ticketList){
        for(let i = 0,len = ticketList.length;i < len;i++){
            ticketList[i]._using = false;
        }
        this._using = true;

    }


}

module.exports = Ticket;
