import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe('Async component', () => {
   test('renders posts if request succeeds', async () => {
        // Arrange

        window.fetch = jest.fn();
        //mockResolvedValueOnce() it allows us to set a value this fetch function should resolve
        window.fetch.mockResolvedValueOnce({
            json: async () => [{id: 'p1', title: 'First post'}]
        });


        render(<Async />);
        // Act

        // Assert
        //getByRole() will becaue becaue we are printing multiple list items

        //this test will still fail because the fetch request is asynchronous and the component will render before the request is complete.
        // const listItemmElements = screen.getAllByRole('listitem');
        const listItemmElements = await screen.findAllByRole('listitem');
        expect(listItemmElements).not.toHaveLength(0);
    });       
});