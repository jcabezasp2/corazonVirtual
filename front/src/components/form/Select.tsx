
import React, { useState } from "react";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
// TODO esta sin terminar
class Iprops {
    nameSelect!: string;
    code!: number;
    allcodes!: [];
    handleSelect!: Function;
    
}

interface City {
    name: string;
    code: string;
}

export default function Select(props : Iprops) {

    //const [selectedCity, setSelectedCity] = useState<City | null>(null);
    // const [selectedStep, setSelectedStep] = useState<Steps | null>(null);

    const cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    


    return (
        <div className="card flex justify-content-center">
            <Dropdown value={props.code} onChange={(e: DropdownChangeEvent) => props.handleSelect(e.value)} options={props.nameSelect} optionLabel="name" 
                placeholder="Select a City" className="w-full md:w-14rem" />
        </div>
    )
}
        