/**
 * Created by LDQ on 2017/7/6.
 */

import {observable, computed,action,autorun} from "mobx";
import _h from '../../../Util/HB';
import CustomAddress from './CustomAddress';

class AddressList{
    constructor(login){
        this.login = login;
        let self = this;
        this.addressList = function(postInfo){
            return _h.ajax.resource('/delivery/:action')
                .save({action:"addressList"},postInfo,false)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
        this.createAddress = function(postData){
            return _h.ajax.resource("/delivery/:action")
                .save({action:"create"},postData,false)
        }.before((postData)=>{
            postData.accessInfo = self.login.postDataAccessInfo.accessInfo;
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

    @action getAddressList(){
        this.addressList({}).done((list)=>{
            this._list = list;
        })
    }
    @action create(customInfo,mapInfo){
        let postData = {
            addressTagId:customInfo.addressTagId,
            name:customInfo.name,
            phone:customInfo.num,
            createAddressModel:{
                adCode:mapInfo.adcode,
                appendAddress:customInfo.speAddress,
                cityCode:mapInfo.citycode,
                cityName:mapInfo.city,
                latitude:mapInfo.latitude,
                longtitude:mapInfo.longitude,
                mappingAddress:mapInfo.receiveAddress,
                pCode:mapInfo.pcode,
                pName:mapInfo.province
            }
        };
        this.createAddress({createAddressModel:postData}).then((data)=>{
            console.log(data);
        })
    }
    @observable _list = [];
    @computed get list(){
        for(let i = 0;i < this._list.length;i++){
            this._list[i].receiveAddress = this._list[i].address.mapAddress + (this._list[i].address.appendingAddress||"");
        }

        return this._list;
    }


}
module.exports = AddressList;