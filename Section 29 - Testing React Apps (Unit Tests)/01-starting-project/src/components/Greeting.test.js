import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

describe("Greeting component", () => {
    test('renders Hello World as a text', () => {
        //Arrange
        render(<Greeting />);
    
        const helloWorldElement =  screen.getByText('Hello World!');
        //testing resutl value, here is our case 'helloWorldElement' can be anything. it can be a number, string or like in this case DOM node. 
        expect(helloWorldElement).toBeInTheDocument();
    });
});