import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { appContext } from "../App";
import ProcedureCard from "../components/ProcedureCard";
import "./../css/procedures.css";
import defaultImage from "./../../src/img/defaultImage.jpeg";
import { Role } from "../assets/constants";
import { DataView } from "primereact/dataview";
import { Skeleton } from "primereact/skeleton";

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

  const gridItem = (procedure: any) => {
    return procedure ? (
      <div className="procedure">
        <ProcedureCard
          key={procedure.id}
          title={procedure.name}
          destiny={`/procedimientos/formulario/${procedure.id}`}
          // destiny={`/procedimientos/${procedure.id}`}
          image={procedure.image ? procedure.image : defaultImage}
          numberOfSteps={procedure.numberOfSteps}
          onEdit={() => {
            navigate(`/procedimientos/formulario/${procedure.id}`);
          }}
          onDelete={context.apiCalls.deleteProcedure}
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
    </div>
  );
}
