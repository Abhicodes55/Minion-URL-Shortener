import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({chartData, title}) => {
    // console.log(browserName)
    const labels = chartData && chartData.map(ele => ele.name);
    const counts = chartData && chartData.map(ele => ele.count);

    console.log(labels, counts)

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Browser',
                data: counts,
                backgroundColor: [
                    '#98D89E',
                    '#F6DC7D',
                    '#EE8484'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        cutout: 80,
        plugins: {
            legend: {
                display: true,
                position: 'right',
            },
        },
    };
    return (
        <div className='p-5'>
            <p className='text-start text-[22px]'>{title}</p>
            <div className='w-[20rem] mt-3'>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default PieChart;
