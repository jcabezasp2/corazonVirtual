import React, { useState, useRef } from "react";
import { Status } from "../../assets/constants";
import SubmitButton from "../../components/form/SubmitButton";
import { FileUpload } from "primereact/fileupload";
import InputTxt from "../../components/form/InputTxt";
import PickListt from "../../components/form/Picklist";
import PickSteps from "../../interfaces/PickSteps";
import { useParams } from "react-router-dom";
import "../../css/picklist.css";
import "./../../css/procedureform.css";
import { appContext } from "../../App";

interface Iprops {}

interface Iprocedure {
    name: string;
    imageDirection: string;
    stepIds: any[],
  
}

export default function ToolForm(props: Iprops) {
  const { id } = useParams();
  const context = React.useContext(appContext);

  //Parte del nombre del procedimiento
  const [name, setName] = useState<string>("");

  const handleName = (name: string) => {
    setName(name);
  };

  //Parte de la imagen del procedimiento
  const [image, setImage] = useState<string>("");

  const onUpload = async ({ files }: any) => {
    const [file] = files;
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      let result = await context.apiCalls.uploadImageBase64(e.target.result);
      setImage(result);
    };
    reader.readAsDataURL(file);
  };

  //Parte de los pasos del procedimiento
  const [source, setSource] = React.useState<PickSteps[]>([]);
  const [stepIds, setStepIds] = React.useState<any>([]);
  const [target, setTarget] = React.useState<PickSteps[]>([]);
  const [idAsociados, setIdAsociados] = React.useState<any>([]);

  const onChange = (event: { source: PickSteps[]; target: PickSteps[] }) => {
    setSource(event.source);
    setTarget(event.target);
    const ids = event.target.map((item) => item.code);
    setStepIds(ids);
  };

  //Funcionalidad de carga de la pagina
  React.useEffect(() => {
    allSteps();
    if (id) {
      const procedureEdit = async () => {
        const res = await context.apiCalls.getProcedure(id);
        const data = await res.json();
        setName(data.name);
        setImage(data.image);
        // setFile(data.file);
        setIdAsociados(data.steps);
        setTarget(data.steps);
      };
      procedureEdit();
    }
  }, []);

  const allSteps = async () => {
    const res = await context.apiCalls.getSteps();
    const steps = res.map((step: PickSteps) => {
      return {
        id: step.id,
        code: step.id,
        name: step.name,
        description: step.description,
        image: step.image,
        rating: step.id,
      };
    });

    setSource(steps);
  };

  //Funcionalidad del boton de submit
  const [ctx, setCtx] = useState<any>(null);

  React.useEffect(() => {
    let currentCtx : Iprocedure = {
        name: name ? name : '',
        imageDirection: image ? image :  '',
        stepIds : stepIds ? stepIds : [],
    };
    setCtx(currentCtx);
}, [name, image, stepIds]);

  return (
    <div id="procedureform">
      <div>
        <InputTxt
          name={name}
          handleName={handleName}
          labelname={"Nombre del procedimiento"}
        />
      </div>
      <div className="upload">
        <FileUpload
          name="image"
          customUpload={true}
          uploadHandler={onUpload}
          mode="basic"
          accept="image/*"
          auto={true}
        />
        <label htmlFor="file"></label>
      </div>
      <div>
        <PickListt source={source} onChange={onChange} target={target} />
      </div>
      <div>
        <SubmitButton
          isLogin={false}
          onclik={context.apiCalls.createProcedure}
          ctx={ctx}
        />
      </div>
    </div>
  );
}
