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
import Select from "../../components/form/Select";
import SelectMulti from "../../components/form/SelectMulti";
import { appContext } from "../../App";
import '../../css/toolform.css';
import { MultiSelect } from "primereact/multiselect";
import "./../../css/procedureform.css";
import { useParams } from 'react-router-dom';
import { getStep } from "../../assets/endpoints";
import PickListt from "../../components/form/Picklist";
import PickSteps from '../../interfaces/PickSteps';


class Iprops {
}



export default function ToolForm(props: Iprops) {

    const { id } = useParams();

    const [name, setName] = useState<string>('');
    const [file, setFile] = useState<string>('');
    const [status, setStatus] = useState<Status>(Status.error);
    const [labelname, setLabelname] = useState<string>('Nombre del procedimiento');
    const context = React.useContext(appContext);    
    const [placeholder, setPlaceholder] = useState<string>('Selecciona los pasos asociados');    
    const [options, setoptions] = useState<any[]>([])
    const [idAsociados, setIdAsociados] = useState<string[]>([]);
    const toast = useRef(null);
    const [source, setSource] = useState<PickSteps[]>([]);
    const [target, setTarget] = useState<PickSteps[]>([]);

    const handleName = (e: string) => {
        setName(e);
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
    const handleFile = (e :string) => {
        setFile(e);
        console.log("dentro de handleFile procedureform",file)
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
                        <div className="p-field col-10">                            
                          
                            <PickListt source={source} onChange={onChange} target={target}/>
                        </div>
                       </div>     
                        <div className="col-8 file-tool">
                            <File file={file} handleFile={handleFile}/>
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

                        


