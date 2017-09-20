/**
 * Created by LDQ on 2017/9/17
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../../Util/HB';
class CustomAddress{
    //  地址数据临时存储区
    @observable _info = {};
    @observable _tag = {};

    @computed get info(){
        return this._info;
    }
    //  设置姓名
    @action setName(name){
        this._info.name = name;
    }
    //  设置电话
    @action setNum(num){
        this._info.num = num;
    }
    //  设置地址
    @action setSpeAddress(address){
        this._info.speAddress = address;
    }
    //  编辑地址 装载 已有的信息
    @action setInfo(addressInfo){
        this._info = addressInfo;
    }
    //  设置 标签
    @action setTag(tag){
        if(tag.selected){
            this._tag = tag;
        }else{
            this._tag = {};
        }

    }
    @computed get tag(){
        return this._tag;
    }
}


module.exports = CustomAddress;

