
import React, { useState } from "react";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
// TODO esta sin terminar
interface Iprops {
    // nameSelect: string;
    // code: number;
    // allcodes: number[];
    idasociados: number;
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

    //const [selectedCity, setSelectedCity] = useState<City | null>(null);
    // const [selectedStep, setSelectedStep] = useState<Steps | null>(null);
    const [selected, setSelected] = useState<number | null>(null);
    
      const options : List[] = props.options.map((item: any) => ({
        name: item.name,
        code: item.code,
      }));

      console.log( "placeholder", props.placeholder,"options", props.options.map(item => [ item.name,item.code] ), "selected", props.idasociados, "id asociado", props.idasociados.code)
      


    return (
        <div className="card flex justify-content-center">
            <span className="p-float-label">
            <Dropdown 
            value={props.idasociados} 
            onChange={(e: DropdownChangeEvent) => props.handleSelect(e.value)} 
            options={options}            
            optionLabel="name"            
            className="w-full md:w-22rem" 
            style={{color: 'var(--surface-800)' }}            
            />
              <label htmlFor="dd-city">{props.placeholder}</label>
            </span>
        </div>
    )
}
        