// ===============================
// MUSIC QUIZ
// ===============================

const questions = [

    {
        question: "How many basic swaras are commonly used in Indian classical music?",
        options: [
            "5",
            "7",
            "10",
            "12"
        ],
        answer: 1
    },

    {
        question: "Which swara comes after Sa?",
        options: [
            "Ga",
            "Ma",
            "Ri",
            "Pa"
        ],
        answer: 2
    },

    {
        question: "What does Arohanam represent?",
        options: [
            "Descending order of swaras",
            "Ascending order of swaras",
            "Rhythm pattern",
            "Song lyrics"
        ],
        answer: 1
    },

    {
        question: "What does Avarohanam represent?",
        options: [
            "Ascending order of swaras",
            "Tempo of a song",
            "Descending order of swaras",
            "Pitch of Sa"
        ],
        answer: 2
    },

    {
        question: "Which raga is known for the swaras Sa Ri Ga Pa Dha Sa?",
        options: [
            "Mohanam",
            "Kalyani",
            "Bhairavi",
            "Mayamalavagowla"
        ],
        answer: 0
    },

    {
        question: "Which swara comes immediately after Ma?",
        options: [
            "Ga",
            "Pa",
            "Dha",
            "Ni"
        ],
        answer: 1
    },

    {
        question: "Which swara comes immediately before Sa in the ascending scale?",
        options: [
            "Pa",
            "Dha",
            "Ni",
            "Ma"
        ],
        answer: 2
    },

    {
        question: "What is a Raga?",
        options: [
            "A musical framework based on specific swaras",
            "A type of musical instrument",
            "A rhythm instrument",
            "A microphone"
        ],
        answer: 0
    },

    {
        question: "Which of these is a tala-related concept?",
        options: [
            "Rhythm",
            "Pitch",
            "Octave",
            "Frequency"
        ],
        answer: 0
    },

    {
        question: "Which instrument are you learning to play on this website?",
        options: [
            "Veena",
            "Tabla",
            "Harmonium",
            "Flute"
        ],
        answer: 2
    }

];


// ===============================
// VARIABLES
// ===============================

let currentQuestion = 0;
let score = 0;
let answered = false;


// ===============================
// LOAD QUESTION
// ===============================

function loadQuestion() {

    answered = false;

    const questionData = questions[currentQuestion];

    document.getElementById("question").textContent =
        questionData.question;

    document.getElementById("question-number").textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    document.getElementById("score").textContent =
        `Score: ${score}`;


    // Progress
    const progress =
        ((currentQuestion) / questions.length) * 100;

    document.getElementById("progress-bar").style.width =
        progress + "%";


    // Reset feedback
    const feedback =
        document.getElementById("feedback");

    feedback.textContent = "";
    feedback.className = "";


    // Disable next button
    document.getElementById("next-btn").disabled = true;


    // Reset options
    const buttons =
        document.querySelectorAll(".option");

    buttons.forEach((button, index) => {

        button.textContent =
            questionData.options[index];

        button.disabled = false;

        button.classList.remove(
            "correct",
            "wrong"
        );

    });

}


// ===============================
// SELECT ANSWER
// ===============================

function selectAnswer(selectedAnswer) {

    if (answered) {
        return;
    }

    answered = true;

    const questionData =
        questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".option");

    const feedback =
        document.getElementById("feedback");


    // Disable all buttons
    buttons.forEach(button => {
        button.disabled = true;
    });


    // Correct answer
    if (selectedAnswer === questionData.answer) {

        score++;

        buttons[selectedAnswer]
            .classList.add("correct");

        feedback.textContent =
            "✅ Correct! Well done!";

        feedback.className =
            "correct-feedback";

    }

    // Wrong answer
    else {

        buttons[selectedAnswer]
            .classList.add("wrong");

        buttons[questionData.answer]
            .classList.add("correct");

        feedback.textContent =
            `❌ Incorrect! The correct answer is: ${
                questionData.options[questionData.answer]
            }`;

        feedback.className =
            "wrong-feedback";
    }


    document.getElementById("score").textContent =
        `Score: ${score}`;


    // Enable next
    document.getElementById("next-btn").disabled = false;

}


// ===============================
// NEXT QUESTION
// ===============================

function nextQuestion() {

    if (!answered) {
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }

}


// ===============================
// SHOW RESULT
// ===============================

function showResult() {

    document.querySelector(".question-card")
        .style.display = "none";

    document.querySelector(".quiz-top")
        .style.display = "none";

    document.querySelector(".progress-container")
        .style.display = "none";


    const result =
        document.getElementById("result");

    result.style.display = "block";


    document.getElementById("final-score").textContent =
        `Your Score: ${score} / ${questions.length}`;


    let message = "";

    if (score === 10) {

        message =
            "🌟 Perfect score! You really know your music!";

    } else if (score >= 7) {

        message =
            "🎉 Great job! You have a strong understanding of music.";

    } else if (score >= 5) {

        message =
            "👍 Good attempt! Keep learning and practicing.";

    } else {

        message =
            "📖 Keep practicing! Visit the Learn and Ragas pages and try again.";

    }


    document.getElementById("result-message").textContent =
        message;

}


// ===============================
// RESTART QUIZ
// ===============================

function restartQuiz() {

    currentQuestion = 0;
    score = 0;

    document.querySelector(".question-card")
        .style.display = "block";

    document.querySelector(".quiz-top")
        .style.display = "flex";

    document.querySelector(".progress-container")
        .style.display = "block";

    document.getElementById("result")
        .style.display = "none";


    loadQuestion();

}


// ===============================
// START QUIZ
// ===============================

loadQuestion();