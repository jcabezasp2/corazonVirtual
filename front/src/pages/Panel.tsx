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
import { Icons } from "../assets/constants";
import '../css/panel.css';
import * as endpoints from '../assets/endpoints';
import InputPassword from "../components/form/InputPassword";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';



class Iprops { }

export default function Panel(props: Iprops) {

    const context = React.useContext(appContext);

    const [user, setUser] = React.useState<string>('');
    const [avatar, setAvatar] = React.useState<File>();
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
  
   
    const footer = (
        <span id="button-datos" className=" col-6">
           <SubmitButton
                   
                    onclik={context.apiCalls.updateUser}
                    ctx={{user : user, email: email, password: password, avatar: avatar }}
                    isLogin={true}
                    
                />
        </span>
    );

    const initialize = async () => {       
        const res = await context.apiCalls.getMyUser();        
        console.log(res)
        console.log(res.user.userName)
        console.log(res.user.email)
        console.log(res.user.password)
        setUser(res.user.userName)
        setEmail(res.user.email)
        setPassword(res.user.password)
      
    };

    React.useEffect(() => {
       initialize();
    }, []);

    const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        setAvatar(file);
    }

    const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleUpdate = async () => {
        const response = await context.apiCalls.updateUser(user, email, password, avatar);
        console.log(response);
    }

    const handleLogout = async () => {
        const response = await context.apiCalls.logout();
        console.log(response);
    }


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
                                <Image id="photo" src={avatar ? avatar : 'https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp'} indicatorIcon="pi pi-pencil"  alt="Image" preview />
                    
                            </div>
                        </div>
                    </Card> 
                </div>
                <div className="panelcontent col-12">
                    <Card className="col-4" title="Datos"   footer={footer} >
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
                  
                
                <Card className="col-4" title="Gráfico prácticas" > 
                    <Chart height="250%" type="line" data={chartData} options={chartOptions} />
                </Card>
                </div>
            </div>
        
    );
}




