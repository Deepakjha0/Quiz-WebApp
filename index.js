var quiz = document.getElementById("quiz")

var correctAnswers = [];

$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz" , function(response){
    console.log(response)
    for( var i = 0 ; i < response.length ; i++ ){
        correctAnswers.push(response[i].answer  );
        var quizQuestionDiv = document.createElement("div");
        quizQuestionDiv.className = "quiz-question"
        var questionElement = document.createElement("h3");
        questionElement.innerText = response[i].question;
        quizQuestionDiv.append(questionElement);
        var options = response[i].options;
        for( var j = 0 ; j < options.length ; j++ ){
            quizQuestionDiv.innerHTML += ` <div class="options" > 
         <label>
            <input type="radio" name = "${response[i].id}" value = "${j + 1}" />
            <span> ${options[j]} </span>
         </label>
        </div> `
        }
        quiz.append(quizQuestionDiv);
        if( i == response.length - 1 ){
            quiz.innerHTML += `
            
            <div id = "btn-wrapper" >
            <button  id = "btn" onclick = "checkResult()" > submit quiz </button>
        </div> `
        }
    }
})

function checkResult(){
    var answers = []
  var checkedInputs = $("input[type=radio]:checked");
 for( var i = 0 ; i < checkedInputs.length ; i++ ){
    answers.push(checkedInputs[i].value)
 }

 var score = 0;

 for( var j = 0 ; j < correctAnswers.length ; j++ ){
     if(answers[j] == correctAnswers[j] ){
        score++;
     }
 }

 $("#score").text(score)
}