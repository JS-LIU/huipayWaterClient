import React, {Component} from 'react';
import View from '../components/View';
import {Link} from 'react-router-dom';

//  MobX
import {observer,inject} from 'mobx-react';

@inject (['addressList'])

@observer class ReceiveAddressListView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.addressList.getAddressList();
    }
    edit(item){
        return ()=>{
            this.props.addressList.inputInfo.receiveName = item.receiveName;
            this.props.addressList.inputInfo.phoneNum = item.phoneNum;
            this.props.addressList.inputInfo.specificAddress = "";
        }
    }
    remove(item){
        return ()=>{
            console.log('删除');
            this.props.addressList.remove(item);
        }
    }
    setDefault(item){
        return ()=>{
            console.log('setDefaultClick');
            this.props.addressList.setDefault(item);
        }
    }
    choose(item){
        return ()=>{
            this.props.addressList.selected(item)
        }
    }
    render(){
        let addressNodes = this.props.addressList.list.map((item,index)=>{
            return (
                <li key = {index} >
                    {/*<Link to="/createOrder" >*/}
                        <span>{item.receiveName}</span>
                        <span>{item.phoneNum}</span>
                        <span >{item.receiveAddress}</span>
                        <input type="radio" onChange={this.setDefault(item)} name="address"/>
                    {/*</Link>*/}
                    <Link to = {{pathname:'/inputAddress',state:{action:'edit'}}} onClick={this.edit(item)}> ====编辑=====</Link>
                    <span onClick={this.remove(item)}>====删除=====</span>
                </li>
            )
        });
        return (
            <View>
                <ul>
                    {addressNodes}
                </ul>
                <Link to={{pathname:'/inputAddress',state:{action:'create'}}}>新增</Link>
            </View>
        )
    }
}
module.exports = ReceiveAddressListView;