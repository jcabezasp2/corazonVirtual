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

const parser = new DOMParser();

interface IPractice {
    Fecha: Date
    "Duracion(minutos)": number
    Observaciones: string
}

const minutes = (date: any) => {
    const minutes = Math.ceil(date / 60);

    if(minutes > 60){
        return <span className="red">&gt; 60</span>
    }else{
        return minutes
    }
}

const stringTrunk = (content: any) => {
    if(content.length > 50){
        return content.substring(0, 50) + "..."
    }else{
        return content
    }
}

const studentViewObservations = (content: any) => {

return <div className="studentObservations">
{<div dangerouslySetInnerHTML={{ __html: new XMLSerializer().serializeToString(parser.parseFromString(stringTrunk(content), 'text/html')) }} />}
 <Modal content={content} />
 </div>
}


export default function Practices(props: Iprops) {
  
    const navigate = useNavigate();
    const context = React.useContext(appContext);

    const [practices, setPractices] = React.useState([]);
    const addObservation = context.apiCalls.addObservation;
    const initialize = async () => {
       const res = await context.apiCalls.getPractices();
       const students = await context.apiCalls.getAllStudents();
       const steps = await context.apiCalls.getSteps();
       if(context.user.role == Role.Teacher){
        setPractices(res.map ((practice: any) => {
            return {
                Fecha: practice.date.split("T")[0],
                Paso: steps.filter((e: { id: any; }) => e.id == practice.stepId)[0]?.name,
                Estudiante: students.filter((e: { id: any; }) => e.id == practice.userId)[0]?.userName,
                "Duracion(minutos)": minutes(practice.duration),
                Observaciones: <ModalForm content={{...practice}} onClik={addObservation} />,
                };
            }));
       }else if (context.user.role == Role.Student){
        setPractices(res.map ((practice: any) => {
            return {
                Fecha: practice.date.split("T")[0],
                Paso: steps.filter((e: { id: any; }) => e.id == practice.stepId)[0]?.name,
                "Duracion(minutos)": minutes(practice.duration),
                Observaciones: studentViewObservations(practice.observations),
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
