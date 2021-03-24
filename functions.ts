import {readFile, appendFile} from "fs";
import {Student, IStudent} from "./models";

/**
 * Transform an Object in string
 * @param student
 */
function studentToString(student: IStudent): string {
    return "{" + student.id + "/"  + student.lastName + ";" + student.firstName + "/" + student.birthDate + "/" + student.phoneNumber + "}\n";
}

/**
 * Save student in the file and verify if isn't already existed
 * @param student
 */
export async function saveStudentInFile(student: IStudent): Promise<string>{
    return new Promise<string>(function(resolve, reject) {
        readFile('students.rd', function (err,data) {
            if(err) {
                reject(err);
                return
            }
            const txt = data.toString('utf-8');
            const lines = txt.split("\n");
            const parsed = lines.map(function(line: string) {
                return line.split("/");
            })
            const found = parsed.find(function(arr: String[]) {
                return arr[1] === student.lastName + ';' + student.firstName;
            })
            if(found === undefined) {
                writeStudentInFile(student).then(function () {
                    resolve("ok");
                }).catch(reject);
                return;
            }
            reject(new Error("External error"));
        })
    })
}

/**
 * Write a student in the file
 * @param student
 */
function writeStudentInFile(student: IStudent): Promise<void> {
    return new Promise<void>(function(resolve, reject) {
        appendFile('students.rd', studentToString(student), function (err) {
            if(err) {
                reject(err);
                return
            }
            resolve();
        });
    });
}

/**
 * Find student in file by id
 * @param id
 */
export async function findStudentById(id: String): Promise<String[] | null>{
    return new Promise<String[] | null>(function(resolve, reject) {
        readFile('students.rd', function (err,data) {
            if(err) {
                reject(err);
                return;
            }
            const txt = data.toString('utf-8');
            const lines = txt.split("\n");
            const parsed = lines.map(function(line: string) {
                return line.split("/");
            })
            const found = parsed.find(function(arr: String[]) {
                if(found === undefined) {
                    reject(new Error("Student not found"));
                    return;
                }

                if(arr[0].split("{")[1] === id)
                    return arr[0] + '' + arr[1] + '' + arr[2] + '' + arr[3];
            })

            if(found === undefined) {
                reject(new Error("Student not found"));
                return;
            }

            resolve(found);
        })
    })
}

/**
 * Find student in file by last name
 * @param id
 */
export async function findStudentByLastName(lastName: String): Promise<String[] | null>{
    return new Promise<String[] | null>(function(resolve, reject) {
        readFile('students.rd', function (err,data) {
            if(err) {
                reject(err);
                return;
            }
            const txt = data.toString('utf-8');
            const lines = txt.split("\n");
            const parsed = lines.map(function(line: string) {
                return line.split("/");
            })
            const found = parsed.find(function(arr: String[]) {
                if(found === undefined) {
                    reject(new Error("Student not found"));
                    return;
                }

                if(arr[1].split(";")[0] === lastName)
                    return arr[0] + '' + arr[1] + '' + arr[2] + '' + arr[3];
            })

            if(found === undefined) {
                reject(new Error("Student not found"));
                return;
            }
            resolve(found);
        })
    })
}

/**
 * Find student in file by first name
 * @param id
 */
export async function findStudentByFirstName(firstName: String): Promise<String[] | null>{
    return new Promise<String[] | null>(function(resolve, reject) {
        readFile('students.rd', function (err,data) {
            if(err) {
                reject(err);
                return;
            }
            const txt = data.toString('utf-8');
            const lines = txt.split("\n");
            const parsed = lines.map(function(line: string) {
                return line.split("/");
            })
            const found = parsed.find(function(arr: String[]) {
                if(arr[1].split(";")[1] === firstName)
                    return arr[0] + '' + arr[1] + '' + arr[2] + '' + arr[3];
            })

            if(found === undefined) {
                reject(new Error("Student not found"));
                return;
            }
            resolve(found);
        })
    })
}