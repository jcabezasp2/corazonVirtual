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




class Iprops { }

export default function Panel(props: Iprops) {

    const context = React.useContext(appContext);

    const [user, setUser] = React.useState<string>('');
    const [avatar, setAvatar] = React.useState<File>();
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});


    // const response = await context.apiCalls.user();

    const getUser = async (id: number) => {
        console.log(context.user.id)
        const res = await context.apiCalls.getUser(id)
        //    const res = await getUser(context.user.id)
        console.log(res)
        setUser(res.name)
        setEmail(res.email)
        setPassword(res.password)
        // setAvatar(res.data.image)
    }



    React.useEffect(() => {
        getUser(context.user.id);
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
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
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
            <h1>Panel</h1>
            <div className="card panelcontent col-12">

                <div className="gap-5 avatar col-3">
                    <label>Avatar</label>
                    <Avatar image="https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp" className="p-avatar-text flex align-items-center justify-content-center mr-2" size="xlarge" shape="circle">

                    </Avatar>
                </div>
                <div className="panel form col-8">
                    <div className='col-4 flex flex-row justify-content-between align-content-center'>
                        <label className="flex align-items-center">Usuario</label>
                        <div className="col-8">
                            <InputTxt labelname={user}
                                name={user} handleName={handleUser} />
                        </div>
                    </div>
                    <div className='col-4 flex flex-row justify-content-between align-content-center'>
                        <label className="flex align-items-center">Email</label>
                        <div className="col-8">
                            <InputTxt labelname={email} name={email} handleName={handleEmail} />
                        </div>
                    </div>
                    <div className='col-4 flex flex-row justify-content-between align-content-center'>
                        <label className="flex align-items-center">Password</label>
                        <div className="col-8">
                            <InputPassword labelname={"password"} name={password} handlePassword={handlePassword} />
                        </div>
                    </div>
                </div>
                <div className="card col-6">
                    <Chart height="200%" type="line" data={chartData} options={chartOptions} />
                </div>
            </div>
            <div className=' col-3'>
                <SubmitButton
                    onclik={context.apiCalls.updateUser}
                    ctx={{ email: email, password: password, avatar: avatar }}
                    isLogin={true}
                />
            </div>

        </div>
    );
}

