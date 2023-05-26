import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { appContext } from "../App";
import { Role } from "../assets/constants";
import "./../css/admin.css"

class Iprops {}

interface IUser {
    id: number
    name: string
    email: string
    role: string
}

const blockOptions = (user: any) => {
    if(!user.user.lockoutEnd){
        if(user.role == Role.Admin) {
            return <Button label="Bloquear" className="p-button-danger" disabled/>
        } else {
            return <Button label="Bloquear" className="p-button-danger" />
        }
    }else{
        return <Button label="Desbloquear" className="p-button-success"/>
    }
}

export default function Users(props: Iprops) {
  
    const navigate = useNavigate();
    const context = React.useContext(appContext);

    const [users, setUsers] = React.useState([]);

    const initialize = async () => {
        const response = await context.apiCalls.getAllUsers();
        const users = response.map((user: any) => {
            return {
                Id: user.user.id,
                Nombre: user.user.userName,
                Email: user.user.email,
                Rol: user.role,
                Bloqueado: user.user.lockoutEnd? user.user.lockoutEnd : 'No',
                Bloquear: blockOptions(user)
            }
        });
        setUsers(users);
    };

    React.useEffect(() => {
        initialize();
     }, []);

  return <div id="usersView">
     <Table dataElements={users} onDelete={()=>{}} onEdit=""/>

  </div>;
}
