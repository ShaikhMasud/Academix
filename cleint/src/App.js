import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login.js';
import Hodmainpage from './HOD/1.main pg hod/mainhodpag.js';
import FacultyAssignment from './HOD/3.faculty assign/faculty.js';
import Subjects from './HOD/db faculty/db_faculty.js';
import CO_PO_HOD from './HOD/co-po rating/co-po.js';
import StudentMarksEntryHOD from './HOD/IA marks/IA_marks.js';

import SelectStream from './principal/1.stream principal/stream.js';
import Principalmainpage from './principal/2.main pg principal/principaldashboard.js';
import Prin_sub from './principal/db faculty/db_faculty.js';
import StudentMarksEntryprin from './principal/IA marks/IA_marks.js';

import Appco from './Teachers/co-po rating/co-po.js';
import Appfa from './Teachers/db faculty/db_faculty.js';
import StudentMarksEntry from './Teachers/IA marks/IA_marks.js';
import Subjectpagehod from './HOD/2.subj hod/subject.js';
import Subjectpageprin from './principal/2.subj hod/subject.js';
import Co_po_prin from './principal/co-po rating/co-po.js';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        {/* HOD routes */}
        <Route path='/hoddashboard' element={<Hodmainpage/>}></Route>
        <Route path='/managefaculty' element={<FacultyAssignment/>}></Route>
        <Route path='/SemSubjects' element={<Subjectpagehod/>}></Route>
        <Route path='/co-po' element={<CO_PO_HOD/>}></Route>
        <Route path='/subjects' element={<Subjects/>}></Route>
        <Route path='/IA_marks_entry' element={<StudentMarksEntryHOD/>}></Route>


        {/* Principal routes */}
        <Route path='/principaldashboard' element={<SelectStream/>}></Route>
        <Route path='/stream_analysis' element={<Principalmainpage/>}></Route>
        <Route path='/SemSub' element={<Subjectpageprin/>}></Route>
        <Route path='/co_po' element={<Co_po_prin/>}></Route>
        <Route path='/sub' element={<Prin_sub/>}></Route>
        <Route path='/iamarks_entry' element={<StudentMarksEntryprin/>}></Route>

        {/* Faculty routes */}
        <Route path='/co-po-map' element={<Appco/>}></Route>
        <Route path='/facultydashboard' element={<Appfa/>}></Route>
        <Route path='/ia' element={<StudentMarksEntry/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
