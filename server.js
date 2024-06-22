const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connection = require('./db'); 
const cors = require('cors');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.get('/courses', (req, res) => {
    connection.query('SELECT * FROM Courses WHERE is_deleted = 0', (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            res.status(500).json({ error: 'Error fetching courses' });
            return;
        }
        res.json(results);
    });
});

app.post('/courses', (req, res) => {
    const { course_id, course_name, course_duration } = req.body;
    const sql = 'INSERT INTO Courses (course_id, course_name, course_duration, is_deleted) VALUES (?, ?, ?, 0)';
    connection.query(sql, [course_id, course_name, course_duration], (err, result) => {
        if (err) {
            console.error('Error inserting course:', err);
            res.status(500).json({ error: 'Error inserting course' });
            return;
        }
        res.status(201).json({ message: 'Course added successfully' });
    });
});

app.put('/courses/:id', (req, res) => {
    const { course_name, course_duration } = req.body;
    const sql = 'UPDATE Courses SET course_name = ?, course_duration = ? WHERE course_id = ?';
    connection.query(sql, [course_name, course_duration, req.params.id], (err, result) => {
        if (err) {
            console.error('Error updating course:', err);
            res.status(500).json({ error: 'Error updating course' });
            return;
        }
        res.json({ message: 'Course updated successfully' });
    });
});

app.delete('/courses/:id', (req, res) => {
    const sql = 'UPDATE Courses SET is_deleted = 1 WHERE course_id = ?';
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting course:', err);
            res.status(500).json({ error: 'Error deleting course' });
            return;
        }
        res.json({ message: 'Course marked as deleted' });
    });
});

app.get('/instructors', (req, res) => {
    connection.query('SELECT * FROM Instructors WHERE is_deleted = 0', (err, results) => {
        if (err) {
            console.error('Error fetching instructors:', err);
            res.status(500).json({ error: 'Error fetching instructors' });
            return;
        }
        res.json(results);
    });
});

app.post('/instructors', (req, res) => {
    const { instructor_id, instructor_name, course_id } = req.body;
    const sql = 'INSERT INTO Instructors (instructor_id, instructor_name, course_id, is_deleted) VALUES (?, ?, ?, 0)';
    connection.query(sql, [instructor_id, instructor_name, course_id], (err, result) => {
        if (err) {
            console.error('Error inserting instructor:', err);
            res.status(500).json({ error: 'Error inserting instructor' });
            return;
        }
        res.status(201).json({ message: 'Instructor added successfully' });
    });
});

app.put('/instructors/:id', (req, res) => {
    const { instructor_name, course_id } = req.body;
    const sql = 'UPDATE Instructors SET instructor_name = ?, course_id = ? WHERE instructor_id = ?';
    connection.query(sql, [instructor_name, course_id, req.params.id], (err, result) => {
        if (err) {
            console.error('Error updating instructor:', err);
            res.status(500).json({ error: 'Error updating instructor' });
            return;
        }
        res.json({ message: 'Instructor updated successfully' });
    });
});

app.delete('/instructors/:id', (req, res) => {
    const sql = 'UPDATE Instructors SET is_deleted = 1 WHERE instructor_id = ?';
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting instructor:', err);
            res.status(500).json({ error: 'Error deleting instructor' });
            return;
        }
        res.json({ message: 'Instructor marked as deleted' });
    });
});

app.get('/students', (req, res) => {
    connection.query('SELECT * FROM Students WHERE is_deleted = 0', (err, results) => {
        if (err) {
            console.error('Error fetching students:', err);
            res.status(500).json({ error: 'Error fetching students' });
            return;
        }
        res.json(results);
    });
});

app.post('/students', (req, res) => {
    const { student_id, student_name } = req.body;
    const sql = 'INSERT INTO Students (student_id, student_name, is_deleted) VALUES (?, ?, 0)';
    connection.query(sql, [student_id, student_name], (err, result) => {
        if (err) {
            console.error('Error inserting student:', err);
            res.status(500).json({ error: 'Error inserting student' });
            return;
        }
        res.status(201).json({ message: 'Student added successfully' });
    });
});

app.put('/students/:id', (req, res) => {
    const { student_name } = req.body;
    const sql = 'UPDATE Students SET student_name = ? WHERE student_id = ?';
    connection.query(sql, [student_name, req.params.id], (err, result) => {
        if (err) {
            console.error('Error updating student:', err);
            res.status(500).json({ error: 'Error updating student' });
            return;
        }
        res.json({ message: 'Student updated successfully' });
    });
});

app.delete('/students/:id', (req, res) => {
    const sql = 'UPDATE Students SET is_deleted = 1 WHERE student_id = ?';
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting student:', err);
            res.status(500).json({ error: 'Error deleting student' });
            return;
        }
        res.json({ message: 'Student marked as deleted' });
    });
});

app.get('/enrollments', (req, res) => {
    connection.query('SELECT * FROM Enrollments WHERE is_deleted = 0', (err, results) => {
        if (err) {
            console.error('Error fetching enrollments:', err);
            res.status(500).json({ error: 'Error fetching enrollments' });
            return;
        }
        res.json(results);
    });
});

app.post('/enrollments', (req, res) => {
    const { enrollment_id, student_id, course_id, progress } = req.body;
    const sql = 'INSERT INTO Enrollments (enrollment_id, student_id, course_id, progress, is_deleted) VALUES (?, ?, ?, ?, 0)';
    connection.query(sql, [enrollment_id, student_id, course_id, progress], (err, result) => {
        if (err) {
            console.error('Error inserting enrollment:', err);
            res.status(500).json({ error: 'Error inserting enrollment' });
            return;
        }
        res.status(201).json({ message: 'Enrollment added successfully' });
    });
});

app.put('/enrollments/:id', (req, res) => {
    const { student_id, course_id, progress } = req.body;
    const sql = 'UPDATE Enrollments SET student_id = ?, course_id = ?, progress = ? WHERE enrollment_id = ?';
    connection.query(sql, [student_id, course_id, progress, req.params.id], (err, result) => {
        if (err) {
            console.error('Error updating enrollment:', err);
            res.status(500).json({ error: 'Error updating enrollment' });
            return;
        }
        res.json({ message: 'Enrollment updated successfully' });
    });
});

app.delete('/enrollments/:id', (req, res) => {
    const sql = 'UPDATE Enrollments SET is_deleted = 1 WHERE enrollment_id = ?';
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting enrollment:', err);
            res.status(500).json({ error: 'Error deleting enrollment' });
            return;
        }
        res.json({ message: 'Enrollment marked as deleted' });
    });
});

app.get('/grades', (req, res) => {
    connection.query('SELECT * FROM Grades WHERE is_deleted = 0', (err, results) => {
        if (err) {
            console.error('Error fetching grades:', err);
            res.status(500).json({ error: 'Error fetching grades' });
            return;
        }
        res.json(results);
    });
});

app.post('/grades', (req, res) => {
    const { enrollment_id, grade } = req.body;
    const sql = 'INSERT INTO Grades (enrollment_id, grade, is_deleted) VALUES (?, ?, 0)';
    connection.query(sql, [enrollment_id, grade], (err, result) => {
        if (err) {
            console.error('Error inserting grade:', err);
            res.status(500).json({ error: 'Error inserting grade' });
            return;
        }
        res.status(201).json({ message: 'Grade added successfully' });
    });
});

app.put('/grades/:id', (req, res) => {
    const { grade } = req.body;
    const sql = 'UPDATE Grades SET grade = ? WHERE enrollment_id = ?';
    connection.query(sql, [grade, req.params.id], (err, result) => {
        if (err) {
            console.error('Error updating grade:', err);
            res.status(500).json({ error: 'Error updating grade' });
            return;
        }
        res.json({ message: 'Grade updated successfully' });
    });
});

app.delete('/grades/:id', (req, res) => {
    const sql = 'UPDATE Grades SET is_deleted = 1 WHERE enrollment_id = ?';
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting grade:', err);
            res.status(500).json({ error: 'Error deleting grade' });
            return;
        }
        res.json({ message: 'Grade marked as deleted' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
