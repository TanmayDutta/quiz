document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz-container');
    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const quizForm = document.getElementById('quiz-form');
    const submitButton = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result');
    const answerContainer = document.getElementById('answer');
    let questions = [];
    let score = 0;
    let questionIndex = 0;

    fetch('/questions')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestion();
        })
        .catch(error => console.error('Error fetching questions:', error));

    function displayQuestion() {
        const currentQuestion = questions[questionIndex];
        if (currentQuestion) {
            questionContainer.textContent = currentQuestion.question;
            optionsContainer.innerHTML = '';
            currentQuestion.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.classList.add('option');
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = 'option';
                radioInput.value = option;
                radioInput.id = `option${index + 1}`;
                const label = document.createElement('label');
                label.htmlFor = `option${index + 1}`;
                label.textContent = index+1 + ". " + option;
                label.addEventListener('click', function() {
                    label.classList.add('clicked');
                });
                optionElement.appendChild(radioInput);
                optionElement.appendChild(label);
                optionsContainer.appendChild(optionElement);
            submitButton.style.display = 'block';
            });
        } else {
            displayScore();
        }
    }

    function checkAnswer() {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (!selectedOption) {
            alert('Please select an option.');
            return;
        }
        const selectedValue = selectedOption.value;
        const currentQuestion = questions[questionIndex];
        const correctAnswer = currentQuestion.answer;

        if (selectedValue === correctAnswer) {
            score++;
            resultContainer.textContent = 'Correct!';
            answerContainer.textContent = correctAnswer;
        } else {
            resultContainer.textContent = 'Incorrect!';
            answerContainer.textContent = 'Correct Answer is: ' + correctAnswer;
        }

        questionIndex++;

        setTimeout(() => {
            resultContainer.textContent = '';
            answerContainer.textContent = '';
            displayQuestion();
        }, 1500);
    }

    function displayScore() {
        quizContainer.innerHTML = `<h2>Quiz finished!</h2><p>Your score: ${score} out of ${questions.length}</p><p>Reload the webpage to restart the test.</p>`;
        quizForm.innerHTML = '';
    }

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        checkAnswer();
    });

});