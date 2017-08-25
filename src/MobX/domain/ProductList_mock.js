import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';
import ShopProduct from './ShopProduct';
import TicketProduct from './TicketProduct';
import ProductType_mock from './ProductType_mock';
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

    constructor(rem2pxRate,productHeight,typeHeight){
        this.productType = new ProductType_mock(rem2pxRate,1.01);
        this.productType.getList();

        this.rem2pxRate = rem2pxRate;
        this.productHeight = productHeight;
        this.typeHeight = typeHeight;

        this.customerSelectedIndex = false;
    }
    @action getProductList(){
        _h.ajax.resource('src/Data/productList.json').query({})
            .then((products)=>{
                this._list = products.list;
        });
    }

    @observable _list = [];
    createProduct(product){
        let shopProduct = new ShopProduct(product);
        if(product.tag.id === 4){
            shopProduct = new TicketProduct(shopProduct);
        }
        return shopProduct;
    }
    sortByType(){
        let sortList = [...this.productType.list];
        for(let i = 0,typeLen = sortList.length; i < typeLen;i++){
            for(let j = 0,listLen = this._list.length; j < listLen;j++){
                let equalTypeId = function(tag){
                    return sortList[i].id === tag.id;
                };

                let hasProduct = this._list[j].tag.find(equalTypeId);
                if(hasProduct){
                    let product = this.createProduct(this._list[j]);
                    sortList[i].productList.push(product);
                }
            }
        }
        return sortList;
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