const express = require("express")
const { protect, authorize } = require("../middleware/authMiddleware")
const { getCourses, createCourse, updateCourse, deleteCourse, getCourseById } = require("../controllers/courseControllers")

const courseRoute = express.Router()

courseRoute.get("/",getCourses)

courseRoute.post("/", protect, authorize('instructor', 'admin'), createCourse)


courseRoute.get("/:id", getCourseById)

courseRoute.put("/:id", protect, authorize('instructor', 'admin'), updateCourse)

courseRoute.delete("/:id", protect, authorize('instructor', 'admin'), deleteCourse)



module.exports = courseRoute

