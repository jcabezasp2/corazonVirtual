import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { appContext } from "../App";
import ProcedureCard from "../components/ProcedureCard";
import "./../css/procedures.css";
import defaultImage from "./../../src/img/defaultImage.jpeg";
import { Role } from "../assets/constants";

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
        {procedures.map((procedure: Iprocedure) => {
          return (
            <ProcedureCard
              key={procedure.id}
              title={procedure.name}
              destiny={`/procedimiento/${procedure.id}`}
              image={procedure.image ? procedure.image : defaultImage}
              numberOfSteps={procedure.numberOfSteps}
              onEdit={() => {
                navigate(`/procedimientos/formulario/${procedure.id}`);
              }}
              onDelete={context.apiCalls.deleteProcedure}
            />
          );
        })}
      </div>
    </div>
  );
}
