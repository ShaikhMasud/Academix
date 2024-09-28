const express = require("express")
const mongoose =require('mongoose')
const cors = require("cors")
const UserModel =require('./models/Users')
const CO_POModel =require('./models/CO_PO')
const StudentModel = require('./models/student');

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/Academix")
app.listen(3001,()=>{
    console.log("server is running")
})

app.post('/Users',(req,res)=>{
    UserModel.create(req.body)
    .then(teachers => res.json(teachers))
    .catch(err => res.json(err))
})

app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    UserModel.findOne({username:username})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json(user)
            }else{
                res.json('Unauthorised')
            }
        } else{
            res.json("Unauthorised")
        }
    })
})

app.get('/teachers', async (req, res) => {
    try {
        const teachers = await UserModel.find({ role: { $ne: 'Principal' } }, 'name Subjects_assigned'); // Ensure Subjects_assigned is included
        if (!teachers || teachers.length === 0) {
            res.status(404).json({ message: 'No teachers found' });
        } else {
            res.json(teachers);
        }
    } catch (err) {
        console.error('Error fetching teachers:', err);
        res.status(500).send('Server Error');
    }
});

app.get('/dept_faculty', async (req, res) => {
    const { department } = req.query; // Change this line to use req.query
    try {
        const faculty = await UserModel.find({ department, role: { $ne: 'Principal' } }, 'name Subjects_assigned');
        if(!faculty || faculty.length === 0){
            res.status(404).json({ message: 'No teachers found' });
        }else{    
            res.json(faculty);
        }
    } catch (err) {
        console.error('Error fetching faculty:', err);
        res.status(500).send('Server Error');
    }
});


app.post('/submitSubjects', async (req, res) => {
    const subjects = req.body; // Receive the subjects from the frontend

    try {
        for (const subject of subjects) {
            const { faculty, course } = subject; // Extract faculty and course for each subject

            const user = await UserModel.findOne({ name: faculty });
            if (user) {
                // Check if the subject already exists in Subjects_assigned
                if (!user.Subjects_assigned.includes(course)) {
                    user.Subjects_assigned.push(course);
                    await user.save();
                }
            }
        }
        res.json({ success: true, message: 'Subjects submitted successfully!' });
    } catch (err) {
        console.error('Error submitting subjects:', err);
        res.status(500).json({ success: false, message: 'Error submitting subjects' });
    }
});

app.post('/updateSubjects', async (req, res) => {
    const { faculty, subject, previousFaculty } = req.body;

    try {
        // Remove the subject from the previous faculty if different
        if (previousFaculty && previousFaculty !== faculty) {
            const prevUser = await UserModel.findOne({ name: previousFaculty });
            if (prevUser) {
                prevUser.Subjects_assigned = prevUser.Subjects_assigned.filter(sub => sub !== subject);
                await prevUser.save();
            }
        }

        // Add the subject to the new faculty
        const user = await UserModel.findOne({ name: faculty });
        if (user) {
            if (!user.Subjects_assigned.includes(subject)) {
                user.Subjects_assigned.push(subject);
                await user.save();
                res.json({ success: true, message: 'Subject added to the new faculty' });
            } else {
                res.json({ success: false, message: 'Subject already assigned' });
            }
        } else {
            res.status(404).json({ success: false, message: 'Faculty not found' });
        }
    } catch (err) {
        console.error('Error updating subjects:', err);
        res.status(500).json({ success: false, message: 'Error updating subjects' });
    }
});

app.post('/submitCoPo', async (req, res) => {
    const { semester, subject_name, CO1, CO2, CO3, CO4, CO5, CO6 } = req.body;
    console.log("Received data:", { semester, subject_name, CO1, CO2, CO3, CO4, CO5, CO6 });
    try {
        const existingRecord = await CO_POModel.findOne({ semester, subject_name });

        if (existingRecord) {
            existingRecord.CO1 = { PoValues: CO1.poValues, description: CO1.description };
            existingRecord.CO2 = { PoValues: CO2.poValues, description: CO2.description };
            existingRecord.CO3 = { PoValues: CO3.poValues, description: CO3.description };
            existingRecord.CO4 = { PoValues: CO4.poValues, description: CO4.description };
            existingRecord.CO5 = { PoValues: CO5.poValues, description: CO5.description };
            existingRecord.CO6 = { PoValues: CO6.poValues, description: CO6.description };
            await existingRecord.save();
            return res.json({ success: true, message: 'Record updated successfully!' });
        }

        const newRecord = new CO_POModel({
            semester,
            subject_name,
            CO1: { PoValues: CO1.poValues, description: CO1.description },
            CO2: { PoValues: CO2.poValues, description: CO2.description },
            CO3: { PoValues: CO3.poValues, description: CO3.description },
            CO4: { PoValues: CO4.poValues, description: CO4.description },
            CO5: { PoValues: CO5.poValues, description: CO5.description },
            CO6: { PoValues: CO6.poValues, description: CO6.description },
        });

        await newRecord.save();
        res.json({ success: true, message: 'Record created successfully!' });

    } catch (error) {
        console.error("Error saving CO-PO data:", error);
        res.status(500).json({ success: false, message: 'Error saving CO-PO data', error: error.message });
    }
});

app.post('/students', async (req, res) => {
    const studentData = req.body;
    try {
        for (const student of studentData) {
            // Find the student by roll number
            let existingStudent = await StudentModel.findOne({ roll: student.rollno });

            // If student exists
            if (existingStudent) {
                // Loop through each semester in the request (e.g., sem1, sem2, etc.)
                Object.keys(student).forEach(semKey => {
                    if (semKey.startsWith('sem')) {
                        let semester = student[semKey]; // The semester data from the request

                        // Initialize the semester array if it's undefined
                        if (!existingStudent[semKey]) {
                            existingStudent[semKey] = [];
                        }

                        // Find the subject in the existing student's semester
                        let existingSubject = existingStudent[semKey].find(sub => sub.subject_name === semester.subject_name);

                        if (existingSubject) {
                            // If the subject exists, update IA1, IA2, ESE, or Assignment based on what is in the request
                            if (semester.IA1) {
                                existingSubject.IA1 = { ...existingSubject.IA1, ...semester.IA1 }; // Merge new IA1 data
                            }
                            if (semester.IA2) {
                                existingSubject.IA2 = { ...existingSubject.IA2, ...semester.IA2 }; // Merge new IA2 data
                            }
                            if (semester.ESE) {
                                existingSubject.ESE = { ...existingSubject.ESE, ...semester.ESE }; // Merge new ESE data
                            }
                            if (semester.Assignment) {
                                existingSubject.Assignment = [...existingSubject.Assignment, ...semester.Assignment]; // Merge new Assignment data
                            }
                        } else {
                            // If the subject doesn't exist, create a new subject with the provided IA1/IA2/ESE/Assignment data
                            existingStudent[semKey].push({
                                subject_name: semester.subject_name,
                                IA1: semester.IA1 || null,
                                IA2: semester.IA2 || null,
                                ESE: semester.ESE || null,
                                Assignment: semester.Assignment || []
                            });
                        }
                    }
                });
                // Save updated student
                await existingStudent.save();
            } else {
                // If student does not exist, create a new student
                const newStudent = new StudentModel({
                    studentname: student.studentname,
                    roll: student.rollno,
                    sem1: student.sem1 ? [student.sem1] : [],
                    sem2: student.sem2 ? [student.sem2] : [],
                    sem3: student.sem3 ? [student.sem3] : [],
                    sem4: student.sem4 ? [student.sem4] : [],
                    sem5: student.sem5 ? [student.sem5] : [],
                    sem6: student.sem6 ? [student.sem6] : [],
                    sem7: student.sem7 ? [student.sem7] : [],
                    sem8: student.sem8 ? [student.sem8] : []
                });
                await newStudent.save();
            }
        }

        // Send success response
        return res.status(200).json({ success: true, message: 'Student data processed successfully.' });
    } catch (error) {
        console.error("Error saving student data:", error);
        return res.status(500).json({ success: false, message: 'Error processing student data.' });
    }
});

app.get('/fetchStudents', async (req, res) => {
    const { examType, subject, semester } = req.query;

    try {
        // Find students with the specified subject in the selected semester array
        const students = await StudentModel.find({
            [`sem${semester}.subject_name`]: subject
        });

        const studentData = students.map(student => {
            // Find the subject object inside the array of the specific semester
            let semData = student[`sem${semester}`].find(sub => sub.subject_name === subject);

            if (semData) {
                // Handle missing examType objects (e.g., IA1, IA2, Assignment, ESE)
                const examData = semData[examType] ? semData[examType] : { marks: '-' }; // Fallback if examType data is missing

                return {
                    studentname: student.studentname,
                    rollno: student.roll,
                    [examType]: examData
                };
            }
            return {}; // Return empty object if no data found for the subject
        });

        res.status(200).json(studentData);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Error fetching students" });
    }
});


app.post('/studentsAssignment', async (req, res) => {
    const { studentData, semester } = req.body;

    try {
        for (const student of studentData) {
            const { studentname, rollno } = student;

            // Find or create student by roll number
            let studentRecord = await StudentModel.findOne({ roll: rollno });
            if (!studentRecord) {
                studentRecord = new StudentModel({
                    studentname,
                    roll: rollno,
                    sem1: [], sem2: [], sem3: [],
                    sem4: [], sem5: [], sem6: [],
                    sem7: [], sem8: []
                });
            }

            // Access the correct semester data
            let semesterData = studentRecord[`sem${semester}`] || [];
            const subjectData = student[`sem${semester}`];

            const assignmentArray = Object.entries(subjectData.Assignment).map(([assignmentName, assignmentData]) => ({
                AssignmentNumber: parseInt(assignmentName.split('_')[1]),
                AssignmentMarks: assignmentData.marks,
                AssignmentCo: assignmentData.co
            }));

            const existingSubjectIndex = semesterData.findIndex(
                (entry) => entry.subject_name === subjectData.subject_name
            );

            if (existingSubjectIndex !== -1) {
                let existingSubject = semesterData[existingSubjectIndex];

                assignmentArray.forEach(newAssignment => {
                    const existingAssignmentIndex = existingSubject.Assignment.findIndex(
                        (assignment) => assignment.AssignmentNumber === newAssignment.AssignmentNumber
                    );

                    if (existingAssignmentIndex !== -1) {
                        existingSubject.Assignment[existingAssignmentIndex] = newAssignment;
                    } else {
                        existingSubject.Assignment.push(newAssignment);
                    }
                });
            } else {
                semesterData.push({
                    subject_name: subjectData.subject_name,
                    IA1: subjectData.IA1 || {},
                    IA2: subjectData.IA2 || {},
                    ESE: subjectData.ESE || {},
                    Assignment: assignmentArray
                });
            }

            studentRecord[`sem${semester}`] = semesterData;
            await studentRecord.save();
        }

        res.status(200).json({ success: true, message: 'Student data submitted and updated successfully!' });
    } catch (error) {
        console.error("Error saving student data:", error);
        res.status(500).json({ success: false, message: 'Error saving student data' });
    }
});

// Route to fetch assignment data for a specific subject and semester
app.get('/fetchStudentsAssignment', async (req, res) => {
    const { subject, semester } = req.query;

    try {
        const students = await StudentModel.find({
            [`sem${semester}`]: {
                $elemMatch: { subject_name: subject }
            }
        });

        // Debugging output
        console.log(`Query: { 'sem${semester}.subject_name': '${subject}' }`);
        console.log('Query Result:', students); // Log the query result

        // Check if students is undefined or not an array
        if (!students || !Array.isArray(students)) {
            return res.status(404).json({ success: false, message: 'No data found.' });
        }

        // Check the length
        console.log('Number of students found:', students.length);

        return res.status(200).json({ success: true, data: students });
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.get('/LevelCalculationIA', async (req, res) => {
    const { subject, semester, ia } = req.query;

    // Validate inputs
    if (!subject || !semester || !ia) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    try {
        // Fetch all students' data for the specified semester
        const students = await StudentModel.find({}, {
            [`sem${semester}`]: 1 // Fetch only the specified semester's data
        });


        if (students.length === 0) {
            return res.status(404).json({ message: "No students found for the specified parameters" });
        }

        let totalStudents = students.length;
        let studentsAbove40 = 0;

        // Iterate through each student's IA scores and check the selected IA
        students.forEach(student => {
            let currentSubjectData = student[`sem${semester}`].find(sub => sub.subject_name === subject);
            if (currentSubjectData) {
                let iaMarks = ia === '1' ? currentSubjectData.IA1 : currentSubjectData.IA2;
                let totalMarks = iaMarks.Q1 + iaMarks.Q2 + iaMarks.Q3;
                let percentage = ((totalMarks / 20) * 100);  // Assume each question is equally weighted
                if (percentage >= 40) {
                    studentsAbove40++;
                }
            }
        });

        // Calculate the percentage of students who scored above 40%
        let percentageAbove40 = totalStudents > 0 ? (studentsAbove40 / totalStudents) * 100 : 0;
        
        // Determine the level
        let level = "Level 0";
        if (percentageAbove40 >= 70) {
            level = "Level 3";
        } else if (percentageAbove40 >= 60) {
            level = "Level 2";
        } else if (percentageAbove40 >= 50) {
            level = "Level 1";
        }
        // Return the calculated level
        res.json(level);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get('/LevelCalculationEnd', async (req, res) => {
    const { subject, semester } = req.query;

    // Validate inputs
    if (!subject || !semester) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    try {
        // Fetch all students' data for the specified semester
        const students = await StudentModel.find({}, {
            [`sem${semester}`]: 1 // Fetch only the specified semester's data
        });

        if (students.length === 0) {
            return res.status(404).json({ message: "No students found for the specified parameters" });
        }

        let totalStudents = students.length;
        let studentsAbove40 = 0;

        // Iterate through each student's IA scores and check the selected IA
        students.forEach(student => {
            let currentSubjectData = student[`sem${semester}`].find(sub => sub.subject_name === subject);
            if (currentSubjectData && currentSubjectData.ESE && currentSubjectData.ESE.total !== undefined) {
                let EndSemMarks = currentSubjectData.ESE;
                let totalMarks = EndSemMarks.total;
                let percentage = ((totalMarks / 80) * 100);  // Assume each question is equally weighted
                if (percentage >= 40) {
                    studentsAbove40++;
                }
            }
        });

        // Calculate the percentage of students who scored above 40%
        let percentageAbove40 = totalStudents > 0 ? (studentsAbove40 / totalStudents) * 100 : 0;
        
        // Determine the level
        let level = "Level 0";
        if (percentageAbove40 >= 70) {
            level = "Level 3";
        } else if (percentageAbove40 >= 60) {
            level = "Level 2";
        } else if (percentageAbove40 >= 50) {
            level = "Level 1";
        }

        // Return the calculated level
        res.json(level);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get('/LevelCalculationAssign', async (req, res) => {
    const { subject, semester } = req.query;

    // Validate inputs
    if (!subject || !semester) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    try {
        // Fetch all students' data for the specified semester
        const students = await StudentModel.find({}, {
            [`sem${semester}`]: 1 // Fetch only the specified semester's data
        });

        if (students.length === 0) {
            return res.status(404).json({ message: "No students found for the specified parameters" });
        }

        let totalStudents = students.length;
        let studentsAbove40 = 0;

        // Iterate through each student's assignment scores
        students.forEach(student => {
            let currentSubjectData = student[`sem${semester}`].find(sub => sub.subject_name === subject);
            if (currentSubjectData && currentSubjectData.Assignment && currentSubjectData.Assignment.length > 0) {
                let assignments = currentSubjectData.Assignment;

                // Calculate the total marks obtained and the total max marks (10 * number of assignments)
                let totalObtainedMarks = assignments.reduce((acc, assignment) => acc + (assignment.AssignmentMarks || 0), 0);
                let totalMaxMarks = assignments.length * 10; // 10 marks per assignment

                // Calculate the percentage
                let percentage = (totalObtainedMarks / totalMaxMarks) * 100;

                if (percentage >= 40) {
                    studentsAbove40++;
                }
            }
        });

        // Calculate the percentage of students who scored above 40%
        let percentageAbove40 = totalStudents > 0 ? (studentsAbove40 / totalStudents) * 100 : 0;

        // Determine the level
        let level = "Level 0";
        if (percentageAbove40 >= 70) {
            level = "Level 3";
        } else if (percentageAbove40 >= 60) {
            level = "Level 2";
        } else if (percentageAbove40 >= 50) {
            level = "Level 1";
        }

        // Return the calculated level
        res.json(level);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


