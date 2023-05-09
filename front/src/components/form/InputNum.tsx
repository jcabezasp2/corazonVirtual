
import React, { useState } from "react";
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import '../css/inputs.css';
export default function InputNum() {
    const [value, setValue] = useState<number | null>(null);


    return (
        
        <div className="card flex justify-content-center">
        <div className="p-float-label">            
            <InputNumber id="inputNum" value={value} onValueChange={(e: InputNumberValueChangeEvent) => setValue(e.value ?? null)}  showButtons mode="decimal" />
            <label htmlFor="inputNum">Number</label>
        </div> 
        </div>
        
    )
}




// onValueChange={(e: InputNumberValueChangeEvent) => setValue1(e.value)}