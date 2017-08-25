import {observable, computed,action,autorun} from "mobx";

class ShopShoppingCart_mock{
    @action getList(list){
        this._list = list;
    }
    @observable _list = [];
    @computed get list(){
        let list = [];
        console.log('list:',this._list);

        for(let i = 0,len = this._list.length;i < len;i++){
            this._list.map((typeList,index)=>{
                console.log(typeList);
            });
            // console.log(this._list[i]);
            // for(let j = 0;j < this._list[i].productList.length;j++){
            //
            //     //  如果 商品数量大于0 应该在购物车中可以找到
            //     if(this._list[i].productList[j].info.count > 0){
            //
            //         let product = false;
            //
            //         let equalId = (item)=>{
            //             return item.info.id === this._list[i].productList[j].info.id
            //
            //         };
            //         product = list.find(equalId);
            //         //  购物车中的商品不能重复
            //         if(!product){
            //             list.push(this._list[i].productList[j]);
            //         }
            //     }
            // }
        }
        return list;
    }
}
module.exports = ShopShoppingCart_mock;