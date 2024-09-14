import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login.js';
import Home from './home.js';
import AddTeacher from './AddTeacher.js';
import Hodmainpage from './HOD/1.main pg hod/mainhodpag.js';
import Subjectpage from './HOD/2.subj hod/subject.js';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/addteachers' element={<AddTeacher/>}></Route>
        <Route path='/hoddash' element={<Hodmainpage/>}></Route>
        <Route path='/sub' element={<Subjectpage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
