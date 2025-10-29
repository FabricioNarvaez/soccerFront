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
                        template: '<a :class="to === \'/\' ? \'router-link-active\' : \'\'"><slot /></a>' 
                     }, 
                    Icon: true
                }
            }
        });
});

afterEach(() => {
    renderResult.unmount();
});

describe('Header Component', () => {

    test('Should render logo image and check initial link state', () =>{
        const logo = screen.getByAltText('AAPD Logo');
        expect(logo).toBeInTheDocument();

        const homeLink = screen.getByText('Inicio');
        expect(homeLink).toHaveClass('router-link-active');
    })
});