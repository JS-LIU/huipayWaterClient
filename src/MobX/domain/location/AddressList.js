/**
 * Created by LDQ on 2017/7/6.
 */

import {observable, computed,action,autorun} from "mobx";
import _h from '../../../Util/HB';


class AddressList{
    constructor(login){
        let self = this;
        self.login = login;
        self.addressList = function(postInfo){
            return _h.ajax.resource('/location/client/deliveryAddress/:action')
                .save({action:"getAddressList"},postInfo,false)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
            postInfo.userId = self.login.postDataAccessInfo.user_id;
        });
    }

    @observable list = [];
    @computed get hasList(){
        if(this.list.length > 0){
            return true;
        }
        return false;
    }

    @observable customAddressInfo;
    @observable inputInfo = {
        receiveName:'',
        phoneNum:'',
        specificAddress:''
    };

    @action getAddressList(pageNo = 0,size = 50,sortProperties=[],direction = "DESC"){
        let self = this;

        let postInfo = {
            pageInfo:{
                direction:direction,
                pageNo:pageNo,
                size:size,
                sortProperties:[]
            }
        };
        self.addressList(postInfo).done((list)=>{
            self.list = list.content;
        })
    }
    @action selected(address){
        console.log(address);
        this.customAddressInfo = address;
    }

}
module.exports = AddressList;