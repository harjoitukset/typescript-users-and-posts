/*
 * The User type is a representation of a user in the system. Each user
 * has its own unique id, first name, last name etc. The user is also
 * associated with an address, bank, company, and hair color, each of
 * which has its own properties.
 *
 * You can see the full structure of the User type by looking at the
 * https://github.com/Ovi/DummyJSON/blob/master/src/data/users.json file.
 */

export interface Hair {
    color: string;
    type: string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Address {
    address: string;
    city: string;
    coordinates: Coordinates;
    postalCode: string;
    state: string;
}

export interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

export interface Company {
    address: Address;
    department: string;
    name: string;
    title: string;
}


export default interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    domain: string;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
}
