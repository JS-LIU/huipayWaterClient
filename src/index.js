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
import LoginView from './container/LoginView';
import AddressListView from './container/AddressListView';
import HomePageCreateAddressView from './container/HomePageCreateAddressView';
import ConfirmOrderCreateAddressView from './container/ConfirmOrderCreateAddressView';

//  MobX
import Login from './MobX/domain/Login';
import AutoMap from './MobX/domain/AutoMap';
import AddressList from './MobX/domain/location/AddressList';
import CustomAddress from './MobX/domain/location/CustomAddress';
import ActiveAddress from './MobX/domain/location/ActiveAddress';
import ShoppingList from './MobX/domain/shop/ShoppingList';
import ShopInfo from './MobX/domain/ShopInfo';

import ShopDetail from './MobX/domain/ShopDetail';
import ProductList from './MobX/domain/ProductList';
import ShoppingCart from './MobX/domain/ShoppingCart';
import ProductDetail from './MobX/domain/ProductDetail';


import Order from './MobX/domain/Order';
//  RR辅助类
import HistoryPath from './MobX/domain/HistoryPath';

//  resetFontSize
_h.ui.setBaseFontSize(750,100);

let rem2pxRate = _h.ui.parsePx();

//  Router
const App = ()=>(
    <BrowserRouter>
        <div>
            <Redirect to="/login"/>
            <Switch>
                <Route path='/login' component={LoginView} />
                <Route path='/water' component={WaterView} />
                <Route path='/shop' component={ShopView} />
                <Route path='/shopDetail' component={ShopDetailView} />
                <Route path='/shoppingCart' component={ShoppingCartView}/>
                <Route path="/confirmOrder" component={CreateOrderView}/>
                <Route path="/homePageCreateAddress" component={HomePageCreateAddressView}/>
                <Route path="/confirmOrderCreateAddress" component={ConfirmOrderCreateAddressView}/>
                <Route path="/autoCompleteAddress" component={AutoCompleteAddressView}/>
                <Route path="/receiveAddressList" component={ReceiveAddressListView}/>
                <Route path="/productDetail" component={ProductDetailView}/>
                <Route path="/typeProductView" component={TypeProductListView}/>
                <Route path="/my" component={MyView}/>
                <Route path="/addressList" component={AddressListView} />
            </Switch>
        </div>
    </BrowserRouter>

);

const historyPath = new HistoryPath();
const autoMap = new AutoMap();
const login = new Login();
const shoppingList = new ShoppingList(rem2pxRate,login);
const shopInfo = new ShopInfo(login);
const addressList = new AddressList(login,autoMap);
const activeAddress = new ActiveAddress(autoMap);
const customAddress = new CustomAddress();

// const shopDetail = new ShopDetail(login);
const productList = new ProductList(login);
const productDetail = new ProductDetail(login);
const order = new Order(login);
const shoppingCart = new ShoppingCart();
// const addressOperator = new AddressOperator(autoMap,addressList);


const stores = {
    login,
    autoMap,
    addressList,
    activeAddress,
    productList,
    shoppingCart,
    productDetail,
    order,
    historyPath,
    shoppingList,
    shopInfo,
    customAddress
};

ReactDom.render(
    <Provider {...stores}>
        <div>
            <App />
        </div>
    </Provider>,
    document.getElementById('root')
);

