import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import OptionsButton from './OptionsButton';
import { appContext } from "../App";
import "./../css/table.css"
import { Button } from 'primereact/button';

class Iprops {

    dataElements!: any[];
    showOptions?: boolean;
    onEdit!: string;
    onDelete!: Function;
}

function DataColumn (field: string, header: string, style: any) {
    return <Column field={field} header={header} sortable style={style}></Column>
}

export default function Table(props: Iprops) {

    const context = React.useContext(appContext);
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;


    return (
        <div>
            <DataTable stripedRows scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} scrollHeight="60vh" className='table' value={props.dataElements} sortMode="multiple" tableStyle={{ minWidth: '50rem' }}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} al {last} de {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                {props.dataElements.length > 0 && Object.keys(props.dataElements[0]).map((key: string) => { return DataColumn(key, key, { width: '10rem' }) })}
                {props.showOptions &&<Column header="Opciones" body={(rowData: any) => <OptionsButton id={rowData.Id} onDelete={props.onDelete()} onEdit={`${props.onEdit}/${rowData.Id}`} />} style={{ width: '10%' }}/>}
            </DataTable>
        </div>
    );
}
        