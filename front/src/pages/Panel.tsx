import React from "react";
import { appContext } from "../App";
import SubmitButton from "../components/form/SubmitButton";
import { Avatar   } from 'primereact/avatar';
import {FileUpload} from 'primereact/fileupload';
import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import InputTxt from "../components/form/InputTxt";
import '../css/panel.css';
import InputPassword from "../components/form/InputPassword";
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Role, Icons } from "../assets/constants";
import Icon from "./../components/Icons";
import IPractice from "../interfaces/Practice";
import { useParams} from 'react-router-dom';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";


class Iprops { }



export default function Panel(props: Iprops) {

    
    const { id } = useParams();
    
    const context = React.useContext(appContext);
    const [userId, setUserId] = React.useState<any>();
    const [user, setUser] = React.useState<string>('');
    const [avatar, setAvatar] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [titleGraph, settitleGraph] = React.useState<string>('');
    const [practiceData, setpracticeData] = React.useState([]);  
    const [stepsData, setstepsData] = React.useState([]);
    const [procedureData, setprocedureData] = React.useState([]);
 

    const initialize = async () => {       
        const res = await context.apiCalls.getMyUser();   
            
        console.log("res", res.user.id)
        console.log("user Id ", userId, "id params", id)
        setUserId(res.user.id);
        setUser(res.user.userName);
        setEmail(res.user.email);
        setPassword(res.user.password);
        setAvatar(res.user.photo);
 
    };
    

    const practices = async () => {       
    let responsePractice = await context.apiCalls.getPracticeByUserId(userId);
    console.log("responsePractice",responsePractice);
    const practices = responsePractice.map((practice: IPractice) => {
        return {
          Id: practice.id,
          Date: practice.date,
          Duration: practice.duration,
          IsFinished: practice.isFinished,
          Observations: practice.observations,
          Procedure: practice.procedure,
          Step: practice.step,
          UserId: practice.userId,
        };
      });
      
      setpracticeData(practices)
        console.log("practicesss", practiceData)
      let responseProcedure = await context.apiCalls.getProcedure(1);       
      const procedures = await responseProcedure.json();
      setprocedureData(procedures)
      console.log("procedureData",procedures, "setprocedureData", procedureData);

      const title = procedures.name;
      settitleGraph(title);
      console.log("title", title,"setTitle", titleGraph)
      const pasos = procedures.steps;
      setstepsData(pasos)
      console.log("pasos",pasos, "stepsadata", stepsData)
    } 


        // const chartData = 
    
        //     {
                
        //         labels: pasos.id,                
        //         datasets:
        //         {practiceData.map((practice: IPractice) => practice.duration
        //          [
        //           {
        //             label: procedureData.id,
        //             data: practiceData.map((practice: IPractice) => practice.duration),
        //             fill: false,
        //             borderColor: getComputedStyle(document.documentElement).getPropertyValue('rgb(22, 28, 34)'),
        //             tension: 0.5,
        //           },
        //         ],
        //         )}
        //       };
        
            //   const chartDataComponent = practiceData.map((item: any) => (
            //     <Chart
                 
            //       type="line"
            //       data={{
            //         labels: [pasos.id],
            //         datasets: [
            //           {
            //             label: item.id,
            //             data: item.duration,
            //             fill: true,
            //             borderColor: getComputedStyle(document.documentElement).getPropertyValue('var(--primary-text-color)'),
            //             tension: 0.4,
            //           },
            //         ],
            //       }}
            //     />
            //   ));
              
            //   setChartData(chartData);


      
    
  
    React.useEffect(() => {
       initialize();
       practices();
    }, []);

    
    

    const handleUpdateUser = async () => {
        console.log("user", user, "email", email,"avatar",avatar)
        const response = await context.apiCalls.editUser(user, email, password, avatar);
        console.log(response);
    }


    const handleAvatar = async ({ files }: any) => {  
        const [file] = files;    
    
    if(avatar === ""){
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      let result = await context.apiCalls.uploadImageBase64(e.target.result);
      setAvatar(result);
        console.log("avatar vacio", avatar)       
    };
    reader.readAsDataURL(file);   
    
    }else{
    let img = avatar.split("images/")
    let deleteImg = img[1]
     let res = await context.apiCalls.deleteImage(deleteImg);
     if(res.ok){
        console.log("delete",deleteImg)
         }else{
          console.log("no borra")
         }
    
    
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      let result = await context.apiCalls.uploadImageBase64(e.target.result);    
      setAvatar(result);
      console.log("avatar borrado", avatar)  
    };
    reader.readAsDataURL(file);
    }
    }
    
    
  
    
  

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('var(--surface-700)');
        const textColorSecondary = documentStyle.getPropertyValue('var(--surface-800)');
        const surfaceBorder = documentStyle.getPropertyValue('var(--surface-900)');

      
                    // {
                    //     label: 'Second Dataset',
                    //     data: [element.score],
                    //     fill: false,
                    //     borderColor: documentStyle.getPropertyValue('var(--primary-color)'),
                    //     tension: 0.4
                    // }
            //     ]
            // );

           
            // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            // datasets: [
            //     {
            //         label: 'First Dataset',
            //         data: [65, 59, 80, 81, 56, 55, 40],
            //         fill: false,
            //         borderColor: documentStyle.getPropertyValue('var(--primary-text-color)'),
            //         tension: 0.4
            //     },
            //     {
            //         label: 'Second Dataset',
            //         data: [28, 48, 40, 19, 86, 27, 90],
            //         fill: false,
            //         borderColor: documentStyle.getPropertyValue('var(--primary-color)'),
            //         tension: 0.4
            //     }
            // ]
        // };
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

        // setChartData(chartData);
        setChartOptions(options);
    }, []);


    const footer = (
        <div className="button-footer-datos">
        <span id="button-datos" className=" col-6">
           <SubmitButton
                   
                    onclik={handleUpdateUser}
                    ctx={{id : userId, user : user, email: email, password: password, avatar: avatar}}
                    isLogin={true}
                    
                />
        </span>
        </div>
    );





    return (
                 
            <div className="panel col-12">

                
                <div  className=" col-2">
                    <Card className="avatar col-12" title={user.toUpperCase()} >                    
                        <div className="card-avatar col-12">                       
                            <div id="avatar-content" className="photo card flex justify-content-center ">
                                
                                {context.user.role=== Role.Student ?
                                <Image id="photo" src={avatar === "" ? "./src/img/graduation-cap-solid.svg"  : avatar}  alt="Estudiante"/>
                                :
                                <Image id="photo" src={avatar === "" ? "./src/img/teacher.svg"  : avatar}  alt="Profesor"/>
                                }

                                <FileUpload id="image" name="image"                                 
                                onSelect={handleAvatar}
                                mode="basic" accept="image/*" auto={true} />
                                <label htmlFor="file"></label>
                            </div>
                        </div>
                    </Card> 
                </div>
                <div className="panelcontent col-12">
                    <Card className="col-3 card-panel datos" title="Datos"   footer={footer} >
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
                        onKeyDown={(e : React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === "Enter" || e.key === "Tab") {
                                setUser(e.currentTarget.value);
                            }}}
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
                        onKeyDown={(e : React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === "Enter" || e.key === "Tab") {
                            setEmail(e.currentTarget.value);
                            }}}
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
                        onKeyDown={(e : React.KeyboardEvent<HTMLInputElement>) => {
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
                  
                
                <Card className="col-5 card-panel chart" title={titleGraph} > 
                    {/* <Chart height="250%" type="line" data={chartData} options={chartOptions} /> */}
                   
                </Card>
                </div>
            </div>          
            
        
    );
}




