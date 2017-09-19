import {observable, computed,action} from "mobx";
import _h from '../../Util/HB';
class My{
    constructor(login){
        this.login = login;
        let self = this;
        this.getInfo = function(postInfo){
            return _h.ajax.resource('user/:action')
                .save({action:"me"},postInfo)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
        this.getTicketList = function(postInfo){
            return _h.ajax.resource('/user/:action')
                .save({action:"watertickets"},postInfo)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
    }

    @action getUserInfo(){
        this.getInfo({}).then((data)=>{
            this._userInfo = data;
        })
    }
    @observable _userInfo = {};
    @computed get userInfo(){
        return this._userInfo;
    }


    @action getUserTickets(){
        this.getTicketList({}).then((data)=>{
            this._waterTicketList = data.userWaterTicketModelList;
        })
    }
    @observable _waterTicketList = [];
    @computed get waterTicketList(){
        return this._waterTicketList;
    }
}
module.exports = My;