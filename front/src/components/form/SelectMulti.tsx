
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
    nameSelect: string;
    code: number;
    allcodes: number[];
    handleSelect: Function;
    placeholder: string;
    options: string[] | undefined;
}

export default function SelectMulti(props: Iprops) {

    console.log("selectMulti:" + props.nameSelect, props.code, props.allcodes, props.handleSelect, props.placeholder)

    return (
        <div className="card flex justify-content-center">
            <MultiSelect
                display="chip"
                value={props.code}
                onChange={(e: MultiSelectChangeEvent) => props.handleSelect(e.value)}
                optionLabel="name"
                placeholder={props.placeholder}
                maxSelectedLabels={3}
                className="w-full md:w-20rem"
                options={props.nameSelect}
            />
        </div>
    );
}
