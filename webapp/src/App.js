import React, {Component} from 'react';
import './App.css';
import Element from './Element/Element';

class App extends Component {

  onClickElement = () => {
    console.log('click on element');
  };
  onClickEdit = () => {
    console.log('click on edit');
  };
  onClickRemove = () => {
    console.log('click on remove');
  };

  render(){
    return (
      <div className="App">
        <h1>Briksdall webapp</h1>
        <Element Descrizione="Abbigliamento" 
                clickElement={this.onClickElement}
                clickEdit={this.onClickEdit}
                clickRemove={this.onClickRemove}></Element>      
      </div>
    )
  }
}

export default App;
