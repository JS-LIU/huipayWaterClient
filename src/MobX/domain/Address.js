/**
 * Created by LDQ on 2017/7/20.
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class Address{
    constructor(login,autoMap,activeAddress){
        this.login = login;
        this.activeAddress = activeAddress;
        let self = this;
        this.createAddress = function(postData){
            return _h.ajax.resource("/location/client/deliveryAddress/:action")
                .save({action:"createAddress"})
        }.before((postData)=>{
            postData.accessInfo = self.login.postDataAccessInfo.accessInfo;
            postData.user_id = self.login.postDataAccessInfo.user_id;
        })
    }

    @action create(pcode,citycode,districtcode,lat,lng,phoneNum,receiveAddress,receiveName){
        let postData = {
            pcode:pcode,
            citycode:citycode,
            districtcode:districtcode,
            latitude:lat,
            longitude:lng,
            phoneNum:phoneNum,
            receiveAddress:receiveAddress,
            receiveName:receiveName
        };
        this.createAddress(postData).then((data)=>{
            console.log(data);
        })
    }
    @action remove(){

    }
    edit(){

    }


}

module.exports = Address;