import React from "react";
import { Button } from 'primereact/button';
import { useNavigate, useParams } from "react-router-dom";
import { ProgressBar } from 'primereact/progressbar';
import "./../css/procedure.css";

class Iprops{
    
    }

export default function Procedure(props: Iprops){

    const { id } = useParams();

    const navigate = useNavigate();

        const [value, setValue] = React.useState(50);
    
        return(
            <div id="procedureView">
              


              <ProgressBar value={value}></ProgressBar>
            </div>
        )
    }