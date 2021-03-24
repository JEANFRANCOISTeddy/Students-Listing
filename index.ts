import {Student, IStudent} from './models'
import {saveStudentInFile, findStudentById, findStudentByLastName, findStudentByFirstName} from './functions'

const chalk = require('chalk');
const func = require('./functions'); //Récupération de l'Objet export
const scanf = require("scanf");
const terminalLink = require('terminal-link');
var figlet = require('figlet');

/**
 * Save student after written
 * @param student
 */
async function saveStudent(student: IStudent): Promise<void> {
    try{
        let res = await func.saveStudentInFile(student);
        console.log(chalk.green("Student has been saved"));
    } catch(err) {
        console.error(chalk.red("Student already created"));
    }
}

/**
 * Find a student with his id
 * @param id
 */
async function getStudentById(id: String): Promise<void> {
    try{
        let res = await func.findStudentById(id);
        console.log(chalk.green("Student has been found with id : " + res));
    } catch(err) {
        console.error(chalk.red("Student not found with id"));
    }
}

/**
 * Find a student with his first name
 * @param firstName
 */
async function getStudentByFirstName(firstName: String): Promise<void> {
    try{
        let res = await func.findStudentByFirstName(firstName);
        console.log(chalk.green("Student has been found with last name : " + res));
    } catch(err) {
        console.error(chalk.red("Student not found last name"));
    }
}

/**
 * Find a student with his last name
 * @param lastname
 */
async function getStudentByLastName(lastname: String): Promise<void> {
    try{
        let res = await func.findStudentByLastName(lastname);
        console.log(chalk.green("Student has been found with last name : " + res));
    } catch(err) {
        console.error(chalk.red("Student not found last name"));
    }
}

/**
 * Add new student to student file
 */
async function createStudent() {
    console.log("Enter student's id : ");
    let id = scanf("%s");
    console.log("Enter student's first name : ");
    let lastName = scanf("%s");
    console.log("Enter student's last name : ");
    let firstName = scanf("%s");
    console.log("Enter student's birthday : ");
    let birthDate = scanf("%s");
    console.log("Enter student's phone number : ");
    let phoneNumber = scanf("%s");
    const istudent: IStudent = {
        id: id,
        lastName: lastName,
        firstName: firstName,
        birthDate: birthDate,
        phoneNumber: phoneNumber
    }
    const student = new Student(istudent);
    await saveStudent(student)
}

/**
 * Launch CLI to choice a feature
 */
async function cli() {
    console.log(chalk.blue("What option do you want to choice : \n"));
    console.log(chalk.green("• Press 1") + " to add student to the list : ");
    console.log(chalk.green("• Press 2")  + " to get student : ");
    console.log(chalk.green("• Press 3")  + " to show all students in the list : ");
    const number = scanf("%s");

    switch (number) {
        case '1':
            await createStudent();
        break;
        case '2':
            console.log(chalk.blue("What option do you want to choice : \n"));
            console.log(chalk.green("• Press 1") + " to save student by id : ");
            console.log(chalk.green("• Press 2") + " to get student by fist name : ");
            console.log(chalk.green("• Press 3") + " to get student by last name : ");
            const getBy = scanf("%s");
            switch (getBy) {
                case '1':
                    console.log("Enter an id : ");
                    const id = scanf("%s");
                    await getStudentById(id);
                break;
                case '2':
                    console.log("Enter a first name : ");
                    const firstName = scanf("%s");
                    await getStudentByFirstName(firstName);
                break;
                case '3':
                    console.log("Enter a last name : ");
                    const lastName = scanf("%s");
                    await getStudentByLastName(lastName);
                break;
            }
        break;
        case '3':
            console.log("TODO : SHOW ALL STUDENTS IN FILE");
        break;
    }
}

/**
 * Create an Ascii title for the program
 */
function printAsciiTitle() {
    console.log(figlet.textSync('Students Listing !!', {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 200
    }));
}

printAsciiTitle();

/**
 * Call cli
 */
cli().then(function () {
    console.log(chalk.yellow("CLI has been correctly launched"));
    const link = terminalLink('You can find the code on my GitHub : ', 'https://github.com/JEANFRANCOISTeddy/Students-Listing');
    console.log(link);
}).catch(function (err) {
    console.error(chalk.red("INTERNAL ERROR : Can't launch CLI"));
})
