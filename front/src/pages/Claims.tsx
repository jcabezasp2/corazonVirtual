import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { appContext } from "../App";
import { Role } from "../assets/constants";
import "./../css/admin.css"

class Iprops {}

interface IClaim {
    id: number
    name: string
    description: string
}



export default function Claims(props: Iprops) {
  
    const navigate = useNavigate();
    const context = React.useContext(appContext);

    const [claims, setClaims] = React.useState([]);

    const initialize = async () => {
        const response = await context.apiCalls.getPermissions();
        const claims = response.map((claim: any) => {
            return {
                Id: claim.id,
                Nombre: claim.name,
                Descripcion: claim.description,
            }
        });
        setClaims(claims);
    };

    React.useEffect(() => {
        initialize();
     }, []);

  return <div id="claimsView">
    <Table dataElements={claims} onDelete={()=>{}} onEdit=""/>

  </div>;
}
