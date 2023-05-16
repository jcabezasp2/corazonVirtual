import { Status } from '../assets/constants';
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import '../css/buttons.css';
import '../css/login.css';
import SubmitButton from "../components/form/SubmitButton"
import { appContext } from "../App";
import User from "../models/User";


export default function Login() {

    const context = React.useContext(appContext);

    // type datos = React.FormEvent<HTMLFormElement>;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');



    return (
     
            <div className="login ">
           
                             <h3 className="h3 text-4xl font-bold text-center ">Iniciar sesión</h3>                 
                                            
                <span className="p-float-label">
                    <InputText className='inputtext' id="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)  => setEmail(e.target.value)} />
                    <label htmlFor="email">Email</label>
                </span>

                <span className='p-float-label'>
                <Password className='inputtext'  id="password" value={password} onKeyDown={(e) => e.key === 'Enter' && console.log('')} onChange={(e: React.ChangeEvent<HTMLInputElement>)  => setPassword(e.target.value)} toggleMask feedback={false} />
                <label htmlFor="password">Password</label>
                </span>
             <div className='button-demo '>
             <div className='template '>
{/*                 <Button label='Sign in' className="button signin p-p-0" onClick={handleSubmit}>  
                </Button> */}
                <SubmitButton
                    onclik={context.apiCalls.login}
                    ctx= {{email: email, password : password}}
                    isLogin={true}
                />
                 </div>                   
                 </div>                 
            </div>           
           
   
    )
}


      