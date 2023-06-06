
import React, { useState } from "react";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

interface Iprops {
   
    idAsociados: any;
    handleSelect: Function;
    placeholder: string;
    options: List[];
}
interface List {
  
    name: string;
    code: number;
  }

export default function Select1(props : Iprops) {

    const [selected, setSelected] = useState<number | null>(null);
    
      const options : List[] = props.options.map((item: any) => ({
        name: item.name,
        code: item.code,
      }));


      React.useEffect(() => {
        setSelected(props.idAsociados)
      }, []);

      
      console.log( "placeholder", props.placeholder,"options", props.options.map(item => [ item.name,item.code] ), "selected", props.idAsociados)
      


    return (
        <div className="card flex justify-content-center">
            <span className="p-float-label">
            <Dropdown 
            id="select"
            value={selected} 
            onChange={(e: DropdownChangeEvent) => {
              props.handleSelect(e.value);
              setSelected(e.value);
            }} 
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
        