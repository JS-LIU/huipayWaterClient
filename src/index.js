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
import {observer,inject} from 'mobx-react';
import _h from '../src/Util/HB';

//  Views
import ShopView from './container/ShopView';
import CreateOrderView from './container/CreateOrderView';
import AutoCompleteAddressView from './container/AutoCompleteAddressView';
import ReceiveAddressListView from './container/ReceiveAddressListView';
import ProductDetailView from './container/ProductDetailView';
import MyView from './container/MyView';
import LoginView from './container/LoginView';
import AddressListView from './container/AddressListView';
import WaterTicketsView from './container/WaterTicketsView';
import UseWaterTicketsView from './container/UseWaterTicketsView';
import PaySuccessView from './container/PaySuccessView';
import OrderListView from './container/OrderListView';
import MapView from './container/MapView';
import CreateOrEditAddressView from './container/CreateOrEditAddressView';
import PrepareView from './container/PrepareView';
import ReceiverListView from './container/ReceiverListView';

//  MobX
import Prepare from './MobX/domain/Prepare';
import Login from './MobX/domain/Login';
import AddressList from './MobX/domain/location/AddressList';
import CustomAddress from './MobX/domain/location/CustomAddress';
import ShoppingList from './MobX/domain/shop/ShoppingList';
import ShopInfo from './MobX/domain/ShopInfo';
import My from './MobX/domain/My';
import AddressTagList from './MobX/domain/location/AddressTagList';
import OrderList from './MobX/domain/OrderList';
import Position from './MobX/domain/location/Position';
import AutoComplete from './MobX/domain/location/AutoComplete';
import UseWaterTicketList from './MobX/domain/UseWaterTicketList';
import ProductDetail from './MobX/domain/ProductDetail';
import Order from './MobX/domain/Order';

//  todo 删除RR辅助类
import HistoryPath from './MobX/domain/HistoryPath';

//  resetFontSize
_h.ui.setBaseFontSize(750,100);

let rem2pxRate = _h.ui.parsePx();


let access_secret = localStorage.access_secret;
let access_token = localStorage.access_token;


//  Router
const App = ()=>(
    <BrowserRouter>
        <div>
            <Redirect to="/prepare"/>
            <Switch>
                {/*有用*/}
                <Route path='/prepare' component={PrepareView} />
                {/*有用*/}
                <Route path="/shop" component={ShopView} />
                {/*有用*/}
                <Route path='/login' component={LoginView} />
                {/*有用*/}
                <Route path="/confirmOrder" component={CreateOrderView}/>
                {/*有用*/}
                <Route path="/my" component={MyView}/>
                {/*有用*/}
                <Route path="/addressList" component={AddressListView} />
                {/*有用*/}
                <Route path="/map" component={MapView}/>
                {/*有用*/}
                <Route path="/createOrEditAddress" component={CreateOrEditAddressView} />
                {/*有用*/}
                <Route path="/paySuccess" component={PaySuccessView} />
                {/*有用*/}
                <Route path="/receiverList" component={ReceiverListView} />
                {/*有用*/}
                <Route path="/waterTickets" component={WaterTicketsView} />
                {/*有用*/}
                <Route path="/useWaterTickets" component={UseWaterTicketsView} />
                {/*有用*/}
                <Route path="/autoCompleteAddress" component={AutoCompleteAddressView}/>
                {/*有用*/}
                <Route path="/receiveAddressList" component={ReceiveAddressListView}/>
                {/*有用*/}
                <Route path="/orderList" component={OrderListView}/>
                {/*有用*/}
                <Route path="/productDetail" component={ProductDetailView}/>


            </Switch>
        </div>
    </BrowserRouter>

);



//  获取search
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
let shopId = 3;

const historyPath = new HistoryPath();


const prepare = new Prepare();
const login = new Login(access_secret,access_token);

const position = new Position();
const addressTagList = new AddressTagList();
const customAddress = new CustomAddress(position,addressTagList);
const addressList = new AddressList(login,position);
const autoComplete = new AutoComplete(position,customAddress);

const my = new My(login);
const orderList = new OrderList(login);

const shopInfo = new ShopInfo(login,position,shopId);
const shoppingList = new ShoppingList(rem2pxRate,login,shopInfo);
const useWaterTicketList = new UseWaterTicketList(login,shopInfo);
const order = new Order(login,shopInfo);
const productDetail = new ProductDetail(login,shoppingList,shopInfo);



const stores = {
    prepare,
    login,
    position,
    shopInfo,
    shoppingList,
    my,
    useWaterTicketList,
    addressTagList,
    orderList,
    addressList,
    order,
    historyPath,
    customAddress,
    autoComplete,
    productDetail,
};

ReactDom.render(
    <Provider {...stores}>
        <div>
            <App />
        </div>
    </Provider>,
    document.getElementById('root')
);

