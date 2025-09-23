import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import soccerService from "@services/soccerService";

export const useMatchWeeksStore = defineStore("matchWeeks", () => {
    const allMatchWeeks = ref({});
    const loading = ref(false);
    const upcomingMatchweek = ref(null);

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const targetDate = new Date(dateString);
        const [formattedDateHelper, formattedHourHelper] = targetDate
            .toLocaleDateString("es-ES", options)
            .split(",");

        return {
            formattedDate: formattedDateHelper.split(" de").join(" "),
            formattedHour: formattedHourHelper.trim()
        };
    }

    onMounted(async () => {
        loading.value = true;
        try {
            const response = await soccerService.getAllMatchWeeks();
            allMatchWeeks.value = response.data;
            upcomingMatchweek.value = allMatchWeeks.value.find(matchWeek => {
                const currentDate = new Date();
                const matchWeekDate = new Date(matchWeek.date);
                return matchWeekDate >= currentDate;
            });
            if (upcomingMatchweek.value) {
                for(const match of upcomingMatchweek.value.matches) {
                    const { formattedDate, formattedHour } = formatDate(match.hour);
                    match.formattedDate = formattedDate;
                    match.formattedHour = formattedHour;
                }
            }
        } catch (error) {
            console.error("Error fetching match weeks:", error);
        } finally {
            loading.value = false;
        }
    });

    return {
        allMatchWeeks,
        upcomingMatchweek,
        loading
    }
});