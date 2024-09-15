import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login.js';
import Home from './home.js';
import AddTeacher from './AddTeacher.js';
import Hodmainpage from './HOD/1.main pg hod/mainhodpag.js';
import Subjectpage from './HOD/2.subj hod/subject.js';
import FacultyAssignment from './HOD/3.faculty assign/faculty.js';
import SelectStream from './principal/1.stream principal/stream.js';
import Principalmainpage from './principal/2.main pg principal/principaldashboard.js';
import Subjectpageprincipal from './principal/3.subj principal/subject.js';
import Appco from './Teachers/co-po rating/co-po.js';
import Appfa from './Teachers/db faculty/db_faculty.js';
import StudentMarksEntry from './Teachers/IA marks/IA_marks.js';

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
        <Route path='/fal' element={<FacultyAssignment/>}></Route>
        <Route path='/stream' element={<SelectStream/>}></Route>
        <Route path='/principaldashboard' element={<Principalmainpage/>}></Route>
        <Route path='/principalsubject' element={<Subjectpageprincipal/>}></Route>
        <Route path='/co' element={<Appco/>}></Route>
        <Route path='/dbfa' element={<Appfa/>}></Route>
        <Route path='/ia' element={<StudentMarksEntry/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
