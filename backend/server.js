const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Essential to allow the React app to communicate with this server[span_3](end_span)
app.get('/',(req,res)=>{
    res.send("server is alive");
});
// MongoDB Connection[span_4](end_span)
mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Student Schema & Model[span_5](end_span)
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String
});
const Student = mongoose.model('Student', studentSchema);

// API Routes[span_6](end_span)
app.get('/students', async (req, res) => {
    const data = await Student.find();
    res.json(data);
});

app.post('/students', async (req, res) => {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json(newStudent);
});

app.listen(5001, () => {
    console.log('Server running on port 5001');
});