let content = [
  {
    question: "Quel mot-clé est utilisé pour déclarer une variable en ES6?",
    answer: {
      a: "var",
      b: "let",
      c: "const",
      d: "let et const",
    },
    correctAnswer: "d",
  },
  {
    question: "Quel methode est utilisée pour ajouter un élément au DOM?",
    answer: {
      a: "appendChild()",
      b: "addElement()",
      c: "createNode()",
      d: "insert()",
    },
    correctAnswer: "a",
  },
  {
    question: "Comment afficher un message dans la console en JavaScript?",
    answer: {
      a: "log.console()",
      b: "console.log()",
      c: "print()",
      d: "write.console()",
    },
    correctAnswer: "b",
  },
  {
    question: "Que renvoie `typeof null` en JavaScript?",
    answer: {
      a: "null",
      b: "object",
      c: "undefined",
      d: "boolean",
    },
    correctAnswer: "b",
  },
];
//create elements html
const section = document.createElement("section");
const container = document.createElement("div");
const title = document.createElement("h1");
const form = document.createElement("form");
const question = document.createElement("p");
const questionList = document.createElement("div");
const valider = document.createElement("input");
const suivant = document.createElement("input");

//add attributes
valider.setAttribute("type", "button");
valider.setAttribute("value", "Valider");
suivant.setAttribute("type", "button");
suivant.setAttribute("value", "Suivant");

//add classes
section.classList.add("wrapper");
container.classList.add("container");
title.classList.add("title");
form.classList.add("card");
question.classList.add("question");
questionList.classList.add("question-list");
valider.classList.add("btn", "valider");
suivant.classList.add("btn", "suivant");

suivant.style.display = "none";

//page structure
document.body.appendChild(section);
section.appendChild(container);
container.append(title, form);
form.append(question, questionList, valider, suivant);

//add content
title.textContent = "Quiz JavaScript";

let currentQuestionIndex = 0;
let score = 0;

function updateContent(index) {
  question.textContent = content[index].question;
  questionList.innerHTML = "";
  const data = content[index];

  for (let key in data.answer) {
    const radioGroup = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");

    input.setAttribute("type", "radio");
    input.setAttribute("name", "answer");
    input.setAttribute("id", key);
    input.setAttribute("value", key);
    input.classList.add("answer");

    label.classList.add("label");
    label.setAttribute("for", key);
    label.textContent = data.answer[key];

    radioGroup.append(input, label);
    questionList.appendChild(radioGroup);
  }
}

updateContent(currentQuestionIndex);

valider.addEventListener("click", () => {
  const selectedAnswer = document.querySelector("input[name='answer']:checked");
  if (!selectedAnswer) return;

  const correctAnswer = content[currentQuestionIndex].correctAnswer;
  const labels = document.querySelectorAll(".label");

  labels.forEach((label) => {
    const input = document.getElementById(label.getAttribute("for"));

    label.style.color = "";
    label.style.backgroundColor = "";

    if (input.checked && input.value === correctAnswer) {
      label.style.backgroundColor = "lightgreen";
      score++;
      valider.disabled = true;
    }
    if (input.checked && input.value !== correctAnswer) {
      label.style.backgroundColor = "#FFB3B3";
    }
  });
  suivant.style.display = "block";
});

suivant.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < content.length) {
    updateContent(currentQuestionIndex);
    valider.disabled = false;

    valider.style.display = "block";
    suivant.style.display = "none";
  } else {
    form.textContent = `Votre score: ${score} / ${content.length}`;
    form.style.fontSize = "30px";
    form.style.textAlign = "center";
  }
});
