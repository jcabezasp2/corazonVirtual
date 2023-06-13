import { Status } from '../../assets/constants';
import React, { useRef, useState } from 'react';
import TxtEditor from "../../components/form/TxtEditor"
import Toggle from "../../components/form/Toggle";
import SubmitButton from "../../components/form/SubmitButton";
import { useParams, useNavigate } from 'react-router-dom';
import "./../../css/stepform.css";
import { appContext } from "../../App";
import InputNum from "../../components/form/InputNum";
import InputTxt from "../../components/form/InputTxt";
import Select1 from '../../components/form/Select';
import { Toast } from "primereact/toast";
import { FileUpload } from 'primereact/fileupload';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
class Iprops {

}

interface ICreateStep {
    name: string;
    image: string;   
    description: string,
    duration: number,
    previousStep: boolean, 
    tools: any[],
}


export default function StepForm(props: Iprops) {

    const { id } = useParams();

    const [name, setName] = React.useState<string>('');    
    const [description, setDescription] = React.useState<string>('');
    const [previousStep, setpreviousStep] = React.useState<boolean>(false);
    const [status, setStatus] = React.useState<Status>(Status.error);
    const [image, setImage] = React.useState<string>('');
    const [num, setNum] = React.useState<number>(0);
    const [duration, setDuration] = React.useState<number>(0); 
    const navigate = useNavigate();
    const context = React.useContext(appContext);    
    const [options, setoptions] = React.useState<any[]>([]);
    const [tools, setTools] = React.useState<any[]>([]);
    const toast = useRef<any>(null);
    const [src, setSrc] = React.useState<string>('');
   

    const handleName = (e: string) => {
        setName(e);
    }

    const handleNum = (e: number) => {
        setNum(e);
        // setDuration(String(num))

        // console.log(duration, "duration", typeof duration, "type")
                
    }

    const handleDescription = (e: string) => {
        setDescription(e);
    }

    const handlePreviousStep = (e: boolean) => {
        setpreviousStep(e);
    }

   
    const handleSelect = (e: any) => {
        let select = e;
        setTools(select.code);
        
    }

   
    async function allTools() {
        const allTools = await context.apiCalls.getTools();
        if(allTools != null){
            const options = allTools.map((tool: any) => ({
                name: tool.name,
                code: tool.id,
              }));
            setoptions(options)

          
       
        }else{

        }

    }

    

    React.useEffect(() => {
        allTools();
        if(id){
        context.apiCalls.getStep(id).then((step: any)=>{
            setName(step.name);
            setDescription(step.description);
            // setNum(parseInt(step.duration));
            setNum(step.duration);
            setImage(step.image);
            setpreviousStep(step.previousStep);
            setTools(step.tools);
            setSrc(step.image)

        })
        context.apiCalls.getToolByStepId(id).then((tool: any)=>{
            let utensiliosId = tool.map((tool: any) => tool.id);
            setTools(utensiliosId);

        }
        )
        }

  }, [])

    //Funcionalidad del boton de submit
  const [ctx, setCtx] = useState<any>(null);

  React.useEffect(() => {
    let currentCtx : ICreateStep = {     
        name: name ? name : '',
        image: image ? image :  '',
        description : description ? description : '',
        duration : num ? num : 0,
        previousStep : previousStep ? previousStep : false,
        tools : tools ? tools : [],  
    };
    setCtx(currentCtx);
    console.log(currentCtx, "currentCtx")
    console.log(ctx, "ctx")
}, [name, image, description, num, previousStep, tools]);

   

const onUpload = async ({ files }: any) => {  
    const [file] = files;    

if(image === ""){
const reader = new FileReader();
reader.onload = async (e: any) => {
  let result = await context.apiCalls.uploadImageBase64(e.target.result);
  setImage(result);

  setSrc(result)
};
reader.readAsDataURL(file);   

}else{
let img = image.split("images/")
let deleteImg = img[1]
 let res = await context.apiCalls.deleteImage(deleteImg);
 if(res.ok){
    console.log("delete",deleteImg)
     }else{
      console.log("no borra")
     }


const reader = new FileReader();
reader.onload = async (e: any) => {
  let result = await context.apiCalls.uploadImageBase64(e.target.result);

  setImage(result);

  setSrc(result)
};
reader.readAsDataURL(file);
}
}



const handleStep = async () => {
 
        if(id){
            if(ctx.name === '' || ctx.description === '' || ctx.image === '' || ctx.duration === 0){
                setStatus(Status.empty);
                 toast.current?.show({ severity: 'info', summary: 'Error Message', detail: 'Tienes que rellenar todos los campos', life: 3000 });
            }else{
                const resEdit = await context.apiCalls.editStep(id,name, description, image, duration, previousStep, tools);
                if (resEdit.ok) {
                    setStatus(Status.success);
                    toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
                    setTimeout(function(){
                        navigate('/pasos')
                     }, 2000);
                  
                    } else {
                    setStatus(Status.error);
                    toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });

                }
            }
        }else{  
            if((ctx.name === '' || ctx.description === '' || ctx.image === '' || ctx.duration === 0)){
                setStatus(Status.empty);
                 toast.current?.show({ severity: 'info', summary: 'Error Message', detail: 'Tienes que rellenar todos los campos', life: 3000 });
            }else{

            const res = await context.apiCalls.createStep(ctx);

            if (res.ok) {
                setStatus(Status.success);
                toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
                setTimeout(function(){
                    navigate('/pasos')
                }, 2000);
                
            } else {
                setStatus(Status.error);
                toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });

            }
        }
        }
      

    }


   


    return (
        <div  className='p-3 col-12 flex flex-column justify-content-center align-items-center'>
        <div id="stepform" className='p-3 col-10 '>
          
           
            <div id="inputsform-stepform" className="row py-0 col-12">      
                <div className='col-4 py-3' id="inputtxt-stepform">                
                    <InputTxt name={name} handleName={handleName} labelname={'Nombre del paso'}/>                        
                </div>                
                <div className='col-3 ' id="inputnumb-stepform"> 
                <InputNum num={num} handleNum={handleNum} labelnum={'Tiempo de duración del paso'} />
                                
                </div>
            </div>             
            
            <div id="inputsform2-stepform" className='row  py-0 '>
                <div className='col-3' id="inputselect-stepform">  
                    
                            <Select1
                             handleSelect={handleSelect}
                             tools={tools}
                             options={options}
                             placeholder={"Selecciona una herramienta"}/>
                            
                </div>    
                <div className='col-3' id="toggle-stepform" > 
                <Toggle
                    onText="Es un paso previo"
                    offText="No es un paso previo"
                    onIcon="pi pi-check"
                    offIcon="pi pi-times"
                    checked={previousStep}
                    onChange={handlePreviousStep}
                />
                </div>
                </div>
                <div id="inputsform3-stepform" className='row  py-0 '>
                <div className='col-5 flex justify-content-center align-content-center' id="file-stepform" >
                <FileUpload name="image"               
                onSelect={onUpload}
                 mode="basic" 
                 accept="image/*" 
                 auto={true} />

                </div>
                <div className='col-4 flex justify-content-center align-content-center' id="img-stepform" >
                <Image src={src} />
                </div>
                </div> 
            <div className='py-0 flex justify-content-center'>
                <div className='col-10' id="editor-stepform">
                <TxtEditor
                    handleDescription={handleDescription}
                    description={description}
                />
                </div>
            </div>
           


            <div className='pt-8 flex justify-content-center'>
                <div className='col-2'>
                <SubmitButton
                    // onclik={context.apiCalls.createStep}
                    onclik={handleStep}
                    ctx={ctx}
                    isLogin={false}
                />
                 <Toast ref={toast} />
                </div>
            </div>
        </div>
        </div>
    )
}



