import * as constants from './constants';

// Calls to the user API endpoints
export const login = async (email :string, password :string) => {

    let opciones = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ "email": email, "password": password })
    };

    const res = await fetch(`${constants.API_URL}usuarios/login`, opciones);

    if(res.status === 400) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    
    const apiKey = data.userApiKey.value;

    sessionStorage.setItem('apiKey', apiKey);
    return data

}

export const register = async (email :string, password :string, name :string, ) => {
    let opciones = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ "email": email, "password": password, "name": name })
    };

    const res = await fetch(`${constants.API_URL}usuarios/registrar`, opciones);
    console.log(res)
    if(res.status === 400) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    
    const apiKey = data.userApiKey.value;

    sessionStorage.setItem('apiKey', apiKey);
    return data
}




// Calls to the procedures API endpoints
export const getProcedimientos = () => {
    
}




