import React from "react";
import { appContext } from "../App";
import IStep from "../interfaces/Step";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import SubmitButton from "../components/form/SubmitButton";
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import InputTxt from "../components/form/InputTxt";
import File from "../components/form/File";
import '../css/panel.css';
import * as endpoints from '../assets/endpoints';
import InputPassword from "../components/form/InputPassword";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Role, Icons } from "../assets/constants";
import Icon from "./../components/Icons";



class Iprops { }

export default function Panel(props: Iprops) {

    const context = React.useContext(appContext);
    const [id, setId] = React.useState<string>('');
    const [user, setUser] = React.useState<string>('');
    const [avatar, setAvatar] = React.useState<File>();
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
  
   
 

    const initialize = async () => {       
        const res = await context.apiCalls.getMyUser();       
       
        setId(res.user.id);
        setUser(res.user.userName);
        setEmail(res.user.email);
        setPassword('aA1551-');
      
    };

    React.useEffect(() => {
       initialize();
    }, []);

    

    const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleUpdateUser = async () => {
        
        const response = await context.apiCalls.updateUser(user, email, password);
        console.log(response);
    }

  
    const footer = (
        <div className="button-footer-datos">
        <span id="button-datos" className=" col-6">
           <SubmitButton
                   
                    onclik={handleUpdateUser}
                    ctx={{id : id, user : user, email: email, password: password}}
                    isLogin={true}
                    
                />
        </span>
        </div>
    );

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('var(--primary-color)');
        const textColorSecondary = documentStyle.getPropertyValue('var(--text-color-secondary)');
        const surfaceBorder = documentStyle.getPropertyValue('var(--surface-border)');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('var(--primary-text-color)'),
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('var(--primary-color)'),
                    tension: 0.4
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
                 
            <div className="panel col-12">

                
                <div  className="panel col-2">
                    <Card className="avatar col-12" title={user.toUpperCase()} >                    
                        <div className="card-avatar">                       
                            <div className="photo card flex justify-content-center">
                                <Avatar id="photo" icon={context.user.role === Role.Student ? <Icon type={Icons.Student} text="Estudiante"/> : <Icon type={Icons.Teacher} text="Profesor"/>} shape="circle" size="xlarge"/>
                                
                                {/* <Image id="photo" src={context.user.role === Role.Student ? <Icon type={Icons.Student} text="Estudiante"/> : <Icon type={Icons.Teacher} text="Profesor"/>} indicatorIcon="pi pi-pencil"  alt="Image" preview /> */}
                    
                            </div>
                        </div>
                    </Card> 
                </div>
                <div className="panelcontent col-12">
                    <Card className="col-3 card-panel datos" title="Datos"   footer={footer} >
                        <div className="flex card-form col-12">
                            <label className="flex align-items-center col-2 " >Usuario</label>
                                <div className="col-10">
                                    <InputTxt labelname={user}
                                        name={user} handleName={handleUser} />
                                </div>
                        </div>
                        <div className="flex card-form col-12">
                            <label className="flex align-items-center col-2 ">Email</label>
                            <div className="col-10 align-self-start">
                                <InputTxt labelname={email} name={email} handleName={handleEmail} />
                            </div>
                        </div>
                        <div className="flex card-form col-12">
                        <label className="flex align-items-center col-2">Password</label>
                        <div className="col-10">
                            <InputPassword labelname={"••••••••••"} name={password} handlePassword={handlePassword} />
                        </div>
                        </div>
                     </Card>                   
                  
                
                <Card className="col-5 card-panel chart" title="Gráfico prácticas" > 
                    <Chart height="250%" type="line" data={chartData} options={chartOptions} />
                </Card>
                </div>
            </div>
        
    );
}




