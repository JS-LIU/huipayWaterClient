/**
 * Created by LDQ on 2017/9/17
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../../Util/HB';
class CustomAddress{

    //  地址数据临时存储区
    @observable _info = {};
    @computed get info(){
        return this._info;
    }
    //  设置姓名
    @action setName(name){
        return this._info.name = name;
    }
    //  设置电话
    @action setNum(num){
        return this._info.num = num;
    }
    //  设置地址
    @action setSpeAddress(address){
        return this._info.speAddress = address;
    }
    //  编辑地址 装载 已有的信息
    @action setInfo(addressInfo){
        this._info = addressInfo;
    }
}
module.exports = CustomAddress;

