import { render, screen } from '@testing-library/vue';
import TeamsSwiper from '@components/home/SwiperComponent.vue';

// const mockTeams = [
//     { _id: '1', name: 'Pájaro Azul', shield: 'pajaro.webp' },
//     { _id: '2', name: 'Spencer FC', shield: 'spencer.webp' },
// ];

jest.mock('@store/teamsStore.js', () => {
    const mockUseTeamsStore = jest.fn();
    return { useTeamsStore: mockUseTeamsStore };
});

import { useTeamsStore } from '@store/teamsStore.js';

jest.mock('vue-router', () => ({
    RouterLink: {
        template: '<a :to="to"><slot /></a>',
        props: ['to'],
    },
}));

jest.mock('swiper/vue', () => ({
    Swiper: {
        template: '<div><slot /></div>',
        props: ['modules', 'spaceBetween', 'navigation', 'pagination', 'loop', 'breakpoints'],
    },
    SwiperSlide: {
        template: '<div><slot /></div>',
    },
}));

describe('TeamsSwiper', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should display loading message when teamsStore.loading is true', () => {
        useTeamsStore.mockReturnValue({
            loading: true,
            allTeams: null,
        });

        render(TeamsSwiper);
        
        expect(screen.getByText(/Cargando Equipos\.\.\./i)).toBeInTheDocument();
        expect(screen.queryByText('Pájaro Azul')).not.toBeInTheDocument();
    });

    test('should display "no teams" message when allTeams is empty', () => {
        useTeamsStore.mockReturnValue({
            loading: false,
            allTeams: [],
        });

        render(TeamsSwiper);
        expect(screen.getByText('Aún no hay equipos en el torneo')).toBeInTheDocument();
        expect(screen.queryByText(/Cargando Equipos\.\.\./i)).not.toBeInTheDocument();
    });
});