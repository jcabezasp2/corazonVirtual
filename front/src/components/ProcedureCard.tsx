import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Role, Icons } from "../assets/constants";
import { Button } from "primereact/button";
import { appContext } from "../App";
import OptionsButton from './OptionsButton';
import React from "react";

class Iprops {
  id!: number;
  title!: string;
  destiny!: string;
  image!: string;
  numberOfSteps!: number;
  onEdit!: Function;
  onDelete!: Function;
}

export default function ProcedureCard(props: Iprops) {
  const navigate = useNavigate();
  const context = React.useContext(appContext);

  const header = (
    <img
      alt={props.title}
      src={props.image}
    />
  );

   console.log("en procedurecard: id", props.id)
  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      {context.user.role == Role.Teacher && <OptionsButton id={props.id} onEdit={props.destiny} onDelete={props.onDelete(props.id)} />}
      <Button label="Ir al procedimiento" onClick={()=>{navigate(props.destiny)} }/>
    </div>
  );

  return (
    <div className="procedure-card">
      <Card
        title={props.title}
        subTitle={`Numero de pasos ${props.numberOfSteps}`}
        footer={footer}
        header={header}
        className="md:w-25rem"
      >
      </Card>
    </div>
  );
}
