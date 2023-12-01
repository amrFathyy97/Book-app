import Student from "../classes/student";

type TStudent = {
    id?: number,
    name: string,
    age: number,
    department: string
}

const getAllStudents = async (req, res) => {
    const stds: TStudent[] = await Student.students;
    if(stds.length === 0) return res.json({
        status: "error",
        data: "No students found"
    });
    else await res.json({
        status: "success",
        data: stds
    });
};

const getSingleStudent = async (req, res) => {
    const std = await Student.getSingleStudent(req.params.id);
    if(!std) return res.json({
        status: "error",
        message: "Student not found"
    });
    else await res.json({
        status: "success",
        data: std
    });
};

const createStudent = async (req, res) => {
    const stdInfo: TStudent  = await req.body;
    const std = await new Student(stdInfo.name, stdInfo.age,stdInfo.department);
    await std.save();
    await res.status(201).json({
        status: "success",
        data: std
    });
};

const updateStudent = async (req, res) => {
    const std = await Student.updateStudent(req.body, req.params.id);
    await res.json({
        status: "success",
        data: std
    });
};

const deleteStudent = async (req, res) => {
    const std = await Student.getSingleStudent(req.params.id);
    if(!std) return res.json({
        status: "error",
        message: "Student not found"
    });
    else await Student.deleteStudent(req.params.id);
    await res.json({
        status : "success",
        message: "Student deleted successfully"
    });
};

export {
    getAllStudents,
    getSingleStudent,
    createStudent,
    updateStudent,
    deleteStudent,
};