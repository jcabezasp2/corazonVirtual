
import React, { useState } from "react";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
// TODO esta sin terminar
interface Iprops {
    // nameSelect: string;
    // code: number;
    // allcodes: number[];
    toolId: number;
    handleSelect: Function;
    placeholder: string;
    options: List[];
}
interface List {
    label: string;
    value: number;
    // nameList: string;
    // codeList: number;
  }

export default function Select1(props : Iprops) {

    //const [selectedCity, setSelectedCity] = useState<City | null>(null);
    // const [selectedStep, setSelectedStep] = useState<Steps | null>(null);
    const [selected, setSelected] = useState<number | null>(null);
    const options: List[] = [
        { label: 'Selecciona una herramienta', value: 0 },
        ...props.options,
      ];

      console.log("selectMulti:" + props.options, props.handleSelect, props.placeholder, props.options.map(item => [ item.label,item.value] ), "selected", props.toolId)



    return (
        <div className="card flex justify-content-center">
            <Dropdown 
            value={selected} 
            onChange={(e: DropdownChangeEvent) => props.handleSelect(e.value)} 
            options={options} 
            optionLabel="name" 
            placeholder={props.placeholder}
            className="w-full md:w-20rem" 
            style={{color: 'var(--surface-800)' }}/>
        </div>
    )
}
        