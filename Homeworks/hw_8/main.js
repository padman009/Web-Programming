let start = false;
let submitted = false;
let arr = [];
let name ='';

check();

function check() {
    if(!start){
        quizEnter()
    }else{
        quizQuestions();
    }
}

function quizEnter(){
    let div = document.createElement('div');
    div.id = 'main_page';

    let h1 = document.createElement('h1');
    h1.className = 'header';
    h1.innerText = 'Hello to Quiz App';

    let div1 = document.createElement('div');
    div1.className = 'row';

    let div2 = document.createElement('div');
    div2.className = 'col';

    let input = document.createElement('input');
    input.id = 'name';
    input.className = 'form-control';
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Enter your full name');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('required', '');

    let button = document.createElement('button');
    button.className = 'btn btn-outline-success';
    button.setAttribute('style', 'font-size: 40px; margin-top:-100px');
    button.addEventListener('click',function(){
        if(document.getElementById('name').value.trim() == ''){
            alert('Enter your Name!!!');
            return;
        }
        start = true;
        name = document.getElementById('name').value.split(' ').map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(' ');
        fetch('data.json').then(response => response.text()).then(text => arr = JSON.parse(text))
        setTimeout(check, 100);
    });
    button.innerText = 'ENTER';

    div.appendChild(h1);
    div2.appendChild(input);
    div2.appendChild(button);
    div1.appendChild(div2);
    div.appendChild(div1);

    document.getElementById('main').innerHTML = '';
    document.getElementById('main').appendChild(div);
}

function quizQuestions(){

    document.getElementById('main').innerHTML = '';

    let quiz = document.createElement('div');
    quiz.setAttribute('id', 'quiz_page');

    let header = document.createElement('div');
    header.className = 'header';
    header.innerText = 'Web Development Quiz';
    quiz.appendChild(header);
    
    for(let id in arr){
        let q = arr[id];
        let div = document.createElement('div');
        div.className = 'question';
        div.setAttribute('id', `q${+id+1}`);
        
        let p = document.createElement('p');
        p.className = 'question';
        p.innerText = `Q${+id+1}:${q.question}`;
        
        div.appendChild(p);
        
        let answersArr = shuffle(q.answers);
        for(let answerId in answersArr){
            let div1 = document.createElement('div');
            div1.className = 'form-check';
            div1.setAttribute('onclick', 'this.firstElementChild.click()');
            
            let input = document.createElement('input');
            input.className = 'form-check-input';
            input.setAttribute('type', 'radio');
            input.setAttribute('name', `q${+id+1}`);
            input.setAttribute('id', `answer${+answerId+1}`);
            input.setAttribute('onchange', 'this.nextElementSibling.focus()');
            
            let button = document.createElement('button');
            button.className = 'radio_button btn';
            
            let label = document.createElement('label');
            label.className = `q${+id+1} form-check-label`;
            label.id = `q${+id+1}answer${+answerId+1}`;
            label.innerText = `${String.fromCharCode('a'.charCodeAt(0) + +answerId)}. ${answersArr[answerId]}`;
            
            div1.appendChild(input);
            div1.appendChild(button);
            div1.appendChild(label);
            div.appendChild(div1);
        }
        quiz.appendChild(div);
    }
    let button = document.createElement('button');
    button.className = 'btn btn-success btn-block';
    button.setAttribute('style', 'font-size: 50px;');
    button.setAttribute('onclick', 'submit()');
    button.innerText = 'Submit Answers';

    quiz.appendChild(button);
    quiz.innerHTML += '<br><br><br>';

    document.getElementById('main').appendChild(quiz);
}

function submit(){
    if(submitted){
        alert('You already submitted you answer.')
        return -1;
    }
    let sc=0;
    for(let id in arr){
        let q = arr[id];
        for(let answerId=0;answerId<q.answers.length;answerId++){
            let answer = document.getElementById(`q${+id+1}answer${+answerId+1}`);
            if(answer.innerText.split('. ')[1] == q.answers[0]){
                answer.previousElementSibling.classList.add('right');
                if(answer.parentNode.firstElementChild.checked){
                    sc++;
                }
            }else if(answer.parentNode.firstElementChild.checked){
                answer.previousElementSibling.classList.add('wrong');
            }
            answer.parentNode.firstElementChild.disabled=true;
        }
    }
    let score = document.getElementById('score') || document.createElement('h1');
    score.className = 'header';
    score.id = 'score';
    score.innerText = `${name}\nyou scored: ${sc}/${arr.length}`;

    document.getElementById('quiz_page').appendChild(score);
    submitted = true;
}

function shuffle(arr) {
    let array = [];
    for(let x in arr){
        array.push(arr[x]);
    }
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
