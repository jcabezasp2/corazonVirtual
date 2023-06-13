
import React, { useState } from "react";
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import '../../css/inputs.css';

class Iprops {
    num!: number;
    handleNum!: Function;
    labelnum!: string;
}



export default function InputNum(props : Iprops) {
    


    return (
        
        <div className="card flex justify-content-center">
        <div className="p-float-label">            
            <InputNumber id="inputNum" value={props.num} onKeyDown={(e : React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter" || e.key === "Tab") {
                    props.handleNum(e.currentTarget.value);                  
                    }
                 }}
            onValueChange={(e: InputNumberValueChangeEvent) => props.handleNum(e.target.value)}  showButtons step={0.25}  />
            <label htmlFor="inputNum">{props.labelnum}</label>
        </div> 
        </div>
        
    )
}



