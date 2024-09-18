const mongoose = require('mongoose');

const PO_Subschema = new mongoose.Schema({
    PO1: {
        type: String,
        required: true,
    },
    PO2: {
        type: String,
        required: true,
    },
    PO3: {
        type: String,
        required: true,
    },
    PO4: {
        type: String,
        required: true,
    },
    PO5: {
        type: String,
        required: true,
    },
    PO6: {
        type: String,
        required: true,
    },
    PO7: {
        type: String,
        required: true,
    },
    PO8: {
        type: String,
        required: true,
    },
    PO9: {
        type: String,
        required: true,
    },
    PO10: {
        type: String,
        required: true,
    },
    PO11: {
        type: String,
        required: true,
    },
    PO12: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

// Define the main schema
const CO_POSchema = new mongoose.Schema({
    subject_name: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    CO1: PO_Subschema,
    CO2: PO_Subschema,
    CO3: PO_Subschema,
    CO4: PO_Subschema,
    CO5: PO_Subschema,
    CO6: PO_Subschema
    
});

const CO_POModel = mongoose.model('CO_PO', CO_POSchema);
module.exports = CO_POModel;
