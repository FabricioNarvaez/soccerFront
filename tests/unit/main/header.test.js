import { render, screen, fireEvent } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';
import Header from "@components/main/Header.vue";

global.innerWidth = 1025;

let renderResult;

beforeEach(() => {
    renderResult = render(Header, 
        {
            global: {
                plugins: [
                    createTestingPinia({
                        createSpy: jest.fn,
                        stubActions: true,
                    })
                ],
                stubs: {
                    RouterLink: {
                        props: ['to'],
                        template: '<a role="link" :class="to === \'/\' ? \'router-link-active\' : \'\'"><slot /></a>' 
                     }, 
                    Icon: {
                        props: ['icon'],
                        template: '<span :data-testid="icon" :aria-label="icon.includes(\'list\') ? \'Abrir menú\' : icon.includes(\'cross\') ? \'Cerrar menú\' : icon.includes(\'user\') ? \'Ícono de usuario\' : \'Ícono\'"><slot /></span>'
                    }
                }
            }
        });
});

afterEach(() => {
    renderResult.unmount();
});

describe('Header Component - Desktop', () => {

    test('Should render logo image and check initial link state', () =>{
        const logo = screen.getByAltText('AAPD Logo');
        expect(logo).toBeInTheDocument();

        const homeLink = screen.getByText('Inicio');
        expect(homeLink).toHaveClass('router-link-active');
    });

    test('Should render all static desktop navigation links and login icon', () => {
        screen.getAllByRole('link'); 
        
        expect(screen.getByText('Equipos')).toBeInTheDocument();
        expect(screen.getByText('Clasificación')).toBeInTheDocument();
        expect(screen.getByText('Reglamento')).toBeInTheDocument();
        expect(screen.getByText('Jornadas')).toBeInTheDocument();
        expect(screen.getByText('Galería')).toBeInTheDocument();
        
        const loginLinkMobile = screen.queryByText('Acceder');
        expect(loginLinkMobile).toBeNull();

        const userIconLink = screen.getByRole('link', { name: /acceder a la cuenta/i });
        expect(userIconLink).toBeInTheDocument();
    });
});

describe('Header Component - Mobile', () => {
    beforeAll(() => {
        global.innerWidth = 768; 
    });

    test('Should open and close the mobile menu via hamburger and close button', async () => {
        const menuButton = screen.getByLabelText('menuButton'); 
        expect(screen.queryByRole('navigation', { name: /mobileNav/i })).not.toBeInTheDocument();
        expect(screen.queryByText('Acceder')).toBeNull();

        await fireEvent.click(menuButton);
        
        const mobileNav = screen.getByLabelText('mobileNav');
        expect(mobileNav).toBeVisible(); 
        expect(screen.getByText('Acceder')).toBeInTheDocument(); 

        const closeButton = screen.getByLabelText('closeNavButton'); 
        await fireEvent.click(closeButton);

        expect(screen.queryByRole('navigation', { name: /mobileNav/i })).not.toBeInTheDocument();
        expect(screen.queryByText('Acceder')).toBeNull();
    });

    test('Should close the mobile menu when clicking a navigation link', async () => {
        const menuButton = screen.getByLabelText('menuButton'); 
        await fireEvent.click(menuButton);

        const teamsLink = screen.getByLabelText('Equipos');
        await fireEvent.click(teamsLink);

        expect(screen.queryByRole('navigation', { name: /mobileNav/i })).not.toBeInTheDocument();
    });
});