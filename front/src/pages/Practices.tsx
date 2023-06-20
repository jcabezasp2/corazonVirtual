import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { appContext } from "../App";
import { Role } from "../assets/constants";
import Modal from "../components/Modal";
import ModalForm from "../components/form/ModalForm";
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
    const addObservation = context.apiCalls.addObservation;
    const initialize = async () => {
       const res = await context.apiCalls.getPractices();
       const students = await context.apiCalls.getAllStudents();
       if(context.user.role == Role.Teacher){
        setPractices(res.map ((practice: any) => {
            return {
                Fecha: practice.date.split("T")[0],
                Paso: practice.stepId,
                Estudiante: students.filter((e: { id: any; }) => e.id == practice.userId)[0]?.userName,
                "Duracion(minutos)": (practice.duration / 60),
                Observaciones: <ModalForm content={{...practice}} onClik={addObservation} />,
                };
            }));
       }else if (context.user.role == Role.Student){
        setPractices(res.map ((practice: any) => {
            return {
                Fecha: practice.date,
                Paso: practice.stepId,
                "Duracion(minutos)": (practice.duration / 60),
                Observaciones:<Modal content={practice.observations} />,
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
