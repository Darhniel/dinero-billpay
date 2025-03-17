const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5"
    },
    heading: {
        fontFamily: "DMSansBold",
        fontSize: getNormalizedSizeWithPlatformOffset(16),
        color: "#333",
        marginTop: getNormalizedVerticalSizeWithPlatformOffset(32),
        marginLeft: getNormalizedSizeWithPlatformOffset(24)
    },
    options: {
        flexDirection: "row",
        alignItems: "center",
        gap: getNormalizedSizeWithPlatformOffset(16),
        paddingHorizontal: getNormalizedSizeWithPlatformOffset(16),
        borderRadius: getNormalizedSizeWithPlatformOffset(11),
        borderWidth: getNormalizedSizeWithPlatformOffset(2),
        borderColor: "rgba(0, 0, 0, 0.3)",
        marginHorizontal: "auto",
        width: wp(getWidth(breakpointGroup)),
        height: getNormalizedVerticalSizeWithPlatformOffset(75),
        marginTop: getNormalizedVerticalSizeWithPlatformOffset(32)
    },
    option: {
    },
    texts: {
        gap: getNormalizedVerticalSizeWithPlatformOffset(6)
    },
    textHeading: {
        fontFamily: "DMSansBold"
    },
    textBody: {
        fontFamily: "DMSans",
        width: getNormalizedSizeWithPlatformOffset(200)
    }
});









5. //greet function:
function greet(name) {
    return `Hello, ${name}!`;
}

6. //multiply function
function multiply(a, b = 2) {
    return a * b;
}

7. // sum function
function sum(a, b) {
    return a + b;
}

//Arrow function version
const arrowFunctionSum = (a, b) => a + b;


8. //Function to check if a number is even or odd
function checkEvenOdd(number) {
    return number % 2 === 0 ? "even" : "odd";
}

9. //If-else statement to check if a number is positive, negative, or zero
function checkNumberSign(number) {
    if (number > 0) {
        console.log("Positive");
    } else if (number < 0) {
        console.log("Negative");
    } else {
        console.log("Zero");
    }
}

10. //If-else statement to take score and print grades
function checkGrade(score) {
    if (score >= 90) {
        console.log("A")
    } else if (score >= 80 && score <= 89) {
        console.log("B")
    } else if (score >= 70 && score <= 79) {
        console.log("C")
    } else if (score >= 60 && score <= 69) {
        console.log("D")
    } else {
        console.log("F")
    }
}

11. // If-else statement to compare two numbers
function compareNumbers(a, b) {
    if (a > b) {
        console.log("a is greater");
    } else if (b > a) {
        console.log("b is greater");
    } else {
        console.log("a and b are equal");
    }
}

12. // If-else statement to check if a  person is eligible for a student discount
function eligibleForStudentDiscount(age, studentID) {
    if (age < 18 || studentID === true) {
        console.log("Eligible for discount");
    } else if (age > 18 && studentID === false) {
        console.log("Not eligible for discount");
    }
}

13. // add an element to the array and remove the first element from the array
let numbers = [10, 20, 30, 40, 50];
numbers.push(60)
numbers.shift();
console.log(numbers);

14. // print number of elements of the array to the console
let cities = ['New York', 'London', 'Tokyo', 'Paris']
console.log("The elements in the array are: ", cities.length)

15. // access the second and last element of the array
let fruits = ['apple', 'banana', 'orange', 'mango'];
console.log(fruits[1])
console.log(fruits[fruits.length - 1])

16. //Using `forEach` to log each element of an array
const array = [1, 2, 3, 4, 5];
array.forEach(element => console.log(element));

17. // for loop that prints numbers from 1 to 10
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

18. // for loop that calculates and prints the sum of numbers from 1 to 100
let total = 0;
for (let i = 1; i <= 100; i++) {
    total += i;
}

console.log(`The sum of numbers from 1 to 100 is: ${total}`);

19. // for loop to print each element in an array
let arrayOfNumbers = [5, 10, 15, 20, 25];

for (let i = 0; i < arrayOfNumbers.length; i++) {
    console.log(arrayOfNumbers[i]);
};

20. // for loop that prints all even numbers from 1 to 20
for (let i = 2; i <= 20; i += 2) {
    console.log(i);
};

21. // For loop to print the multiplication table of 5
for (let i = 1; i <= 12; i++) {
    console.log(`5 x ${i} = ${5 * i}`);
}

22. // change the text inside the <p> element
function changeText() {
    document.getElementById("message").innerHTML = "Welcome to JavaScript";
};

23. // function to change background color of a <div> with id box to blue when the function is called
function changeBackgroundColor() {
    document.getElementById("box").style.backgroundColor = "blue";
};

24. // code to create a new li element with the text "New Item" and append it to a <ul> element  with the Id ItemList
function createNewElement() {
    let newItem = document.createElement("li");
    newItem.textContent = "New Item";
    let list = document.getElementById("ItemList");
    list.appendChild(newItem);
};

25. // Car class
class Car {
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }

    describe() {
        console.log(`This car is a ${this.brand} ${this.model}`);
    }
}

26. // Person class
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

27. // Animal class and Dog subclass
class Animal {
    makeSound() {
        console.log("Animal sound.");
    }
}

class Dog extends Animal {
    makeSound() {
        console.log("Bark");
    }
}
