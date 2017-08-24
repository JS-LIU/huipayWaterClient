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
                console.log('type:',type);
                this._list = type.list;
            });
    }

    @observable _list = [];
    @computed get list(){
        return this.addProp({productList:[]});
    }
    addProp(prop){
        return Object.assign({},this._list,prop);
    }

}
module.exports = ProductType_mock;