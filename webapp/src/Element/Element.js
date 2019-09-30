import React from 'react';
import {Component} from 'react';
import './Element.css';


class Element extends Component{

    render(){
        return (
            <div>
                <div className="Element" 
                    onClick={this.props.clickElement}>
                    {this.props.Descrizione}
                </div>
                <div className="Command"><i className="fa fa-remove"></i></div>
            </div>
        )
    }

}


export default Element;