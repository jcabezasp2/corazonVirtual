
import React, { useState } from "react";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

interface Iprops {
   
    tools: any;
    handleSelect: Function;
    placeholder: string;
    options: List[];
}
interface List {
  
    name: string;
    code: number;
  }

export default function Select1(props : Iprops) {

    const [selected, setSelected] = useState<any[]>([]);
    
      const options : List[] = props.options.map((item: any) => ({
        name: item.name,
        code: item.code,
      }));


      React.useEffect(() => {
        setSelected(props.tools)
     
      }, []);

      
      console.log( "placeholder", props.placeholder,"options", props.options.map(item => [ item.name,item.code] ), "selected", props.tools)
      


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
            optionLabel="name"            
            className="w-full md:w-22rem" 
            style={{color: 'var(--surface-800)' }}            
            />
              <label htmlFor="select">{props.placeholder}</label>
            </span>
        </div>
    )
}
        