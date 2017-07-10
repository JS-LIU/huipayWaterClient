/**
 * Created by LDQ on 2017/6/20.
 */
import {observable, computed,action} from "mobx";
import loginService from './loginService';


/**
 * 自主选择使用的地址
 * @param addressList
 * @returns {*}
 */
let customAddress = function(addressList){
    let addressInfo = addressList.customAddressInfo;
    if(typeof addressInfo !== 'undefined'){
        return addressInfo;
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
    let addressInfo = addressList.findDefault();
    if(typeof addressInfo !== 'undefined'){
        return addressInfo
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

let getActivityLocation = function(addressList,autoMap){
    loginService.listen('loginSucc',function(){
        locationService.currentAddressInfo = customAddress.after(defaultAddress).after(currentPosition)(addressList,autoMap);
        console.log(locationService.currentAddressInfo);
    })
};

let locationService = {
    getActivityLocation:getActivityLocation,
    @observable currentAddressInfo:{province:'',city:'',district:'',township:'',street:'',streetNumber:'',adressId:'',lng:'',lat:''}
};
module.exports = locationService;