const questionBox = document.getElementById("question");
const optionBox  = document.getElementById("option");
const scoreBox = document.getElementById("score");
const loading = document.getElementById("loading");

async function fecthQuestion() {
    loading.style.display = "block";
    questionBox.textContent = "";
    optionBox.innerHTML = "";

    const res = await fetch("https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple");
    const data = await res.json();
    const qData = data.results[0];

    const question = decodeHTML(qData.question);
    const correct = decodeHTML(qData.correct_answer);
    const options = [...qData.incorrect_answers.map(decodeHTML), correct].sort(() =>
    Math.random() - 0.5);

    loading.style.display = "none";
    questionBox.innerHTML = question;

    options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add ("option");
        btn.addEventListener("click", () => checkAnswer(btn, option, correct));
        optionBox.appendChild(btn);
    });
}

function decodeHTML(html){
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;   
}

function checkAnswer (btn, selected, correct){
    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach(option =>{
        option.disabled = true;
        if(option.textContent === correct){
            option.classList.add("correct");
        }else{
            option.classList.add("incorrect");
        }
    });
    var score = 0;
    if (selected === correct){
        score += 10;
    }else{
        score -= 5;
    }

    scoreBox.textContent = `Score : ${score}`;

    setTimeout(() => {
        fecthQuestion()
    }, 1000);
}
fecthQuestion()