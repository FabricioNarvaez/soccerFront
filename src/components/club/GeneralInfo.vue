<template>
    <div class="nextMatch">
        <div class="countdown">
            <h3 class="countTitle">Próximo partido</h3>
            <div class="date">
                <div v-if="hasDate" class="countdownClock">
                </div>
                <p v-else><i>Sin Definir</i></p>
            </div>
        </div>
        <div v-if="hasDate">
            <!-- TODO: Next Match info -->
            <p>test</p>
        </div>
    </div>

    <h3 class="subtitle">Estadísticas</h3>
    <hr>

    <div class="box">
        <div class="doughnutBox">
            <Doughnut :data="data" :options="options" />
        </div>
        <div class="boxLegend">
            <div class="flexCenterF20">
                <div class="boxCube" style="background-color: #c6d4e1;"></div>
                <p>Victorias: <b>0</b></p>
            </div>
            <hr>
            <div class="flexCenterF20">
                <div class="boxCube" style="background-color: #a9d2f8;"></div>
                <p>Empates: <b>0</b></p>
            </div>
            <hr>
            <div class="flexCenterF20">
                <div class="boxCube" style="background-color: #44749d;"></div>
                <p>Derrotas: <b>0</b></p>
            </div>
            <hr>
            <p class="flexCenterF20">Partidos Jugados: <b>0</b></p>
        </div>
    </div>
    <div class="cardsBox">
        <div class="cardsSection">
            <div class="cards cardBlue"></div>
            <p>0</p>
            <p>Azules</p>
        </div>
        <div class="cardsSection">
            <div class="cards cardYellow"></div>
            <p>0</p>
            <p>Amarilla</p>
        </div>
        <div class="cardsSection">
            <div class="cards cardDoubleYellow" ></div>
            <p>0</p>
            <p>Doble A.</p>
        </div>
        <div class="cardsSection">
            <div class="cards cardRed"></div>
            <p>0</p>
            <p>Roja</p>
        </div>
    </div>
</template>

<script setup>
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
    import { Doughnut } from 'vue-chartjs'

    ChartJS.register(ArcElement, Tooltip, Legend);


    const data = {
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
            {
                backgroundColor: ['#c6d4e1', '#a9d2f8', '#44749d',],
                data: [10, 10, 10],
                borderWidth: 5,
                hoverBorderWidth: 10,
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                // position: 'right',
            },
        },
    };
</script>

<style setup>
    @import "../../assets/css/club/general.css";
</style>