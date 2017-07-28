/**
 * Created by LDQ on 2017/7/6.
 */

import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';


class ReceiveAddress{

    @observable list = [];
    @observable customAddressInfo;
    @observable inputInfo = {
        receiveName:'',
        phoneNum:'',
        specificAddress:''
    };

    constructor(login,autoMap){
        let self = this;
        self.autoMap = autoMap;
        self.login = login;
        self.addressList = function(postInfo){
            return _h.ajax.resource('/location/client/deliveryAddress/:action')
                .save({action:"getAddressList"},postInfo,false)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
            postInfo.user_id = self.login.postDataAccessInfo.user_id;
        });

        this.createAddress = function(postData){
            return _h.ajax.resource("/location/client/deliveryAddress/:action")
                .save({action:"createAddress"},postData)
        }.before((postData)=>{
            postData.accessInfo = self.login.postDataAccessInfo.accessInfo;
            postData.user_id = self.login.postDataAccessInfo.user_id;
        });

        this.removeAddress = function(postData){
            return _h.ajax.resource("/location/client/deliveryAddress/:action")
                .save({action:"deleteAddress"},postData)
        }.before(((postData)=>{
            postData.accessInfo = self.login.postDataAccessInfo.accessInfo;
        }));
        this.setDefault = function(postData){
            return _h.ajax.resource("/location/client/deliveryAddress/:action")
                .save({action:"setDefaultAddress"},postData)
        }.before(((postData)=>{
            postData.accessInfo = self.login.postDataAccessInfo.accessInfo;
            postData.user_id = self.login.postDataAccessInfo.user_id;
        }))

    }
    //  todo 这里可写成autorun 只在new 的时候获取一次 增删 做成本地操作
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
            console.log('AddressList-action:getAddressList======',list);
            self.list = list.content;
        })
    }
    @action selectedAddress(address){
        this.customAddressInfo = address;
    }
    @action create(){
        let postData = {
            pcode:this.autoMap.showLocationInfo.pcode,
            citycode:this.autoMap.showLocationInfo.citycode,
            districtcode:this.autoMap.showLocationInfo.districtcode,
            latitude:this.autoMap.showLocationInfo.latitude,
            longitude:this.autoMap.showLocationInfo.longitude,
            phoneNum:this.receiveAddressInfo.phoneNum,
            receiveAddress:this.autoMap.showLocationInfo.receiveAddress + this.inputInfo.specificAddress,
            receiveName:this.receiveAddressInfo.receiveName
        };
        this.createAddress(postData).then((data)=>{
            console.log(data);
        })
    }
    @action remove(item){
        let deliveryAddressId = item.id;
        this.removeAddress({
            deliveryAddressId:deliveryAddressId
        }).then((data)=>{
            let index = this.findEqualAddressId(item);
            this.list.splice(index,1);
        })

    }
    @action edit(){

    }
    @action setDefault(item){
        let index = this.findEqualAddressId(item);
        this.list[index].default = !item.default;

        if(!item.default){
            this.setDefault({
                addressId:item.id,
                default:true
            }).then((data)=>{
                console.log(data);
            });

        }
    }
    findEqualAddressId(address){
        let isEqualId = function(item){
            if(item.id === address.id){
                return item
            }
        };
        return this.list.findIndex(isEqualId);
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
module.exports = ReceiveAddress;