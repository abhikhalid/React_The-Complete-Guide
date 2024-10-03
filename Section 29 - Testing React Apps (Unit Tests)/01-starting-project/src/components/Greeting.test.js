import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

test('renders Hello World as a text', () => {
    //Arrange
    render(<Greeting />);

    //Act
    // ... nothing

    // Assert

    //now, we have to look into the virtual DOM to see if the text is there
    //screen gives us access to the virtual DOM
    ///we can then use screen to find the element on the screen

    // 'get' functions will throw an error if the element is not found
    // 'query' functions will return null if the element is not found
    // find functions will return a promise



    //exact: true is the default. If set to false,
    //it will match the text even if it is part of a larger string. Case insensitive
    // screen.getByText('Hello World', {exact: false}); 
    

    const helloWorldElement =  screen.getByText('Hello World!');
    //testing resutl value, here is our case 'helloWorldElement' can be anything. it can be a number, string or like in this case DOM node. 
    expect(helloWorldElement).toBeInTheDocument();
});