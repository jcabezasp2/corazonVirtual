
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import OptionsButton from './OptionsButton';
import { appContext } from "../App";

class Iprops {

    dataElements!: any[];
}

function DataColumn (field: string, header: string, style: any) {
    return <Column field={field} header={header} sortable style={style}></Column>
}

export default function Table(props: Iprops) {

    const context = React.useContext(appContext);
    const [dataElements, setDataElements] = useState(props.dataElements);

    useEffect(() => {
        setDataElements([...props.dataElements]);

    }, []);

   
    return (
        <div>
            <DataTable value={props.dataElements} sortMode="multiple" tableStyle={{ minWidth: '50rem' }}>
                {props.dataElements.length > 0 && Object.keys(props.dataElements[0]).map((key: string) => { return DataColumn(key, key, { width: '10rem' }) })}
                <Column header="Opciones" body={(rowData: any) => <OptionsButton id={rowData.Id} onDelete={context.apiCalls.deleteStep} onEdit={`/steps/${rowData.Id}`} />} style={{ width: '20%' }} />
            </DataTable>
        </div>
    );
}
        