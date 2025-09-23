import soccerAPI from "@/libs/axios";

export default {
    getAllTeams() {
        return soccerAPI.get('/teams/all');
    }
}