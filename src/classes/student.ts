export interface IStudent {
    id: number,
    name: string,
    age: number,
    department: string,
}

class Student {
    id: number;
    static students = [];
    constructor(private name: string, private age: number, private department: string){}
    save(): void{
        this.id = Student.students.length + 1;
        Student.students.push(this);
    }
    static getAllStudents(): IStudent[] {
        return Student.students;
    }
    static getSingleStudent(id: number): IStudent {
        const std = Student.students.find((std)=> std.id === id);
        return std;
    }
    static updateStudent(updatedStd: IStudent, id: number): IStudent | string {
        const std = Student.students.find((std)=> std.id == id);
        if(!std) return "Student not found";
        std.name = updatedStd.name;
        std.age = updatedStd.age;
        std.department = updatedStd.department;
        return std;
    }
    static deleteStudent(id: number): string {
        const stdIndex = Student.students.findIndex(std => std.id === id);
        Student.students.splice(stdIndex, 1);
        if (stdIndex == -1) return "Student is not exist";
        else return "Student deleted";
    }
}




export default Student;