// Primitives: number, string, bollean
// More complex types: arrays, objects, functions
// Funtion types: parameters



// Primitive types

// let age : Number; //we want primitives not Number object
let age : number;

age = 12;

let userName : string;

userName = 'khalid';

let isInstructor : boolean;

isInstructor = true;

// let hobbies : null; // null is a type

// hobbies = 12;


// More Complex types

let hobbies: string[];

hobbies = ['Sports', 'Cooking'];

let person; // by default it has any type so we can add any value to it.
//any is a fallback type which you typically should not use.


person = {
    name: 'khalid',
    age: 30
}


//I don;t want to allow any other properties other than name and age, so we have to define the type of person object.
person = {
    isEmployee: true
}