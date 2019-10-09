import React from 'react';
import {Component} from 'react';
import './Element.css';


class Element extends Component{

    render(){
        return (
            <div className="Element">
                <div className="Desc" 
                    onClick={this.props.clickElement}>
                    {this.props.Descrizione}
                </div>
                <div className="CommandEdit"><i className="fa fa-edit" onClick={this.props.clickEdit}></i></div>
                <div className="CommandRemove"><i className="fa fa-remove" onClick={this.props.clickRemove}></i></div>
            </div>
        )
    }

}


export default Element;