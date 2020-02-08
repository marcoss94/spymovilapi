import React from 'react';
import './App.css';
import Login from './component/Login';
import List from './component/List';


function App() {


  return (
    <div className="App">
      <header className="App-header">

        <Login></Login>
        <List></List>
      </header>
    </div>
  );
}

export default App;
