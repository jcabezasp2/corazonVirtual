import React from "react";
import { Button } from "primereact/button";
import { appContext } from "../App";
import { Role } from "../assets/constants";
import "./../css/admin.css"
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";

class Iprops { }

interface IUser {
    id: number
    name: string
    email: string
    role: string
}


export default function Users(props: Iprops) {

    const context = React.useContext(appContext);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;
    const [globalFilter, setGlobalFilter] = React.useState('');

    const roles = [
        {name: Role.Admin, value: Role.Admin},
        {name: Role.Teacher, value: Role.Teacher},
        {name: Role.Student, value: Role.Student},
    ]

    const [users, setUsers] = React.useState([]);


    const cambiarRol = async (userEmail: string, rol: Role) => {
        await context.apiCalls.setUserRole(userEmail, rol);
        initialize();
    }

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
                Roles: <Dropdown value={user.role} onChange={(e) => {cambiarRol(user.user.email, e.target.value)}} options={roles} optionLabel="name"
                placeholder="Select a City" />
            }
        });
        setUsers(users);
    };

    React.useEffect(() => {
        initialize();
    }, []);


    const blockOptions = (user: any) => {
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


    const header = (
        <div className="flex justify-content-end">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search" />
            </span>
        </div>
    );

    const lockUnlock = async (user: any) => {
        if (user.role == Role.Admin) return;
        await context.apiCalls.lockUnlockUser(user.user.id);
        initialize();
    }

    return <div id="usersView">
        <DataTable stripedRows scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} scrollHeight="60vh" className='table' value={users} header={header} globalFilter={globalFilter} sortMode="multiple" tableStyle={{ minWidth: '50rem' }}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} al {last} de {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                <Column field="Id" header="Id" sortable />
                <Column field="Nombre" header="Nombre" sortable />
                <Column field="Email" header="Email" sortable />
                <Column field="Rol" header="Rol" sortable />
                <Column field="Bloqueado" header="Bloqueado" sortable />
                <Column field="Bloquear" header="Bloquear" />
                <Column field="Roles" header="Cambio de rol" />
        </DataTable>
        {/* <Table dataElements={users} filter onDelete={() => { }} onEdit="" /> */}

    </div>;
}
