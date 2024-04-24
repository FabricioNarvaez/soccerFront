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
                <p>Victorias: <b>{{ teamData.PG }}</b></p>
            </div>
            <hr>
            <div class="flexCenterF20">
                <div class="boxCube" style="background-color: #a9d2f8;"></div>
                <p>Empates: <b>{{ teamData.PE }}</b></p>
            </div>
            <hr>
            <div class="flexCenterF20">
                <div class="boxCube" style="background-color: #44749d;"></div>
                <p>Derrotas: <b>{{ teamData.PP }}</b></p>
            </div>
            <hr>
            <p class="flexCenterF20">Partidos Jugados: <b>{{ teamData.PP + teamData.PE + teamData.PG }}</b></p>
        </div>
    </div>
    <div class="cardsBox">
        <div class="cardsSection">
            <div class="cards cardBlue"></div>
            <p>{{ teamData.TAZ }}</p>
            <p>Azules</p>
        </div>
        <div class="cardsSection">
            <div class="cards cardYellow"></div>
            <p>{{ teamData.TAM }}</p>
            <p>Amarilla</p>
        </div>
        <div class="cardsSection">
            <div class="cards cardDoubleYellow" ></div>
            <p>{{ teamData.DAM }}</p>
            <p>Doble A.</p>
        </div>
        <div class="cardsSection">
            <div class="cards cardRed"></div>
            <p>{{ teamData.TRO }}</p>
            <p>Roja</p>
        </div>
    </div>
</template>

<script setup>
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
    import { Doughnut } from 'vue-chartjs'

    ChartJS.register(ArcElement, Tooltip, Legend);

    const props = defineProps({
        teamData: {
            type: Object,
            required: true
        }
    })

    function isCero(number){
        return number === 0;
    }

    const doughnutData = isCero(props.teamData.PG) && isCero(props.teamData.PE) && isCero(props.teamData.PP)
        ? [10, 10, 10] 
        : [props.teamData.PG, props.teamData.PE, props.teamData.PP];

    console.log(doughnutData);

    const data = {
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
            {
                backgroundColor: ['#c6d4e1', '#a9d2f8', '#44749d',],
                data: doughnutData,
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