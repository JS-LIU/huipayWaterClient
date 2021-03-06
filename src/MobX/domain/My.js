import {observable, computed,action} from "mobx";
import _h from '../../Util/HB';

class My{
    constructor(login){
        this.login = login;
        let self = this;
        let ajax = _h.ajax.resource('/user/:action');
        this.getInfo = function(postInfo){
            return ajax.save({action:"me"},postInfo)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
        this.getTicketList = function(postInfo){
            return ajax.save({action:"watertickets"},postInfo)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
    }

    @action getUserInfo(history){
        this.getInfo({}).then((data)=>{
            this._userInfo = data;
        }).catch((data)=>{
            console.log(data);
            if(data.responseJSON.message === "需要用户正式登录"){
                history.push('/login');
            }

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