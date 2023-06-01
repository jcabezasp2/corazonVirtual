
import React, { useState, useEffect } from 'react';
import { PickList } from 'primereact/picklist';
import PickSteps from '../../interfaces/PickSteps';



class Iprops {
  
    source!: PickSteps[];
    target!: PickSteps[];
    onChange: (event: { source: PickSteps[]; target: PickSteps[] }) => void;
}


export default function PickListt(props : Iprops) {

  
    const itemTemplate = (item: PickSteps) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                {/* <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`${item.image}`} alt={item.name} /> */}
                <div className="flex-1 flex flex-column gap-2">
                    <span className="font-bold">{item.name}</span>
                    <div className="flex align-items-center gap-2">                        
                      
                    </div>
                </div>
                
            </div>
        );
    };

    return (
        <div className="card">
            <PickList 
            source={props.source} 
            target={props.target} 
            onChange={props.onChange} 
            itemTemplate={itemTemplate} 
            breakpoint="1400px" 
            style={{display:'flex', flexDirection:'row'}}
            sourceHeader="Disponibles" 
            targetHeader="Seleccionados" 
            sourceStyle={{ height: '30rem' }} 
            targetStyle={{ height: '30rem' }} />
        </div>

    );
}
        