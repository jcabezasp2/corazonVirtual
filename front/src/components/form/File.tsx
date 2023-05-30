
// import React, { useRef, useState } from 'react';
// import { Toast } from 'primereact/toast';
// import { FileUpload } from 'primereact/fileupload';
// import { ProgressBar } from 'primereact/progressbar';
// import { Button } from 'primereact/button';
// import { Tooltip } from 'primereact/tooltip';
// import { Tag } from 'primereact/tag';
// import '../../css/buttons.css';
// import defaultImage from '../../img/defaultImage.jpeg'
// import * as constants from '../../assets/constants'
// import { appContext } from "../../App";

// class Iprops {
//     handleFile!: Function;
//     file!: any;
   
// }

// export default function File(props : Iprops) {

//     const context = React.useContext(appContext);

//     const toast = useRef(null);
//     const [totalSize, setTotalSize] = useState(0);
//     const fileUploadRef :any = useRef(null);
//     const [fileName, setFileName] = React.useState<string>('');


//     FileUpload.contextType

//     const onTemplateSelect = (e :any) => {
//         let _totalSize = totalSize;
//         let files = e.files;
//         let _files = props.file ? [...props.file] : [];
//         for (let i = 0; i < files.length; i++) {
//             _totalSize += files[i].size || 0;
//         }
//         console.log("_files", _files, "files", files, "files.item", files.item)
//         console.log("value e onselect",e)
//         Object.keys(files).forEach((key) => {
//             _totalSize += files[key].size || 0;
//             // setFileName(files[key].name); 
//              setFileName(files[key].name);
           
//             // props.file = fileName;         
//             console.log("dentro de onselect file",files[key], "--------------",
//             fileUploadRef,"hanfleFile")
//         });
  
//         setTotalSize(_totalSize);
//     };

//     const onTemplateUpload = (e :any) => {
//         let _totalSize = 0;
//         console.log("value e",e)
//         e.files.forEach((file :any) => {
//             _totalSize += file.size || 0;
//         });
//         // props.handleFile(files[key]);           
//         setTotalSize(_totalSize);
//         filestring();
      
//     };
//     async function filestring() {
//         console.log('entrando en filestring')
       
//         const resImg = await context.apiCalls.uploadImage(fileUploadRef); 
//         if(resImg != null){
//             console.log('funciona imagen')
//             console.log(resImg)
//         }else{
//             console.log('no funciona imagen')
        
//         }
//     }
//     // const handleFileString(){
//     //     filestring();
//     // }
//     const onTemplateRemove = (file : any, callback :any) => {
//         setTotalSize(totalSize - file.size);
//         callback();
//     };

//     const onTemplateClear = () => {
//         setTotalSize(0);
//     };

//     const headerTemplate = (options :any) => {
//         const { className, chooseButton, uploadButton, cancelButton } = options;
//         const value = totalSize / 100000;
//         const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

//         return (
//             <div className={className} style={{ backgroundColor: 'var(--primary-color-text)', display: 'flex', alignItems: 'center' }}>
//                 {chooseButton}
//                 {uploadButton}
//                 {cancelButton}
//                 <div className="flex align-items-center gap-3 ml-auto">
//                     <span>{formatedValue} / 10 MB</span>
//                     <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
//                 </div>
//             </div>
//         );
//     };

//     const itemTemplate = (file :any, props :any) => {
//         return (
//             <div className="flex align-items-center flex-wrap gap-8">
//                 <div className="flex align-items-center   col-3" style={{ width: '30%' }}>
//                     <img alt={file.name} role="presentation" src={file.objectURL? file.objectURL : defaultImage} width={100} />
//                     <span className="flex flex-column text-left ml-2 col-1">
//                         {file.name}
//                         <small>{new Date().toLocaleDateString()}</small>
//                     </span>
//                 </div>
//                 <div className="flex flex-column align-self-center col-3 ml-8 pl-6">
//                 <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
//                 </div>
//                 <Button type="button" icon="pi pi-times" className="p-button p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
//             </div>
//         );
//     };

//     const emptyTemplate = () => {
//         return (
//             <div className="flex align-items-center flex-column">
//                 <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
//                 <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
//                     Drag and Drop Image Here
//                 </span>
//             </div>
//         );
//     };

//     const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button' };
//     const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button' };
//     const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button' };

//     return (
//        <div>
//             <Toast ref={toast}></Toast>

//             <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
//             {/* <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" /> */}
//             <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
//             <FileUpload className='file-row-img' ref={fileUploadRef} name="file"  multiple accept="image/*" maxFileSize={1000000} 
//             // url="/api/upload"
//             // url={constants.API_URL+'images'}
//             url={constants.API_URL+'images'}
//                 onSelect={onTemplateSelect}                
              
//                 // onSelect={(e : any) => props.handleFile(e.target.value)}
//                 onUpload={onTemplateUpload}  onError={onTemplateClear} onClear={onTemplateClear}
//                 headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
//                 chooseOptions={chooseOptions} 
//                 uploadOptions={uploadOptions} 
//                 cancelOptions={cancelOptions} />
//        </div>
//     )
// }
        


// import React, { useRef, useState } from 'react';
// import { Toast } from 'primereact/toast';
// import { FileUpload, FileUploadHeaderTemplateOptions, FileUploadSelectEvent, FileUploadUploadEvent, ItemTemplateOptions,} from 'primereact/fileupload';
// import { ProgressBar } from 'primereact/progressbar';
// import { Button } from 'primereact/button';
// import { Tooltip } from 'primereact/tooltip';
// import { Tag } from 'primereact/tag';


// class Iprops {
//     handleFile!: Function;
//     file!: any;  

// }
// export default function File(props:Iprops) {

//     const toast = useRef<Toast>(null);
//     const [totalSize, setTotalSize] = useState(0);
//     const fileUploadRef = useRef<FileUpload>(null);



//     const onTemplateSelect = (e: FileUploadUploadEvent) => {
//         let _totalSize = totalSize;
//         let files = e.files;

//         for (let i = 0; i < files.length; i++) {
//             _totalSize += files[i].size || 0;
//         }
//         console.log(files,"*********", files)
//         setTotalSize(_totalSize);
//     };

//     const onTemplateUpload = (e: FileUploadUploadEvent) => {
//         let _totalSize = 0;

//         e.files.forEach((file) => {
//             _totalSize += file.size || 0;
//         });

//         setTotalSize(_totalSize);
//         toast.current?.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
//     };

//     const onTemplateRemove = (file: File, callback: Function) => {
//         setTotalSize(totalSize - file.size);
//         callback();
//     };

//     const onTemplateClear = () => {
//         setTotalSize(0);
//     };

//     const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
//         const { className, chooseButton, uploadButton, cancelButton } = options;
//         const value = totalSize / 10000;
//         const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

//         return (
//             <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
//                 {chooseButton}
//                 {uploadButton}
//                 {cancelButton}
//                 <div className="flex align-items-center gap-3 ml-auto">
//                     <span>{formatedValue} / 1 MB</span>
//                     <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
//                 </div>
//             </div>
//         );
//     };

//     const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
//         const file = inFile as File;
//         return (
//             <div className="flex align-items-center flex-wrap">
//                 <div className="flex align-items-center" style={{ width: '40%' }}>
//                     // @ts-ignore
//                     <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
//                     <span className="flex flex-column text-left ml-3">
//                         {file.name}
//                         <small>{new Date().toLocaleDateString()}</small>
//                     </span>
//                 </div>
//                 <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
//                 <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
//             </div>
//         );
//     };

//     const emptyTemplate = () => {
//         return (
//             <div className="flex align-items-center flex-column">
//                 <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
//                 <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
//                     Drag and Drop Image Here
//                 </span>
//             </div>
//         );
//     };

//     const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
//     const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
//     const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

//     return (
//         <div>
//             <Toast ref={toast}></Toast>

//             <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
//             <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
//             <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

//             <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
//                 onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
//                 headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
//                 chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
//         </div>
//     )
// }
        


import React from 'react'; 
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { appContext } from "../../App";

class Iprops {
    handleFile!: Function;
    file!: any;
}

export default function File(props:Iprops) {
    const [base64, setBase64] =  React.useState<any>();
    const context = React.useContext(appContext);

    const customBase64Uploader = async (event: FileUploadHandlerEvent) => {
        
        // convert file to base64 encoded
        const file = event.files[0];
       
        console.log("file antes de todo",file)
        props.handleFile(file.objectURL)

        
        const reader = new FileReader();

        console.log("url",file.objectURL)
        console.log("file antes de blob", file)

        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
        
        console.log("blob en File",blob)
        // props.handleFile(blob)        
        console.log("file",file)
        console.log("props.file",props.file)
        reader.readAsDataURL(blob);

       

        reader.onloadend = function () {                        
             
            const base64data = reader.result;
            console.log("base64data", base64data) 
            props.handleFile(base64data)             
            console.log("file despues de handle 64data", file) 
        };
       
       
    };

    return (
        <div className="card flex justify-content-center">
            <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload            
            uploadHandler={customBase64Uploader}
            />
        </div>
    )
}