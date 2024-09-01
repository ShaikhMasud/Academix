import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login.js';
import Home from './home.js';
import AddTeacher from './AddTeacher.js';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/addteachers' element={<AddTeacher/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
