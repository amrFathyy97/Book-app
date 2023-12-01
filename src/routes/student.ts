import express from "express";
import { createStudent, deleteStudent, getAllStudents, getSingleStudent, updateStudent } from "../controllers/student";

const router = express.Router();


router.get("/", getAllStudents);

router.get("/:id", getSingleStudent);

router.post("/", createStudent);

router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);



export default router;