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



    const length = Object.values(props.data).length;
    const duration: number[][] = Array.from<number[], number[]>({ length: length }, () => Array.from<number>({ length: length }).fill(0)
    );

    Object.values(props.data).forEach((value, i) => {
        duration[0][i] = value.data;
    });

    const dataComplete = {
        label: Object.values(props.data).map((value) => value.label),
        labels: Object.values(props.data).map((value) => 'Paso ' + value.labels),
        data: duration,
    }




    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--surface-600');
        const textColorSecondary = documentStyle.getPropertyValue('--surface-800');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-900');

        setChartData({

            labels: dataComplete.labels,
            datasets: dataComplete.label.map((label, i) => ({
                label: 'Día ' + label.split('T').shift(),
                data: dataComplete.data[i],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--surface-900'),
                backgroundColor: documentStyle.getPropertyValue('--surface-500'),
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

    return (
        <Card className="col-5 card-panel chart" title={props.title} >
            <Chart id="chart" type="bar" data={chartData} options={chartOptions}>
            </Chart>
        </Card>
    )
}
