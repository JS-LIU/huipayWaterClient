import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class ProductType_mock{
    constructor(rem2pxRate,typeHeight){
        this.typeHeight = typeHeight;
        this.rem2pxRate = rem2pxRate;
        this.customerSelectedIndex = false;
    }
    getList(){
        _h.ajax.resource('src/Data/productType.json').query({})
            .then((type)=>{
                this._list = type.list;
            });
    }

    @observable _list = [];
    @computed get list(){
        for(let i = 0,len = this._list.length;i < len;i++){
            Object.assign(this._list[i],{
                productList:[]
            })
        }

        return this._list;
    }

}
module.exports = ProductType_mock;