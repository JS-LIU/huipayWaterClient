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
import Shop from './container/Shop';

//  MobX
import Login from './MobX/domain/Login';
import AutoMap from './MobX/domain/AutoMap';
import AddressList from './MobX/domain/AddressList';
import ActiveAddress from './MobX/domain/ActiveAddress';
import ShopDetail from './MobX/domain/ShopDetail';

//  resetFontSize
_h.ui.setBaseFontSize(750,100);



//  Router
const App = ()=>(
    <BrowserRouter>
        <div>
            <Redirect to="/shop"/>
            <Switch>
                <Route path='/shop' component={Shop} />
            </Switch>
        </div>
    </BrowserRouter>

);

const login = new Login();
const autoMap = new AutoMap();
const addressList = new AddressList(login);
const shopDetail = new ShopDetail(login,1);


const activeAddress = new ActiveAddress(addressList,autoMap);

const stores = {login,autoMap,addressList,activeAddress,shopDetail};

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

