import React from 'react';
import NavbarContainer from './container/NavbarContainer';
import './App.css';
import { Routes,Route, BrowserRouter } from 'react-router-dom';
import HomeContainer from './container/HomeContainer';
import Login from './components/Login';
import Myorders from './components/Myorders';
import PrivateComponent from './components/PrivateComponent';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
     <NavbarContainer/>
    
    <Routes>
      <Route element={<PrivateComponent/>}>
      {/* <Route path='/' element={<HomeContainer/>}/> */}
      <Route path='/myorder' element={<Myorders/>}/>
      <Route path='/logout' element={<h1>log Out</h1>}/>  
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<HomeContainer/>}/>
    </Routes>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
