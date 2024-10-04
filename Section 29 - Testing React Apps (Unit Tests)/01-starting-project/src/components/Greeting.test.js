import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";

describe("Greeting component", () => {
    test('renders Hello World as a text', () => {
        //Arrange
        render(<Greeting />);
    
        const helloWorldElement =  screen.getByText('Hello World!');
        //testing resutl value, here is our case 'helloWorldElement' can be anything. it can be a number, string or like in this case DOM node. 
        expect(helloWorldElement).toBeInTheDocument();
    });

   test('renders "good to see you" if the button was NOT clicked', () => {
        //Arrange
        render(<Greeting />);
    
        const outputElement = screen.getByText('good to see you', {exact: false});
        //testing resutl value, here is our case 'paragraphElement' can be anything. it can be a number, string or like in this case DOM node
        expect(outputElement).toBeInTheDocument();
   });


   test('renders "Changed!" if the button was clicked', () => {
        //Arrange
        render(<Greeting />);
    
        //Act
        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);
    
        //Assert
        const outputElement = screen.getByText('Changed!');
        //testing resutl value, here is our case 'paragraphElement' can be anything. it can be a number, string or like in this case DOM node
        expect(outputElement).toBeInTheDocument();
   });

   test('does not render "good to see you" if the button was clicked', () => { 
       render(<Greeting />);

       //Act 
       const buttonElement = screen.getByRole('button');
       userEvent.click(buttonElement);

       //Assert
       
       //because getByText() returns error if the text is not found.
       //queryByText() will simply retun null if the text is not found.
       const outputElement = screen.queryByText('good to see you', {exact: false});
       expect(outputElement).toBeNull();
   });
});