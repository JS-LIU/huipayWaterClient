/**
 * Created by LDQ on 2017/7/6.
 */

import {observable, computed,action,autorun} from "mobx";
import _h from '../../../Util/HB';
import CustomAddress from './CustomAddress';

class AddressList{
    constructor(login,position){
        this.login = login;
        this.position = position;
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
            return _h.ajax.resource("/delivery/:action")
                .save({action:"delete"},postData)
        }.before(((postData)=>{
            postData.accessInfo = self.login.postDataAccessInfo.accessInfo;
        }));
        this.editAddress = function(postData){
            return _h.ajax.resource("/delivery/:action")
                .save({action:"update"},postData)
        }.before(((postData)=>{
            postData.accessInfo = self.login.postDataAccessInfo.accessInfo;
        }));
    }

    @action getAddressList(){
        this.addressList({}).done((list)=>{
            this._list = list;
        })
    }
    @action create(userInfo,tagId,mapInfo){
        let postData = {
            addressTagId:tagId,
            name:userInfo.name,
            phone:userInfo.phoneNum,
            createAddressModel:{
                adCode:mapInfo.adcode,
                appendAddress:mapInfo.appendingAddress,
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
    @action edit(userInfo,tagId,mapInfo,id){
        let postData = {
            createAddressModel:{
                addressTagId:tagId,
                name:userInfo.name,
                phone:userInfo.phoneNum,
                createAddressModel:{
                    adCode:mapInfo.adcode,
                    appendAddress:mapInfo.appendingAddress,
                    cityCode:mapInfo.citycode,
                    cityName:mapInfo.city,
                    latitude:mapInfo.latitude,
                    longtitude:mapInfo.longitude,
                    mappingAddress:mapInfo.receiveAddress,
                    pCode:mapInfo.pcode,
                    pName:mapInfo.province
                },
            },
            id:id
        };
        this.editAddress(postData).then((data)=>{
            console.log(data);
        });
    }
    @action remove(item){
        this.removeAddress({
            deliveryAddressId:item.id
        }).then(()=>{
            function equalId(ele){
                return ele.id === item.id
            }

            let index = this.list.findIndex(equalId);
            this.list.splice(index,1);


        }).catch(()=>{
            console.log("删除失败")
        });
    }


    //  地址列表（可配送+不可配送）
    @observable _list = [];
    @computed get list(){
        for(let i = 0;i < this._list.length;i++){
            this._list[i].receiveAddress = this._list[i].address.mapAddress + (this._list[i].address.appendingAddress||"");
        }

        return this._list;
    }

    //  地址列表是否可以编辑
    @action setCanEdit(canEdit){
        this._canEdit = canEdit;
    }
    @observable _canEdit = false;
    @computed get canEdit(){
        return this._canEdit;
    }

    //  可配送地址
    //  不可配送地址

    //  地址列表中被选中的地址
    @observable _activeAddress;
    @computed get activeAddress(){
        for(let i = 0;i < this.list.length;i++){
            if(this.list[i].id === this.position.homePageAddress.id){
                return this.list[i];
            }
        }
        return null;

    }

    @observable _operateStrategy = "create";
    @computed get operateStrategy(){
        return this._operateStrategy;
    }
    @action setOperateStrategy(strategy){
        this._operateStrategy = strategy;
    }
}
module.exports = AddressList;