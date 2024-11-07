<template>
    <div>
        <h3 class="subtitle">Grupo {{ groupName }}</h3>
        <table>
                <thead>
                    <tr>
                        <th>POS</th>
                        <th>EQUIPO</th>
                        <th>PJ</th>
                        <th>PG</th>
                        <th>PE</th>
                        <th>PP</th>
                        <th>GF</th>
                        <th>GC</th>
                        <th>DG</th>
                        <th>PTS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in groupData" :key="groupData">
                        <td>{{ index + 1}}</td>
                        <td class="teamNameWithShield">
                            <img :src=item.shield />
                            <span v-if="screenWidth >= 420">
                                {{ item.name }}
                            </span>
                            <span v-else>
                                {{ item.acronym }}
                            </span>
                        </td>
                        <td>{{ item.PE + item.PP + item.PG  }}</td>
                        <td>{{ item.PG }}</td>
                        <td>{{ item.PE }}</td>
                        <td>{{ item.PP }}</td>
                        <td>{{ item.GF }}</td>
                        <td>{{ item.GC }}</td>
                        <td>{{ item.GD }}</td>
                        <td>{{ item.Pts }}</td>
                    </tr>
                </tbody>
            </table>
    </div>
</template>

<script setup>
    import { onMounted, onUnmounted, ref } from 'vue';

    defineProps({
        groupName: {
            type: String,
            required: true
        },
        groupData: {
            type: Array,
            required: true
        }
    });

    const screenWidth = ref(window.innerWidth);
    onMounted(() => {
        window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);   
    });

    function handleResize() {
        screenWidth.value = window.innerWidth;
    }
</script>