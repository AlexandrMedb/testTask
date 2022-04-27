import React from 'react';
import './App.css';
import {CallListPage} from './page/callListPage';
import {NavBar} from './container/navBar';


function App() {
  return (
    <div style={{display: 'flex'}}>
      <NavBar/>
      <CallListPage/>
    </div>
  );
}

export default App;
