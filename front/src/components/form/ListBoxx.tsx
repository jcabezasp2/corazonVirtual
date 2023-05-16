
import React, { useState } from "react";
import { ListBox, ListBoxChangeEvent } from 'primereact/listbox';

interface List {
    nameList: string;
    codeList: number;
    allcodes: number[];
    handleSelect: Function;
} 

export default function ListBoxx() {
    const [selected, setSelected] = useState<List | null>(null);
    const options: List[] = [
        { nameList: 'Selecciona una herramienta', codeList: 0, allcodes: [], handleSelect: () => console.log("click") },
        { nameList: 'New York', codeList: 1, allcodes: [], handleSelect: () => console.log("click") },
       // { name: {props.nameSelect}, code: {props.code} },
        // { name: 'Rome', code: 'RM' },
        // { name: 'London', code: 'LDN' },
        // { name: 'Istanbul', code: 'IST' },
        // { name: 'Paris', code: 'PRS' }
    ];

    return (
        <div className="card flex justify-content-center">  
            <ListBox multiple value={selected} onChange={(e: ListBoxChangeEvent) => setSelected(e.value)} options={options} optionLabel="name" className="w-full md:w-14rem" />
        </div>
    )
}
        