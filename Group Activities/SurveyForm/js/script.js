var body = document.body;
var surveyMainContainer = document.getElementById("surveyMainContainer");
var surveyContainer = document.getElementById("surveyContainer");

var instructions = document.getElementById('instructions');
var thankyou = document.getElementById('thankyou');
var quest_ans = document.getElementById('quest_ans');
var footer = document.getElementById('footer');
var questions = document.querySelectorAll('.question');
var answer = document.getElementById("answer");
var ansList = document.getElementById("answer_list");

// BUTTONS

function start () {
    surveyMainContainer.style.display = "none";
    surveyContainer.style.display = "flex";
    instructions.style.display = "flex";
};

// RATING

var rating = [];
var value = 0;
var p;

function next() {
    if(instructions.style.display === 'flex'){
        instructions.style.display = 'none';
        quest_ans.style.display = "flex";
        questions[0].style.display = "flex";
    } else {
        if(questions[0].style.display === 'flex'){
            value = document.querySelector('#star1 input[name="rating"]:checked');
            if(value !== null){
                rating.push(value.value);
                p = document.createElement("p");
                var str = "⭐".repeat(value.value);
                p.innerHTML = "1: " + str;
                ansList.appendChild(p);
                questions[0].style.display = 'none';
                questions[1].style.display = 'flex';
            }
        }else if(questions[1].style.display === 'flex'){
            value = document.querySelector('#star2 input[name="rating"]:checked');
            if(value !== null){
                rating.push(value.value);
                p = document.createElement("p");
                var str = "⭐".repeat(value.value);
                p.innerHTML = "2: " + str;
                ansList.appendChild(p);
                questions[1].style.display = 'none';
                questions[2].style.display = 'flex';
            }
        }else if(questions[2].style.display === 'flex'){
            value = document.querySelector('#star3 input[name="rating"]:checked');
            if(value !== null){
                rating.push(value.value);
                p = document.createElement("p");
                var str = "⭐".repeat(value.value);
                p.innerHTML = "3: " + str;
                ansList.appendChild(p);
                questions[2].style.display = 'none';
                questions[3].style.display = 'flex';
            }
        }else if(questions[3].style.display === 'flex'){
            value = document.querySelector('#star4 input[name="rating"]:checked');
            if(value !== null){
                rating.push(value.value);
                p = document.createElement("p");
                var str = "⭐".repeat(value.value);
                p.innerHTML = "4: " + str;
                ansList.appendChild(p);
                questions[3].style.display = 'none';
                questions[4].style.display = 'flex';
            }
            console.log(rating);
        }else if(questions[4].style.display === 'flex'){
            value = document.querySelector('#star5 input[name="rating"]:checked');
            if(value !== null){
                rating.push(value.value);
                questions[4].style.display = 'none';
                thankyou.style.display = 'flex';
                answer.style.display = 'none';
                quest_ans.style.justifyContent = "center";
                footer.style.display = "none";
                console.log(rating);
            }
        }
    }
}


