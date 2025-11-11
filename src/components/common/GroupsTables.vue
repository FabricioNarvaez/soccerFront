<template>
    <div class="rightMain bg-white p-4 rounded-lg h-full">
        <HeaderSubtitle v-if="isSmallTable" 
            :subtitle="'Clasificaciones'" 
            :link="'/clasificaciones'" 
            :linkText="'Clasificación completa'" 
        />
        
        <div v-if="(teamsStore.groupA || teamsStore.groupB)" class="mt-4 space-y-6">
            
            <div v-for="(groupData, groupName) in { 'A': teamsStore.groupA, 'B': teamsStore.groupB }" :key="groupName" class="overflow-x-auto">
                
                <div v-if="groupData && groupData.length > 0" class="min-w-full">
                    <h3 class="text-xl font-bold text-dark-blue mb-3">Grupo {{ groupName }}</h3>
                    
                    <table class="w-full text-sm text-gray-700 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        
                        <thead class="text-xs text-white uppercase bg-dark-blue">
                            <tr>
                                <th scope="col" class="py-2 px-3 border-r border-dark-blue/70">Pos</th>
                                <th scope="col" class="py-2 px-3 text-left min-w-[120px]">Equipo</th>
                                <th scope="col" class="py-2 px-3 border-l border-dark-blue/70">PJ</th>
                                
                                <template v-if="isBigTable">
                                    <th scope="col" class="py-2 px-3 border-l border-dark-blue/70 hidden md:table-cell">PG</th>
                                    <th scope="col" class="py-2 px-3 border-l border-dark-blue/70 hidden md:table-cell">PE</th>
                                    <th scope="col" class="py-2 px-3 border-l border-dark-blue/70 hidden md:table-cell">PP</th>
                                    <th scope="col" class="py-2 px-3 border-l border-dark-blue/70 hidden lg:table-cell">GF</th>
                                    <th scope="col" class="py-2 px-3 border-l border-dark-blue/70 hidden lg:table-cell">GC</th>
                                </template>

                                <th scope="col" class="py-2 px-3 border-l border-dark-blue/70">DG</th>
                                <th scope="col" class="py-2 px-3 border-l border-dark-blue/70 font-extrabold">Pts</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(item, index) in groupData" 
                                :key="item._id"
                                :class="[
                                    'border-b border-gray-200 transition-colors duration-200',
                                    'cursor-pointer',
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                                    isBigTable ? 'hover:bg-gray-100' : ''
                                ]"
                                @click="isBigTable ? handleClick(item._id, item.name) : null"
                            >
                                
                                <td :class="[
                                    'py-3 px-3 font-semibold text-center border-r border-gray-200',
                                    index < 2 ? 'border-l-4 border-green-500' :
                                    (index >= 2 && index < 4 ? 'border-l-4 border-orange-500' : 'border-l-4 border-gray-300')
                                ]">
                                    {{ index + 1 }}
                                </td>
                                
                                <td class="py-3 px-3 text-left flex items-center gap-3">
                                    <img :src="item.shield" :alt="`Escudo de ${item.name}`" class="w-8 h-8 object-contain"/>
                                    
                                    <span class="hidden sm:inline font-medium"> {{ item.name }} </span>
                                    <span class="inline sm:hidden font-medium text-xs"> {{ item.acronym || item.name }} </span>
                                </td>
                                
                                <td class="py-3 px-3 text-center border-l border-gray-200">{{ item.PE + item.PP + item.PG }}</td>
                                
                                <template v-if="isBigTable">
                                    <td class="py-3 px-3 text-center border-l border-gray-200 hidden md:table-cell">{{ item.PG }}</td>
                                    <td class="py-3 px-3 text-center border-l border-gray-200 hidden md:table-cell">{{ item.PE }}</td>
                                    <td class="py-3 px-3 text-center border-l border-gray-200 hidden md:table-cell">{{ item.PP }}</td>
                                    <td class="py-3 px-3 text-center border-l border-gray-200 hidden lg:table-cell">{{ item.GF }}</td>
                                    <td class="py-3 px-3 text-center border-l border-gray-200 hidden lg:table-cell">{{ item.GC }}</td>
                                </template>
                                
                                <td class="py-3 px-3 text-center border-l border-gray-200 font-bold">{{ item.GD }}</td>

                                <td class="py-3 px-3 text-center border-l border-gray-200 font-extrabold text-lg text-dark-blue">{{ item.Pts }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="flex flex-wrap gap-x-8 gap-y-2 pt-4 text-sm text-gray-600">
                <div class="flex items-center border-l-4 border-green-500 pl-2">
                    <span class="font-medium">Clasificación Directa (Champions)</span>
                </div>
                <div class="flex items-center border-l-4 border-orange-500 pl-2">
                    <span class="font-medium">Clasificación Preliminar (UEFA)</span>
                </div>
            </div>
        </div>
        
        <StatusMessage v-else :text="'Las tablas de clasificaciones aún no están definidas.'"/>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import HeaderSubtitle from '@components/common/HeaderSubtitle.vue';
    import StatusMessage from "@components/common/StatusMessage.vue";
    
    import { useTeamsStore } from '@store/teamsStore.js';
    
    const teamsStore = useTeamsStore();

    defineProps({
        isSmallTable: {
            type:Boolean,
            default: false
        },
        isBigTable: {
            type:Boolean,
            default: false
        }
    });

    const router = useRouter();
    
    /**
     * @param {string} id - ID del equipo.
     * @param {string} name - Nombre del equipo.
     */
    const handleClick = (id, name) => {
        router.push({
            path: "/equipo/General",
            query: {
                id: id,
                name: name
            }
        });
    }
</script>