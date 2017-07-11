/**
 * Created by LDQ on 2017/6/26.
 */
const React = require('react');
const ReactDom = require('react-dom');
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from 'react-router-dom'


import { Provider } from 'mobx-react';
import _h from '../src/Util/HB';

//  Views
import Home from './components/Home';
import Water from './container/Water';
import CreateOrder from './container/CreateOrder';


//  MobX
import Login from './MobX/domain/Login';
import AutoMap from './MobX/domain/AutoMap';
import AddressList from './MobX/domain/AddressList';

//  resetFontSize
_h.ui.setBaseFontSize(750,100);



//  Router
const App = ()=>(
    <Router >
        <div>
            <Redirect to="/home"/>
            <Switch>
                <Route path='/home' component={Home} />
                <Route path='/createOrder' component={CreateOrder} />
            </Switch>
        </div>
    </Router>

);

const login = new Login();
const autoMap = new AutoMap();
const addressList = new AddressList();

const stores = {login,autoMap,addressList};

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

