import React from "react";
import { appContext } from "../App";
import SubmitButton from "../components/form/SubmitButton";
import { FileUpload } from 'primereact/fileupload';
import { useState, useEffect } from 'react';
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


class Iprops { }



export default function Panel(props: Iprops) {




    const context = React.useContext(appContext);
    const [userId, setUserId] = React.useState<any>();
    const [user, setUser] = React.useState<string>('');
    const [avatar, setAvatar] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [titleGraph, settitleGraph] = React.useState<string>('');
    const [practiceData, setpracticeData] = React.useState<any>([]);
    const [stepsData, setstepsData] = React.useState<any>([]);
    const [procedureData, setprocedureData] = React.useState([]);
    const [valid, setValid] = useState<boolean>(false);
    const regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,4}$');
    const isEmailValid = regex.test(email);

    const [ctx, setCtx] = useState<any>(null);
    const [ctx2, setCtx2] = useState<any>(null);


    React.useEffect(() => {
        let currentCtx = {
            user: user,
            email: email,
            password: password === undefined ? "aA1551-" : password,
            userId: userId,

        };
        setCtx(currentCtx);
    }, [user, email, password, userId, avatar]);

    React.useEffect(() => {
        let currentCtx = {
            name: user,
            surname: user,
            avatar: avatar,
            userId: userId,

        };
        setCtx2(currentCtx);
    }, [user, email, password, userId, avatar]);

    React.useEffect(() => {

        if (user === '' || email === '') {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [email, user]);

    const initialize = async () => {
        const res = await context.apiCalls.getMyUser();


        setUserId(res.user.id);
        setUser(res.user.userName);
        setEmail(res.user.email);
        setPassword(res.user.password);


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

        const response = await context.apiCalls.updateUser(ctx);
        if (response.ok) {
            alert("Usuario actualizado correctamente");
        } else {
            alert("Error al actualizar el usuario");
        }

        // const respone2 = await context.apiCalls.updateApplicationUser(userId, user, user, avatar)
        // console.log("respone update application user",respone2);
        // if (respone2.ok) {
        //     alert("Usuario actualizado correctamente");
        // }else{
        //     alert("Error al actualizar el usuario");
        // }





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


            <div className=" col-2">
                <Card className="avatar col-12" title={user.toUpperCase()} >
                    <div className="card-avatar col-12">
                        <div id="avatar-content" className="photo card flex justify-content-center ">

                            {context.user.role === Role.Student ?
                                <Image id="photo" src={avatar === "" ? "./src/img/graduation-cap-solid.svg" : avatar} alt="Estudiante" />
                                :
                                <Image id="photo" src={avatar === "" ? "./src/img/teacher.svg" : avatar} alt="Profesor" />
                            }

                            <FileUpload id="image" name="image" chooseLabel=""
                                onSelect={handleAvatar}
                                mode="basic" accept="image/*" auto={true} />

                        </div>
                    </div>
                </Card>
            </div>
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
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") {
                                        setPassword(e.currentTarget.value);
                                        context.apiCalls.login();
                                    }
                                }}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setPassword(e.target.value)
                                }
                                toggleMask
                                feedback={false}
                            />

                        </span>

                    </div>
                </Card>

                <ChartLine
                    title={titleGraph}
                    data={practiceData}
                    label={stepsData}
                />

            </div>
        </div>


    );
}




