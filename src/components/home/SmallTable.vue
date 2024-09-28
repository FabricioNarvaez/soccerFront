<template>
    <div>
        <h3 class="subtitle">Grupo {{ groupName }}</h3>
        <table>
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Nombre</th>
                        <th>PJ</th>
                        <th>Dif. Goles</th>
                        <th>Pts.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in groupData" :key="groupData">
                        <td>{{ index + 1}}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.PE + item.PP + item.PG  }}</td>
                        <td>{{ item.GD }}</td>
                        <td>{{ item.Pts }}</td>
                    </tr>
                </tbody>
            </table>
    </div>
</template>

<script setup>
    defineProps({
        groupName: {
            type: String,
            required: true
        },
        groupData: {
            type: Array,
            required: true
        }
    })
</script>