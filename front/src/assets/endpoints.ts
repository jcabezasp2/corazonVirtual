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
    if(res.status === 400) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    
    const apiKey = data.userApiKey.value;

    sessionStorage.setItem('apiKey', apiKey);
    return data
}

export const getAllUsers = async () => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones :any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };
    const res = await fetch(`${constants.API_URL}usuarios/getAll`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

export const getAllStudents = async () => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones :any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };
    const res = await fetch(`${constants.API_URL}usuarios/estudiantes`, opciones);

    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

export const getMyUser = async () => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones :any = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };
    const res = await fetch(`${constants.API_URL}usuarios/getUsuario`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}


//User by id
export const getUser = async (id :number) => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones :any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };
    const res = await fetch(`${constants.API_URL}usuarios/${id}`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

//Edit User by id
export const editUser = async (id :number, name :string, email :string, password :string) => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones : any = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "name": name, "email": email, "password": password })
    };
    const res = await fetch(`${constants.API_URL}usuarios/updateUsuario/${id}`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data    
    }
   
// Calls to Lock/Unlock API endpoint 
export const lockUnlockUser = async (id :string) => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones :any = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify(id)
    };
    const res = await fetch(`${constants.API_URL}usuarios/bloquearDesbloquear`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    console.log(res)
}



    
// Calls to the procedures API endpoints
export const getProcedures = () => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones :any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };
    const res = fetch(`${constants.API_URL}procedimientos`, opciones);
    return res
}

export const getProcedure = async (id :number) => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones :any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };
    const res = await fetch(`${constants.API_URL}procedimientos/${id}`, opciones);
    return res
}

// export const addProcedure = async (name :string, description :string, image :string) => {
   export const createProcedure = async (name : string, image : string) => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones :any = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "name": name, "image": image })
    };
    const res = await fetch(`${constants.API_URL}procedimientos`, opciones);
    return res
}


export const deleteProcedure = async (id :number) => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones :any = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };
    const res = await fetch(`${constants.API_URL}procedimientos/${id}`, opciones);
    return res
}

export const editProcedure = async (id :number, name :string, description :string, image :string) => {
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
    const res = await fetch(`${constants.API_URL}procedimientos/${id}`, opciones);
    return res
}
export const addProcedureSteps = async (id :number, stepIds :[]) => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones :any = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "procedureId": id, "stepIds": stepIds })
    };
    const res = await fetch(`${constants.API_URL}procedimientos/${id}/pasos`, opciones);
    return res
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

export const editStep = async (id :number, name :string, description :string, image :string, duration :string, previousStep :boolean) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'PUT',
        headers: {

            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "name": name, "description": description, "image": image, "duration": duration, "previousStep": previousStep })
    };

    const res = await fetch(`${constants.API_URL}pasos/${id}`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

export const blockUser = async (id :number) => {
    const apiKey = sessionStorage.getItem('apiKey');

    // TODO implementar bloqueo de usuario
}

export const createStep = async (name :string, description :string, image :string, duration :string, previousStep :boolean) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'POST',
        headers: {
            
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "name": name, "description": description, "image": image, "duration": duration, "previousStep": previousStep })
    };

    const res = await fetch(`${constants.API_URL}pasos`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

export const deleteStep = async (id :number) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'DELETE',
        headers: {

            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}pasos/${id}`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

export const getStepByProcedureId = async (id :number) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'GET',
        headers: {


            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}procedimientos/${id}/pasos`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

export const addStepTool = async (id : number, toolsId : number) => {
    const apiKey = sessionStorage.getItem('apiKey');

    // TODO implementar agregar herramienta a paso
    let opciones :any = {
        method: 'POST',
        headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Api-Key': apiKey
            },
            body: JSON.stringify({ "StepsId": id, "ToolsId": toolsId })
        };
        const res = await fetch(`${constants.API_URL}pasos/${id}/herramientas`, opciones);
        return res
        
}


// Calls to the Roles API endpoints

//All roles
export const getRoles = async () => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'GET',
        headers: {

            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}roles/getAll`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

export const getPermissions = async () => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'GET',
        headers: {

            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}roles/getAllClaims`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    console.log(data);
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

    const res = await fetch(`${constants.API_URL}Herramientas`, opciones);
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
export const createTool = async (name :string, description :string, modelo :string) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "name": name, "description": description, "modelo": modelo })
    };

    const res = await fetch(`${constants.API_URL}herramientas`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data        
}
//Update tool
export const updateTool = async (id :number, name :string, description :string, modelo :string) => { 
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "name": name, "description": description, "modelo": modelo })
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

// Call to the Practices API endpoints
//All user practices
export const getStudentPractices = async () => {

}

//All practices
export const getPractices = async () => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}practicas`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data        
}

//Calls to the Images API endpoints
export const getImage = async (path :string) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'GET',
        headers: {
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}images/${path}`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.blob();
    return data        
}

export const uploadImage = async (file :any) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones :any = {
        method: 'POST',
        headers: {
            'Api-Key': apiKey
        },
        body: file
    };

    const res = await fetch(`${constants.API_URL}images`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    console.log(data);
    return data        
}
