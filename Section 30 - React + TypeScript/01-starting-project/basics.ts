// Primitives: number, string, bollean
// More complex types: arrays, objects, functions
// Funtion types: parameters



// Primitive types

// let age : Number; //we want primitives not Number object
let age : number;

age = 12;

let userName : string | string[]; // union types

userName = 'khalid';

let isInstructor : boolean;

isInstructor = true;

// let hobbies : null; // null is a type

// hobbies = 12;


// More Complex types

let hobbies: string[]; //array types

hobbies = ['Sports', 'Cooking'];


//object type
let person: {
    name: string;
    age: number;
}

person = {
    name: 'Khalid',
    age: 30
}


let people: {
    name: string;
    age: number;
}[];


// Type inference

// let course = 'React - The complete guide';

// course = 1234; // we could have a variable which can store both string and number. In that case we can use union types. iT can be string or number

let course: string | number = 'React - The complete guide';

course = 12341; //now allowed