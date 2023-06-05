import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { appContext } from "../App";
import { Role } from "../assets/constants";
import "./../css/admin.css"

class Iprops { }

interface IUser {
    id: number
    name: string
    email: string
    role: string
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
                Bloqueado: user.user.lockoutEnabled ? 'Si' : 'No',
                Bloquear: blockOptions(user),
                'Cambio de rol': <Button label="Asignar Rol" onClick={() => navigate(`/admin/roles/${user.user.id}`)} className="p-button-info" />
            }
        });
        setUsers(users);
    };

    React.useEffect(() => {
        initialize();
    }, []);

    const blockOptions = (user : any) => {
        if (!user.user.lockoutEnabled) {
            if (user.role == Role.Admin) {
                return <Button label="Bloquear" className="p-button-danger" disabled />
            } else {
                return <Button label="Bloquear" onClick={() => lockUnlock(user)} className="p-button-danger" />
            }
        } else {
            return <Button label="Desbloquear" onClick={() => lockUnlock(user)} className="p-button-success" />
        }
    }

    const lockUnlock = async (user: any) => {
        if (user.role == Role.Admin) return;
        await context.apiCalls.lockUnlockUser(user.user.id);
        initialize();
    }

    return <div id="usersView">
        <Table dataElements={users} onDelete={() => { }} onEdit="" />

    </div>;
}
