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