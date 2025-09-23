import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import soccerService from "@services/soccerService";

export const useTeamsStore = defineStore("teams", () => {
    const allGroups = ref({});
    const allTeams = ref([]);
    const loading = ref(false);

    onMounted(async () => {
        loading.value = true;
        try {
            const response = await soccerService.getAllTeams();
            allGroups.value = response.data;
            allTeams.value = allGroups.value.A.concat(allGroups.value.B || []);
        } catch (error) {
            console.error("Error fetching teams:", error);
        } finally {
            loading.value = false;
        }
    });

    return { 
        allGroups,
        allTeams,
        loading
    };
});