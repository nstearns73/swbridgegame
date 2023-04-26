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

            // Move on to the next question, or end the game if there are no more questions
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion(questions[currentQuestionIndex]);
            } else {
                endGame();
            }
        });
    });
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    const incorrectAnswers = [...question.incorrect_answers];

    answerButtons.forEach((button, index) => {
        if (index === correctAnswerIndex) {
            button.textContent = question.correct_answer;
        } else {
            button.textContent = incorrectAnswers.shift();
        }
    });
}

function revealNextCharacter() {
    const nextCharacter = hiddenMessage[revealedMessage.length];
    revealedMessage.push(nextCharacter);
    messageElement.textContent = revealedMessage.join('');
}

function endGame() {
    questionElement.textContent = "Game over!";
    answerButtons.forEach(button => {
        button.disabled = true;
    });
}
