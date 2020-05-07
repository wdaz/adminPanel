export class Contact {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    country: string;
    phoneNumber: string;

    constructor(init?: Partial<Contact>) {
        Object.assign(this, init);
    }
}