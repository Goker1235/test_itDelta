document.addEventListener('DOMContentLoaded', function () {
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {
        const currentDayCell = row.querySelector("td:nth-child(2)");
        const yesterdayCell = row.querySelector("td:nth-child(3)");
        const percentageCell = row.querySelector("td:nth-child(4)");

        if (currentDayCell && yesterdayCell && percentageCell) {
            const currentDayValue = parseInt(currentDayCell.textContent.replace(/\s+/g, ''), 10);
            const yesterdayValue = parseInt(yesterdayCell.textContent.replace(/\s+/g, ''), 10);

            let result = 0;

            if (!isNaN(currentDayValue) && !isNaN(yesterdayValue)) {
                result = ((currentDayValue / yesterdayValue) - 1) * 100;

                percentageCell.textContent = result.toFixed(0) + "%";

                if (result > 0) {
                    yesterdayCell.classList.remove('red');
                    yesterdayCell.classList.add('green');
                    percentageCell.classList.remove('red');
                    percentageCell.classList.add('green');
                } else if (result < 0) {
                    yesterdayCell.classList.remove('green');
                    yesterdayCell.classList.add('red');
                    percentageCell.classList.remove('green');
                    percentageCell.classList.add('red');
                } else {
                    yesterdayCell.classList.remove('green');
                    yesterdayCell.classList.remove('red');
                    percentageCell.classList.remove('green');
                    percentageCell.classList.remove('red');
                }
            } else {
                percentageCell.textContent = "N/A";
            }
        }
    });


    const tableTop = document.querySelector('.table__top tbody');
    const tableBottom = document.querySelector('.table__bottom tbody');

    tableTop.addEventListener('click', function (event) {
        if (event.target && event.target.nodeName === 'TD') {
            const tr = event.target.parentNode;
            Array.from(tableTop.getElementsByTagName('tr')).forEach(row => {
                row.classList.remove('active');
            });
            Array.from(tableBottom.getElementsByTagName('tr')).forEach(row => {
                row.classList.remove('active');
            });
            tr.classList.add('active');
            console.log(1);
            buildGraph();
        }
    });


    tableBottom.addEventListener('click', function (event) {
        if (event.target && event.target.nodeName === 'TD') {
            const tr = event.target.parentNode;
            Array.from(tableBottom.getElementsByTagName('tr')).forEach(row => {
                row.classList.remove('active');
            });
            Array.from(tableTop.getElementsByTagName('tr')).forEach(row => {
                row.classList.remove('active');
            });
            tr.classList.add('active');
            console.log(1);
            buildGraph();
        }
    });



    function parseNumber(str) {
        return parseInt(str.replace(/\s/g, ''), 10);
    }

    let myChart = null;

    function buildGraph() {
        const row = document.querySelector('table tbody tr.active');
        if (!row) return;

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const currentDayValue = parseNumber(row.cells[1].textContent);
        const yesterdayValue = parseNumber(row.cells[2].textContent);
       /*  const weekDayValue = parseNumber(row.cells[4].textContent); */

        const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        const data1 = [yesterdayValue, currentDayValue, getRandomNumber(400000, 520000), getRandomNumber(400000, 520000), getRandomNumber(400000, 520000), getRandomNumber(400000, 520000), getRandomNumber(400000, 520000)];
        const data2 = [yesterdayValue, currentDayValue, getRandomNumber(70000, 120000), getRandomNumber(70000, 120000), getRandomNumber(70000, 120000), getRandomNumber(70000, 120000), getRandomNumber(70000, 120000)];
        const data3 = [yesterdayValue, currentDayValue, getRandomNumber(700, 1500), getRandomNumber(700, 1500), getRandomNumber(700, 1500), getRandomNumber(700, 1500), getRandomNumber(700, 1500)];
        const data4 = [yesterdayValue, currentDayValue, getRandomNumber(15, 40), getRandomNumber(15, 40), getRandomNumber(15, 40), getRandomNumber(15, 40), getRandomNumber(15, 40)];
       


        let selectedData;
        if (row.classList.contains('fullCash')){
            selectedData = data1;
        } else if (row.classList.contains('cash')) {
            selectedData = data2;
        } else if (row.classList.contains('mdlDlt')) {
            selectedData = data3;
        } else if (row.classList.contains('count')) {
            selectedData = data4;
        }


        const ctx = document.getElementById('Graph').getContext('2d');

        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Выручка, руб.',
                    data: selectedData,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(10, 115, 0, 1)'/* ,
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)' */
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    buildGraph();
});
