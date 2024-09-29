const mongoose = require('mongoose');

const PO_Subschema = new mongoose.Schema({
    PoValues: {
        type: Array, 
        required: true 
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