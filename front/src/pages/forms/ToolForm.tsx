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
import * as endpoints from "../../assets/endpoints";
import '../../css/toolform.css';

class Iprops {
}



export default function ToolForm(props: Iprops) {

    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [modelo, setModelo] = React.useState<string>('');
    const [status, setStatus] = React.useState<Status>(Status.error);
    const [labelname, setLabelname] = React.useState<string>('Nombre de la herramienta');
    const [labeldescription, setLabeldescription] = React.useState<string>('Descripción de la herramienta');
    const [labelmodelo, setLabelmodelo] = React.useState<string>('Modelo 3D de la herramienta');   
    
    // const [nameList, setNameList] = React.useState<string>('Selecciona una herramienta');
    // const [codeList, setCodeList] = React.useState<number>(0);
    // const [allcodes, setAllcodes] = React.useState<number[]>([]);
    // const [options, setoptions] = React.useState<string[]>([]);useState<string>('Selecciona una herramienta');

    const handleName = (e: string) => {
        setName(e);
    }
    const handleDescription = (e: string) => {
        setDescription(e);
    }    
    const handleModelo = (e: string) => {
        setModelo(e);
    }  
    
      
    async function tools() {
        console.log('entrando en tools')
        console.log(name, description, modelo)
        const res = await endpoints.createTool(name, description, modelo);
        if(res != null){
            console.log('funciona')
            console.log(res)

        }else{
            console.log('no funciona')
        }             

    }


    React.useEffect(() => {
     
      }, [])

    const handleTool = () => {
        tools();
    }




    return (      
        <div className='col-12 tool-form'>           
          
                    <div className="col-12 panel-tool">
                        <div className="col-8 input-tool-form">                        
                            <InputTxt name={name} handleName={handleName} labelname={labelname}/>                        
                        </div>                        
                        <div className="col-8">
                            <TxtEditor description={description} handleDescription={handleDescription} />
                        </div>
                        <div className="col-8">
                            <File />
                        </div>
                        <div className="col-2">
                            <SubmitButton                                
                                onclik={handleTool}
                                ctx= {{name: name, description : description, modelo : modelo}}
                                isLogin={true}
                              />
                        </div>
                    </div>
                
       
                </div>
       
    );
}

                        

    // ------------------------------------------------------- // 




//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <InputText id="name" value={formValues.name} onChange={handleNameChange} />
//       </div>
//       <div>
//         <label htmlFor="items">Selected Items:</label>
       
//       </div>
//       <div>
//         <label htmlFor="file">Selected File:</label>
//         <FileUpload
//           id="file"
//           name="file"
//           mode="basic"
//           accept="image/*"
//           maxFileSize={1000000}
//           chooseLabel="Select File"
//           uploadLabel="Upload"
//           cancelLabel="Cancel"
//           onSelect={handleFileUpload}
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }


{/* <div className="p-field">
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
                        </div> */}