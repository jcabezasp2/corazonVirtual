import { Row, Col, Placeholder } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useState, useRef } from "react";
import { Status } from '../../assets/constants';
import TxtEditor from "../../components/form/TxtEditor";
import File from "../../components/form/File";
import SubmitButton from "../../components/form/SubmitButton";
import InputNum from "../../components/form/InputNum";
import InputTxt from "../../components/form/InputTxt";
import { appContext } from "../../App";
import '../../css/picklist.css';
import { MultiSelect } from "primereact/multiselect";
import "./../../css/procedureform.css";
import { useParams } from 'react-router-dom';
import { getStep } from "../../assets/endpoints";
import { FileUpload } from 'primereact/fileupload';
import PickListt from "../../components/form/Picklist";
import PickSteps from '../../interfaces/PickSteps';


class Iprops {
}

interface Iprocedure {
    name: string;
    imageDirection: string;
}

export default function ToolForm(props: Iprops) {

    const context = React.useContext(appContext);

    const { id } = useParams();
    const [name , setName] = useState<string>('');
    const [imageDirection , setImageDirection] = useState<string>('');
    const [ctx, setCtx] = useState<any>(null);
    const [file, setFile] = React.useState<string>('');
    const [status, setStatus] = React.useState<Status>(Status.error);
    const [labelname, setLabelname] = React.useState<string>('Nombre del procedimiento');  
    const [placeholder, setPlaceholder] = React.useState<string>('Selecciona los pasos asociados');    
    const [options, setoptions] = React.useState<any[]>([])
    const [idAsociados, setIdAsociados] = React.useState<[]>([]);
    const toast = useRef(null);
    const [source, setSource] = useState<PickSteps[]>([]);
    const [target, setTarget] = useState<PickSteps[]>([]);


    React.useEffect(() => {
        let currentCtx : Iprocedure = {
            name: name ? name : '',
            imageDirection: imageDirection ? imageDirection :  '',
        };
        setCtx(currentCtx);
    }, [name, imageDirection]);



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


    const handleName = (e: string) => {
        setName(e);
    }

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
                setFile(data.file);  
                // setIdAsociados(data.steps)   
                setIdAsociados(data.steps)   

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
        // setoptions(options);
        console.log("source",source)
    }

    const handleSelect = (e: PickSteps[]) => {             
        // let ids = (e);
        // let id = ids.map((id: any) => id.code)
        // setIdAsociados(id)   
        // console.log("dentro de handleSelect toolform--asociados",idAsociados,"ids", ids, "id", id) 
        const ids = e.map((item) => item.code);
        setIdAsociados(ids);
        console.log('ids asociados', idAsociados);               
    }    

    const handleProcedure = async () => {
        if(id){
            const resEdit = await context.apiCalls.editProcedure(id,name,file);
            const resEdit2 = await context.apiCalls.addStepTool(id, idAsociados);
            if (resEdit.status === 200 && resEdit2 === 200) {
                setStatus(Status.success);
                toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
                console.log('funciona edit teps')
                console.log(resEdit)
                console.log(resEdit2)
                window.location.reload();
            } else {
                setStatus(Status.error);
                toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
                 console.log('no funciona edit teps')
            }
              
        }else{  
        const res = await context.apiCalls.createProcedure(name, file);
        console.log("res",res)
        if (res.status === 200) {
            setStatus(Status.success);
            toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
             procedimientos();
        } else {
            setStatus(Status.error);
            toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
        }
       
    }
        
    }

    const procedimientos = async () => {
        const res = await context.apiCalls.getProcedures();
        const allprocedures = await res.json();   
        
        console.log("allprocedures", allprocedures)
        console.log("allprocedures.length", allprocedures.length)
       
        let id = allprocedures.length
        console.log(id)
   
    const res2 = await context.apiCalls.addStepTool(id, idAsociados);
        console.log("ids asociados",idAsociados)
    if(res2 != null){
        console.log('funciona addproceduresteps')
        console.log(res2)
        window.location.reload();
        }else{
            console.log('no funciona addproceduresteps')
        }

    }

    const onChange = (event: { source: PickSteps[]; target: PickSteps[] }) => {
        setSource(event.source);
        console.log("evente source", source)
        setTarget(event.target);
        console.log("evente target", target)
        const ids = target.map((item) => item.code);
        setIdAsociados(ids);
        console.log('ids asociados', idAsociados); 
    };

    return (      
        <div  className='p-3 col-12 flex flex-column justify-content-center align-items-center'>
        <div id="procedureform" className='p-6 col-10 '>
                        <h1 className="p-2">ProcedureForm</h1>
                    <div id="inputsform-procedureform" className="flex row py-0 col-12">
                        <div id="inputtxt-procedureform" className="col-6 ">                        
                            <InputTxt name={name} handleName={handleName} labelname={labelname}/>                        
                        </div>                        
                        <div id="picklist" className="p-field col-10"> 
                         <PickListt source={source} onChange={onChange} target={target}/>
                        </div>
                       </div>     
                        <div className="p-float-label col-8 file-tool">
                        <FileUpload name="image" customUpload={true} uploadHandler={onUpload}  mode="basic" accept="image/*" auto={true} />
                            <label htmlFor="file">Upload</label>
                        </div>
                        <div  id="button-procedureform" className="col-2">
                            <SubmitButton                                
                                onclik={handleProcedure}
                                ctx= {{name: name, image : null, stepIds : idAsociados}}
                                isLogin={true}
                              />
                              <Toast ref={toast} />
                        </div>
                    
                </div>
       
        </div>  
     
       
    );
}

                        


