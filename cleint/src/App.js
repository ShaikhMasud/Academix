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
import Prinsub from './principal/db faculty/db_faculty.js';
import StudentMarksEntryprin from './principal/IA marks/IA_marks.js';

import Appco from './Teachers/co-po rating/co-po.js';
import Appfa from './Teachers/db faculty/db_faculty.js';
import StudentMarksEntry from './Teachers/IA marks/IA_marks.js';
import Subjectpagehod from './HOD/2.subj hod/subject.js';
import Subjectpageprin from './principal/2.subj hod/subject.js';
import Copoprin from './principal/co-po rating/co-po.js';
import StudentMarksEntryAssignment from './Teachers/Assignment/Assignment.js';

import Studdashboard from './students/studdb/studdb.js';
import StudentMarksAnalysis from './students/studmrk/studmrk.js';
import StudSem from './students/studsem/studsem.js';
import SubjectsHOD from './HOD/db faculty/db_faculty.js';
import StudentMarksEntryAssignmentprin from './principal/Assignment/Assignment.js';
import StudentMarksEntryAssignmenthod from './HOD/Assignment/Assignment.js';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        
        {/* HOD routes */}
        <Route path='/hoddashboard' element={<Hodmainpage/>}></Route>
        <Route path='/managefaculty' element={<FacultyAssignment/>}></Route>
        <Route path='/SemSubjects/:sem' element={<Subjectpagehod/>}></Route>
        <Route path='/co-po/:subject/:semester' element={<CO_PO_HOD/>}></Route>
        <Route path='/subjects' element={<SubjectsHOD/>}></Route>
        <Route path='/IA_marks_entry/:subject/:semester' element={<StudentMarksEntryHOD/>}></Route>
        <Route path='/assignmenthod/:subject/:semester' element={<StudentMarksEntryAssignmenthod />} />


        {/*Student routes*/}
	      <Route path='/Studdb' element={<Studdashboard/>}></Route>
        <Route path='/studmrk' element={<StudentMarksAnalysis/>}></Route>
        <Route path='/studsem' element={<StudSem/>}></Route>

        {/* Principal routes */}
        <Route path='/principaldashboard' element={<SelectStream/>}></Route>
        <Route path='/stream_analysis/:stream' element={<Principalmainpage/>}></Route>
        <Route path='/SemSub/:sem/:stream' element={<Subjectpageprin/>}></Route>
        <Route path='/co_po/:subject/:semester' element={<Copoprin/>}></Route>
        <Route path='/sub' element={<Prinsub/>}></Route>
        <Route path='/iamarks_entry/:subject/:semester' element={<StudentMarksEntryprin/>}></Route>
        <Route path='/assignmentprin/:subject/:semester' element={<StudentMarksEntryAssignmentprin />} />

        {/* Faculty routes */}
        <Route path='/co-po-map/:subject/:semester' element={<Appco />} />
        <Route path='/facultydashboard' element={<Appfa/>}></Route>
        <Route path='/ia/:subject/:semester' element={<StudentMarksEntry />} />
        <Route path='/assignment/:subject/:semester' element={<StudentMarksEntryAssignment />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
