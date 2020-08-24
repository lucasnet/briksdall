import React, {Component} from 'react';
import './App.css';

import ContentLookupGruppi from './components/content/ContentLookupGruppi';
import ContentLookupSupermercati from './components/content/ContentLookupSupermercati';

import './briksdall.css';

class App extends Component {

  _currentPages = {
    HOME : 0,
    LOOKUP : 1,
    LOOKUP_GRUPPI: 100,
    LOOKUP_SUPERMERCATI: 101
  }
  
  constructor(props) {
    super(props);
    this.state = {
                    currentPage: this._currentPages.HOME
                  };  
  }

  clickGruppi = () =>{        
    this.setState({currentPage: this._currentPages.LOOKUP_GRUPPI});
  }
  clickSupermercati = () => {
    this.setState({currentPage: this._currentPages.LOOKUP_SUPERMERCATI});
  }

  render(){
    
    let currentPage = '';
    switch (this.state.currentPage) {
      case this._currentPages.LOOKUP_GRUPPI:
        currentPage = <ContentLookupGruppi />;
        break;
      case this._currentPages.LOOKUP_SUPERMERCATI:
        currentPage=<ContentLookupSupermercati />;
        break;
    
      default:
        break;
    }

    return (
      <div className="wrapper">
        
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">    
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="#" class="nav-link">Home</a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="#" class="nav-link">Contact</a>
            </li>
          </ul>
        </nav>
        
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
              
          <div className="sidebar">              
          
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">                                                         
                
                <li className="nav-item has-treeview menu-open">
                  <a href="#" className="nav-link active">
                    <i className="nav-icon fas fa-table"></i>
                    <p>
                      Lookup
                      <i className="fas fa-angle-left right"></i>
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="#" onClick={this.clickGruppi} className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p>Gruppi</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" onClick={this.clickSupermercati} className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p>Supermercati</p>
                      </a>
                    </li>                
                  </ul>
                </li>            
              </ul>
            </nav>
          
          </div>
        
        </aside>
      
        
        <div className="content-wrapper">
          <div>BREADCRUMB</div>
          <div>FILTERS</div>
          <div>SUMMARY</div>

          {currentPage}
          
        </div>
      </div>
    );
  }
}

export default App;
