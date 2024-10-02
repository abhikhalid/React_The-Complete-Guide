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

//we can define a type and reuse it.
type Person = {
    name: string;
    age: number;
};

//object type
let person: Person

person = {
    name: 'Khalid',
    age: 30
}


let people: Person[];


// Type inference

// let course = 'React - The complete guide';

// course = 1234; // we could have a variable which can store both string and number. In that case we can use union types. iT can be string or number

let course: string | number = 'React - The complete guide';

course = 12341; //now allowed


// Functions and types

function add(a: number, b: number) {
    return a + b;
}

function print(value: any) : void {
    console.log(value);
}


//Generics

function insertAtBeginnig(array: any[], value: any) {
    const newArray = [value, ...array];
    return newArray;
}

const demoArray = [1,2,3];

const updatedArray = insertAtBeginnig(demoArray, -1); // [-1, 1, 2, 3]

updatedArray[0].split(''); //I would get run time error instead. We can use generics to avoid this.