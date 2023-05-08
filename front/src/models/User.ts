


export default class User {

    private _id :number;
    private _userName :string;
    private _email :string;
    private _apiKey :string;
    private _role :string;
    private _permissions :string[];

    constructor(id :number, name :string, email :string, apiKey :string, role :string, permissions :string[]) {
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
