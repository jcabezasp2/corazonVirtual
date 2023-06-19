import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import '../css/panel.css';
import { Card } from 'primereact/card';

class Iprops {
    data!: any[];
    title!: string;
    label!: any[];

}




export default function ChartLine(props: Iprops) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});



    const lengthData = Object.values(props.data).length;
    const duration: number[][] = Array.from<number[], number[]>({ length: lengthData }, () => Array.from<number>({ length: lengthData }).fill(0)
    );
 console.log("props.data", props.data)
    Object.values(props.data).forEach((value, i) => {
        duration[0][i] = value.data;
    });

    const dataComplete = {
        label: Object.values(props.data).map((value) => value.label),
        labels: Object.values(props.data).map((value) => 'Paso ' + value.labels),
        data: duration,
    }

    const colorsArray = ['#66161e', '#195056', '#615322', '#10502c', '#495470', '#2b8d96', '#a43b3c'];
    console.log("colorsArray", colorsArray);
      
    
    const length = lengthData;
    const background: string[][] = Array.from<string[], string[]>({ length: lengthData }, () => Array.from<string>({ length: lengthData }));
    
    for (let i = 0; i < lengthData; i++) {
      for (let j = 0; j < lengthData; j++) {
        background[i][j] = colorsArray[(i + j) % length];
      }
    }
    
      console.log("background", background);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--surface-800');       
        const textColorSecondary = documentStyle.getPropertyValue('--surface-800');        
        const surfaceBorder = documentStyle.getPropertyValue('--surface-900');
        

        setChartData({
            labels: dataComplete.labels.map((label, i) => label.split('T').shift()), 
            datasets: dataComplete.label.map((label, i) => ({
              label: 'Día ' + label.split('T').shift(),
              data: dataComplete.data[i],
              fill: false,
              borderColor: colorsArray[i], 
              backgroundColor: background[i], 
              tension: 0.4,
            })),
          });



        const options = {
            maintainAspectRatio: false,
            aspectRatio: 1.1,
            plugins: {
                legend: {
                   
                    labels:
                    {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {                    
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {                    
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
      

        setChartOptions(options);
    }, [props.data]);

    
    const tagPasos = 'Pasos realizados';
    const tagDias = 'Prácticas realizadas en los días:'
    

    return (
        <Card className="col-5 card-panel chart" title={props.title} >
            <span>{tagDias}</span>
            <Chart id="chart" type="bar" data={chartData} options={chartOptions}/>
            <span>{tagPasos}</span>
          
           
        </Card>
    )
}
