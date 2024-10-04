const express = require("express")
const mongoose =require('mongoose')
const cors = require("cors")
const UserModel =require('./models/Users')
const CO_POModel =require('./models/CO_PO')
const StudentModel = require('./models/student');
const CO_PO_AttainmentModel = require('./models/co-po-attainment')

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

app.get('/getCoPo/:semester/:subject', async (req, res) => {
    const { semester, subject } = req.params;
    try {
        const record = await CO_POModel.findOne({ semester, subject_name: subject });

        if (record) {
            return res.json({ success: true, record });
        }

        return res.json({ success: false, message: 'Record not found' });
    } catch (error) {
        console.error("Error fetching CO-PO data:", error);
        res.status(500).json({ success: false, message: 'Error fetching CO-PO data', error: error.message });
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
                    dept: student.depart,
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
    const { studentData, semester, percentageAssignments } = req.body;
    try {
        for (const student of studentData) {
            const { studentname, rollno, depart } = student;

            // Find or create student by roll number
            let studentRecord = await StudentModel.findOne({ roll: rollno });
            if (!studentRecord) {
                studentRecord = new StudentModel({
                    studentname,
                    roll: rollno,
                    dept: depart,
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

                // Update or add assignments
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

                // Remove assignments that are no longer present
                existingSubject.Assignment = existingSubject.Assignment.filter(existingAssignment =>
                    assignmentArray.some(newAssignment => newAssignment.AssignmentNumber === existingAssignment.AssignmentNumber)
                );

                // Update the PercentageOfAssignment
                existingSubject.PercentageOfAssignment = percentageAssignments || 0;

            } else {
                semesterData.push({
                    subject_name: subjectData.subject_name,
                    IA1: subjectData.IA1 || {},
                    IA2: subjectData.IA2 || {},
                    ESE: subjectData.ESE || {},
                    Assignment: assignmentArray,
                    PercentageOfAssignment: percentageAssignments || 0
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


app.post('/coAttainment', async (req, res) => {
    const { subject, semester } = req.body;
    const coLevels = {
        co1: { IA1: {}, IA2: {}, IA: {}, ESE: {}, Assignment: {} },
        co2: { IA1: {}, IA2: {}, IA: {}, ESE: {}, Assignment: {} },
        co3: { IA1: {}, IA2: {}, IA: {}, ESE: {}, Assignment: {} },
        co4: { IA1: {}, IA2: {}, IA: {}, ESE: {}, Assignment: {} },
        co5: { IA1: {}, IA2: {}, IA: {}, ESE: {}, Assignment: {} },
        co6: { IA1: {}, IA2: {}, IA: {}, ESE: {}, Assignment: {} },
    };

    if (!subject || !semester) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    try {
        const students = await StudentModel.find({}, {
            [`sem${semester}`]: 1
        });

        if (students.length === 0) {
            return res.status(404).json({ message: "No students found for the specified parameters" });
        }

        let totalStudents = students.length;

        // Process IA1 and IA2
        for (let ia = 1; ia <= 2; ia++) {
            for (let co = 1; co <= 6; co++) {
                let studentsAbove40 = 0;

                students.forEach(student => {
                    let currentSubjectData = student[`sem${semester}`].find(sub => sub.subject_name === subject);
                    if (currentSubjectData) {
                        let iaMarks = currentSubjectData[`IA${ia}`];
                        if (iaMarks) {
                            let totalMarksForCO = 0;
                            let maxMarksForCO = 0;

                            for (let q = 1; q <= 3; q++) {
                                const questionCO = iaMarks[`Q${q}_co`];
                                const questionMarks = iaMarks[`Q${q}`];

                                if (questionCO === `CO${co}` && questionMarks !== undefined) {
                                    let maxMarks = q === 3 ? 10 : 5;
                                    totalMarksForCO += questionMarks;
                                    maxMarksForCO += maxMarks;
                                }
                            }

                            if (maxMarksForCO > 0) {
                                let percentage = ((totalMarksForCO / maxMarksForCO) * 100);
                                if (percentage >= 40) {
                                    studentsAbove40++;
                                }
                            }
                        }
                    }
                });

                let percentageAbove40 = totalStudents > 0 ? (studentsAbove40 / totalStudents) * 100 : 0;
                let level = -1;
                if (percentageAbove40 >= 70) level = 3;
                else if (percentageAbove40 >= 60) level = 2;
                else if (percentageAbove40 >= 50) level = 1;

                coLevels[`co${co}`][`IA${ia}`].level = level;
            }
        }

        for (let co = 1; co <= 6; co++) {
            let ia1Level = coLevels[`co${co}`].IA1.level;
            let ia2Level = coLevels[`co${co}`].IA2.level;

            if (ia1Level !== -1 && ia2Level !== -1) {
                coLevels[`co${co}`].IA.level = Math.round((ia1Level + ia2Level) / 2);
            } else if (ia1Level === -1 && ia2Level !== -1) {
                coLevels[`co${co}`].IA.level = ia2Level;
            } else if (ia2Level === -1 && ia1Level !== -1) {
                coLevels[`co${co}`].IA.level = ia1Level;
            } else {
                coLevels[`co${co}`].IA.level = -1;
            }
        }

        // Process ESE
        let studentsAbove40ESE = 0;
        students.forEach(student => {
            let currentSubjectData = student[`sem${semester}`].find(sub => sub.subject_name === subject);
            if (currentSubjectData && currentSubjectData.ESE && currentSubjectData.ESE.total !== undefined) {
                let totalMarks = currentSubjectData.ESE.total;
                let percentage = ((totalMarks / 80) * 100);
                if (percentage >= 40) {
                    studentsAbove40ESE++;
                }
            }
        });

        let percentageAbove40ESE = totalStudents > 0 ? (studentsAbove40ESE / totalStudents) * 100 : 0;
        let levelESE = 0;
        if (percentageAbove40ESE >= 70) levelESE = 3;
        else if (percentageAbove40ESE >= 60) levelESE = 2;
        else if (percentageAbove40ESE >= 50) levelESE = 1;

        for (let i = 1; i <= 6; i++) {
            coLevels[`co${i}`].ESE.level = levelESE;
        }
        let percentage=0;

        // Process Assignments
        for (let co = 1; co <= 6; co++) {
            let studentsWithCOAssignments = 0;
            students.forEach(student => {
                let currentSubjectData = student[`sem${semester}`].find(sub => sub.subject_name === subject);
                if (currentSubjectData && currentSubjectData.Assignment) {
                    let coAssignment = currentSubjectData.Assignment.filter(assignment => assignment.AssignmentCo === `CO${co}`);
                    let totalAssignmentMarks = 0;

                    coAssignment.forEach(assignment => {
                        totalAssignmentMarks += assignment.AssignmentMarks;
                    });

                    if (totalAssignmentMarks > 0) {
                        let assignmentPercentage = (totalAssignmentMarks / (coAssignment.length * 10)) * 100;
                        if (assignmentPercentage >= 40) {
                            studentsWithCOAssignments++;
                        }
                    }
                }
                percentage=currentSubjectData.PercentageOfAssignment;
            });


            let percentageWithCOAssignments = totalStudents > 0 ? (studentsWithCOAssignments / totalStudents) * 100 : 0;
            let assignmentLevel = -1;
            if (percentageWithCOAssignments >= 70) assignmentLevel = 3;
            else if (percentageWithCOAssignments >= 60) assignmentLevel = 2;
            else if (percentageWithCOAssignments >= 50) assignmentLevel = 1;
            else if (percentageWithCOAssignments <= 50 && percentageWithCOAssignments >=40) assignmentLevel = 0;

            coLevels[`co${co}`].Assignment.level = assignmentLevel;
        }

        let coAttainments = [];

        // Now, calculate the CO attainment based on the formula
        for (let co = 1; co <= 6; co++) {
            const iaLevel = coLevels[`co${co}`].IA.level;
            const assignmentLevel = coLevels[`co${co}`].Assignment.level;
            const eseLevel = coLevels[`co${co}`].ESE.level;
            let coAttainment=0;
            // Formula to calculate CO attainment
            if(assignmentLevel!==-1){
                coAttainment = iaLevel * ((50 - percentage) / 100) +
                assignmentLevel * (percentage / 100) +
                eseLevel * 0.5;
            } else{
                coAttainment = iaLevel * 0.5 +
                eseLevel * 0.5;
            }
        
            // Limit to 2 decimal places and convert back to a number
            coAttainment = parseFloat(coAttainment.toFixed(2));
        
            // Push the CO attainment value into the array
            coAttainments.push(coAttainment);
        }
        const updatedDocument = await CO_PO_AttainmentModel.findOneAndUpdate(
            { subject, semester },  // Query to find existing record
            {
                subject,
                semester,
                Co_attainment: coAttainments,   // Save calculated CO attainment
                Po_attainment: null    // Save calculated PO attainment
            },
            { 
                new: true,     // Return the updated document
                upsert: true   // Create a new document if no matching one is found
            }
        );
        // Return the CO attainments for all COs
        console.log(coLevels);
        res.json({ coAttainments });
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post('/poAttainment', async (req, res) => {
    const { subject, semester } = req.body;
    console.log(subject, semester);
    try {
        // Fetch CO attainment values
        const coAttainmentRecord = await CO_PO_AttainmentModel.findOne({ subject, semester });
        if (!coAttainmentRecord) {
            return res.status(404).json({ success: false, message: 'CO attainment record not found' });
        }
        const coAttainment = coAttainmentRecord.Co_attainment; // This is an array of 6 values
        console.log(coAttainment);
        
        // Fetch CO-PO mapping values
        const coPoMappingRecord = await CO_POModel.findOne({ subject_name: subject, semester });
        if (!coPoMappingRecord) {
            return res.status(404).json({ success: false, message: 'CO-PO mapping record not found' });
        }
        
        // Create a 6x12 matrix
        const poAttainmentMatrix = Array.from({ length: 6 }, () => Array(12).fill(0));

        // Calculate PO attainment values
        for (let i = 0; i < 6; i++) { // Loop through CO1 to CO6
            const coPoValues = coPoMappingRecord[`CO${i + 1}`].PoValues; // Get PoValues for CO1 to CO6

            for (let j = 0; j < 12; j++) { // Loop through each PO value
                const poValue = parseInt(coPoValues[j]); // Convert the PO value to an integer
                poAttainmentMatrix[i][j] = (poValue / 3) * coAttainment[i]; // Calculate PO attainment
            }
        }
        console.log(poAttainmentMatrix);

        // Calculate PO attainment averages
        const poAttainmentAverages = Array(12).fill(0); // Initialize the averages array
        const nonZeroCounts = Array(12).fill(0); // Array to keep track of counts of non-zero elements

        for (let j = 0; j < 12; j++) { // Loop through each PO index
            for (let i = 0; i < 6; i++) { // Loop through each CO
                const value = poAttainmentMatrix[i][j]; // Get the value from the matrix
                if (value !== 0) { // Consider only non-zero values
                    poAttainmentAverages[j] += value; // Sum the non-zero values
                    nonZeroCounts[j]++; // Increment the count for this index
                }
            }
            // Calculate the average if there are non-zero values
            if (nonZeroCounts[j] > 0) {
                poAttainmentAverages[j] /= nonZeroCounts[j]; // Calculate average
            } else {
                poAttainmentAverages[j] = 0; // Set to 0 or keep as is if no non-zero values
            }
        }

        console.log("PO Attainment Averages:", poAttainmentAverages);

        // Step 6: Save the PO attainment values
        coAttainmentRecord.Po_attainment = poAttainmentAverages; // Update the Po_attainment field
        await coAttainmentRecord.save();

        // Return the response with the expected structure
        res.status(200).json({ success: true, poAttainments: poAttainmentAverages });
    } catch (error) {
        console.error("Error calculating PO attainment:", error);
        res.status(500).json({ success: false, message: 'Error calculating PO attainment' });
    }
});

app.post('/getSemData', async (req, res) => {
    const { semester, depart } = req.body; 
    try {
        const students = await StudentModel.find({ dept: depart });
        // console.log("Full student data:", students);


        if (!students || students.length === 0) {
            console.error('No students found');
            return res.status(404).json({ message: 'No students found' });
        }


        const semData = students.map(student => student[`sem${semester}`] || []);
        // console.log("Semester data:", semData);

        const flattenedSemData = semData.flat().filter(subject => subject); // Filter out undefined subjects

        const { level1, level2 } = calculateIALevel(flattenedSemData);
        const eselevel = calculateESELevel(flattenedSemData);
        const assign = calculateAssignmentLevel(flattenedSemData);
        res.json({ IA1: level1, IA2: level2, ESE: eselevel, Assignment: assign});
    } catch (error) {
        console.error('Error fetching IA data:', error);
        res.status(500).send('Server Error');
    }
});

const calculateIALevel = (semData) => {
    let counter1 = 0;
    let counter2 = 0;
    const threshold = 8; // 40% of 20 marks
    const semLength = semData.length; // Total number of subjects

    if (semLength === 0 || semData.every(subject => subject.length === 0)) {
        return { level1: 'N/A', level2: 'N/A' };
    }

    let level1, level2;

    // Traverse through each subject in the semester
    semData.forEach((subject) => {
        // Check if IA1 exists and has required properties
        if (subject.IA1 && subject.IA1.Q1 !== undefined && subject.IA1.Q2 !== undefined && subject.IA1.Q3 !== undefined) {
            const totalQ = (subject.IA1.Q1 || 0) + (subject.IA1.Q2 || 0) + (subject.IA1.Q3 || 0);
            
            // If the total marks for IA1 > threshold, increment the counter
            if (totalQ > threshold) {
                counter1++;
            }
        } else {
            level1 = 'N/A';
        }

        // Check if IA2 exists and has required properties
        if (subject.IA2 && subject.IA2.Q1 !== undefined && subject.IA2.Q2 !== undefined && subject.IA2.Q3 !== undefined) {
            const totalQ = (subject.IA2.Q1 || 0) + (subject.IA2.Q2 || 0) + (subject.IA2.Q3 || 0);
            
            // If the total marks for IA2 > threshold, increment the counter
            if (totalQ > threshold) {
                counter2++;
            }
        } else {
            level2 = 'N/A';
        }
    });

    // Calculate the percentage of subjects where totalQ exceeds threshold
    const percentage1 = (counter1 / semLength) * 100;
    const percentage2 = (counter2 / semLength) * 100;

    if (percentage1 >= 70) {
        level1 = 'Level 3';
    } else if (percentage1 >= 60) {
        level1 = 'Level 2';
    } else if (percentage1 >= 50) {
        level1 = 'Level 1';
    } else {
        level1 = 'Level 0';
    }

    if (percentage2 >= 70) {
        level2 = 'Level 3';
    } else if (percentage2 >= 60) {
        level2 = 'Level 2';
    } else if (percentage2 >= 50) {
        level2 = 'Level 1';
    } else {
        level2 = 'Level 0';
    }

    // Return both levels in an object
    return {
        level1,
        level2
    };
};

const calculateESELevel = (semData) => {
    let counter = 0;
    const threshold = 32; // 40% of 80 marks
    const semLength = semData.length;

    if (semLength === 0 || semData.every(subject => subject.length === 0)) {
        return 'N/A';
    }

    semData.forEach((subject) => {
        if(subject.ESE && subject.ESE.total !== undefined){
            const total = (subject.ESE.total || 0);
            if(total >= threshold){
                counter++;
            }
        }
    });
    console.log(semLength,counter)

     const percentage = (counter/semLength) * 100;

     let level;

     if (percentage >= 70) {
        level = 'Level 3';
    } else if (percentage >= 60) {
        level = 'Level 2';
    } else if (percentage >= 50) {
        level = 'Level 1';
    } else {
        level = 'Level 0';
    }
    return level;
};

const calculateAssignmentLevel = (semData) => {
    let assignmentCounter = 0;
    const thresholdPercentage = 40; // 40% threshold
    const maxMarksPerAssignment = 10; // Maximum marks per assignment

    // Traverse through each subject in the semester
    semData.forEach((subject) => {
        // Check if Assignment array exists and has elements
        if (subject.Assignment && Array.isArray(subject.Assignment) && subject.Assignment.length > 0) {
            // Calculate total marks for all assignments
            const totalAssignmentMarks = subject.Assignment.reduce((acc, assignment) => {
                return acc + (assignment.AssignmentMarks || 0); // Add up assignment marks, default to 0 if not defined
            }, 0);

            // Calculate the maximum possible marks (number of assignments * max marks per assignment)
            const maxPossibleMarks = subject.Assignment.length * maxMarksPerAssignment;

            // Check if total marks exceed the threshold (40% of max possible marks)
            if (totalAssignmentMarks >= (thresholdPercentage / 100) * maxPossibleMarks) {
                assignmentCounter++;
            }
        }
    });

    // Calculate the percentage of subjects where assignment marks exceed the threshold
    const semLength = semData.length; // Total number of subjects
    const percentage = (assignmentCounter / semLength) * 100;

    if (semLength === 0 || semData.every(subject => subject.length === 0)) {
        return 'N/A';
    }

    let assignmentLevel;

    // Determine the level based on the percentage
    if (percentage >= 70) {
        assignmentLevel = 'Level 3';
    } else if (percentage >= 60) {
        assignmentLevel = 'Level 2';
    } else if (percentage >= 50) {
        assignmentLevel = 'Level 1';
    } else {
        assignmentLevel = 'Level 0';
    }

    // Return the calculated assignment level
    return assignmentLevel;
};


app.get('/getAttainmentData', async (req, res) => {
    const { subject, semester } = req.query;
    console.log("passed params: ", subject, semester);
  
    try {
      const attainmentData = await CO_PO_AttainmentModel.findOne({ subject, semester });
      if (attainmentData) {
        res.json(attainmentData);
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
});

app.post('/questionComap', async (req, res) => {
    const { semester, subject } = req.body;
  
    try {
      // Fetch students who have the given subject in the specified semester
      const students = await StudentModel.find({
        [`sem${semester}`]: {
          $elemMatch: { subject_name: subject }
        }
      });
  
      // Define the questionmap object
      const questionmap = {
        ai1: { q1: null, q2: null, q3: null },
        ai2: { q1: null, q2: null, q3: null }
      };
  
      // Iterate through students
      for (const student of students) {
        // Find the subject in the corresponding semester
        const subjectData = student[`sem${semester}`].find(sub => sub.subject_name === subject);
  
        if (subjectData) {
          // Map the CO values for IA1
          if (subjectData.IA1) {
            questionmap.ai1.q1 = subjectData.IA1.Q1_co;
            questionmap.ai1.q2 = subjectData.IA1.Q2_co;
            questionmap.ai1.q3 = subjectData.IA1.Q3_co;
          }
  
          // Map the CO values for IA2
          if (subjectData.IA2) {
            questionmap.ai2.q1 = subjectData.IA2.Q1_co;
            questionmap.ai2.q2 = subjectData.IA2.Q2_co;
            questionmap.ai2.q3 = subjectData.IA2.Q3_co;
          }
  
          // Once the desired data is found, break out of the loop
          break;
        }
      }
      console.log(questionmap);
  
      // Send the response with the mapped question data
      res.status(200).json(questionmap);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });