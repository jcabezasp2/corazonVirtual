import React from 'react';
import * as constants from './constants';
import { appContext } from "../App";
import User from '../models/User';
import { Role } from './constants';

// Calls to the user API endpoints
export const login = async (ctx: { email: string, password: string }) => {

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

export const register = async (name: string, email: string, password: string) => {
    let opciones = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ "name": name, "email": email, "password": password })
    };

    const res = await fetch(`${constants.API_URL}usuarios/registrar`, opciones);
    //if(res.status === 400) return null; //TODO : Mostrar mensaje de error
    if (res.status === 400) { 
        console.error(`El usuario ${name} no fue creado`);
        return res; 
    } //TODO : Mostrar mensaje de error
    if(res.status === 201) console.info(`El usuario ${name} fue creado`);
    const data = await res.json();


    return res;
    //const apiKey = data.userApiKey.value;
    //sessionStorage.setItem('apiKey', apiKey);
    //return data
}

export const getAllUsers = async () => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones: any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };
    const res = await fetch(`${constants.API_URL}usuarios/getAll`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

export const getAllStudents = async () => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones: any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };
    const res = await fetch(`${constants.API_URL}usuarios/estudiantes`, opciones);

    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

export const getMyUser = async () => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones: any = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };
    const res = await fetch(`${constants.API_URL}usuarios/getUsuario`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}


//User by id
export const getUser = async (id: number) => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones: any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };
    const res = await fetch(`${constants.API_URL}usuarios/${id}`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

//Update User by id
export const updateUser = async (ctx: any) => {
    const apiKey = sessionStorage.getItem('apiKey');
    const { password } = ctx;
    let opciones: any = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "password": password })
    };
    const res = await fetch(`${constants.API_URL}usuarios/${userId}`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

//Update ApplicationUser
export const updateApplicationUser = async (ctx: any) => {
        const apiKey = sessionStorage.getItem('apiKey');
        const { userId, user, avatar } = ctx;
    let opciones: any = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "name": user, "surname": user, "photo": avatar })
    };
    const res = await fetch(`${constants.API_URL}usuarios/applicationUser/${userId}`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

// Calls to Lock/Unlock API endpoint 
export const lockUnlockUser = async (id: string) => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones: any = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify(id)
    };
    const res = await fetch(`${constants.API_URL}usuarios/bloquearDesbloquear`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
}




// Calls to the procedures API endpoints
export const getProcedures = () => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones: any = {
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

export const getProcedure = async (id: number) => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones: any = {
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
export const createProcedure = async (ctx: any) => {
    const apiKey = sessionStorage.getItem('apiKey');
    const { name, imageDirection, stepIds } = ctx;
  
    let opciones :any = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "name": name, "image": imageDirection, "steps": stepIds })
    };
    const res = await fetch(`${constants.API_URL}procedimientos`, opciones);
    return res
}


export const deleteProcedure = async (id: number) => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones: any = {
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

export const editProcedure = async (id :number, name :string, imageDirection :string) => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones: any = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "name": name, "image": imageDirection })
    };
    const res = await fetch(`${constants.API_URL}procedimientos/${id}`, opciones);
    return res
}
    export const addProcedureSteps = async (procedureId : number, ctx: { stepIds: any[] }) => { 
    const apiKey = sessionStorage.getItem('apiKey');          
    const {stepIds} = ctx;   
   
    let opciones :any = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "procedureId": procedureId, "stepIds": stepIds })
    };
    const res = await fetch(`${constants.API_URL}procedimientos/${procedureId}/pasos`, opciones);
    return res
}


// Calls to the Steps API endpoints
export const getSteps = async () => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones: any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}pasos`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

export const getStep = async (id: number) => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones: any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };
    const res = await fetch(`${constants.API_URL}pasos/${id}`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

export const editStep = async (id: number,ctx: any) => {
    const apiKey = sessionStorage.getItem('apiKey');
    const { name, description, image, duration, previousStep, tools } = ctx;
   
    let opciones: any = {
        method: 'PUT',
        headers: {

            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "name": name, "description": description, "image": image, "duration": duration, "previousStep": previousStep, "toolsId": tools  })
    };

    const res = await fetch(`${constants.API_URL}pasos/${id}`, opciones);
    return res
}

export const createStep = async (ctx : any) => {
    const apiKey = sessionStorage.getItem('apiKey');
    console.log(ctx)
    const { name, description, image, duration, previousStep, tools } = ctx;
    let opciones: any = {
        method: 'POST',
        headers: {

            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "name": name, "description": description, "image": image, "duration": String(duration), "previousStep": previousStep, "tool": tools })
    };
    const res = await fetch(`${constants.API_URL}pasos`, opciones);
    return res
   
}

export const deleteStep = async (id: number) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones: any = {
        method: 'DELETE',
        headers: {

            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}pasos/${id}`, opciones);   
    return res
}  



export const getStepByProcedureId = async (id: number) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones: any = {
        method: 'GET',
        headers: {


            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}procedimientos/${id}/pasos`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

export const addStepTool = async (id: number, toolsId: number) => {
    const apiKey = sessionStorage.getItem('apiKey');

    // TODO implementar agregar herramienta a paso
    let opciones: any = {
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

    let opciones: any = {
        method: 'GET',
        headers: {

            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}roles/getAll`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

export const setUserRole = async (userEmail: string, roleName: Role) => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones: any = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "userEmail": userEmail.toString(), "roleName": roleName })
    };

    const res = await fetch(`${constants.API_URL}roles/changeuserrole`, opciones);

    return res
}

export const getPermissions = async () => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones: any = {
        method: 'GET',
        headers: {

            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}roles/getAllClaims`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

// Calls to the Tools API endpoints
//All tools
export const getTools = async () => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones: any = {
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
export const getTool = async (id: number) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones: any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}herramientas/${id}`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}
//Create tool
export const createTool = async (name :string, description :string, modelo :string, num : number) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones: any = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "name": name, "description": description, "modelo": modelo, "optimalScale": num })
    };

    const res = await fetch(`${constants.API_URL}herramientas`, opciones);
    return res; 
    
}
//Update tool
export const updateTool = async (id :number, name :string, description :string, modelo :string, num : number) => { 
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones: any = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        },
        body: JSON.stringify({ "name": name, "description": description, "modelo": modelo, "optimalScale" : num })
    };

    const res = await fetch(`${constants.API_URL}herramientas/${id}`, opciones);
    return res      
}
//Delete tool
export const deleteTool = async (id: number) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones: any = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}herramientas/${id}`, opciones);
    return res
}

//Tools by step id
export const getToolByStepId = async (id: number) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones: any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };
    const res = await fetch(`${constants.API_URL}pasos/${id}/herramientas`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
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

    let opciones: any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}practicas`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
}

//Practice by user id
export const getPracticeByUserId = async (id: number) => {
    const apiKey = sessionStorage.getItem('apiKey');
    let opciones: any = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Api-Key': apiKey
        }
    };
    const res = await fetch(`${constants.API_URL}usuarios/${id}/practicas`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data
    
    
   
}    



//Calls to the Images API endpoints
export const getImage = async (path: string) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones: any = {
        method: 'GET',
        headers: {
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}images/${path}`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.blob();
    return data
}
//Calls to the Images API endpoints
export const getImageFbx = async (path :string) => {
    const apiKey = sessionStorage.getItem('apiKey');
    
    let opciones :any = {
        method: 'GET',
        headers: {
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}images3d/${path}`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.blob();
    return data 
    }

//Calls to the Images API endpoints

// function to upload an image to the server
export const uploadImage = async (file: any) => {
    const apiKey = sessionStorage.getItem('apiKey');
    let formData = new FormData();
    formData.append('image', file);

    let opciones: any = {
        method: 'POST',
        headers: {
            'Api-Key': apiKey,
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    };

    const res = await fetch(`${constants.API_URL}images`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    const data = await res.json();
    return data


}

// function to upload an image to the server
export const uploadImageBase64 = async (file: any) => {

    const apiKey = sessionStorage.getItem('apiKey');
    const base64 = file.split(',')[1];

    let opciones: any = {
        method: 'POST',
        headers: {
            'Api-Key': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "image": base64 })
    };

    const res = await fetch(`${constants.API_URL}images/base64`, opciones);
    if (res.status !== 200) return null; //TODO : Mostrar mensaje de error
    return res.text();


}

// function to upload an image to the server
export const uploadImageBase64Fbx = async (file :any) => {
    
    const apiKey = sessionStorage.getItem('apiKey');
    const base64 = file.split(',')[1];
    
    let opciones :any = {
        method: 'POST',
        headers: {
            'Api-Key': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "image": base64 })
    };

    const res = await fetch(`${constants.API_URL}images/base64fbx`, opciones);
    if(res.status !== 200) return null; //TODO : Mostrar mensaje de error
    return res.text();

}

// function to delete an image from the server
export const deleteImage = async (path: string) => {
    const apiKey = sessionStorage.getItem('apiKey');

    let opciones: any = {
        method: 'DELETE',
        headers: {
            'Api-Key': apiKey
        }
    };

    const res = await fetch(`${constants.API_URL}images/${path}`, opciones);
    return res
}



