import { shallowMount } from '@vue/test-utils';
import GroupsTables from '@components/common/GroupsTables.vue';

import { 
    mockGroupsData, 
    StatusMessageStub, 
    HeaderSubtitleStub 
} from '../fixtures/data';

const teamsStoreMock = {
    loading: false, 
    allGroups: {},
};

jest.mock('@store/teamsStore.js', () => ({
    useTeamsStore: jest.fn(() => teamsStoreMock),
}));

import { useTeamsStore } from '@store/teamsStore.js';

const mockRouter = {
    push: jest.fn(),
};

jest.mock('vue-router', () => ({
    useRouter: () => mockRouter,
}));

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