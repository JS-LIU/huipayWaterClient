/**
 * Created by LDQ on 2017/9/7
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class AddressOperator{
    constructor(map,addressList,activeAddress,login){
        this.autoMap = map;
        this.addressList = addressList;
        this.activeAddress = activeAddress;
        this.login = login;
    }
    @computed get receiveList(){
        return this.addressList.list;
    }
    @computed get active(){
        return this.activeAddress.address;
    }
    @computed get selected(){
        return this.addressList.selected;
    }

}
module.exports = AddressOperator;



