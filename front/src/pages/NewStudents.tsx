import React from 'react'
import '../css/newStudents.css'
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Table from '../components/Table';
import { Button } from 'primereact/button';
import { appContext } from '../App';
import { FileUpload } from 'primereact/fileupload';

export default function NewStudents() {

    const [file, setFile] = useState<File>();
    const [students, setStudents] = useState<any[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const ctx = React.useContext(appContext);

    const handleUpload = (e: any) => {
        console.log(e)
        if (e.files == null) return;
        setFile(e.files[0]);
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
        let resultado = 'Nombre;Email;Password\n';
        students.forEach(async (student) => {

            let res = await ctx.apiCalls.register(student[0], student[1], student[2]);

            if (res.status == 201) {
                resultado += `${student[0]};${student[1]};${student[2]}\n`;
            }

        });
        const blob = new Blob([resultado], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'estudiantes_registrados.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

       setFile(undefined);
    }


    const handleDelete = (e: Array<string>) => {
        setStudents(students.filter((student) => student[1] !== e[1]));
    }


    useEffect(() => {
        leerArchivo();
    }, [file])



    return (
        <div id='newStudents'>
            <div className='flex justify-content-between align-items-center'>
                <FileUpload mode="basic" auto name="demo[]"
                  customUpload uploadHandler={(e) => handleUpload(e)}
                  chooseOptions={{ icon: 'pi pi-upload' }}
                />
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
                <Table dataElements={students} showDelete={true} onDelete={handleDelete} onEdit='' />
            </div>

        </div>
    )
}
