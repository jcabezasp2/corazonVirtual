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

class Iprops {
}



export default function ToolForm(props: Iprops) {

    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [status, setStatus] = React.useState<Status>(Status.error);
    const [labelname, setLabelname] = React.useState<string>('Nombre de la herramienta');    
    const [nameList, setNameList] = React.useState<string>('Selecciona una herramienta');
    const [codeList, setCodeList] = React.useState<number>(0);
    const [allcodes, setAllcodes] = React.useState<number[]>([]);
    const [options, setoptions] = React.useState<string[]>([]);useState<string>('Selecciona una herramienta');

    const handleName = (e: string) => {
        setName(e);
    }
    const handleDescription = (e: string) => {
        setDescription(e);
    }    
    const handleList = (e: {value: number[]}) => {
        setNameList(e as any);
        // setAllcodes(e as any);
        setAllcodes(e as any);
    }
    
    // interface FormValues {
    //     name: string;
    //     selectedItems: string[];
    //     selectedFile: File | null;
    //   }
      
    //   function MyForm() {
        // const [formValues, setFormValues] = useState<FormValues>({
        //   name: "",
        //   selectedItems: [],
        //   selectedFile: null,
        // });
      
        // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //   setFormValues({ ...formValues, name: e.target.value });
        // };
      
        // const handleList = (e: { value: string[] }) => {
        //   setAllcodes({ ...allcodes, codeList: e.value });
        // };
      
        // const handleFileUpload = (e: { files: File[] }) => {
        //   setFormValues({ ...formValues, selectedFile: e.files[0] });
        // };
      
        // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //   e.preventDefault();
        //   // handle form submission here
        // };
      
    async function tools() {
        console.log('entrando en tools')
        const res = await endpoints.getTools();
        if(res != null){
            console.log('se ha logueado')
            console.log(res)

        }else{
            console.log('no se ha logueado')
        }
        console.log(res)
        console.log(res.map((tool: any) => tool.name))
        setNameList(res.map((tool: any) => tool.name))
        console.log(res.map((tool: any) => tool.id))
        setCodeList(res.map((tool: any) => tool.code))
        setoptions(res.map((tool: any) => tool.name))

    }


    React.useEffect(() => {
        tools();
      }, [])




    return (
        <div className="grid">
            
          
                {/* <Col className="col-6"> */}
                    <div className="p-fluid col-6">
                        <div className="p-field">
                            <InputTxt name={name} handleName={handleName} labelname={labelname}/>
                        </div>
                        <div className="p-field">
                            {/* <SelectMulti nameSelect={nameSelect} code={code} allcodes={allcodes} handleSelect={handleSelect} placeholder={placeholder} options={nameSelect}/> */}
                            <ListBox
                            id="items"
                            value={nameList}
                            options={[
                                { label: {nameList}, value: {codeList} },
                                // { label: "Option 2", value: "option2" },
                                // { label: "Option 3", value: "option3" },
                            ]}
                            onChange={handleList}
                            multiple
                            />
                        </div>
                        <div className="p-field">
                            <TxtEditor description={description} handleDescription={handleDescription} />
                        </div>
                        <div className="p-field">
                            <File />
                        </div>
                        <div className="p-field">
                            <SubmitButton status={status} message={`Se ha creado la herramienta ${name}`} />
                        </div>
                    </div>
                {/* </Col> */}
       
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
