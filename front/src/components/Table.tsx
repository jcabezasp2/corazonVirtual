import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import OptionsButton from './OptionsButton';
import { appContext } from "../App";
import "./../css/table.css"
import { Button } from 'primereact/button';
import { DomHandler } from 'primereact/utils';

class Iprops {

    dataElements!: any[];
    showOptions?: boolean;
    showDelete?: boolean = false;
    onEdit!: string;
    onDelete!: Function;
}

function DataColumn(key: number, field: string, header: string, style: any) {
    return <Column key={key} field={field} header={header} sortable style={style}></Column>
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
                {props.dataElements.length > 0 && Object.keys(props.dataElements[0]).map((key: string, i) => { return DataColumn(i, key, key, { width: '10rem' }) })}
                {props.showOptions && <Column header="Opciones" body={(rowData: any) => <OptionsButton id={rowData.Id} onDelete={props.onDelete(rowData.Id)} onEdit={`${props.onEdit}/${rowData.Id}`} />} style={{ width: '10%' }} />}
                {props.showDelete && <Column header="Borrar" body={(rowData: any) => <Button id={rowData.Id} icon="pi pi-trash"
                onClick={() => props.onDelete(rowData)} />} style={{ width: '10%' }} />
                }
            </DataTable>
        </div>
    );
}
