import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Role, Icons } from "../assets/constants";
import { Button } from "primereact/button";

class Iprops {
  title!: string;
  destiny!: string;
  image!: string;
  numberOfSteps!: number;
}

export default function ProcedureCard(props: Iprops) {
  const navigate = useNavigate();

  const header = (
    <img
      alt={props.title}
      src={props.image}
    />
  );
  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
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
