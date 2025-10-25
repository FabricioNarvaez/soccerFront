import { render, screen, fireEvent } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';
import Header from "@components/main/Header.vue";

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
                    RouterLink: { template: '<a><slot /></a>' }, 
                    Icon: true
                }
            }
        });
});

afterEach(() => {
    renderResult.unmount();
});

describe('Header Component', () => {

    test('Should render logo image', () =>{
        const logo = screen.getByAltText('AAPD Logo');
        expect(logo).toBeInTheDocument();
    })
});