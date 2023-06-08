import React, { useState, useRef } from "react";
import { Status } from "../../assets/constants";
import SubmitButton from "../../components/form/SubmitButton";
import { FileUpload } from "primereact/fileupload";
import InputTxt from "../../components/form/InputTxt";
import PickListt from "../../components/form/Picklist";
import Picklist from "../../interfaces/Picklist";
import { useParams } from "react-router-dom";
import "../../css/picklist.css";
import "./../../css/procedureform.css";
import { appContext } from "../../App";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { Image } from 'primereact/image';
import { Button } from "primereact/button";
import { FileUploadHeaderTemplateOptions, FileUploadSelectEvent, FileUploadUploadEvent, ItemTemplateOptions, } from 'primereact/fileupload';


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
  const [imageDirection, setImageDirection] = useState<string>("");
  const [src, setSrc] = useState<string>('');

  

  const onUpload = async ({ files }: any) => {  
        const [file] = files;    
    console.log("file", files, "antes del delete")

   if(imageDirection === ""){
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      let result = await context.apiCalls.uploadImageBase64(e.target.result);
      console.log("result",result)
      setImageDirection(result);
      console.log("image direction",imageDirection)
      setSrc(result)
    };
    reader.readAsDataURL(file);   
   
  }else{
    let img = imageDirection.split("images/")
    console.log("imageDirection", imageDirection)
    let deleteImg = img[1]
     let res = await context.apiCalls.deleteImage(deleteImg);
     if(res.ok){
    console.log("delete",deleteImg)
     }else{
      console.log("no borra")
     }
  console.log("file", files, "despues de borrar, antes de resubir")
   
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      let result = await context.apiCalls.uploadImageBase64(e.target.result);
      console.log("result",result)
      setImageDirection(result);
      console.log("image direction",imageDirection)
      setSrc(result)
    };
    reader.readAsDataURL(file);
  }
}
    
 





  //Parte de los pasos del procedimiento
  const [source, setSource] = React.useState<Picklist[]>([]);
  const [stepIds, setStepIds] = React.useState<any>([]);
  const [target, setTarget] = React.useState<Picklist[]>([]);
  const [idAsociados, setIdAsociados] = React.useState<any>([]);

  const onChange = (event: { source: Picklist[]; target: Picklist[] }) => {
    setSource(event.source);
    setTarget(event.target);
    const ids = event.target.map((item) => item.code);
    setStepIds(ids);
  };

//Validación
const toast = useRef<any>(null);
const [status, setStatus] = React.useState<Status>(Status.error);

  //Funcionalidad de carga de la pagina
  React.useEffect(() => {
    allSteps();
    if (id) {
      const procedureEdit = async () => {
        const res = await context.apiCalls.getProcedure(id);
        const data = await res.json();
        setName(data.name);
        setImageDirection(data.image);
        setSrc(data.image);       
        setIdAsociados(data.steps);
        setTarget(data.steps);
      };
      procedureEdit();
    }
  }, []);

  const allSteps = async () => {
    const res = await context.apiCalls.getSteps();
    const steps = res.map((step: Picklist) => {
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
        imageDirection: imageDirection ? imageDirection :  '',
        stepIds : stepIds ? stepIds : [],
    };
    setCtx(currentCtx);
}, [name, imageDirection, stepIds]);



//Funcionalidad de creación y edición de herramientas
const navigate = useNavigate();

const handleProcedure = async () => {
    if(id){
        if(ctx.name === '' || ctx.imageDirection === '' || ctx.stepIds === ''){
            setStatus(Status.empty);
            toast.current?.show({ severity: 'info', summary: 'Error Message', detail: 'Tienes que rellenar todos los campos', life: 3000 });
             
        } else{
            console.log("edit", name, imageDirection, stepIds)
        const resEdit = await context.apiCalls.editProcedure(id,name,imageDirection);
      
        if (resEdit.ok ) {
            setStatus(Status.success);
            toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
            console.log('funciona edit procedure')
            console.log(resEdit)
         
            setTimeout(function(){
               navigate('/procedimientos')
             }, 1000);

        } else {
            setStatus(Status.error);
            toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
             console.log('no funciona edit teps')
        }
        }
    }else{ 
      
        if(ctx.name === '' || ctx.imageDirection === '' || ctx.stepIds === ''){
            setStatus(Status.empty);
            toast.current?.show({ severity: 'info', summary: 'Error Message', detail: 'Tienes que rellenar todos los campos', life: 3000 });
            
        } else{
           
            const res = await context.apiCalls.createProcedure(ctx);
            console.log("res",res)                
            if (res.ok) {
                setStatus(Status.success);
                toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });                
                setTimeout(function(){
                    window.location.reload();
                }, 1000);
            } else {
                setStatus(Status.error);
                toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
            }
        }
   
}
    
}



  return (
    <div  className='p-3 col-12 flex flex-column justify-content-center align-items-center'>
      <div id="procedureform" className='p-6 col-12 '>
      <div id="inputsform-procedureform" className="flex row py-0 col-12">
        <div id="inputtxt-procedureform" className="col-12 ">  
        <InputTxt
          name={name}
          handleName={handleName}
          labelname={"Nombre del procedimiento"}
        />
      </div>
      <div id="file-procedure" className=" col-4 file-procedure">
        <FileUpload
          name="image"         
          onSelect={onUpload}       
          mode="basic"
          accept="image/*"
          auto={true}
        />
      
        <label htmlFor="file"></label>
        </div>
     
      <div className='col-4 flex justify-content-center align-content-center' id="img-procedureform" >
         <Image src={src} />
       </div>
      </div>
      <div id="picklist" className="p-field col-10"> 
        <PickListt source={source} onChange={onChange} target={target} />
      </div>
      <div  id="button-procedureform" className="col-2">
        <SubmitButton
          isLogin={false}
          onclik={handleProcedure}
          ctx={ctx}
        />
          <Toast ref={toast} />
      </div>
    </div>
    </div> 
  );
}


