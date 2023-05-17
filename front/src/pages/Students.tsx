import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { appContext } from "../App";
import { Role } from "../assets/constants";

class Iprops {}

interface Istudent {
    id: number
    name: string
    email: string
    image: string
    role: string
}

export default function Students(props: Iprops) {
  
    const navigate = useNavigate();
    const context = React.useContext(appContext);

    const [students, setStudents] = React.useState([]);

    const initialize = async () => {
      const res = await context.apiCalls.getAllUsers();
      const students = res.filter((student: any) => {
        return student.role != Role.Student; //TODO cambiar en back para que devuelva el rol
        }).map((student: any) => {
            return {
                id: student.id,
                name: student.userName,
                email: student.email,
                image: student.image,
                };
            });
        setStudents(students);
        console.log('students', students);
    };

    React.useEffect(() => {
        initialize();
     }, []);

  return <div id="students">

     <Table dataElements={students} />

  </div>;
}
