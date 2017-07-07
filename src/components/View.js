/**
 * Created by LDQ on 2017/7/3.
 */
import React, {Component} from 'react';


class View extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={this.props.style} className={this.props.className}>
                {this.props.children}
            </div>
        );
    }

}
module.exports = View;