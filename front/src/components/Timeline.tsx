import React from "react";
import { Timeline as ItimeLine } from "primereact/timeline";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

class Iprops {
  value: any;
  selected!: number;
}

interface IStep {
  name: string;
  icon: string;
  color: string;
  image: string;
  previousStep: boolean;
  class: string;
  index: number;
  typography: string;
}

export default function Timeline(props: Iprops) {
  const navigate = useNavigate();


  const initialize = async () => {
    const steps: IStep[] = props.value.slice(props.selected, props.selected + 5).map((item: any, index: number) => {
        return {
            name: item.name,
            image: item.image,
            color: item.index == props.selected? "black" :  item.previousStep ? "#B0E0E6" : "#2c5772",
            typography: item.index == props.selected? "#dfdfdf" : "white",
            index: item.index,
            };
        });

    setSteps(steps);
    };

    React.useEffect(() => {
        const currentSteps: IStep[] = props.value.slice(props.selected, props.selected + 5).map((item: any, index: number) => {
            return {
                name: item.name,
                image: item.image,
                color: item.index == props.selected? "black" :  item.previousStep ? "#B0E0E6" : "#2c5772",
                typography: item.index == props.selected? "#dfdfdf" : "white",
                index: item.index
            };
        });
        setSteps([...currentSteps]);

    }, [props.selected]);

  const [steps, setSteps] = React.useState<IStep[]>([]);

  React.useEffect(() => {
    initialize();
  }, []);

  const customizedMarker = (item: IStep) => {
    return (
      <span
        className={`flex w-2rem h-2rem align-items-center justify-content-center border-circle shadow-1`}
        style={{ backgroundColor: item.color, color: item.typography}}
      >
        {item.index +1}
      </span>
    );
  };

  const customizedContent = (item: IStep, index: number) => {
    return (
      <Card title={item.name}>
      </Card>
    );
  };

  return (
    <>
      <ItimeLine
        align="alternate"
        value={steps}
        marker={customizedMarker}
        content={customizedContent}
      />
    </>
  );
}
