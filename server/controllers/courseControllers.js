const Course = require('../models/course');

async function getCourses(req, res) {
    try { res.status(200).json(await Course.find().sort({ createdAt: -1 })); }
    catch (error) { res.status(500).json({ message: 'Could not load courses' }); }
}

async function createCourse(req, res) {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.name === 'ValidationError' ? error.message : 'Could not create course' });
    }
}

async function getCourseById(req, res) {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) { res.status(400).json({ message: 'Invalid course id' }); }
}

async function updateCourse(req, res) {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ message: error.name === 'ValidationError' ? error.message : 'Invalid course id or course details' });
    }
}

async function deleteCourse(req, res) {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) { res.status(400).json({ message: 'Invalid course id' }); }
}

module.exports = { getCourses, createCourse, deleteCourse, updateCourse, getCourseById };
