
import React, { useState } from "react";
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';

class Iprops {
    onText!: string;
    offText!: string;
    onIcon: string = "pi pi-check";
    offIcon: string = "pi pi-times";
    checked!: boolean;
    onChange!: Function;
}

export default function Toggle(props : Iprops) {

    const [checked, setChecked] = useState<boolean>(false);

    return (
        <div>
            <ToggleButton onLabel={props.onText} offLabel={props.offText} onIcon={props.onIcon} offIcon={props.offIcon} 
                checked={props.checked} onChange={(e:  ToggleButtonChangeEvent) => props.onChange(e.value)} />
        </div>
    );
    
}