


export default class User {

    private _id :number;
    private _userName :string;
    private _email :string;
    private _apiKey :string;
    private _role :string;
    private _permissions :string[];
    //TODO que el constructor reciba un objeto con todos los atributos
    constructor(id :number = 0, name :string = 'undefined', email :string = 'undefined', apiKey :string = 'undefined', role :string = 'undefined', permissions :string[] = []) {
        this._id = id;
        this._userName = name;
        this._email = email;
        this._apiKey = apiKey;
        this._role = role;
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
