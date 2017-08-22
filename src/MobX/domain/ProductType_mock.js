import {observable, computed,action,autorun} from "mobx";
let mockProductType = {
    shopId: 1,
    list: [{ id: 1, name: '醇香奶茶' }, { id: 2, name: '鲜果献茶' }, { id: 3, name: '纯黑奶茶' }, { id: 4, name: '水票' }]
};
class ProductType_mock{
    constructor(rem2pxRate,typeHeight){
        this.typeHeight = typeHeight;
        this.rem2pxRate = rem2pxRate;
        this.customerSelectedIndex = false;
    }
    @computed get list(){
        return mockProductType.list
    }
}
module.exports = ProductType_mock;