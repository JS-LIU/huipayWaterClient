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

//  resetFontSize
_h.ui.setBaseFontSize(750,100);



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
            </Switch>
        </div>
    </BrowserRouter>

);

const autoMap = new AutoMap();
const login = new Login();

const addressList = new AddressList(login,autoMap);
const shopDetail = new ShopDetail(login);
const activeAddress = new ActiveAddress(addressList,autoMap);
const productList = new ProductList(login);
const productDetail = new ProductDetail(login);
const order = new Order(login);
const shoppingCart = new ShoppingCart();



const stores = {login,autoMap,addressList,activeAddress,shopDetail,productList,shoppingCart,productDetail,order};

ReactDom.render(
    <Provider {...stores}>
        <div>
            <App />
        </div>
    </Provider>,
    document.getElementById('root')
);

