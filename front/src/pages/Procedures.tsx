import React from "react";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { appContext } from "../App";
import ProcedureCard from "../components/ProcedureCard";
import './../css/procedures.css';

    interface Iprocedure{
        id: number;
        name: string;
        image: string | null;
        numberOfSteps: number;
    }

class Iprops{
    
    }

export default function Procedures(props: Iprops){

    const navigate = useNavigate();
    const context = React.useContext(appContext);

    const [procedures, setProcedures] = React.useState([]);

    const initialize = async () => {
        const res = await context.apiCalls.getProcedures();
        const procedures = await res.json();
        setProcedures(
            procedures.map((procedure: any) => {
                return {
                    id: procedure.id,
                    name: procedure.name,
                    image: procedure.image,
                    numberOfSteps: procedure.steps.length
                }
            })
        )
    };

    React.useEffect(() => {
        initialize();
    }, []);

    React.useEffect(() => {
        console.log(procedures);
    }, [procedures]);

    
        return(
            <div id="procedures">
                {procedures.map((procedure: Iprocedure) => {
                    return (
                        <ProcedureCard
                            key={procedure.id}
                            title={procedure.name}
                            destiny={`/procedimiento/${procedure.id}`}
                            image={procedure.image ? procedure.image : "https://primefaces.org/cdn/primereact/images/usercard.png"}
                            numberOfSteps={procedure.numberOfSteps}
                        />
                    )
                })
                }
            </div>
        )
    }