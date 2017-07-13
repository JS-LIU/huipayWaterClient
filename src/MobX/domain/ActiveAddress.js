/**
 * Created by LDQ on 2017/6/20.
 */
import {observable, computed,action} from "mobx";
import loginService from '../service/loginService';


/**
 * 自主选择使用的地址
 * @param addressList
 * @returns {*}
 */
let customAddress = function(addressList){
    let customAddressInfo = addressList.customAddressInfo;
    if(typeof customAddressInfo !== 'undefined'){
        return customAddressInfo;
    }else{
        return 'nextSuccessor';
    }
};

/**
 * 默认地址
 * @param addressList
 * @returns {*}
 */
let defaultAddress = function(addressList){
    let list = addressList.getAddressList(0,50);

    let defaultAddressInfo = addressList.findDefault(list);
    if(typeof defaultAddressInfo !== 'undefined'){
        return defaultAddressInfo
    }else{
        return 'nextSuccessor';
    }
};

let currentPosition = function(addressList,autoMap){
    autoMap.currentLocationInfo();
    return {
        province:autoMap.province,
        city:autoMap.city,
        district:autoMap.district,
        township:autoMap.township,
        street:autoMap.street,
        streetNumber:autoMap.streetNumber,
        lng:autoMap.lng,
        lat:autoMap.lat,
    }
};

class ActiveAddress{
    @observable currentAddressInfo = {};

    constructor(addressList,autoMap){
        this.addressList = addressList;
        this.autoMap = autoMap;
    }

    @action getActivityLocation(){
        let self = this;
        let addressList = self.addressList;
        let autoMap = self.autoMap;
        self.currentAddressInfo = customAddress.after(defaultAddress).after(currentPosition)(addressList,autoMap);
        console.log(self.currentAddressInfo);
    }

}


module.exports = ActiveAddress;



























