/**
 * Created by LDQ on 2017/7/6.
 */

import {observable, computed,action} from "mobx";
import _h from '../../Util/HB';


class AddressList{

    @observable list;
    @observable customAddressInfo;


    constructor(login){
        let self = this;
        self.login = login;
        self.addressList = function(postInfo){
            return _h.ajax.resource('/location/client/deliveryAddress/:action')
                .save({action:"getAddressList"},postInfo,false)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
            postInfo.user_id = self.login.postDataAccessInfo.user_id;
        });
    }

    @action getAddressList(pageNo,size = 5,sortProperties=[],direction = "DESC"){
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
            console.log('AddressList-action:getAddressList======',list);
            self.list = list.content;
        })
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