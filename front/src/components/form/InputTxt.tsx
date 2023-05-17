import React, { useState } from "react";
import { InputText, InputTextProps  } from 'primereact/inputtext';
import '../../css/inputs.css';


class Iprops {
    handleName!: Function;
    name!: string;
    labelname!: string;

}

export default function InputTxt(props : Iprops) {
//    const [name, setName] = useState<string>('');
    // const handleName = (e: string) => {
    //     setName(e);
    // }
    console.log(props.name)
   
    return (
        <div className="card flex justify-content-center">
            <span className="p-float-label">
                <InputText id="name" placeholder={props.name} onChange={(e) => props.handleName} />
                <label htmlFor="name">{props.labelname}</label>
            </span>
        </div>
    )
}

