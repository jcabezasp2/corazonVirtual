import React, { useRef } from 'react';
import { SplitButton } from 'primereact/splitbutton';
//TODO implementar

export default function OptionsButton() {
    //const router = useRouter();
    const toast = useRef(null);
    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
                
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
               
            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                
            }
        }
    ];

    const save = () => {
        
    }

    return (
        <div>
            <SplitButton label="Save" icon="pi pi-plus" onClick={save} model={items} />
        </div>
    )
}