import React from "react";
import { Icons } from "../assets/constants";
import { Tooltip } from 'primereact/tooltip';

class Iprops {
    type!: Icons;
    text?: string;
}

export default function Icon(props : Iprops) {

    return (
    
    <div className="icon" data-pr-tooltip={props.text}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d={props.type}/>
    </svg>
    </div>

    )

}