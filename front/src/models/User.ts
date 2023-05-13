import {Role} from './../assets/constants';
export default class User {

    private _id :number;
    private _userName :string;
    private _email :string;
    private _apiKey :string;
    private _role :Role;
    private _permissions :string[];
    //TODO que el constructor reciba un objeto con todos los atributos
    constructor(id :number = 0, name :string = 'undefined', email :string = 'undefined', apiKey :string = 'undefined', role :Role | string = Role.Guest, permissions :string[] = []) {
        this._id = id;
        this._userName = name;
        this._email = email;
        this._apiKey = apiKey;
        if(typeof role === 'string'){
            if(role === 'Admin'){
                this._role = Role.Admin;
            }else if(role === 'Teacher'){
                this._role = Role.Teacher;
            }else if(role === 'Student'){
                this._role = Role.Student;
            }else{
                this._role = Role.Guest;
            }
        }else{        
            this._role = role;
        }
        this._permissions = permissions;
    }

    get id() :number {
        return this._id;
    }

    get userName() :string {
        return this._userName;
    }

    get email() :string {
        return this._email;
    }

    get apiKey() :string {
        return this._apiKey;
    }

    get role() :string {
        return this._role;
    }

    get permissions() :string[] {
        return this._permissions;
    }
}
