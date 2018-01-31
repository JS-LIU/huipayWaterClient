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

    splitByStatus(waterTicketList){
        for(let i = 0;i < waterTicketList.length;i++){
            if(waterTicketList[i].status === "未使用"){
                this._list.push(waterTicketList[i]);
            }else{
                this._cantUseList.push(waterTicketList[i]);
            }
        }
    }


    @action getList(func = ()=>{return null},history){
        this.getTicketList({}).then((data)=>{

            //  可以使用列表
            this._list = [];

            //  已经使用列表
            this._cantUseList = [];
            let waterTicketList = data.userWaterTicketModelList;
            this.splitByStatus(waterTicketList);
            func();
        }).catch((data)=>{
            if(data.responseJSON.message === "需要用户正式登录"){
                history.push('/login');
            }
        })
    }
    //  可使用
    @observable _list = [];

    //  已经使用列表
    @observable _cantUseList = [];
    @computed get cantUseList(){
        return this._cantUseList;
    }
    //  水票列表
    @computed get list(){
        return this._list;
    }
    @action getUseTicket(useTicketList){
        /**
         * 重新获取水票列表 防止水票列表有变化（被使用了 购买了等情况）
         */
        this._useTicket = [];
        this.getList(()=>{
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