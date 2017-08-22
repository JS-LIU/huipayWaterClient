import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';
import ShopProduct from './ShopProduct';
import TicketProduct from './TicketProduct';
import ShopShoppingCart_mock from './ShopShoppingCart_mock';

let mockProductList = {
    list: [{
            name: '农夫山泉',
            id: 1,
            sale: 2, //  月售
            introduce: '喝完就死 不信你试试', //   介绍
            tag: [{ id: 1, name: '醇香奶茶' }, { id: 2, name: '鲜果献茶' }], // 分类   merchant -> entity -> ProductCatory
            category: [{ id: 1, name: '热销' }, { id: 2, name: '最难喝' }], //  标签
            count: 2, //  购物车中数量 可以是0
            price: 25, //  单价
            storeNum: 99, // 库存
            shopId: 1,
        },
        {
            name: '怡宝',
            id: 2,
            sale: 2, //  月售
            introduce: '喝完就死 不信你试试', //   介绍
            tag: [{ id: 1, name: '醇香奶茶' }, { id: 3, name: '纯黑奶茶' }], // 分类   merchant -> entity -> ProductCatory
            category: [{ id: 1, name: '热销' }, { id: 3, name: '好喝' }], //  标签
            count: 0, //  购物车中数量 可以是0
            price: 25, //  单价
            storeNum: 99, // 库存
            shopId: 1,
        },
        {
            name: 'xx水票',
            id: 3,
            sale: 2, //  月售
            introduce: '喝完就死 不信你试试', //   介绍
            tag: [{ id: 4, name: '水票' }], // 分类   merchant -> entity -> ProductCatory
            category: [{ id: 1, name: '热销' }, { id: 3, name: '好喝' }], //  标签
            price: 20, //  单价 一张水票的价钱
            shopId: 1,
            storeNum: 99, // 库存
            sellStrategy: [{ id: 1, name: '买1送100', price: 20 }, { id: 2, name: '买2送1', price: 40 }], //  水票类型
            userSelectedStrategy: { id: 1, name: '买10送100', price: 40 }, //  用户选择的类型，在【商品列表中】需要有所有的规格的展示，而在【购物车中】，需要用户选择的规格的展示，所以这个接口可以返回null
            count: 1, // 一种该规格的产品 或者0
        },
        {
            name: 'xx水票',
            id: 4,
            sale: 2, //  月售
            introduce: '喝完就死 不信你试试', //   介绍
            tag: [{ id: 4, name: '水票' }], // 分类   merchant -> entity -> ProductCatory
            category: [{ id: 1, name: '热销' }, { id: 3, name: '好喝' }], //  标签
            price: 20, //  单价 一张水票的价钱
            shopId: 1,
            storeNum: 99, // 库存
            sellStrategy: [{ id: 1, name: '买1送100', price: 20 }, { id: 2, name: '买2送1', price: 40 }], //  水票类型
            userSelectedStrategy: null, //  用户选择的类型，在【商品列表中】需要有所有的规格的展示，而在【购物车中】，需要用户选择的规格的展示，所以这个接口可以返回null
            count: 0, // 用户没有选择该产品
        }
    ]
};


let mockProductType = {
    shopId: 1,
    list: [{ id: 1, name: '醇香奶茶' }, { id: 2, name: '鲜果献茶' }, { id: 3, name: '纯黑奶茶' }, { id: 4, name: '水票' }]
};






class ProductList_mock{

    // @computed get productType(){
    //     return this._productType.list;
    // };
    // @computed get maxScroll(){
    //     let minH = parseFloat(document.body.clientHeight);
    //     let maxH = this._productList.list.length * this.productHeight * (this.rem2pxRate);
    //     console.log('maxH',maxH);
    //     return maxH - minH;
    // }
    // @action autoSelectedType(scrollTop){
    //     function scrollTopLessThanHeight(item){
    //         return scrollTop < item;
    //     }
    //     let index = this.productListHeightList.findIndex(scrollTopLessThanHeight);
    //
    //     for(let i = 0,len = this._productType.list.length;i < len;i++){
    //         this._productType.list[i].select = false;
    //     }
    //     //   -1 因为productListHeightList 多插入了一个开头的0
    //     // this._productType.list[index - 1].select = true;
    //     if(scrollTop >= this.maxScroll){
    //         let customerSelectedIndex = this.customerSelectedIndex;
    //         console.log(customerSelectedIndex);
    //         if(customerSelectedIndex){
    //             this._productType.list[customerSelectedIndex].select = true;
    //         }else{
    //             this._productType.list[index - 1].select = true;
    //         }
    //         this.customerSelectedIndex = false;
    //     }else{
    //         this._productType.list[index - 1].select = true;
    //     }
    // }


    // @action selectedType(dom,type) {
    //     function isEqual(item) {
    //         return item.id === type.id;
    //     }
    //
    //     let index = this._productType.list.findIndex(isEqual);
    //     this.customerSelectedIndex = index;
    //     this.setProductListScrollTop(dom, index);
    // }
    // setProductListScrollTop(dom){
    //
    //     //  浏览器渲染好像有误差 小数点部分会被四舍五入 + 1来拟补
    //     let key = 1;
    //     dom.scrollTop = this.productListHeightList[this.customerSelectedIndex]+key;
    //
    //     // let minH = parseFloat(document.body.clientHeight);
    //     // let maxH = this._productList.list.length * this.productHeight * this.rem2pxRate;
    //     // let maxScroll = maxH - minH;
    //     for(let i = 0,len = this._productType.list.length;i < len;i++){
    //         this._productType.list[i].select = false
    //     }
    //
    //     this._productType.list[this.customerSelectedIndex].select = true;
    //     // setTimeout(()=>{
    //     //     this.customerSelected = false;
    //     // },5);
    //
    //     // if(this.productListHeightList[index]+key > maxScroll){
    //     //     for(let i = 0,len = this._productType.list.length;i < len;i++){
    //     //         this._productType.list[i].select = false
    //     //     }
    //     //     this._productType.list[index].select = true;
    //     //     console.log(this._productType.list);
    //     // }
    // }

    constructor(typeList,rem2pxRate,productHeight,typeHeight){
        this.typeList = typeList.list;
        this.rem2pxRate = rem2pxRate;
        this.productHeight = productHeight;
        this.typeHeight = typeHeight;

        this.customerSelectedIndex = false;
    }

    @action getProductList(){
        this._list = mockProductList.list;
    }

    @observable _list = [];
    sortByType() {
        let list = [];
        for (let i = 0; i < this.typeList.length; i++) {

            //  添加productList属性
            let type = Object.assign({}, this.typeList[i], {
                productList: []
            });
            list.push(type);

            for (let j = 0; j < this._list.length; j++) {
                //  每个商品可能有几种类型
                for (let k = 0; k < this._list[j].tag.length; k++) {
                    if (this._list[j].tag[k].id === this.typeList[i].id) {
                        let shopProduct = new ShopProduct(this._list[j]);
                        //  水票
                        if (this._list[j].tag[k].id === '4') {
                            shopProduct = new TicketProduct(shopProduct);
                        }

                        list[i].productList.push(shopProduct);

                    }
                }
            }
        }
        return list;
    }
    @computed get list(){
        return this.sortByType();
    }

    //  商品列每种类型的高度
    @computed get productListHeightList(){
        let list = [0];
        let lastIndex = 0;
        for(let i = 0,len = this.list.length;i < len;i++){
            lastIndex +=this.list[i].length;
            //  转换为高度（rem表示）
            let remH = lastIndex * this.productHeight;

            //  转换成px表示
            list.push((remH + this.typeHeight) * this.rem2pxRate);
        }
        return list;
    }
}

module.exports = ProductList_mock;