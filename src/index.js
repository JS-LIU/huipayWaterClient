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



//  MobX
import Login from './MobX/domain/Login';
import AutoMap from './MobX/domain/AutoMap';
import AddressList from './MobX/domain/AddressList';
import ActiveAddress from './MobX/domain/ActiveAddress';
import ShopDetail from './MobX/domain/ShopDetail';
import ProductList from './MobX/domain/ProductList';
import ShoppingCart from './MobX/domain/ShoppingCart';
import Address from './MobX/domain/Address';

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
            </Switch>
        </div>
    </BrowserRouter>

);

const login = new Login();
const autoMap = new AutoMap();
const addressList = new AddressList(login);
const shopDetail = new ShopDetail(login);
const activeAddress = new ActiveAddress(addressList,autoMap);
const productList = new ProductList(login);
const shoppingCart = new ShoppingCart();
const address = new Address(login,autoMap);

const stores = {login,autoMap,addressList,activeAddress,shopDetail,productList,shoppingCart,address};

ReactDom.render(
    <Provider {...stores}>
        <div>
            <App />
            {/*<TodoListView todoList={todoList} />*/}
            {/*<TimerView timeState = {timeState}/>*/}
        </div>
    </Provider>,
    document.getElementById('root')
);

