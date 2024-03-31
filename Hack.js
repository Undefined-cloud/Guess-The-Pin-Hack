// Function to simulate typing a number into a text box
function typeNumber(inputElement, number) {
    inputElement.value = number.toString().padStart(4, '0'); // Ensure 4 digits with leading zeros if needed
    inputElement.dispatchEvent(new Event('input')); // Trigger input event to simulate user input
}

// Function to simulate Enter key press
function pressEnter(inputElement) {
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));
    inputElement.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'Enter' }));
}

// Function to send the guess value to the server
async function sendGuessToServer(guessValue) {
    try {
        const response = await fetch('https://www.guessthepin.com/prg.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `guess=${guessValue}`
        });
        if (response.ok) {
            console.log(`Guess ${guessValue} sent successfully.`);
        } else {
            console.error(`Failed to send guess ${guessValue} to server.`);
        }
    } catch (error) {
        console.error('Error sending guess to server:', error);
    }
}

// Main function to automate typing numbers, pressing Enter, and sending guesses
async function automateTyping() {
    try {
        const textBox = document.getElementById('pin'); // Replace 'pin' with the actual id of your text box element
        if (!textBox) {
            throw new Error('Text box element not found.');
        }

        // Loop to type numbers from 1 to 9999
        for (let i = 1; i <= 9999; i++) {
            typeNumber(textBox, i);
            pressEnter(textBox);
            console.log('Typed number:', i); // Log the number in the console
            await sendGuessToServer(i.toString().padStart(4, '0')); // Send the guess value to the server
            await new Promise(resolve => setTimeout(resolve, 10)); // Short delay between guesses (adjust as needed)
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

// Call the main function to start automation
automateTyping();
