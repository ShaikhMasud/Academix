const express = require("express")
const mongoose =require('mongoose')
const cors = require("cors")
const UserModel =require('./models/Users')
const CO_POModel =require('./models/CO_PO')
const StudentModel = require('./models/students');

const app = express()
app.use(express.json())
app.use(cors())

// mongoose.connect("mongodb://localhost:27017/Academix")
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
                res.json('UnAthorised')
            }
        } else{
            res.json("UnAthorised")
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
    const students = req.body;

    try {
        for (const student of students) {
            const { roll_no, student_name, sem1 } = student;

            // Check if the student already exists in the database by roll_no
            let existingStudent = await StudentModel.findOne({ roll_no });

            if (existingStudent) {
                // If the student exists, update the sem1 information (IA marks, COs, etc.)
                existingStudent.sem1 = sem1;  // You can modify this if you want to allow partial updates
                await existingStudent.save(); // Save the updated student record
            } else {
                // If the student does not exist, create a new student record
                const newStudent = new StudentModel({ roll_no, student_name, sem1 });
                await newStudent.save(); // Save the new student record
            }
        }

        // Send success response after saving all students
        res.json({ success: true, message: 'Student data saved successfully!' });
    } catch (error) {
        console.error("Error saving student data:", error);
        res.status(500).json({ success: false, message: 'Error saving student data', error: error.message });
    }
});