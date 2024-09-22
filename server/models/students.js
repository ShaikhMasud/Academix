const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    student_name: { type: String, required: true },
    roll_no: { type: String, required: true, unique: true },
    sem1: {
        subject_name: { type: String, default: 'XYZ' },
        ia1: {
            q1_marks: { type: Number, default: 0 },
            q2_marks: { type: Number, default: 0 },
            q3_marks: { type: Number, default: 0 },
            q1_co: { type: String, default: '' },
            q2_co: { type: String, default: '' },
            q3_co: { type: String, default: '' },
        },
        ia2: {
            q1_marks: { type: Number, default: 0 },
            q2_marks: { type: Number, default: 0 },
            q3_marks: { type: Number, default: 0 },
            q1_co: { type: String, default: '' },
            q2_co: { type: String, default: '' },
            q3_co: { type: String, default: '' },
        },
    },
});

const StudentModel = mongoose.model('students', studentSchema);

module.exports = StudentModel;