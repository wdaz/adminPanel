export class User {
    token: string;
    name: string;

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}