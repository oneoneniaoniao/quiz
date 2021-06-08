"use strict";

{
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const choices = document.getElementById("choices");
const btn = document.getElementById("btn");
const result = document.getElementById("result");
const scoreLabel = document.querySelector("#result > p");

const quizSet = shuffle([
  {q: '世界で一番大きな湖は？', ans: ['カスピ海', 'カリブ海', '琵琶湖']},
  {q: '2の8乗は？', ans: ['256', '64', '1024']},
  {q: '次のうち、最初にリリースされた言語は？', ans: ['Python', 'JavaScript', 'HTML']},
]);

let currentNum = 0;
let isAnswered;
let score = 0;

function shuffle(arr){
  for (let i = arr.length - 1; i>0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}

function checkAnswer(li){
  if(isAnswered){
    return;
  }
  isAnswered = true;
  if(li.textContent === quizSet[currentNum].ans[0]){
    li.classList.add("correct");
    score++;
  }else{
    li.classList.add("wrong");
    answer.classList.add("visible");
  }
  btn.classList.remove("disabled");
}

function setQuiz(){
  isAnswered = false;
  question.textContent = quizSet[currentNum].q;
  answer.classList.remove("visible");
  answer.textContent = `  ...正解は${quizSet[currentNum].ans[0]}です。`;
  
  while(choices.firstChild){
    choices.removeChild(choices.firstChild);
  }

  const shuffledChoices = shuffle([...quizSet[currentNum].ans]);
  console.log(quizSet[currentNum].ans);
  shuffledChoices.forEach(choice => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener("click", ()=>{
      checkAnswer(li);
    })
    choices.appendChild(li);
  });

  if(currentNum === quizSet.length - 1){
    btn.textContent = "Show Score"
  }
}

setQuiz();

btn.addEventListener("click", ()=>{
  if(btn.classList.contains("disabled")){
return;
  }
  btn.classList.add("disabled");

  if(currentNum === quizSet.length - 1){
    // console.log(`Score: ${score}/${quizSet.length}`);
    scoreLabel.textContent = `Score: ${score}/${quizSet.length}`;
    result.classList.remove("hidden");
  }else{
    currentNum++;
    setQuiz();
  }
});

}