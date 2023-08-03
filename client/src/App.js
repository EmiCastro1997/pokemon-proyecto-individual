import './App.css';
import React from 'react';
import {Routes,Route} from "react-router-dom";
import Landing from './pages/landing/Landing';
import Home from './pages/home/Home';
import Details from './pages/detail/Detail';
import Create from './pages/form/Form';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/pokemons/:id" element={<Details/>}/>
        <Route exact path='/create' element={<Create/>}/>
      </Routes>
    </div>
  );
}
export default App;
