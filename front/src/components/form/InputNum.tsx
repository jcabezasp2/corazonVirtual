
import React, { useState } from "react";
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import '../../css/inputs.css';

class Iprops {
    num!: number;
    handleNum!: Function;
    labelnumb!: string;
}



export default function InputNum(props : Iprops) {
    const [num, setNum] = useState<number | null>(null);


    return (
        
        <div className="card flex justify-content-center">
        <div className="p-float-label">            
            <InputNumber id="inputNum" value={num} onValueChange={(e: InputNumberValueChangeEvent) => setNum(e.target.value ?? null)}  showButtons mode="decimal" />
            <label htmlFor="inputNum">{props.labelnumb}</label>
        </div> 
        </div>
        
    )
}




// onValueChange={(e: InputNumberValueChangeEvent) => setValue1(e.value)}