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
import { ListBox } from "primereact/listbox";
import { appContext } from "../../App";
import '../../css/toolform.css';
import { MultiSelect } from "primereact/multiselect";
import ListBoxx from "../../components/form/ListBoxx";


class Iprops {
}



export default function ToolForm(props: Iprops) {

    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [file, setFile] = React.useState<string>('');
    const [status, setStatus] = React.useState<Status>(Status.error);
    const [labelname, setLabelname] = React.useState<string>('Nombre del procedimiento');
    const context = React.useContext(appContext);    
    const [placeholder, setPlaceholder] = React.useState<string>('Selecciona los pasos asociados');    
    const [options, setoptions] = React.useState<any[]>([])
    const [idAsociados, setIdAsociados] = React.useState<[]>([]);
    const toast = useRef(null);
    const [id, setId] = React.useState<number>(0);


    const handleName = (e: string) => {
        setName(e);
    }
    const handleSelect = (e: any) => {
        setIdAsociados(e);
        console.log("dentro de handleSelect toolform",idAsociados)
    }    
    const handleFile = (e :any) => {
        setFile(e);
        console.log("dentro de handleFile procedureform",file)
    }  
    
          

    React.useEffect(() => {        
        allSteps();
        procedimientos();
    }, [])

    const allSteps = async () => {
        const res = await context.apiCalls.getSteps();
        console.log("res",res)
        
        const options = res.map((step: any) => {
            return {
                label: step.name,
                value: step.id
            }
        })
        setoptions(options);
        console.log("options",options)
    }

    const handleProcedure = async () => {
        const res = await context.apiCalls.createProcedure(name, file, idAsociados);
        console.log("res",res)
        if (res.status === 200) {
            setStatus(Status.success);
            toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
        } else {
            setStatus(Status.error);
            toast.current?.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
        }

        procedimientos();
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
        }else{
            console.log('no funciona addproceduresteps')
        }
    }



    return (      
        <div className='col-12 tool-form'>           
          
                    <div className="col-12 panel-tool">
                        <h1 className="p-2">ProcedureForm</h1>
                        <div className="col-8 input-tool-form">                        
                            <InputTxt name={name} handleName={handleName} labelname={labelname}/>                        
                        </div>                        
                        <div className="p-field">
                            {/* <ListBoxx
                            id="items"
                            value={nameList}
                            // options={[
                            //     { label: {nameList}, value: {codeList} },
                            //     // { label: "Option 2", value: "option2" },
                            //     // { label: "Option 3", value: "option3" },
                            // ]}
                            options={options}
                            onChange={handleList}
                            multiple
                            /> */}
                            <SelectMulti                            
                            handleSelect={handleSelect}
                            idAsociados={idAsociados}
                            options={options}
                            placeholder={placeholder}
                            
                            />
                        </div>
                       
                        <div className="col-8 file-tool">
                            <File file={file} handleFile={handleFile}/>
                        </div>
                        <div className="col-2">
                            <SubmitButton                                
                                onclik={handleProcedure}
                                ctx= {{name: name, image : null, ids : idAsociados}}
                                isLogin={true}
                              />
                              <Toast ref={toast} />
                        </div>
                    </div>
                
       
              
            </div>
       
    );
}

                        


