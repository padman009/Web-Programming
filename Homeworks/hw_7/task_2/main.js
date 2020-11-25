// setInterval(function(){

// }, 100);//for adaptive

document.getElementById('textarea').addEventListener('keydown', function(){setTimeout(function(){analyzeText(document.getElementById('textarea').value)}, 200)});

function analyzeText(text){
    if(text.trim() == '')
        return;
    let arr = parse(text);
    let els = ['Characters', 'Words', 'Sentences', 'Paragraphs', 'ReadingTime'];
    for(let id in els){
        id = els[id];
        document.getElementById(id).innerHTML = arr[id];
    }

    let h1 = document.getElementById('TopKeywordText') || document.createElement('h1');
    h1.id = 'TopKeywordText';
    h1.setAttribute('style', 'font-weight: bold;font-size: 50px;margin-bottom: 10px;');
    h1.innerText = 'Top Keywords: ';

    let div = document.getElementById('TopKeyword') || document.createElement('div');
    div.id = 'TopKeyword';
    div.className = 'border container';
    while(div.hasChildNodes()){
        div.removeChild(div.firstChild);
    }

    for(let id in arr['top']){
        let word = document.createElement('h1');
        let b = document.createElement('b');
        b.innerText = id + ': ';
        word.appendChild(b);
        word.innerHTML += arr['top'][id];
        div.appendChild(word);
    }

    document.getElementById('main').appendChild(h1);
    document.getElementById('main').appendChild(div);
}

function parse(text) {
    let arr = {};
    
    let next = `
    `;
    let words = text.toLowerCase().split('').filter(item => next != item).join('').split(/[ «»\.,\-–\+\(\){}\[\]!@#\$%\^&\*\?><\/=]+/).filter(item => item !='');

    arr['Characters'] = text.split("").length;
    arr['Words'] = words.length;
    arr['Sentences'] = text.split(/[.!\?]/).length - 1;
    arr['Paragraphs'] = text.split(new RegExp(`${next}+.`)).length;
    arr['ReadingTime'] = Math.floor((arr['Characters'] / 1000) * 60) + 's';

    words = words.filter(item => item.length > 3 && !item.includes('’'));

    let top = {};
    for(let id in words){
        id = words[id];
        top[id] = top[id] ? top[id] + 1 : 1;
    }

    let topFour = {};
    for(let x=0;x<4;x++){
        let max = ['', 0];
        for(let id in top){
            max = max[1] < top[id] ? [id, top[id]] : max;
        }
        topFour[max[0]] = max[1];
        delete top[max[0]];
    }

    arr['top'] = topFour;

    return arr;
}