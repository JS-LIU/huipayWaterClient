/**
 * Created by LDQ on 2017/7/6.
 */

import {observable, computed,action} from "mobx";
import _h from '../../Util/HB';

import loginService from '../service/loginService';

class AddressList{

    @observable list;
    @observable customAddressInfo;


    constructor(login){
        let self = this;
        self.login = login;
        self.addressList = function(postInfo){
            return _h.ajax.resource('/location/client/deliveryAddress/:action')
                .save({action:"getAddressList"},postInfo,false)
        }.before(function(postInfo,loginInfo){
            postInfo.accessInfo = loginInfo.accessInfo;
            postInfo.user_id = loginInfo.user_id;
            console.log(postInfo);
        });
    }

    @action getAddressList(pageNo,size = 5,sortProperties=[],direction = "DESC"){
        let self = this;

        loginService.listen('loginSucc',function(loginInfo){
            let postInfo = {
                pageInfo:{
                    direction:direction,
                    pageNo:pageNo,
                    size:size,
                    sortProperties:[]
                }
            };
            console.log(postInfo);
            self.addressList(postInfo,loginInfo).done((list)=>{
                console.log(list);
                self.list = list.content;
            })
        });
    }
    @action selectedAddress(address){
        this.customAddressInfo = address;
    }
    findDefault(){
        let self = this;
        function isDefault(addressInfo){
            if(addressInfo.default){
                return addressInfo;
            }
        }
        return self.list.find(isDefault);
    }
}
module.exports = AddressList;