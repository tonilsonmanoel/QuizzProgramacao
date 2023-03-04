// Declaração variáveis

const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container")
const scoreContainer = document.querySelector("#score-container");
const letters= ["a","b","c","d"];
let points = 0;
let actualQuestion = 0;

//Pengutas 

const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
  ]

//Subtituição do quizz para a primeria pergunta 
function init(){
    // criar a primeira pergunta
    createQuestion(0);
}


function createQuestion(i){
     //limpar a questão anterior
     const oldButtons =answersBox.querySelectorAll("button");

     oldButtons.forEach(function(btn){
        btn.remove();
     });
     // Insere as alternativas

     const questionText = question.querySelector("#question-text");
     const questionNumber = question.querySelector("#question-number");

     questionText.textContent = questions[i].question;
     questionNumber.textContent = i +1;

     questions[i].answers.forEach(function(answer,i){
        // criar o template do botão do quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letter = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");


        letter.textContent = letters[i];
        answerText.textContent = answer['answer'];


        answerTemplate.setAttribute("correct-answer", answer["correct"]);
        
        // Remover hide e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // inserir a alternatica na tela

        answersBox.appendChild(answerTemplate);

        // inserir um evento click no botão
        answerTemplate.addEventListener("click",function(){
          checkAnswer(this);
         
        })


     })
     //iNCREMENTAR O NÚMERO DA QUESTÃO
     actualQuestion++;
    
     
}

// Verificando resposta do usuário
function checkAnswer(btn){

  //selecionar todos os botoes
  const buttons = answersBox.querySelectorAll("button");
  // verificar se a resposta esta corre e adicona classe aos botoes
  buttons.forEach(function(button){
    if(button.getAttribute("correct-answer") === "true"){
        
      button.classList.add("correct-answer");
      //checar se usuario acertou a pergunta
      if(btn==button){
        //incremetação dos pontos
        points++;
      }

    } else {
      button.classList.add("wrong-answer");
    }

  });
  

  //Exibir proxima pergunta 
  nextQuestion();
}
 

//Exibir proxima pergunta do quizz
function nextQuestion(){
  //timer para usuario ver as resposta
  setTimeout(function(){
    //verificar se inda ha perguntas
    if(actualQuestion >= questions.length){
      //apresentar a msg de sucesso
      showSucessMessage();
      return;
    }

    createQuestion(actualQuestion);
  },700)
}

//exibir a tela final
function showSucessMessage(){

  hideOrShowQuizz();
  //troca dados da tela de sucesso

  const score = ((points/ questions.length)*100).toFixed(2);

  const displayScore= document.querySelector("#display-score span");

  displayScore.textContent = score.toString();

  //alterar o numero de perguntas corretas
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  //alterar quantidade de perguntas
  const quantQuestions = document.querySelector("#question-qty");
  quantQuestions.textContent = questions.length;

  // reinicar o quizz
  const restart = document.querySelector("#restart");

  restart.addEventListener("click",function(){
    //zerar o jogo
    actualQuestion = 0;
    points=0;
    hideOrShowQuizz();
    init();
  });

  /* Funcionou metodo2
 
  restart.addEventListener("click",function(){
      document.location.reload(true);
  });*/
}

function hideOrShowQuizz(){
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");

}
// inicialização do quizz
init();
  