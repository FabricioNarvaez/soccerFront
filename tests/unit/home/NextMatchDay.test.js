import { shallowMount } from '@vue/test-utils';

import NextMatchDay from '@components/home/NextMatchDay.vue';
import HeaderSubtitle from '@components/common/HeaderSubtitle.vue';

import {
    StatusMessageStub,
    mockUpcomingMatchweek
} from '../fixtures/data';

const matchWeeksStoreMock = {
    loading: false, 
    upcomingMatchweek: null,
};

jest.mock('@/store/matchWeeksStore', () => ({
    useMatchWeeksStore: jest.fn(() => matchWeeksStoreMock),
}));

import { useMatchWeeksStore } from '@/store/matchWeeksStore';

describe('NextMatchDay', () => {

    const mountComponent = (storeState) => {
        useMatchWeeksStore.mockImplementation(() => ({
            ...matchWeeksStoreMock,
            ...storeState,
        }));

        return shallowMount(NextMatchDay, {
            global: {
                stubs: {
                    HeaderSubtitle: true,
                    StatusMessage: StatusMessageStub, 
                }
            },
        });
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the loading message when teamsStore.loading is true', () => {
        const wrapper = mountComponent({ upcomingMatchweek: null, loading: true });
        const loadingMessage = wrapper.findComponent(StatusMessageStub); 
        
        expect(loadingMessage.exists()).toBe(true);
        expect(loadingMessage.props('text')).toBe('Cargando Próxima Jornada...');
        expect(wrapper.findAll('.match-card').length).toBe(0); 
    });

    it('renders "Las jornadas aún no están definidas" when upcomingMatchweek is null and not loading', () => {
        const wrapper = mountComponent({ upcomingMatchweek: null, loading: false });
        const noDataMessage = wrapper.findComponent(StatusMessageStub); 
        
        expect(noDataMessage.exists()).toBe(true);
        expect(noDataMessage.props('text')).toBe('Las jornadas aún no están definidas');
        expect(wrapper.findAll('.match-card').length).toBe(0);
    });

    it('renders the list of matches when upcomingMatchweek data is available', () => {
        const wrapper = mountComponent({ upcomingMatchweek: mockUpcomingMatchweek, loading: false });

        expect(wrapper.findComponent(StatusMessageStub).exists()).toBe(false);

        const matchCards = wrapper.findAll('.match-card');
        expect(matchCards.length).toBe(2);

        const firstMatch = matchCards[0];
        
        expect(firstMatch.find('p.truncate').text()).toBe('Equipo Local A');
        
        const visitorTeam = firstMatch.findAll('p.truncate')[1];
        expect(visitorTeam.text()).toBe('Equipo Visitante X');
        
        const footer = firstMatch.find('.bg-gray-100');
        expect(footer.text()).toContain('15/11/2025');
        expect(footer.text()).toContain('20:00');

        const localShield = firstMatch.find(`img[alt="Escudo de Equipo Local A"]`);
        expect(localShield.exists()).toBe(true);
        expect(localShield.attributes('src')).toBe('local_shield_1.png');

        expect(wrapper.findComponent(HeaderSubtitle).exists()).toBe(true);
    });
});