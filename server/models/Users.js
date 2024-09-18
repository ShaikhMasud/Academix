const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    profilepic: { 
        type: Buffer, 
        required: true 
    },
    password: { 
        type: String, 
        required: true,
        unique: true 
    },
    username: { 
        type: String,
        required: true 
    },
    role: {
        type: String,
        required: true 
    },
    department: { 
        type: String, 
        required: true 
    },
    Subjects_assigned: {
        type: Array, 
        required: true 
    }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;

// const fs = require('fs');

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/Academix', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch(err => {
//         console.error("Error connecting to MongoDB:", err);
//         process.exit(1); // Exit if unable to connect to MongoDB
//     });

// Read an image file as a buffer for all users
// let imgBuffer;
// try {
//     imgBuffer = fs.readFileSync('./dp.png'); // Placeholder image for all users
//     console.log("Image read successfully");
// } catch (err) {
//     console.error("Error reading the image file:", err);
//     process.exit(1); // Exit if the image can't be read
// }

// Define users
// const users = [
//     // Principal
//     {
//         name: "Principal",
//         profilepic: imgBuffer,
//         password: "principalpassword",
//         username: "principal",
//         role: "Principal",
//         department: "Administration",
//         Subjects_assigned: []
//     },
//     // HODs
//     {
//         name: "Tayyab Sir",
//         profilepic: imgBuffer,
//         password: "tayyabsirpassword",
//         username: "tayyabsir",
//         role: "HOD",
//         department: "IT",
//         Subjects_assigned: ["Operating Systems", "Software Engineering"]
//     },
//     {
//         name: "Uday Sir",
//         profilepic: imgBuffer,
//         password: "udaysirpassword",
//         username: "udaysir",
//         role: "HOD",
//         department: "FE",
//         Subjects_assigned: ["Physics", "Mathematics"]
//     },
//     {
//         name: "Prasad Sir",
//         profilepic: imgBuffer,
//         password: "prasadsirpassword",
//         username: "prasadsir",
//         role: "HOD",
//         department: "Comps",
//         Subjects_assigned: ["Data Structures", "Algorithms"]
//     },
//     {
//         name: "Shiv Sir",
//         profilepic: imgBuffer,
//         password: "shivsirpassword",
//         username: "shivsir",
//         role: "HOD",
//         department: "Mech",
//         Subjects_assigned: ["Thermodynamics", "Mechanics"]
//     },
//     {
//         name: "Aruna Maam",
//         profilepic: imgBuffer,
//         password: "arunamaampassword",
//         username: "arunamaam",
//         role: "HOD",
//         department: "EXTC",
//         Subjects_assigned: ["Communication Systems", "Signal Processing"]
//     },
//     // Teachers
//     {
//         name: "Jhanvi Maam",
//         profilepic: imgBuffer,
//         password: "jhanvimaampassword",
//         username: "jhanvimaam",
//         role: "Teacher",
//         department: "IT",
//         Subjects_assigned: ["Web Development", "Databases"]
//     },
//     {
//         name: "Vaishali Maam",
//         profilepic: imgBuffer,
//         password: "vaishalimaampassword",
//         username: "vaishalimaam",
//         role: "Teacher",
//         department: "Comps",
//         Subjects_assigned: ["Machine Learning", "Artificial Intelligence"]
//     },
//     {
//         name: "Nilesh Sir",
//         profilepic: imgBuffer,
//         password: "nileshsirpassword",
//         username: "nileshsir",
//         role: "Teacher",
//         department: "Mech",
//         Subjects_assigned: ["Fluid Mechanics", "Automotive Engineering"]
//     },
//     {
//         name: "Sunantha Maam",
//         profilepic: imgBuffer,
//         password: "sunanthamaampassword",
//         username: "sunanthamaam",
//         role: "Teacher",
//         department: "EXTC",
//         Subjects_assigned: ["Digital Electronics", "Microprocessors"]
//     },
//     {
//         name: "Mrudul Maam",
//         profilepic: imgBuffer,
//         password: "mrudulmaampassword",
//         username: "mrudulmaam",
//         role: "Teacher",
//         department: "FE",
//         Subjects_assigned: ["Chemistry", "Mathematics"]
//     }
// ];

// // Insert all users into MongoDB
// UserModel.insertMany(users)
//     .then(() => {
//         console.log("Users saved successfully!");
//         mongoose.connection.close();  // Close the connection after saving
//     })
//     .catch(err => {
//         console.error("Error saving users:", err);
//     });