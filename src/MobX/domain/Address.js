/**
 * Created by LDQ on 2017/7/20.
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class Address{
    constructor(login,autoMap,activeAddress){
        this.login = login;
        this.autoMap = autoMap;
        let self = this;
        this.createAddress = function(postData){
            return _h.ajax.resource("/location/client/deliveryAddress/:action")
                .save({action:"createAddress"},postData)
        }.before((postData)=>{
            postData.accessInfo = self.login.postDataAccessInfo.accessInfo;
            postData.user_id = self.login.postDataAccessInfo.user_id;
        })
    }

    @observable receiveAddressInfo = {
        receiveName:'',
        phoneNum:'',
        specificAddress:''
    };
    @action create(){
        let postData = {
            pcode:this.autoMap.showLocationInfo.pcode,
            citycode:this.autoMap.showLocationInfo.citycode,
            districtcode:this.autoMap.showLocationInfo.districtcode,
            latitude:this.autoMap.showLocationInfo.latitude,
            longitude:this.autoMap.showLocationInfo.longitude,
            phoneNum:this.receiveAddressInfo.phoneNum,
            receiveAddress:this.autoMap.showLocationInfo.receiveAddress + this.receiveAddressInfo.specificAddress,
            receiveName:this.receiveAddressInfo.receiveName
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