/**
 * Created by LDQ on 2017/9/17
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../../Util/HB';
import AddressList from './AddressList';

class AddressOperator{
    constructor(autoMap,login){
        this.autoMap = autoMap;
        this.login = login;
        this.addressList = new AddressList(login);

        this.createAddress = function(postData){
            return _h.ajax.resource("/location/client/deliveryAddress/:action")
                .save({action:"createAddress"},postData)
        }.before((postData)=>{
            postData.accessInfo = self.login.postDataAccessInfo.accessInfo;
            postData.userId = self.login.postDataAccessInfo.user_id;
        });

        this.removeAddress = function(postData){
            return _h.ajax.resource("/location/client/deliveryAddress/:action")
                .save({action:"deleteAddress"},postData)
        }.before(((postData)=>{
            postData.accessInfo = self.login.postDataAccessInfo.accessInfo;
        }));
        this.editAddress = function(postData){
            return _h.ajax.resource("/location/client/deliveryAddress/:action")
                .save({action:"updataAddress"},postData)
        }.before(((postData)=>{
            postData.accessInfo = self.login.postDataAccessInfo.accessInfo;
            postData.userId = self.login.postDataAccessInfo.user_id;
            postData.userType = "client";
        }));
    }

    //  地址列表
    @observable _list = [];
    @computed get list(){
        return this._list;
    }
    @action getList(){
        this.addressList.getAddressList();
        this.addressList.list = this._list;
    }



    @observable _inputInfo = {};
    @action setInputInfo(addressInfo){
        return this._inputInfo = addressInfo;
    }
    @action create(){
        let postData = {
            pcode:this.autoMap.showLocationInfo.pcode,
            citycode:this.autoMap.showLocationInfo.citycode,
            districtcode:this.autoMap.showLocationInfo.districtcode,
            latitude:this.autoMap.showLocationInfo.latitude,
            longitude:this.autoMap.showLocationInfo.longitude,
            phoneNum:this.inputInfo.phoneNum,
            receiveAddress:this.autoMap.showLocationInfo.receiveAddress + this.inputInfo.specificAddress,
            receiveName:this.inputInfo.receiveName
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
            let index = this.findEqualAddressId(item).index;
            this.list.splice(index,1);
        })

    }
    @action edit(item){
        let postData = {
            pcode:this.autoMap.showLocationInfo.pcode,
            citycode:this.autoMap.showLocationInfo.citycode,
            districtcode:this.autoMap.showLocationInfo.districtcode,
            latitude:this.autoMap.showLocationInfo.latitude,
            longitude:this.autoMap.showLocationInfo.longitude,
            phoneNum:this.inputInfo.phoneNum,
            receiveAddress:this.autoMap.showLocationInfo.receiveAddress + this.inputInfo.specificAddress,
            receiveName:this.inputInfo.receiveName,
            deliveryAddressId:item.id
        };
        this.editAddress(postData).then((data)=>{
            console.log(data);
        })
    }
    findEqualAddressId(address){
        let isEqualId = function(item){
            if(item.id === address.id){
                return item
            }
        };
        return {
            index:this.list.findIndex(isEqualId),
            address:this.list.find(isEqualId)
        }
    }
}