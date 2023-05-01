
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import '../css/buttons.css';
import '../css/login.css';


export default function Login() {

    // type datos = React.FormEvent<HTMLFormElement>;
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');


const manejadora = () => {
    // e.preventDefault();
    // login(email, password);
}


    return (
        <div>
            <div className="login ">
           
                             <h3 className="h3 text-4xl font-bold text-center ">Iniciar sesión</h3>                 
                                            
                <span className="p-float-label">
                    <InputText className='inputtext' id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="username">Email or Username</label>
                </span>

                <span className='p-float-label'>
                <Password className='inputtext'  id="password" value={password} onKeyDown={(e) => e.key === 'Enter' && manejadora} onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} />
                <label htmlFor="password">Password</label>
                </span>
             <div className='button-demo '>
             <div className='template '>
                <Button label='Sign in' className="signin p-p-0" onClick={manejadora}>  
                </Button>
                 </div>  
                 </div>                 
            </div>           
        </div>
   
    )
}


      