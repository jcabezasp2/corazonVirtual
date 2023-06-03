import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { appContext } from "../App";
import { Role } from "../assets/constants";
import "./../css/admin.css"

class Iprops {}

interface IRol {
    id: number
    name: string
}



export default function Roles(props: Iprops) {
  
    const navigate = useNavigate();
    const context = React.useContext(appContext);

    const [roles, setRoles] = React.useState([]);

    const initialize = async () => {
        const response = await context.apiCalls.getRoles();
        const roles = response.map((rol: any) => {
            return {
                Id: rol.id,
                Nombre: rol.name,
                // Permisos: <Button label="Editar permisos" severity="secondary" onClick={()=> {navigate(`/admin/roles/${rol.id}/permisos`)}}/>
            }
        });
        setRoles(roles);
    };

    React.useEffect(() => {
        initialize();
     }, []);

  return <div id="roleView">
    <Table dataElements={roles} onDelete={()=>{}} onEdit=""/>

  </div>;
}
