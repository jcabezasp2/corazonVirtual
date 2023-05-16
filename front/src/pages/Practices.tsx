import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { appContext } from "../App";
import { Role } from "../assets/constants";

class Iprops {}

interface IPractice {
    date: Date
    duration: number
    id: number
    observations: string
    procedureId: number
    stepId: number
    studentId: number
}

export default function Practices(props: Iprops) {
  
    const navigate = useNavigate();
    const context = React.useContext(appContext);

    const [practices, setPractices] = React.useState([]);

    const initialize = async () => {
       const res = await context.apiCalls.getPractices();
       console.log('practices', practices);
       if(context.user.role == Role.Teacher){
        setPractices(res.map ((practice: IPractice) => {
            return {
                id: practice.id,
                date: practice.date,
                duration: practice.duration,
                observations: practice.observations,
                procedureId: practice.procedureId,
                stepId: practice.stepId,
                studentId: practice.studentId
                };
            }));
       }else if (context.user.role == Role.Student){
        setPractices(res.map ((practice: IPractice) => {
            return {
                id: practice.id,
                date: practice.date,
                duration: practice.duration,
                observations: practice.observations,
                procedureId: practice.procedureId,
                stepId: practice.stepId,
                };
            }));
       }
    };

    React.useEffect(() => {
        initialize();
     }, []);

  return <div id="practices">

     <Table dataElements={practices} />

  </div>;
}
