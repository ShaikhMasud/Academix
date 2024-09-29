const mongoose = require('mongoose');

const CO_PO_AttainmentSchema = new mongoose.Schema({
    subject:{type:String},
    semester:{type:Number},
    Co_attainment: {
        type: [Number],  
        required: true
    },
    Po_attainment: {
        type: [Number],  
        required: true
    }
});

const CO_PO_AttainmentModel = mongoose.model('CO_PO_Attain', CO_PO_AttainmentSchema);  // Use the correct schema name
module.exports = CO_PO_AttainmentModel;
