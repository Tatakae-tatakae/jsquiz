let Questions = [];
const ques = document.getElementById("ques");

async function fetchQuestions() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10');
        if (!response.ok) {
            throw new Error("Something went wrong! Unable to fetch the data.");
        }
        const data = await response.json();
        Questions = data.results;
        loadQues();
    } catch (error) {
        console.error(error);
        ques.innerHTML = `<h5 style='color: red'>${error.message}</h5>`;
    }
}

fetchQuestions();

let currQuestion = 0;
let score = 0;

function loadQues() {
    const opt = document.getElementById("opt");
    const currentQuestion = Questions[currQuestion].question.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
    ques.innerHTML = currentQuestion;

    opt.innerHTML = "";
    const correctAnswer = Questions[currQuestion].correct_answer;
    const incorrectAnswers = Questions[currQuestion].incorrect_answers;
    const options = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5);

    options.forEach((option) => {
        const choicesDiv = document.createElement("div");
        const choice = document.createElement("input");
        const choiceLabel = document.createElement("label");

        choice.type = "radio";
        choice.name = "answer";
        choice.value = option;

        choiceLabel.textContent = option;

        choicesDiv.appendChild(choice);
        choicesDiv.appendChild(choiceLabel);
        opt.appendChild(choicesDiv);
    });
}

function loadScore() {
    const totalScore = document.getElementById("score");
    totalScore.textContent = `You scored ${score} out of ${Questions.length}`;
    totalScore.innerHTML += "<h3>All Answers</h3>";
    Questions.forEach((el, index) => {
        totalScore.innerHTML += `<p>${index + 1}. ${el.correct_answer}</p>`;
    });
}

function nextQuestion() {
    if (currQuestion < Questions.length - 1) {
        currQuestion++;
        loadQues();
    } else {
        document.getElementById("opt").remove();
        document.getElementById("ques").remove();
        document.getElementById("btn").remove();
        loadScore();
    }
}

function checkAns() {
    const selectedAns = document.querySelector('input[name="answer"]:checked');
    if (!selectedAns) {
        alert("Please select an answer!");
        return;
    }
    if (selectedAns.value === Questions[currQuestion].correct_answer) {
        score++;
    }
    nextQuestion();
}
