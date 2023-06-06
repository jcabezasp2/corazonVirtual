
import { Toast } from "primereact/toast";
import React, { useState, useRef } from "react";
import { Status } from '../../assets/constants';
import SubmitButton from "../../components/form/SubmitButton";
import InputTxt from "../../components/form/InputTxt";
import { appContext } from "../../App";
import '../../css/picklist.css';
import "./../../css/procedureform.css";
import { useParams } from 'react-router-dom';
import { FileUpload } from 'primereact/fileupload';
import PickListt from "../../components/form/Picklist";
import PickSteps from '../../interfaces/PickSteps';

class Iprops {
}

interface Iprocedure {
    name: string;
    imageDirection: string;
    stepIds: any[],
  
}




export default function ToolForm(props: Iprops) {

    const context = React.useContext(appContext);

    const { id } = useParams();
    const [name , setName] = useState<string>('');
    const [imageDirection , setImageDirection] = useState<string>('');
    const [ctx, setCtx] = useState<any>(null);
    const [labelname, setLabelname] = React.useState<string>('Nombre del procedimiento'); 
    const [status, setStatus] = React.useState<Status>(Status.error);
    const [source, setSource] = React.useState<PickSteps[]>([]);
    const [target, setTarget] = React.useState<PickSteps[]>([]);
    const [idAsociados, setIdAsociados] = React.useState<any>([]);
    const [idProcedure, setIdProcedure] = React.useState<number>();
    const [stepIds, setStepIds] = React.useState<any>([]);
    const toast = useRef<any>(null);

    React.useEffect(() => {
        let currentCtx : Iprocedure = {
            name: name ? name : '',
            imageDirection: imageDirection ? imageDirection :  '',
            stepIds : stepIds ? stepIds : [],
            // idProcedure: idProcedure ? idProcedure : null,
        };
        setCtx(currentCtx);
    }, [name, imageDirection,idProcedure, stepIds]);

    const handleName = (e: string) => {
        setName(e);
        console.log("name", name)
    }

    const onUpload = async ({files} : any) => {
        console.log('files', files)
        const [file] = files;
        const reader = new FileReader();
        reader.onload = async (e: any) => {
            let result = await context.apiCalls.uploadImageBase64(e.target.result);
            console.log('result', result)
            setImageDirection(result);
        };
        reader.readAsDataURL(file);

    };


    React.useEffect(() => {        
                allSteps();
                if(id){
                    const procedureEdit = async () => {
                    console.log("id",id)
                   const res = await context.apiCalls.getProcedure(id)
                   const data = await res.json();
                   console.log(data)
                        setName(data.name);   
                        console.log(name)           
                        setImageDirection(data.image);
                        // setFile(data.file);  
                        setIdAsociados(data.steps)   
                        setTarget(data.steps)
        
                     }
                       procedureEdit();
                }
             
            }, [])
        
            const allSteps = async () => {
                const res = await context.apiCalls.getSteps();
                console.log("res",res)
            const steps = res.map((step: PickSteps) => {
                return {
                    id: step.id,
                    code: step.id,
                    name: step.name,          
                    description: step.description,
                    image: step.image,
                    rating: step.id,
               
                }})
        
        
                setSource(steps);
                console.log("source",source)
            }
        
            const handleProcedure = async () => {
                if(id){
                    if(name === '' || imageDirection === '' || stepIds === ''){
                        setStatus(Status.empty);
                        toast.current?.show({ severity: 'info', summary: 'Error Message', detail: 'Tienes que rellenar todos los campos', life: 3000 });
                         
                    } else{
                    const resEdit = await context.apiCalls.editProcedure(id,name,imageDirection);
                    const resEdit2 = await context.apiCalls.addStepTool(id, idAsociados);
                    if (resEdit.ok && resEdit2.ok) {
                        setStatus(Status.success);
                        toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
                        console.log('funciona edit teps')
                        console.log(resEdit)
                        console.log(resEdit2)
                        setTimeout(function(){
                            window.location.reload();
                         }, 1000);

                    } else {
                        setStatus(Status.error);
                        toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
                         console.log('no funciona edit teps')
                    }
                    }
                }else{ 
                  
                    if(name === '' || imageDirection === '' || stepIds === ''){
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
        
            const procedimientos = async () => {
                const res = await context.apiCalls.getProcedures();
                const allprocedures = await res.json();   
                
                console.log("allprocedures", allprocedures)
                console.log("allprocedures.length", allprocedures.length)
                const lastItem = allprocedures.reduce((prev:any, current:any) => {
                    return prev.id > current.id ? prev : current;
                  });
                  console.log("lastItem",lastItem)               
                const procedureId = lastItem.id;               
                console.log("lastProcedure",procedureId)
                console.log("last procedure",procedureId,"type of idProcedure", typeof(procedureId),"stepid asociados antes  de addproceduresteps", stepIds)
           
            const res2 = await context.apiCalls.addProcedureSteps(procedureId, ctx);
                console.log("stepIDs asociados",stepIds)
            if(res2.ok){
                console.log('funciona addproceduresteps')
                console.log(res2)
                window.location.reload();
                }else{
                    console.log('no funciona addproceduresteps')
                }
        
            }
        
            const onChange = (event: { source: PickSteps[]; target: PickSteps[] }) => {
                setSource(event.source);
                console.log("event source", source)
                setTarget(event.target);
                console.log("event target", target)
                const ids = event.target.map((item) => item.code);              
                setStepIds(ids);
                console.log( "stepIDs", stepIds); 
              
            };
        










    return (      
        <div  className='p-3 col-12 flex flex-column justify-content-center align-items-center'>
               <div id="procedureform" className='p-6 col-10 '>
                               <h1 className="p-2">ProcedureForm</h1>   
                <div id="inputsform-procedureform" className="flex row py-0 col-12">
             <div id="inputtxt-procedureform" className="col-8 ">                        
                             <InputTxt name={name} handleName={handleName} labelname={labelname}/>                        
                         </div> 
            
            <div className=" col-4 file-tool">
            <FileUpload name="image" customUpload={true} uploadHandler={onUpload}  mode="basic" accept="image/*" auto={true} />
            <label htmlFor="file"></label>
          
           </div> 
            </div>  
            <div id="picklist" className="p-field col-10"> 
            <PickListt source={source} onChange={onChange} target={target}/>
              </div>
              <div  id="button-procedureform" className="col-2">
            <SubmitButton onclik={handleProcedure} ctx={{ctx}} isLogin={false} />
            <Toast ref={toast} />
            </div>
        </div>  
        </div> 
       
    );
}

                        


