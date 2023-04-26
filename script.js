const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer-button');
const messageElement = document.getElementById('message');
const hiddenMessage = "CONGRATULATIONS! YOU DID IT!";
const revealedMessage = [];

// Initialize the game
initGame();

async function initGame() {
    // Fetch trivia questions from an API (e.g., Open Trivia Database)
    const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
    const data = await response.json();
    const questions = data.results;

    // Display the first question
    let currentQuestionIndex = 0;
    showQuestion(questions[currentQuestionIndex]);

    // Add event listeners to answer buttons
    answerButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const isCorrect = button.textContent === questions[currentQuestionIndex].correct_answer;
            if (isCorrect) {
                revealNextCharacter();
            }

            // Move on to the next question, or end the game if
