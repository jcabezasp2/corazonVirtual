import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { appContext } from "../App";
import { Role } from "../assets/constants";
import "./../css/students.css"

class Iprops { }

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
        const res = await context.apiCalls.getAllStudents();
        const students = res.filter((student: any) => {
            return student.role != Role.Student; 
        }).map((student: any) => {
            return {
                Nombre: student.userName,
                email: student.email,
            };
        });
        setStudents(students);
    };

    React.useEffect(() => {
        initialize();
    }, []);

    return <div id="studentsView">
        <div className="flex justify-content-end">
            <Button label="Añadir" icon="pi pi-plus" iconPos="right" onClick={() => navigate('/estudiantes/añadir')} />
        </div>
        <Table dataElements={students} onDelete={() => { }} onEdit="" />

    </div>
}
