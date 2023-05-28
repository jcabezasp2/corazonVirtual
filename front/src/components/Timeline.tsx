import React from "react";
import { Timeline as ItimeLine } from 'primereact/timeline';
import { useNavigate } from "react-router-dom";


class Iprops{
    value: any;
    selected!: number
}

export default function Timeline(props: Iprops){


const navigate = useNavigate();


    const initialize = async () => {
    console.log(props.value);
    }

    React.useEffect(() => {
        initialize();
    }, []);




    return(
        <>
        <ItimeLine value={props.value} content={(item) => item.name} className="w-full md:w-20rem" />
        </>
    )
}