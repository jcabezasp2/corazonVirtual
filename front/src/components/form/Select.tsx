
import React, { useState } from "react";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
// TODO esta sin terminar
interface Iprops {
    // nameSelect: string;
    // code: number;
    // allcodes: number[];
    idAsociados: any;
    handleSelect: Function;
    placeholder: string;
    options: List[];
}
interface List {
    // label: string;
    // value: number;
    name: string;
    code: number;
  }

export default function Select1(props : Iprops) {

    const [selected, setSelected] = useState<number | null>(null);
    
      const options : List[] = props.options.map((item: any) => ({
        name: item.name,
        code: item.code,
      }));

      console.log( "placeholder", props.placeholder,"options", props.options.map(item => [ item.name,item.code] ), "selected", props.idAsociados, "id asociado", props.idAsociados.code)
      


    return (
        <div className="card flex justify-content-center">
            <span className="p-float-label">
            <Dropdown 
            id="select"
            value={props.idAsociados} 
            onChange={(e: DropdownChangeEvent) => props.handleSelect(e.value)} 
            options={options}
            placeholder={props.placeholder}            
            optionLabel="name"            
            className="w-full md:w-22rem" 
            style={{color: 'var(--surface-800)' }}            
            />
              <label htmlFor="select">{props.placeholder}</label>
            </span>
        </div>
    )
}
        