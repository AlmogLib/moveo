export interface CodeBlockData {
  name: string;
  code: string;
  solution: string;
}

const codeBlocks: CodeBlockData[] = [
  {
    name: "Async-Await",
    code: `const fetchData = async () => {
    try {
        // Simulating an asynchronous API call
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: "Async-Await Example Data" });
            // Simulating a 1-second delay
        });

        // Process the data
       
};

// Call the async function
`,
    solution: `const fetchData = async () => {
    try {
        // Simulating an asynchronous API call
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: "Async-Await Example Data" });
            }, 2000); // Simulating a 1-second delay
        });

        // Process the data
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Call the async function
fetchData();`,
  },
  {
    name: "Promise",
    code: `// Create a Promise
= new Promise((resolve, reject) => {
  // Simulate an asynchronous operation
  setTimeout(() => {
    const success = true;

    // Check the condition

      // If successful, resolve the Promise
      resolve("Operation completed successfully!");
    } else {
      // If unsuccessful, reject the Promise
      reject("Operation failed!");
    }
 // Simulate a 4-second delay
});

// Handle the Promise
    // If resolved, log the result
    // If rejected, log the error

myPromise
  .then(() => {

  })
  .catch(() => {

  });`,
    solution: `// Create a Promise
const myPromise = new Promise((resolve, reject) => {
  // Simulate an asynchronous operation
  setTimeout(() => {
    const success = true;

    // Check the condition
    if (success) {
      // If successful, resolve the Promise
      resolve("Operation completed successfully!");
    } else {
      // If unsuccessful, reject the Promise
      reject("Operation failed!");
    }
  }, 2000); // Simulate a 2-second delay
});

// Handle the Promise
    // If resolved, log the result
    // If rejected, log the error
myPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });`,
  },
  {
    name: "Array Manipulation",
    code: `// Sample array of numbers
const numbers = [1, 2, 3, 4, 5];

// Log the original array


// Map: Multiply each element by 2
const doubledNumbers = 
console.log('Doubled Array:', doubledNumbers);

// Filter: Keep only even numbers
const evenNumbers = 
console.log('Even Numbers:', evenNumbers);

// Reduce: Calculate the sum of all elements
const sum = 
console.log('Sum of Numbers:', sum);
`,
    solution: `// Sample array of numbers
const numbers = [1, 2, 3, 4, 5];

// Log the original array
console.log('Original Array:', numbers);

// Map: Multiply each element by 2
const doubledNumbers = numbers.map(num => num * 2);
console.log('Doubled Array:', doubledNumbers);

// Filter: Keep only even numbers
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log('Even Numbers:', evenNumbers);

// Reduce: Calculate the sum of all elements
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log('Sum of Numbers:', sum);
`,
  },
  {
    name: "Event Handling",
    code: `// Get the element with the ID 'myElement'
const myElement = ;
// Define a function to handle the mouseover event
function handleMouseOver(event) {
  // Change the background color to 'lightblue' when the mouse is over the element

}

// Attach the handleMouseOver function to the 'mouseover' event of the element


`,
    solution: `// Get the element with the ID 'myElement'
const myElement = document.getElementById('myElement');

// Define a function to handle the mouseover event
function handleMouseOver(event) {
  // Change the background color to 'lightblue' when the mouse is over the element
  event.target.style.backgroundColor = 'lightblue';
}

// Attach the handleMouseOver function to the 'mouseover' event of the element
myElement.addEventListener('mouseover', handleMouseOver);

`,
  },
];

export default codeBlocks;
