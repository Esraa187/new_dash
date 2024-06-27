import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const data = {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [
            {
                label: 'Data Series 1',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                data: [12, 19, 3, 5, 2],
            },
        ],
    };

    var options = {
        maintainAspectRatio: true,
        scales: {
        },
        legend: {
            
        },
    }

    return (
        <div>
            <Pie
                data={data}
                height={3000}
                width={3000}
                options={options}
            />
            
        </div>
    );
};

export default PieChart;
