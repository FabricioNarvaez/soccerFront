import { ref } from "vue";
import { defineStore } from "pinia";
import soccerService from "@services/soccerService";

export const useTeamsStore = defineStore("teams", () => {
    const allGroups = ref({});
    const allTeams = ref([]);
    const groupA = ref([]);
    const groupB = ref([]);
    const loading = ref(false);

    const getAllTeams = async () => {
        loading.value = true;
        try {
            const response = await soccerService.getAllTeams();
            allGroups.value = response.data;
            groupA.value = allGroups.value.A || [];
            groupB.value = allGroups.value.B || [];
            allTeams.value = allGroups.value.A.concat(allGroups.value.B || []);
        } catch (error) {
            console.error("Error fetching teams:", error);
        } finally {
            loading.value = false;
        }
    };

    return {
        getAllTeams,
        allGroups,
        allTeams,
        groupA,
        groupB,
        loading
    };
});