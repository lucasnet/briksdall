import React, {Component} from 'react';
import './App.css';
import Element from './Element/Element';

class App extends Component {

  onClickElement = () => {
    console.log('click on element');
  };

  render(){
    return (
      <div className="App">
        <h1>Briksdall webapp</h1>
        <Element Descrizione="Abbigliamento" clickElement={this.onClickElement}></Element>      
      </div>
    )
  }
}

export default App;
