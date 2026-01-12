import { shallowMount } from '@vue/test-utils';
import LastResults from '@components/home/LastResults.vue';

const matchWeeksStoreMock = {
    loading: false,
};

jest.mock('@store/matchWeeksStore', () => ({
    useMatchWeeksStore: jest.fn(() => matchWeeksStoreMock),
}));

import { useMatchWeeksStore } from '@store/matchWeeksStore';

const StatusMessageStub = {
    name: 'StatusMessage',
    props: ['text'],
    template: '<div class="status-message-mock">{{ text }}</div>'
};

describe('LastResults.vue', () => {

    const mountComponent = (storeState = {}) => {
        useMatchWeeksStore.mockImplementation(() => ({
            ...matchWeeksStoreMock,
            ...storeState,
        }));

        return shallowMount(LastResults, {
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

    it('renders the list of matches correctly from the local ref', () => {
        const wrapper = mountComponent({ loading: false });

        expect(wrapper.findComponent(StatusMessageStub).exists()).toBe(false);

        const matches = wrapper.findAll('.flex.items-center.justify-between.p-3');
        expect(matches.length).toBe(3);

        const firstMatch = matches[0];
        expect(firstMatch.text()).toContain('Pájaro Azul FC');
        expect(firstMatch.text()).toContain('Spencer FC');
        
        const scores = firstMatch.findAll('span.text-lg.font-extrabold');
        expect(scores[0].text()).toBe('3');
        expect(scores[1].text()).toBe('1');
    });

    it('applies correct winning/losing colors to scores', () => {
        const wrapper = mountComponent({ loading: false });
        const matches = wrapper.findAll('.flex.items-center.justify-between.p-3');

        const scores1 = matches[0].findAll('span.text-lg.font-extrabold');
        expect(scores1[0].classes()).toContain('text-green-600');
        expect(scores1[1].classes()).toContain('text-red-600');

        const scores2 = matches[1].findAll('span.text-lg.font-extrabold');
        expect(scores2[0].classes()).toContain('text-gray-700');
        expect(scores2[1].classes()).toContain('text-gray-700');

        const scores3 = matches[2].findAll('span.text-lg.font-extrabold');
        expect(scores3[0].classes()).toContain('text-red-600');
        expect(scores3[1].classes()).toContain('text-green-600');
    });

    it('renders team shields with correct attributes', () => {
        const wrapper = mountComponent({ loading: false });
        const firstMatchImg = wrapper.find('img');

        expect(firstMatchImg.exists()).toBe(true);
        expect(firstMatchImg.attributes('alt')).toBe('Pájaro Azul FC');
        expect(firstMatchImg.attributes('src')).toContain('1e40af');
    });

    it('displays finalization text and matchweek info', () => {
        const wrapper = mountComponent({ loading: false });
        expect(wrapper.text()).toContain('Jornada 5 | Finalizado');
    });
});