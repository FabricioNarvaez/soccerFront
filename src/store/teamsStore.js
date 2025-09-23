import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import soccerService from "@services/soccerService";

export const useTeamsStore = defineStore("teams", () => {
    const allTeams = ref({});
    const loading = ref(false);

    onMounted(async () => {
        loading.value = true;
        try {
            const response = await soccerService.getAllTeams();
            allTeams.value = response.data;
        } catch (error) {
            console.error("Error fetching teams:", error);
        } finally {
            loading.value = false;
        }
    });

    return { 
        allTeams,
        loading
    };
});