document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const answerButtons = document.querySelectorAll('.answer-button');
    const messageElement = document.getElementById('message');
    const totalQuestions = 15; // Set this to the desired number of questions
    const hiddenMessage = "TheCodeis6923";
    const revealedMessage = [];
    const questionsLeftElement = document.getElementById('questions-left');
    
    // Initialize the game
    initGame();
    
    async function initGame() {
        const response = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&type=multiple`);
        const data = await response.json();
        const questions = data.results;
    
        // Display the first question
        let currentQuestionIndex = 0;
        showQuestion(questions[currentQuestionIndex]);
        questionsLeftElement.textContent = totalQuestions - currentQuestionIndex;
    
        // Add event listeners to answer buttons
        answerButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const isCorrect = button.textContent === questions[currentQuestionIndex].correct_answer;
                if (isCorrect) {
                    playDingSound(); // Play the ding sound for correct answers
                    revealNextCharacter();
                } else {
                    playBuzzSound(); // Play the buzz sound for incorrect answers
                }
    
                // Move on to the next question, or end the game if the player has answered the specified number of questions
                currentQuestionIndex++;
                if (currentQuestionIndex < totalQuestions) {
                    showQuestion(questions[currentQuestionIndex]);
                    questionsLeftElement.textContent = totalQuestions - currentQuestionIndex; // Update the number of questions left
                } else {
                    endGame();
                }
            });
        });
    }
    
    function showQuestion(question) {
        questionElement.textContent = decodeHtmlEntities(question.question);
        const correctAnswerIndex = Math.floor(Math.random() * 4);
        const incorrectAnswers = [...question.incorrect_answers];
    
        answerButtons.forEach((button, index) => {
            if (index === correctAnswerIndex) {
                button.textContent = decodeHtmlEntities(question.correct_answer);
            } else {
                button.textContent = decodeHtmlEntities(incorrectAnswers.shift());
            }
        });
    }
    
    function playBuzzSound() {
        const buzzSound = document.getElementById('buzz-sound');
        buzzSound.currentTime = 0;
        buzzSound.play();
    }
    
    function playDingSound() {
        const dingSound = document.getElementById('ding-sound');
        dingSound.currentTime = 0;
        dingSound.play();
    }
    
    function decodeHtmlEntities(text) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }
    
    function revealNextCharacter() {
        const nextCharacter = hiddenMessage[revealedMessage.length];
        revealedMessage.push(nextCharacter);
        messageElement.textContent = revealedMessage.join('');
    }
    
    function endGame() {
        questionElement.textContent = "Sorry, Game Over! Refresh to Try Again!";
        answerButtons.forEach(button => {
            button.disabled = true;
        });
    }
});
