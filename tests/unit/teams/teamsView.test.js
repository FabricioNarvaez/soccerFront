import { shallowMount } from '@vue/test-utils';
import TeamsView from '@/views/TeamsView.vue';
import { useTeamsStore } from '@store/teamsStore.js';
import { 
  StatusMessageStub, 
  mockTeams, 
  RouterLinkStub 
} from '../fixtures/data';

const mockTeamsStore = {
  loading: false,
  allTeams: [],
  getAllTeams: jest.fn()
};

jest.mock('@store/teamsStore.js', () => ({
  useTeamsStore: jest.fn(() => mockTeamsStore)
}));

describe('TeamsView.vue', () => {

  const mountComponent = (storeState = {}) => {
    useTeamsStore.mockImplementation(() => ({
      ...mockTeamsStore,
      ...storeState,
    }));

    return shallowMount(TeamsView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          StatusMessage: StatusMessageStub,
        }
      },
    });
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display the loading status component when teamsStore.loading is true', () => {
    const wrapper = mountComponent({ loading: true });
    
    const statusMsg = wrapper.findComponent(StatusMessageStub);
    
    expect(statusMsg.exists()).toBe(true);
    expect(statusMsg.props('text')).toBe('Cargando equipos...');
  });

  it('should render the list of teams correctly when data is available', () => {
    const wrapper = mountComponent({ 
      loading: false, 
      allTeams: mockTeams 
    });

    expect(wrapper.findComponent(StatusMessageStub).exists()).toBe(false);

    const teamCards = wrapper.findAll('.group.relative.bg-white');
    expect(teamCards.length).toBe(mockTeams.length);

    const firstTeam = teamCards[0];
    expect(firstTeam.find('h3').text()).toContain('PÁJARO AZUL FC');
    expect(firstTeam.find('img').attributes('src')).toBe('pajaro.webp');
  });

  it('should display "No teams available" message when the list is empty', () => {
    const wrapper = mountComponent({ 
      loading: false, 
      allTeams: [] 
    });

    expect(wrapper.text()).toContain('No hay equipos disponibles en este momento');
  });

  it('should have RouterLink links correctly configured', () => {
    const wrapper = mountComponent({ 
      loading: false, 
      allTeams: [mockTeams[0]] 
    });

    const link = wrapper.findComponent(RouterLinkStub);
    expect(link.props('to').path).toBe('/equipo/General');
    expect(link.props('to').query.id).toBe(mockTeams[0]._id);
  });

  it('should call getAllTeams on mount if the list is empty', () => {
    const getAllTeamsSpy = jest.fn();
    mountComponent({ 
      allTeams: [], 
      getAllTeams: getAllTeamsSpy 
    });

    expect(getAllTeamsSpy).toHaveBeenCalled();
  });
});