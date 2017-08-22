/**
 * Created by LDQ on 2017/6/26.
 */
const React = require('react');
const ReactDom = require('react-dom');
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    Link
} from 'react-router-dom'

import { Provider } from 'mobx-react';
import _h from '../src/Util/HB';

//  Views
import WaterView from './container/WaterView';
import ShopView from './container/ShopView';
import ShopDetailView from './container/ShopDetailView';
import ShoppingCartView from './container/ShoppingCartView';
import CreateOrderView from './container/CreateOrderView';
import InputAddressView from './container/InputAddressView';
import AutoCompleteAddressView from './container/AutoCompleteAddressView';
import ReceiveAddressListView from './container/ReceiveAddressListView';
import ProductDetailView from './container/ProductDetailView';
import TypeProductListView from './container/TypeProductListView';
import MyView from './container/MyView';

//  MobX
import Login from './MobX/domain/Login';
import AutoMap from './MobX/domain/AutoMap';
import AddressList from './MobX/domain/AddressList';
import ActiveAddress from './MobX/domain/ActiveAddress';
import ShopDetail from './MobX/domain/ShopDetail';
import ProductList from './MobX/domain/ProductList';
import ShoppingCart from './MobX/domain/ShoppingCart';
import ProductDetail from './MobX/domain/ProductDetail';
import Order from './MobX/domain/Order';
import ProductList_mock from './MobX/domain/ProductList_mock';
import ProductType_mock from './MobX/domain/ProductType_mock';
import ShopShoppingCart_mock from './MobX/domain/ShopShoppingCart_mock'
//  RR辅助类
import HistoryPath from './MobX/domain/HistoryPath';

//  resetFontSize
_h.ui.setBaseFontSize(750,100);

let rem2pxRate = _h.ui.parsePx();

//  Router
const App = ()=>(
    <BrowserRouter>
        <div>
            <Redirect to="/water"/>
            <Switch>
                <Route path='/water' component={WaterView} />
                <Route path='/shop' component={ShopView} />
                <Route path='/shopDetail' component={ShopDetailView} />
                <Route path='/shoppingCart' component={ShoppingCartView}/>
                <Route path="/createOrder" component={CreateOrderView}/>
                <Route path="/inputAddress" component={InputAddressView}/>
                <Route path="/autoCompleteAddress" component={AutoCompleteAddressView}/>
                <Route path="/receiveAddressList" component={ReceiveAddressListView}/>
                <Route path="/productDetail" component={ProductDetailView}/>
                <Route path="/typeProductView" component={TypeProductListView}/>
                <Route path="/my" component={MyView}/>
            </Switch>
        </div>
    </BrowserRouter>

);

const historyPath = new HistoryPath();
const autoMap = new AutoMap();
const login = new Login();

const addressList = new AddressList(login,autoMap);
const shopDetail = new ShopDetail(login);
const activeAddress = new ActiveAddress(addressList,autoMap);
const productList = new ProductList(login);
const productDetail = new ProductDetail(login);
const order = new Order(login);
const shoppingCart = new ShoppingCart();
const productType_mock = new ProductType_mock(rem2pxRate,1.01);
const productList_mock = new ProductList_mock(productType_mock,rem2pxRate,1.01,0.31);
const shopShoppingCart = new ShopShoppingCart_mock(productList_mock);

const stores = {
    login,
    autoMap,
    addressList,
    activeAddress,
    shopDetail,
    productList,
    shoppingCart,
    productDetail,
    order,
    historyPath,
    productList_mock,
    productType_mock,
    shopShoppingCart
};

ReactDom.render(
    <Provider {...stores}>
        <div>
            <App />
        </div>
    </Provider>,
    document.getElementById('root')
);

