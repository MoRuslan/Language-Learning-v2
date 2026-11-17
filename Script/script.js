let easy = [
    ["always", "завжди"],
    ["beautiful", "красивий"],
    ["book", "книга"],
    ["friend", "друг"],
    ["morning", "ранок"],
    ["weather", "погода"],
    ["water", "вода"],
    ["family", "сім'я"],
    ["happiness", "щастя"],
    ["important", "важливий"],
    ["answer", "відповідь"],
    ["freedom", "свобода"],
    ["computer", "комп'ютер"],
    ["language", "мова"],
    ["success", "успіх"],
    ["window", "вікно"],
    ["apple", "яблуко"],
    ["house", "будинок"],
    ["time", "час"],
    ["money", "гроші"]
];
let medium = [
    ["knowledge", "знання"],
    ["journey", "подорож"],
    ["education", "освіта"],
    ["experience", "досвід"],
    ["development", "розвиток"],
    ["science", "наука"],
    ["future", "майбутнє"],
    ["environment", "довкілля"],
    ["decision", "рішення"],
    ["opportunity", "можливість"],
    ["responsibility", "відповідальність"],
    ["behavior", "поведінка"],
    ["confidence", "впевненість"],
    ["achievement", "досягнення"],
    ["solution", "вирішення"],
    ["effort", "зусилля"],
    ["purpose", "мета"]
];
let hard = [
    ["ambiguous", "двозначний"],
    ["resilience", "стійкість"],
    ["inevitable", "неминучий"],
    ["comprehension", "розуміння"],
    ["consequence", "наслідок"],
    ["perseverance", "наполегливість"],
    ["contradiction", "суперечність"],
    ["vulnerability", "вразливість"],
    ["sophisticated", "витончений"],
    ["fluctuation", "коливання"],
    ["abandon", "покинути"],
    ["abundant", "рясний"],
    ["benevolent", "доброзичливий"],
    ["diligent", "старанний"],
    ["ephemeral", "швидкоплинний"],
    ["negligent", "недбалий"],
    ["obscure", "неясний"],
    ["precarious", "ненадійний"],
    ["reluctant", "неохочий"]
];

let words = easy; 
let testWordsCount = 12;
let testWords = [];
let currentIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

let answered = Array(testWordsCount).fill(false);
let userAnswers = Array(testWordsCount).fill("");
let results = Array(testWordsCount).fill(false);

function startTest() {
    shuffleWords();
    currentIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;

    answered = Array(testWords.length).fill(false);
    userAnswers = Array(testWords.length).fill("");
    results = Array(testWords.length).fill(false);

    $("#correctCount").text(0);
    $("#incorrectCount").text(0);
    showWord();
}

$('input[name="difficulty"]').on('change', function() {
    const level = $(this).val();
    if(level === "easy") words = easy;
    else if(level === "medium") words = medium;
    else if(level === "hard") words = hard;
    startTest();
});

function shuffleWords() {
    let shuffledWords = words.slice();
    for (let i = shuffledWords.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let temp = shuffledWords[i];
        shuffledWords[i] = shuffledWords[randomIndex];
        shuffledWords[randomIndex] = temp;
    }
    testWords = shuffledWords.slice(0, testWordsCount);
}

function showWord() {
    $("#word").text(testWords[currentIndex][0]);
    $("#step").text((currentIndex + 1) + "/" + testWords.length);
    $("#translation").val(userAnswers[currentIndex]);
    $("#translation").prop("disabled", answered[currentIndex]);
    $("#message").text("");
    $("#wordCard").removeClass("correct-card incorrect-card");

    if (answered[currentIndex]) {
        if (results[currentIndex]) {
            $("#wordCard").addClass("correct-card");
            $("#message").text("Правильно!");
            $("#message").css("color", "#00bd39");
        } else {
            $("#wordCard").addClass("incorrect-card");
            $("#message").text("Неправильно! Правильна відповідь: " + testWords[currentIndex][1]);
            $("#message").css("color", "#ed3030");
        }
    }

    $("#prevBtn").prop("disabled", currentIndex === 0);
    $("#nextBtn").prop("disabled", currentIndex === testWords.length - 1);
}

function checkAnswer() {
    if (answered[currentIndex]) {
        return;
    }
    let userAnswer = $("#translation").val().trim().toLowerCase();

    if (userAnswer === "") {
        $("#message").text("Введіть переклад слова!");
        $("#message").css("color", "#ed3030");
        return;
    }

    userAnswers[currentIndex] = userAnswer;
    answered[currentIndex] = true;

    let correctTranslation = testWords[currentIndex][1].toLowerCase();

    if (userAnswer === correctTranslation) {
        correctAnswers++;
        results[currentIndex] = true;
        $("#wordCard").addClass("correct-card");
        $("#message").text("Правильно!");
        $("#message").css("color", "#00bd39");
    } else {
        incorrectAnswers++;
        results[currentIndex] = false;
        $("#wordCard").addClass("incorrect-card");
        $("#message").text("Неправильно! Правильна відповідь: " + testWords[currentIndex][1]);
        $("#message").css("color", "#ed3030");
    }
    $("#translation").prop("disabled", true);
    $("#correctCount").text(correctAnswers);
    $("#incorrectCount").text(incorrectAnswers);

    if (correctAnswers + incorrectAnswers === testWords.length) {
        showResult();
    }
}

function showResult() {
    let level;
    if (correctAnswers >= 10) {
        level = "Високий рівень знань!";
    } else if (correctAnswers >= 7) {
        level = "Середній рівень знань!";
    } else {
        level = "Початковий рівень знань!";
    }

    $("#finalScore").text(
        "Правильних відповідей: " + correctAnswers + " з " + testWords.length
    );
    $("#level").text(level);
    $("#resultModal").css("display", "flex");
}

$("#translation").on("input", function() {
    userAnswers[currentIndex] = $(this).val();
});

$("#wordCard").on("click", function() {
    checkAnswer();
});

$("#translation").on("keydown", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

$("#prevBtn").on("click", function() {
    if (currentIndex > 0) {
        currentIndex--;
        showWord();
    }
});

$("#nextBtn").on("click", function() {
    if (currentIndex < testWords.length - 1) {
        currentIndex++;
        showWord();
    }
});

$("#restartBtn").on("click", function() {
    shuffleWords();
    currentIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;

    answered = Array(testWordsCount).fill(false);
    userAnswers = Array(testWordsCount).fill("");
    results = Array(testWordsCount).fill(false);

    $("#correctCount").text(0);
    $("#incorrectCount").text(0);
    $("#resultModal").hide();
    showWord();
});

shuffleWords();
showWord();