
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';



class Iprops {

    dataElements!: any[];
}

function DataColumn (field: string, header: string, style: any) {
    return <Column field={field} header={header} sortable style={style}></Column>
}

export default function Table(props: Iprops) {

    const [dataElements, setDataElements] = useState(props.dataElements);

    useEffect(() => {
    }, []);

   
    return (
        <div>
            <DataTable value={props.dataElements} sortMode="multiple" tableStyle={{ minWidth: '50rem' }}>
                {props.dataElements.length > 0 && Object.keys(props.dataElements[0]).map((key: string) => { return DataColumn(key, key, { width: '10rem' }) })}
            </DataTable>
        </div>
    );
}
        