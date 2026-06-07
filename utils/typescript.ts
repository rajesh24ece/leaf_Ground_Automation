//Prmitives;

let message: string;
message = "Hello world";
console.log(message);
let age: number = 75;
let isAdmin: boolean = true;

//Array
let numbers: number[] = [1, 2, 3, 4, 5, 6];
let string: string[] = ["am", "a", "e"];

//Tuples
let person: [string, number] = ["Rajesh", 38];

//Enum
enum Color {
  Red,
  Green,
  Blue,
}
let favColour: Color = Color.Blue;

// ANy (Avoid when possible)
let randomValue: any = 10;
randomValue = "Rajesh";
randomValue = true;

//unknown (Safer than any)
let randomValues: any = 10;
randomValues = "Rajesh";
randomValues = true;

function mess(message: string): void {
  console.log(message);
}

function mess1(message: string): string {
  console.log(message);
  return message;
}

function addNum(a: number, b: number): number {
  const c = a + b;
  return c;
}

function greet(name: string, greeting?: string): string {
  name = "rajesh";
  if (greeting) {
    return `Hi ${name}! ${greeting}`;
  }
  return name;
}

interface User {
  name: string;
  age: number;
  readonly id: number;
  email?: string;
}

let personDetails: User = {
  name: "rajesh",
  age: 35,
  id: 2,
  email: "",
};
