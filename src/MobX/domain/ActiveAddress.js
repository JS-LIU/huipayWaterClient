/**
 * Created by LDQ on 2017/6/20.
 */
import {observable, computed,action,autorun} from "mobx";
import loginService from '../service/loginService';


/**
 * 自主选择使用的地址
 * @param addressList
 * @returns {*}
 */
let customAddress = function(addressList){
    let customAddressInfo = addressList.customAddressInfo;
    if(typeof customAddressInfo !== 'undefined'){
        return {
            info:customAddressInfo,
            state:'customSelected'
        };
    }else{
        return 'nextSuccessor';
    }
};

// /**
//  * 默认地址
//  * @param addressList
//  * @returns {*}
//  */
// let defaultAddress = function(addressList){
//     let list = addressList.getAddressList(0,50);
//
//     let defaultAddressInfo = addressList.findDefault(list);
//     if(typeof defaultAddressInfo !== 'undefined'){
//         return {
//             state:"default",
//             info:defaultAddressInfo
//         }
//     }else{
//         return 'nextSuccessor';
//     }
// };

let currentPosition = function(addressList,autoMap){
    autoMap.getCurrentLocation();
    console.log(autoMap.showLocationInfo);
    return {
        state:"currentPos",
        info:autoMap.showLocationInfo
    }
};

class ActiveAddress{
    // @observable currentAddressInfo = {};

    constructor(addressList,autoMap){
        this.addressList = addressList;
        this.autoMap = autoMap;
    }

    @computed get address(){
        let addressList = this.addressList;
        let autoMap = this.autoMap;
        return customAddress.after(currentPosition)(addressList,autoMap);
    }
}


module.exports = ActiveAddress;



























