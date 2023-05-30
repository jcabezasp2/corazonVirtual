
import React, { useState } from "react";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { SelectItemOptionsType } from "primereact/selectitem";


// class Iprops {
//     nameSelect!: string;
//     code!: number;
//     allcodes!: number [];
//     handleSelect!: Function;
//     placeholder!: string;
//     options?: SelectItemOptionsType;
    
// }

    
interface Iprops {
    // nameSelect: string;
    // code: number;
    // allcodes: number[];
    idAsociados: [];
    handleSelect: Function;
    placeholder: string;
    options: List[];
}
interface List {
    name: string;
    code: number;
    // nameList: string;
    // codeList: number;
  }

  
export default function SelectMulti(props: Iprops) {
    const [selected, setSelected] = useState<List | null>(null);
    // const [selected, setSelected] = useState<number>(0);
    const options : List[] = props.options.map((item: any) => ({
      name: item.name,
      code: item.code,
    }));
    
    
      console.log("selectMulti:" + props.options, props.handleSelect, props.placeholder, props.options.map(item => [ item.name,item.code] ), "selected", props.idAsociados)


    return (
        <div className="card flex justify-content-center">
            <MultiSelect
                display="chip"
                value={props.idAsociados}
                onChange={(e: MultiSelectChangeEvent) => {
                    setSelected(e.value);
                    props.handleSelect(e.value);
                  }}
                optionLabel="name"
                placeholder={props.placeholder}
                maxSelectedLabels={10}
                className="w-full md:w-20rem"
                style={{color: 'var(--surface-800)' }}
                options={options} 
                
            />
        </div>
    );
}
