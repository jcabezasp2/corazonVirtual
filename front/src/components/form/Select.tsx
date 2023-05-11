
import React, { useState } from "react";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
// TODO esta sin terminar
class Iprops {
    
}

interface City {
    name: string;
    code: string;
}
interface Steps {
    nameSelect: string;
    code: number;
    allcodes: [];
    handleSelect: Function;
}
export default function Select(props : Steps) {

    //const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [selectedStep, setSelectedStep] = useState<Steps | null>(null);

    const cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    


    return (
        <div className="card flex justify-content-center">
            <Dropdown value={selectedStep} onChange={(e: DropdownChangeEvent) => selectedStep(e.value)} options={cities} optionLabel="name" 
                placeholder="Select a City" className="w-full md:w-14rem" />
        </div>
    )
}
        