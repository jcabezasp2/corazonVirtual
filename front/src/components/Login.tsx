
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import '../css/buttons.css';
import '../css/login.css';
import * as endpoints from "../assets/endpoints"


export default function Login() {

    // type datos = React.FormEvent<HTMLFormElement>;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function signin(email:string, password:string) {
        console.log('entrando en el signin')
        // const res = await endpoints.login(email, password);
        const res = await endpoints.login(email, password);
        console.log(email, password)
        
        if(res != null){
            console.log('se ha logueado')

        }else{
            console.log('no se ha logueado')
        }
        console.log(res)
    }

    const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
          console.log("entrando en el submit")
        e.preventDefault();
        console.log("entrando en el submit 2")
        signin(email, password);
        
    }


    return (
        <div>
            <div className="login ">
           
                             <h3 className="h3 text-4xl font-bold text-center ">Iniciar sesión</h3>                 
                                            
                <span className="p-float-label">
                    <InputText className='inputtext' id="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)  => setEmail(e.target.value)} />
                    <label htmlFor="email">Email</label>
                </span>

                <span className='p-float-label'>
                <Password className='inputtext'  id="password" value={password} onKeyDown={(e) => e.key === 'Enter' && signin} onChange={(e: React.ChangeEvent<HTMLInputElement>)  => setPassword(e.target.value)} toggleMask feedback={false} />
                <label htmlFor="password">Password</label>
                </span>
             <div className='button-demo '>
             <div className='template '>
                <Button label='Sign in' className="button signin p-p-0" onClick={handleSubmit}>  
                </Button>
                 </div>                   
                 </div>                 
            </div>           
        </div>
   
    )
}


      