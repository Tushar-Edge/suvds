

// Data for the line graph
const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [{
        label: 'Amount of Cars Flagged',
        data: [0.3, 0.4, 0.7, 0.3, 0.5, 0.6],
        fill: false,
        borderColor: 'red',
        lineTension: 0.1
    }]
};

// Configuration options for the line graph
const options = {
    animation: {
        duration: 3000,
        easing: 'easeInOutQuart'
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                max: 1
            }
        }]
    }
};

// Create the line graph
const lineGraph = new Chart(document.getElementById('line-graph'), {
    type: 'line',
    data: data,
    options: options
});
