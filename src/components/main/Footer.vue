<template>
    <footer class="bg-gray-800 text-white p-4 mt-8 w-full">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm space-y-2 md:space-y-0">
            
            <p class="text-center md:text-left text-gray-400">
                &copy; {{ currentYear }} Amigos por el Deporte. Todos los derechos reservados.
            </p>

            <nav class="space-x-4">
                <a href="#" class="text-gray-300 hover:text-blue-400 transition-colors duration-200">Aviso Legal</a>
                <a href="#" class="text-gray-300 hover:text-blue-400 transition-colors duration-200">Política de Privacidad</a>
                <a href="#" class="text-gray-300 hover:text-blue-400 transition-colors duration-200">Contacto</a>
            </nav>
        </div>
    </footer>
</template>

<script setup>
    import { computed } from 'vue';

    const currentYear = computed(() => {
        return new Date().getFullYear();
    });
</script>