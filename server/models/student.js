const mongoose = require('mongoose');

// Define the schema for IA (Internal Assessment)
const IA_SubSchema = new mongoose.Schema({
    Q1: {
        type: Number,
        required: true,
    },
    Q2: {
        type: Number,
        required: true,
    },
    Q3: {
        type: Number,
        required: true,
    },
    Q1_co: {
        type: Number,
        required: true,
    },
    Q2_co: {
        type: Number,
        required: true,
    },
    Q3_co: {
        type: Number,
        required: true,
    }
}); // Prevent creation of _id field for this sub-schema


const ESE_SubSchema = new mongoose.Schema({
    Q1: {
        type: Number,
        required: true,
    },
    Q2: {
        type: Number,
        required: true,
    },
    Q3: {
        type: Number,
        required: true,
    },
    Q4: {
        type: Number,
        required: true,
    },
    Q5: {
        type: Number,
        required: true,
    },
    Q6: {
        type: Number,
        required: true,
    },
    Q1_co: {
        type: Number,
        required: true,
    },
    Q2_co: {
        type: Number,
        required: true,
    },
    Q3_co: {
        type: Number,
        required: true,
    },
    Q4_co: {
        type: Number,
        required: true,
    },
    Q5_co: {
        type: Number,
        required: true,
    },
    Q6_co: {
        type: Number,
        required: true,
    }
}); 


const Assignment_SubSchema = new mongoose.Schema({
    Q1: {
        type: Number,
        required: true,
    },
    Q2: {
        type: Number,
        required: true,
    },
    Q3: {
        type: Number,
        required: true,
    },
    Q1_co: {
        type: Number,
        required: true,
    },
    Q2_co: {
        type: Number,
        required: true,
    },
    Q3_co: {
        type: Number,
        required: true,
    }
});

const Subject_SubSchema = new mongoose.Schema({
    subject_name: {
        type: String,
        required: true,
    },
    IA1: IA_SubSchema,
    IA2: IA_SubSchema,
    ESE: ESE_SubSchema,
    Assignment: Assignment_SubSchema
    
}); 

const StudentSchema = new mongoose.Schema({
    studentname: {
        type: String,
        required: true,
    },
    sem1: [Subject_SubSchema],
    sem2: [Subject_SubSchema],
    sem3: [Subject_SubSchema],
    sem4: [Subject_SubSchema],
    sem5: [Subject_SubSchema],
    sem6: [Subject_SubSchema],
    sem7: [Subject_SubSchema],
    sem8: [Subject_SubSchema],
});

const StudentModel = mongoose.model('Student', StudentSchema);
module.exports = StudentModel;
