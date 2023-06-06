import React from 'react'
import '../css/newStudents.css'
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Table from '../components/Table';
import { Button } from 'primereact/button';
import { appContext } from '../App';

export default function NewStudents() {

    const [file, setFile] = useState<File>();
    const [students, setStudents] = useState<any[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const ctx = React.useContext(appContext);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files == null) return;
        setFile(e.target.files[0]);
    }

    const leerArchivo = () => {
        if (file == null) return;
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            const lineas = reader.result?.toString().split('\r\n');
            const headers = ['nombre', 'email', 'password'];
            lineas?.shift()?.split(';').forEach((header) => {
                if (!headers.includes(header)) return;
            });
            setStudents([]);
            lineas?.forEach((linea) => {
                const usuario = linea.split(';');
                setStudents(students => [...students, usuario]);
            });
        }

    }

    const añadirUsuarios = () => {
        const apikey = sessionStorage.getItem('apiKey');
        console.log(apikey)
        students.forEach(async (student) => {

            let res = await ctx.apiCalls.register(student[0], student[1], student[2]);

        });
        setFile(undefined);
    }

    useEffect(() => {
        leerArchivo();
    }, [file])

    // useEffect(() => {
    //     console.log(students)
    // }, [students])


    return (
        <div id='newStudents'>
            <div className='flex justify-content-between align-items-center'>
                <input type="file" onChange={(e) => handleUpload(e)} />
                <Button icon="pi pi-save" label='Añadir' onClick={añadirUsuarios} />
            </div>
            <div>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" name='nombre' onChange={(e) => setName(e.target.value)} />
                <label htmlFor="email">Email</label>
                <input type="text" name='email' onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="text" name='password' onChange={(e) => setPassword(e.target.value)} />
                <Button icon="pi pi-plus" onClick={() => setStudents(students => [...students, [name, email, password]])} />
            </div>
            <div>
                <Table dataElements={students} onDelete={() => { }} onEdit='' />
            </div>

        </div>
    )
}
