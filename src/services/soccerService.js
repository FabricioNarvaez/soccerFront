import soccerAPI from "@/libs/axios";

export default {
    getAllTeams() {
        return soccerAPI.get('/teams/all');
    },
    getAllMatchWeeks() {
        return soccerAPI.get('/matchweek/all');
    }
}