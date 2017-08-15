import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class ProductList_mock{
    @observable _productList = {list:[]};

    //  商品列表
    @computed get productList(){
        return this._productList.list;
    }


    //  商品列每种类型的高度
    @computed get productListHeightList(){

        let lastProductTypeId = this._productList.list[0].typeId;

        let list = [0];
        for(let i = 0,len = this.productList.length;i < len;i++){
            if(this.productList[i].typeId !== lastProductTypeId){

                //  转换为高度（rem表示）
                let remH = i*this.productHeight;

                //  转换成px表示
                list.push(remH * this.rem2pxRate);

                //  重置比较ID todo 这种比较法 必须先将 商品按照TYPEID 分类排序
                lastProductTypeId = this.productList[i].typeId;
            }
        }

        return list;
    }

    //  商品类型 todo 是否需要new ProductType() 注入进来
    @observable _productType = {list:[]};

    @computed get productType(){
        return this._productType.list;
    };

    //  自动切换 todo 如果是new ProductType() 需要跟着一起挪
    @action autoSelectedType(scrollTop){
        function scrollTopLessThanHeight(item){
            return scrollTop < item;
        }
        let index = this.productListHeightList.findIndex(scrollTopLessThanHeight);
        for(let i = 0,len = this._productType.list.length;i < len;i++){
            this._productType.list[i].select = false;
        }
        //   -1 因为productListHeightList 多插入了一个开头的0
        this._productType.list[index - 1].select = true;
    }

    @action selectedType(dom,type) {
        function isEqual(item) {
            return item.id === type.id;
        }

        let index = this._productType.list.findIndex(isEqual);

        this.setProductListScrollTop(dom, index);
    }

    setProductListScrollTop(dom,index){
        //  浏览器渲染好像有误差 小数点部分会被四舍五入 + 1来拟补
        let key = 1;

        dom.scrollTop = this.productListHeightList[index]+key;
        let minH = parseFloat(document.body.clientHeight);
        let maxH = this._productList.list.length * this.productHeight * this.rem2pxRate;
        let maxScroll = maxH - minH;
        setTimeout(()=>{
            if(this.productListHeightList[index]+key > maxScroll){
                for(let i = 0,len = this._productType.list.length;i < len;i++){
                    this._productType.list[i].select = false
                }
                this._productType.list[index].select = true;
                console.log(this._productType.list);
            }
        },5);


    }


    constructor(productHeight,typeHeight){
        this.rem2pxRate = 0;
        this.productHeight = productHeight;
        let self = this;

        this.rem2px =()=>{
            let d = window.document.createElement('div');
            d.style.width = '1rem';
            d.style.display = "none";
            let head = window.document.getElementsByTagName('head')[0];
            head.appendChild(d);
            this.rem2pxRate = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
            d.remove();
        };

        this.getProductList = ()=>{
            return self._productList = {
                list:[
                    {id:'1',name:'water A',typeId:'1'},
                    {id:'2',name:'water B',typeId:'1'},
                    {id:'3',name:'water C',typeId:'1'},
                    {id:'4',name:'water D',typeId:'2'},
                    {id:'1',name:'water E',typeId:'2'},
                    {id:'2',name:'water F',typeId:'2'},
                    {id:'3',name:'water G',typeId:'2'},
                    {id:'4',name:'water H',typeId:'2'},
                    {id:'5',name:'water I',typeId:'2'},
                    {id:'6',name:'water J',typeId:'2'},
                    {id:'7',name:'water K',typeId:'2'},
                    {id:'8',name:'water L',typeId:'2'},
                    {id:'9',name:'water M',typeId:'2'},
                    {id:'10',name:'water n',typeId:'2'},
                    {id:'11',name:'water O',typeId:'2'},
                    {id:'12',name:'water P',typeId:'2'},
                    {id:'13',name:'water Q',typeId:'2'},
                    {id:'14',name:'water R',typeId:'3'}
                ]
            };
        };
        this.getProductType = ()=>{
            let productType = {
                list:[
                    {id:'1',name:'type1'},
                    {id:'2',name:'type2'},
                    {id:'3',name:'type3'}
                ]
            };
            for(let i = 0,len = productType.list.length;i < len;i++){
                productType.list[i].select = false;
            }
            productType.list[0].select = true;
            self._productType = productType;
            return self._productType;
        };
        autorun(()=>{
            this.rem2px();
            this.getProductList();
            this.getProductType();
        })

    }
}

module.exports = ProductList_mock;