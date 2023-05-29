
import React, { useState } from "react";
import { ListBox, ListBoxChangeEvent } from 'primereact/listbox';

// interface List {
//     nameList: string;
//     codeList: number;
//     allcodes: number[];
//     handleList: Function;
// } 
interface List {
    nameList: string[];
    codeList: number[];
  }
  
  interface IProps {
    options: List[];
    handleList: Function;
  }
export default function ListBoxx(props: IProps) {
    const [selected, setSelected] = useState<List | null>(null);
    const options: List[] = [
        // { nameList: 'Selecciona una herramienta', codeList: 0, allcodes: [], handleList: () => console.log("click") },
        // { nameList: 'New York', codeList: 1, allcodes: [], handleList: () => console.log("click") },
       // { name: {props.nameSelect}, code: {props.code} },
        // { name: 'Rome', code: 'RM' },
        // { name: 'London', code: 'LDN' },
        // { name: 'Istanbul', code: 'IST' },
        // { name: 'Paris', code: 'PRS' }
    ];

    return (
        <div className="card flex justify-content-center">  
            <ListBox multiple value={selected} onChange={(e: ListBoxChangeEvent) => setSelected(e.value)} options={props.options.map((item) => ({
            label: item.nameList,
            value: item.codeList
            }))} 
optionLabel="name" className="w-full md:w-14rem" />
        </div>
    )
}
