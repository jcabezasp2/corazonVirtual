import React from "react";
import { appContext } from "../App";
import Table from "../components/Table";
import IStep from "../interfaces/Step";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import defaultImage from './../img/defaultImage.jpeg'
import Modal from "../components/Modal";


class Iprops {}

export default function Steps(props: Iprops) {

    const context = React.useContext(appContext);
    const [steps, setSteps] = React.useState([]);

    const navigate = useNavigate();

    const initialize = async () => {
        const response = await context.apiCalls.getSteps();
        const steps = response.map((step: IStep) => {
            return {
                Id: step.id,
                Nombre: step.name,
                Descripcion: <Modal content={step.description} />,
                Duracion: step.duration,
                Imagen: <Image className="td-image" src={step.image != "default"? step.image : defaultImage} alt="Image" width="250" />,
                Previo: step.previousStep? 'Si' : 'No',
            }
        })

        setSteps(steps);
        
    };

    React.useEffect(() => {
       initialize();
    }, []);


  return (
    <div id="stepsView">
        <Button label="Crear paso" severity="secondary" onClick={()=> {navigate("/pasos/formulario")}}/>
        <Table 
            dataElements={steps}
            showOptions
            onEdit = "/pasos/formulario"
            onDelete={context.apiCalls.deleteStep}
            />
    </div>
  );
}
