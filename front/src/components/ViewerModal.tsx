import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Suspense } from "react";
import Model from "../components/Model";
import "./../css/viewerModal.css";

interface Iprops {
  visible?: boolean;
  title?: string;
  Modelo: string;
  setVisible: Function;
  description: string;
}

export default function ViewerModal(props: Iprops) {
  return (
    <div id="viewerModal" className="card flex justify-content-center">
      <Dialog
        maximizable
        header={props.title}
        visible={props.visible}
        style={{ width: "80vw", height: "80vh" }}
        onHide={() => {
          props.setVisible();
        }}
      >
        <Canvas id="viewCanva" camera={{ position: [0, 0, 3] }}>
          <Suspense fallback={null}>
            <Model path={`${props.Modelo}`} />
          </Suspense>
          <OrbitControls />
          <ambientLight intensity={0.3} />
          <directionalLight intensity={0.4} position={[0, 1, 1]} />
          <Sky sunPosition={[0, 1, 1]} turbidity={40} />
        </Canvas>
        <div>{props.description}</div>
      </Dialog>
    </div>
  );
}
