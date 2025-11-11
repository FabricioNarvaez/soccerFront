import { shallowMount } from '@vue/test-utils';
import GroupsTables from '@components/common/GroupsTables.vue';

const mockGroupsData = {
    A: [
        { _id: 'A1', name: 'Alpha FC', acronym: 'AFC', shield: 'shield_a1.png', Pts: 10, PG: 3, PE: 1, PP: 0, GF: 10, GC: 5, GD: 5 }, // Pos 1 (Champions)
        { _id: 'A2', name: 'Beta United', acronym: 'BUT', shield: 'shield_a2.png', Pts: 7, PG: 2, PE: 1, PP: 1, GF: 8, GC: 4, GD: 4 }, // Pos 2 (Champions)
        { _id: 'A3', name: 'Gamma Rovers', acronym: 'GRV', shield: 'shield_a3.png', Pts: 4, PG: 1, PE: 1, PP: 2, GF: 3, GC: 6, GD: -3 }, // Pos 3 (UEFA)
        { _id: 'A4', name: 'Delta Kings', acronym: 'DKG', shield: 'shield_a4.png', Pts: 1, PG: 0, PE: 1, PP: 3, GF: 2, GC: 8, GD: -6 }, // Pos 4 (No clasifica)
    ],
    B: [
        { _id: 'B1', name: 'Epsilon FC', acronym: 'EFC', shield: 'shield_b1.png', Pts: 12, PG: 4, PE: 0, PP: 0, GF: 15, GC: 3, GD: 12 },
    ]
};

const teamsStoreMock = {
    loading: false, 
    allGroups: {}, // Usamos el nombre de propiedad del store real
};

jest.mock('@store/teamsStore.js', () => ({
    useTeamsStore: jest.fn(() => teamsStoreMock),
}));

import { useTeamsStore } from '@store/teamsStore.js';

// 2. Mock de Vue Router
const mockRouter = {
    push: jest.fn(),
};

jest.mock('vue-router', () => ({
    useRouter: () => mockRouter,
}));

// 3. Stubs para componentes hijos
const StatusMessageStub = {
    name: 'StatusMessage',
    props: ['text'],
    template: '<div class="status-message-mock">{{ text }}</div>'
};

const HeaderSubtitleStub = {
    name: 'HeaderSubtitle',
    props: ['subtitle'],
    template: '<header-subtitle-mock>{{ subtitle }}</header-subtitle-mock>'
};

describe('GroupsTables', () => {

    const mountComponent = (storeState = {}, props = {}) => {
        useTeamsStore.mockImplementation(() => ({
            ...teamsStoreMock,
            ...storeState,
        }));

        return shallowMount(GroupsTables, {
            props,
            global: {
                stubs: {
                    HeaderSubtitle: HeaderSubtitleStub,
                    StatusMessage: StatusMessageStub, 
                }
            },
        });
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the loading message when teamsStore.loading is true', () => {
        const wrapper = mountComponent({ loading: true, allGroups: {} });
        const loadingMessage = wrapper.findComponent(StatusMessageStub); 
        
        expect(loadingMessage.exists()).toBe(true);
        expect(loadingMessage.props('text')).toBe('Cargando Tablas de clasificación...');
    });

    it('renders the "no data" message when no groups data is available and not loading', () => {
        const wrapper = mountComponent({ loading: false, allGroups: {} });
        const noDataMessage = wrapper.findComponent(StatusMessageStub); 
        
        expect(noDataMessage.exists()).toBe(true);
        expect(noDataMessage.props('text')).toBe('Las tablas de clasificaciones aún no están definidas.');
    });

    it('renders HeaderSubtitle and minimal table structure in isSmallTable mode', () => {
        const wrapper = mountComponent(
            { 
                loading: false,
                groupA: mockGroupsData.A,
                groupB: mockGroupsData.B
            },
            { isSmallTable: true, isBigTable: false }
        );

        const header = wrapper.findComponent(HeaderSubtitleStub);
        expect(header.exists()).toBe(true);
        expect(header.props('subtitle')).toBe('Clasificaciones');
        
        const groupTitles = wrapper.findAll('h3');
        expect(groupTitles.length).toBe(2);
        expect(groupTitles[0].text()).toContain('Grupo A');
        expect(groupTitles[1].text()).toContain('Grupo B');
        
        const rowsA = wrapper.findAll('table').at(0).findAll('tr');
        expect(rowsA.length).toBe(5);
        
        const alphaRow = rowsA.at(1);
        
        expect(alphaRow.findAll('td').at(2).text()).toBe('4'); 
        expect(alphaRow.findAll('td').at(3).text()).toBe('5');
        expect(alphaRow.findAll('td').at(4).text()).toBe('10'); 

        expect(alphaRow.html()).not.toContain('PG');
    });
    
    it('does NOT call router.push when clicking row in isSmallTable mode', async () => {
        const wrapper = mountComponent(
            { 
                loading: false,
                groupA: mockGroupsData.A,
                groupB: mockGroupsData.B
            },
            { isSmallTable: true, isBigTable: false }
        );

        const firstRow = wrapper.findAll('table').at(0).findAll('tr').at(1);
        await firstRow.trigger('click');

        expect(mockRouter.push).not.toHaveBeenCalled();
    });


    it('renders full table structure and calls router.push on click in isBigTable mode', async () => {
        const wrapper = mountComponent(
            { 
                loading: false,
                groupA: mockGroupsData.A,
                groupB: mockGroupsData.B
            },
            { isSmallTable: false, isBigTable: true }
        );
        
        expect(wrapper.findComponent(HeaderSubtitleStub).exists()).toBe(false);

        const rowsA = wrapper.findAll('table').at(0).findAll('tr');
        const alphaRow = rowsA.at(1);
        
        const tds = alphaRow.findAll('td');
        
        expect(tds.at(2).text()).toBe('4'); 
        
        expect(tds.at(3).text()).toBe('3');
        expect(tds.at(4).text()).toBe('1');
        expect(tds.at(5).text()).toBe('0');
        
        expect(tds.at(8).text()).toBe('5');
        
        await alphaRow.trigger('click');

        expect(mockRouter.push).toHaveBeenCalledWith({
            path: "/equipo/General",
            query: { id: 'A1', name: 'Alpha FC' }
        });
    });

    it('applies correct border colors based on position', () => {
        const wrapper = mountComponent(
            { 
                loading: false,
                groupA: mockGroupsData.A,
                groupB: mockGroupsData.B
            },
            { isSmallTable: false, isBigTable: true }
        );
        
        const rowsA = wrapper.findAll('table').at(0).findAll('tr');
        
        const pos1Cell = rowsA.at(1).find('.border-l-4');
        expect(pos1Cell.classes()).toContain('border-green-500');
        
        const pos3Cell = rowsA.at(3).find('.border-l-4');
        expect(pos3Cell.classes()).toContain('border-orange-500');
    });
});