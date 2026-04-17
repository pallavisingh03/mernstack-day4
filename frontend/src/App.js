import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({ name: '', age: '', course: '' });

    // Fetch Data (GET API)[span_9](end_span)
    useEffect(() => {
        axios.get('http://localhost:5001/students')
            .then(res => setStudents(res.data));
    }, []);

    // Form Handling[span_10](end_span)
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // POST API Integration[span_11](end_span)
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5001/students', form)
            .then(res => {
                setStudents([...students, res.data]);
                setForm({ name: '', age: '', course: '' }); // Reset form
            });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Student Management</h1>
            
            {/* Add Student Form[span_12](end_span) */}
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
                <input name="course" placeholder="Course" value={form.course} onChange={handleChange} />
                <button type="submit">Add Student</button>
            </form>

            {/* Display Data[span_13](end_span) */}
            <ul>
                {students.map((s, i) => (
                    <li key={i}>{s.name} - {s.course} (Age: {s.age})</li>
                ))}
            </ul>
        </div>
    );
}

export default App;