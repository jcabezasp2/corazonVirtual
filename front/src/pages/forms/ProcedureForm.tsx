import { Row, Col } from "react-bootstrap";
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

class Iprops {
}



export default function ToolForm(props: Iprops) {

    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [file, setFile] = React.useState<string>('');
    const [status, setStatus] = React.useState<Status>(Status.error);
    const [labelname, setLabelname] = React.useState<string>('Nombre del procedimiento');
    const context = React.useContext(appContext);    
    const [nameList, setNameList] = React.useState<string>('Selecciona los pasos asociados');
    const [codeList, setCodeList] = React.useState<number>(0);
    const [allcodes, setAllcodes] = React.useState<number[]>([]);
    const [options, setoptions] = React.useState<string[]>([]);

    const handleName = (e: string) => {
        setName(e);
    }
    const handleList = (e: number) => {
        setCodeList(e);
        allcodes.push(codeList);
    }    
    const handleFile = (e :any) => {
        setFile(e);
        console.log("dentro de handleFile toolform",file)
    }  
    
      
    async function tools() {
        console.log('entrando en tools')
        console.log(name,"--------", description,"--------", file)
        const res = await context.apiCalls.createTool(name, description, file);
        if(res != null){
            console.log('funciona')
            console.log(res)

        }else{
            console.log('no funciona')
        }             

    }

   
    const handleTool = () => {
        tools();
    }




    return (      
        <div className='col-12 tool-form'>           
          
                    <div className="col-12 panel-tool">
                        <h1 className="p-2">ToolForm</h1>
                        <div className="col-8 input-tool-form">                        
                            <InputTxt name={name} handleName={handleName} labelname={labelname}/>                        
                        </div>                        
                        <div className="p-field">
                            <ListBox
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
                            />
                        </div>
                        <div className="col-8 file-tool">
                            <File file={file} handleFile={handleFile}/>
                        </div>
                        <div className="col-2">
                            <SubmitButton                                
                                onclik={handleTool}
                                ctx= {{name: name, description : description, modelo : file}}
                                isLogin={true}
                              />
                        </div>
                    </div>
                
       
                </div>
       
    );
}

                        


