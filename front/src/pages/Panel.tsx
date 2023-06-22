import React from "react";
import { appContext } from "../App";
import SubmitButton from "../components/form/SubmitButton";
import { FileUpload } from 'primereact/fileupload';
import { useState, useEffect, useRef } from 'react';
import { Chart } from 'primereact/chart';
import '../css/panel.css';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Role } from "../assets/constants";
import IPractice from "../interfaces/Practice";
import { useParams } from 'react-router-dom';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import ChartLine from "../components/Chart";
import { Status } from "../assets/constants";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

class Iprops { }



export default function Panel(props: Iprops) {


    //contexto
    const context = React.useContext(appContext);
    
    //constantes para guardar los datos
    const [userId, setUserId] = React.useState<any>();
    const [user, setUser] = React.useState<string>('');
    const [avatar, setAvatar] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [password2, setPassword2] = React.useState<string>('');
    const [titleGraph, settitleGraph] = React.useState<string>('');
    const [practiceData, setpracticeData] = React.useState<any>([]);
    const [stepsData, setstepsData] = React.useState<any>([]);
    const [procedureData, setprocedureData] = React.useState([]);

    //validaciones
    const [valid, setValid] = useState<boolean>(false);
    const regexEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,4}$');
    const isEmailValid = regexEmail.test(email);
    const regexPassword = new RegExp('^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[!@#$%^&()])[A-Za-z\d!@#$%^&()]{6,}$');
    const isPasswordValid = regexPassword.test(password);
    const toast = useRef<any>(null);
    const [status, setStatus] = React.useState<Status>(Status.error);
    const navigate = useNavigate();  
    // const [displayState, setdisplayState] = React.useState<string>('none');
    const [display, setDisplay] = useState({ display: 'none' });;
    

    //objeto con los datos
    const [ctx, setCtx] = useState<any>(null);
    const [ctx2, setCtx2] = useState<any>(null);


    React.useEffect(() => {
        let currentCtx = {          
            password: password,
            userId: userId,

        };
        setCtx(currentCtx);
        console.log("password todos", password)
    }, [password, userId, avatar]);

    React.useEffect(() => {
        let currentCtx = {
            name: user,
            surname: user,
            avatar: avatar,
            userId: userId,

        };
        setCtx2(currentCtx);

    }, [user, email, password, userId, avatar]);

    React.useEffect(()=>{
        if(password === ''){
        setDisplay({ display: 'none' });
        }else{
            setDisplay({ display: 'block' });
        }    
        console.log("password solo", password)
    },[password]);
    

    React.useEffect(() => {

        if (user === '' || email === '' || password === '' || password2 === '') {           
        setValid(true); 
            }else{
          setValid(false);  
        
           }
       
    }, [email, user, password, password2]);

    const initialize = async () => {
        const res = await context.apiCalls.getMyUser();


        setUserId(res.user.id);
        setUser(res.user.userName);
        setEmail(res.user.email);
        // setPassword(res.user.password);


        let responsePractice = await context.apiCalls.getPracticeByUserId(res.user.id);


        const practices2 = responsePractice.map((practice: any) => {
            return {
                label: practice.date,
                labels: practice.stepId,
                data: practice.duration,

            };

        });

        setpracticeData(practices2)

        let responseProcedure = await context.apiCalls.getProcedure(1);
        const procedures = await responseProcedure.json();
        setprocedureData(procedures)
        const title = procedures.name;
        settitleGraph(title);

        const pasos = procedures.steps;
        setstepsData(pasos)

    };




    React.useEffect(() => {
        initialize();

    }, [context.user.role]);




    const handleUpdateUser = async () => {
        if(password !== password2 ){              
            setStatus(Status.error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Las contraseñas no coinciden', life: 3000 });
        }else if(isEmailValid === false){
            setStatus(Status.error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Formato de email no válido', life: 3000 });
        }else if(isPasswordValid === false){
            setStatus(Status.error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Formato de contraseña no válido', life: 3000 });
        }else{
           
        const response = await context.apiCalls.updateUser(ctx);
        if (response.ok) {
            setStatus(Status.success);
            toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado correctamente', life: 3000 });                
            setTimeout(function(){
              navigate('/')
            }, 1000);
        } else {
            setStatus(Status.error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se ha podido actualizar el usuario', life: 3000 });
        }}
     

    }


    const handleAvatar = async ({ files }: any) => {
        const [file] = files;

        if (avatar === "") {
            const reader = new FileReader();
            reader.onload = async (e: any) => {
                let result = await context.apiCalls.uploadImageBase64(e.target.result);
                setAvatar(result);
            };
            reader.readAsDataURL(file);

        } else {
            let img = avatar.split("images/")
            let deleteImg = img[1]
            let res = await context.apiCalls.deleteImage(deleteImg);


            const reader = new FileReader();
            reader.onload = async (e: any) => {
                let result = await context.apiCalls.uploadImageBase64(e.target.result);
                setAvatar(result);
            };
            reader.readAsDataURL(file);
        }
    }






    const footer = (
        <div className="button-footer-datos">
            <span id="button-datos" className=" col-6">
                <SubmitButton

                    onclik={handleUpdateUser}
                    ctx={ctx}
                    isLogin={true}
                    disabled={valid}
                />
            </span>
        </div>
    );





    return (

        <div className="panel col-12">

            <div className="panelcontent col-12">
                <Card className="col-4 card-panel datos" title="Datos" footer={footer} >
                    <div className="flex card-form col-12">
                        <span className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>

                            <InputText
                                className="inputtext"
                                id="user"
                                value={user}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setUser(e.target.value)
                                }
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter" || e.key === "Tab") {
                                        setUser(e.currentTarget.value);
                                    }
                                }}
                                disabled
                            />

                        </span>

                        <span className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-at"></i>
                            </span>

                            <InputText
                                className="inputtext"
                                id="email"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEmail(e.target.value)
                                }
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter" || e.key === "Tab") {
                                        setEmail(e.currentTarget.value);
                                    }
                                }}
                                disabled
                            />

                        </span>

                        <span className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                            <Password
                                className="inputtext"
                                id="password"
                                value={password}                               
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setPassword(e.target.value)
                                }
                                toggleMask
                                feedback={false}
                                placeholder="Cambiar contraseña"
                            />                           

                        </span>
                        <div  style={display}>
                        <span className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>
                            <Password
                                className="inputtext"
                                id="password"
                                value={password2}                                
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setPassword2(e.target.value)
                                }
                                toggleMask
                                feedback={false}
                                placeholder="Cambiar contraseña"
                            />
                            

                        </span>
                        </div>
                    </div>
                </Card>

                <ChartLine
                    title={titleGraph}
                    data={practiceData}
                    label={stepsData}
                />
            <Toast ref={toast} />
            </div>
        </div>


    );
}




