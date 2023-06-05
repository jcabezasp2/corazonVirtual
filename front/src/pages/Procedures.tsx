import React, {useRef} from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { appContext } from "../App";
import ProcedureCard from "../components/ProcedureCard";
import "./../css/procedures.css";
import defaultImage from "./../../src/img/defaultImage.jpeg";
import { Role } from "../assets/constants";
import { DataView } from "primereact/dataview";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";
import { Status } from "../assets/constants";
interface Iprocedure {
  id: number;
  name: string;
  image: string | null;
  numberOfSteps: number;
}

class Iprops {}

export default function Procedures(props: Iprops) {
  const navigate = useNavigate();
  const context = React.useContext(appContext);

  const [procedures, setProcedures] = React.useState([]);
  const toast = useRef(null);
  const [status, setStatus] = React.useState<Status>(Status.error);


  const onDelete = async (id: number) => {
    
    console.log("id dentro de ondelete antes de borrar", id)
    const res = await context.apiCalls.deleteProcedure(id);
    console.log("dentro de ondelete despues de borrar: res", res)
    if (res.ok) {
        setStatus(Status.success);
        toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
        setTimeout(function(){
          window.location.reload();
       }, 5000);
    } else {
        setStatus(Status.error);
        toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
    }
  }


  const gridItem = (procedure: any) => {
    
    return procedure ? (
      <div className="procedure">
        <ProcedureCard
          id={procedure.id}
          title={procedure.name}
          destiny={`/procedimientos/${procedure.id}`}//Esta es la ruta que se sigue cuando se hace click en el boton de ir al procedimiento
          //Si la cambias para que vaya a la ruta de editar, deja de poderse entrar al procedimiento
          image={procedure.image ? procedure.image : defaultImage}
          numberOfSteps={procedure.numberOfSteps}
          onEdit={() => {
            navigate(`procedimientos/formulario/${procedure.id}`);
          }}
          onDelete={(e: any) => onDelete}
        />
      </div>
    ) : (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <Skeleton className="w-6rem border-round h-1rem" />
            <Skeleton className="w-3rem border-round h-1rem" />
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <Skeleton className="w-9 shadow-2 border-round h-10rem" />
            <Skeleton className="w-8rem border-round h-2rem" />
            <Skeleton className="w-6rem border-round h-1rem" />
          </div>
          <div className="flex align-items-center justify-content-between">
            <Skeleton className="w-4rem border-round h-2rem" />
            <Skeleton shape="circle" className="w-3rem h-3rem" />
          </div>
        </div>
      </div>
    );
  };

  const initialize = async () => {
    const res = await context.apiCalls.getProcedures();
    const procedures = await res.json();
    setProcedures(
      procedures.map((procedure: any) => {
        console.log("en procedures: procedure.id",procedure.id)
        return {
          id: procedure.id,
          name: procedure.name,
          image: procedure.image,
          numberOfSteps: procedure.steps.length,
        };
      })
    );
  };

  const itemTemplate = (item: any, layout: string) => {
    if (!item) {
      return;
    }

    return gridItem(item);
  };

  React.useEffect(() => {
    initialize();
  }, []);




  return (
    <div id="proceduresView">
      {context.user.role == Role.Teacher && (
        <Button
          label="Crear procedimiento"
          severity="secondary"
          onClick={() => {
            navigate("/procedimientos/formulario");
          }}
        />
      )}
      <div className="procedures">
        <div className="card">
          <DataView
            className="tools"
            value={procedures}
            itemTemplate={itemTemplate}
            layout={"grid"}
            paginator
            rows={3}
          />
        </div>
      </div>
      <Toast ref={toast} />
    </div>
  );
}
