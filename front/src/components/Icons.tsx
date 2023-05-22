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
    <style type="text/css">
        fill:url(#MyGradient)
      </style>
    <defs>
        <linearGradient id="MyGradient">
          <stop offset="0%" stopColor="rgb(50, 93, 117)" />
          <stop offset="100%" stopColor="rgb(112, 189, 236)" />
        </linearGradient>
      </defs>
    </svg>
    </div>

    )

}