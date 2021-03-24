export interface IStudent {
    id: string;
    lastName: string;
    firstName: string;
    birthDate: string;
    phoneNumber: string;
}

export class Student implements IStudent{
    id: string;
    lastName: string;
    firstName: string;
    birthDate: string;
    phoneNumber: string;

    constructor(props: IStudent) {
        this.id = props.id;
        this.lastName = props.lastName;
        this.firstName = props.firstName;
        this.birthDate = props.birthDate;
        this.phoneNumber = props.phoneNumber;
    }
}