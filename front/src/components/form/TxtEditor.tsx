import React, { useState } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";


class Iprops {
    handleDescription!: Function;
    description!: string;
}

export default function TxtEditor(props : Iprops) {
    

    return (
        <div>
            <Editor value={props.description} onTextChange={(e: EditorTextChangeEvent) => props.handleDescription(e.htmlValue)}  />
        </div>
    )
}