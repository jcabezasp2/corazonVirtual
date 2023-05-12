import React from 'react';
import * as constants from './constants';
import { appContext } from "../App";
import User from '../models/User';

// Calls to the user API endpoints
export const login = async (ctx :{email : string, password: string}) => {

    let opciones = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ "email": ctx.email, "password": ctx.password })
    };

    const res = await fetch(`${constants.API_URL}usuarios/login`, opciones);

    return res;

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


// Calls to the Steps API endpoints
export const getSteps = async () => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}pasos`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data        
}



// Calls to the Tools API endpoints
//All tools
export const getTools = async () => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}herramientas`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data        
}
//Tool by id
export const getTool = async (id :number) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}herramientas/${id}`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data        
}
//Create tool
export const createTool = async (name :string, description :string, image :string) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "name": name, "description": description, "image": image })
    };

    const res = await fetch(`${constants.API_URL}herramientas`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data        
}
//Update tool
export const updateTool = async (id :number, name :string, description :string, image :string) => { 
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "name": name, "description": description, "image": image })
    };

    const res = await fetch(`${constants.API_URL}herramientas/${id}`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data        
}
//Delete tool
export const deleteTool = async (id :number) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}herramientas/${id}`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data        
}
