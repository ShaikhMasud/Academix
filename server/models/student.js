const mongoose = require('mongoose');

// Define the schema for IA (Internal Assessment)
const IA_SubSchema = new mongoose.Schema({
    Q1: { type: Number },
    Q2: { type: Number },
    Q3: { type: Number },
    Q1_co: { type: String },
    Q2_co: { type: String },
    Q3_co: { type: String }
});

const ESE_SubSchema = new mongoose.Schema({
    total: { type: Number }
});

const Assignment_SubSchema = new mongoose.Schema({
    AssignmentNumber: { type : Number },
    AssignmentMarks: { type : Number },
    AssignmentCo: { type: String }
});

const Subject_SubSchema = new mongoose.Schema({
    subject_name: { type: String, required: true },
    IA1: IA_SubSchema,
    IA2: IA_SubSchema,
    ESE: ESE_SubSchema,
    Assignment: [Assignment_SubSchema]
});

const StudentSchema = new mongoose.Schema({
    studentname: { type: String, required: true },
    roll: { type: String }, 
    sem1: [Subject_SubSchema],
    sem2: [Subject_SubSchema],
    sem3: [Subject_SubSchema],
    sem4: [Subject_SubSchema],
    sem5: [Subject_SubSchema],
    sem6: [Subject_SubSchema],
    sem7: [Subject_SubSchema],
    sem8: [Subject_SubSchema]
});

const StudentModel = mongoose.model('Student', StudentSchema);
module.exports = StudentModel;