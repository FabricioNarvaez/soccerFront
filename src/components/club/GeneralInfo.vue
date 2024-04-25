<template>
    <div class="nextMatch">
        <div class="countdown">
            <h3 class="countTitle">Próximo partido</h3>
            <div class="date">
                <div v-if="nextMatchInfo" class="countdownClock">
                    <div class="clock">
                        <p class="clockData">{{ days }}</p>
                        <p class="clockText">DÍAS</p>
                    </div>
                    <p>:</p>
                    <div class="clock">
                        <p class="clockData">{{ hours }}</p>
                        <p class="clockText">HORAS</p>
                    </div>
                    <p>:</p>
                    <div class="clock">
                        <p class="clockData">{{ minutes }}</p>
                        <p class="clockText">MINS</p>
                    </div>
                    <p>:</p>
                    <div class="clock">
                        <p class="clockData">{{ seconds }}</p>
                        <p class="clockText">SEC</p>
                    </div>
                </div>
                <p v-else><i>Sin Definir</i></p>
            </div>
        </div>
        <div v-if="formattedDate" class="nextMatchInfo">
            <div class="localInfo">
                <img class="teamImage" :src="localInfo.shield"/>
                <p class="teamName">{{ localInfo.name }}</p>
            </div>
            <div class="dateInfo">
                <p>{{ formattedDate }}</p>
                <p>{{ formattedHour }}</p>
            </div>
            <div class="visitorInfo">
                <img class="teamImage" :src="visitorInfo.shield"/>
                <p class="teamName">{{ visitorInfo.name }}</p>
            </div>
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
    import { ref, computed, onMounted, onUnmounted } from 'vue';
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
    import { Doughnut } from 'vue-chartjs'

    ChartJS.register(ArcElement, Tooltip, Legend);

    const props = defineProps({
        teamData: {
            type: Object,
            required: true
        },
        nextMatchInfo: {
            type: Object
        }
    })

    const targetDate = new Date(props.nextMatchInfo.hour);
    const timeRemaining = ref(0);
    const formattedDate = ref('');
    const formattedHour = ref('');
    const localInfo = ref({});
    const visitorInfo = ref({});

    const calculateTimeRemaining = () => {
        const now = new Date();
        const difference = targetDate - now;
        timeRemaining.value = difference > 0 ? difference : 0;
    };

    const days = computed(() => Math.floor(timeRemaining.value / (1000 * 60 * 60 * 24)));
    const hours = computed(() => Math.floor((timeRemaining.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = computed(() => Math.floor((timeRemaining.value % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = computed(() => Math.floor((timeRemaining.value % (1000 * 60)) / 1000));

    let timerId;
    onMounted(() => {
        calculateTimeRemaining();
        timerId = setInterval(calculateTimeRemaining, 1000);


        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const [formattedDateHelper, formattedHourHelper] = targetDate.toLocaleDateString('es-ES', options).split(',');
        formattedDate.value = formattedDateHelper.split(' de').join(' ');
        formattedHour.value = formattedHourHelper;

        localInfo.value = {
            name: props.nextMatchInfo.localId.name,
            shield: props.nextMatchInfo.localId.shield
        };

        visitorInfo.value = {
            name: props.nextMatchInfo.visitorId.name,
            shield: props.nextMatchInfo.visitorId.shield
        };
    });
    
    onUnmounted(() => {
        clearInterval(timerId);
    });

    console.log(props.nextMatchInfo);

    function isCero(number){
        return number === 0;
    }

    const doughnutData = isCero(props.teamData.PG) && isCero(props.teamData.PE) && isCero(props.teamData.PP)
        ? [10, 10, 10] 
        : [props.teamData.PG, props.teamData.PE, props.teamData.PP];

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