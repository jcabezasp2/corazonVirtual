
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
            <InputNumber id="inputNum" value={props.num} onValueChange={(e: InputNumberValueChangeEvent) => props.handleNum(e.target.value)}  showButtons  />
            <label htmlFor="inputNum">{props.labelnum}</label>
        </div> 
        </div>
        
    )
}




// onValueChange={(e: InputNumberValueChangeEvent) => setValue1(e.value)}