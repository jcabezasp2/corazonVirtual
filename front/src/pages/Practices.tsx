import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { appContext } from "../App";
import { Role } from "../assets/constants";
import "./../css/practices.css"

class Iprops {}

interface IPractice {
    Fecha: Date
    "Duracion(minutos)": number
    Observaciones: string
}

export default function Practices(props: Iprops) {
  
    const navigate = useNavigate();
    const context = React.useContext(appContext);

    const [practices, setPractices] = React.useState([]);

    const initialize = async () => {
       const res = await context.apiCalls.getPractices();
       if(context.user.role == Role.Teacher){
        setPractices(res.map ((practice: any) => {
            return {
                Fecha: practice.date.split("T")[0],
                "Duracion(minutos)": practice.duration,
                Observaciones: practice.observations,
                };
            }));
       }else if (context.user.role == Role.Student){
        setPractices(res.map ((practice: any) => {
            return {
                Fecha: practice.date,
                "Duracion(minutos)": practice.duration,
                Observaciones: practice.observations,
                };
            }));
       }
    };

    React.useEffect(() => {
        initialize();
     }, []);

  return <div id="practices">

     <Table dataElements={practices} onDelete={()=>{}} onEdit=""/>

  </div>;
}
