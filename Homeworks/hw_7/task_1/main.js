let targetTime = 0;
setInterval(init, 100);

function init(){
    let [width, height] = [0.8 * window.innerWidth,(0.8 * window.innerWidth) * 0.6];

    let canvas = document.getElementsByTagName('canvas')[0];
    canvas.width = width;
    canvas.height = height;
    canvas.style.margin =  `${((window.innerHeight - height - 5) / 2) < 0.1 * window.innerWidth ? (window.innerHeight - height - 5) / 2:0.1 * window.innerWidth}px 0px 0px ${0.1 * window.innerWidth}px`;
    
    let toEnd = calculateTimeToEnd(targetTime);
    setBackground(toEnd['timeToEnd'] <= 0);
    (toEnd['timeToEnd'] <= 0)?afterDown(width, height, canvas):beforeDown(width, height, canvas);
}

function beforeDown(width, height, canvas) {
    let toEnd = calculateTimeToEnd(targetTime);
    
    let digitFontSize = `${height / 5}px Arial`,
        textFontSize = `${height / 12}px Arial`;
    
    let verCenterLine = height / 2;

    let text = 'Countdown to New Year Party !';
    let textWidth = getTextWidth(text, textFontSize);;
    
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.font = textFontSize;
    ctx.fillText(text, (width - textWidth) / 2, verCenterLine * 0.7);
    
    ctx.font = digitFontSize;
    let handleDigit = function(num){
        return (num+'').length < 2?'0'+num:num;
    }
    text = `${toEnd['days']}   ${handleDigit(toEnd['hours'])}  ${handleDigit(toEnd['minutes'])}   ${handleDigit(toEnd['seconds'])}`;
    textWidth = getTextWidth(text, digitFontSize);
    ctx.fillText(text, (width - textWidth) / 2, verCenterLine * 1.3);
    
    textFontSize = `${height / 20}px Arial`;
    ctx.font = textFontSize;
    
    textWidth = getTextWidth('DAYS', textFontSize);
    let x = ((getTextWidth(toEnd['days'], digitFontSize) - textWidth) / 2) +
        ((width - getTextWidth(text, digitFontSize)) / 2),
        y = verCenterLine * 1.5;
    ctx.fillText('DAYS', x, y);
    
    textWidth = getTextWidth('HOURS', textFontSize);
    x = ((getTextWidth(handleDigit(toEnd['hours']), digitFontSize) - textWidth) / 2) + 
        ((width - getTextWidth(text, digitFontSize)) / 2) +
        getTextWidth(text.substring(0, text.indexOf('   ') + 3), digitFontSize);
    ctx.fillText('HOURS', x, y);
    
    textWidth = getTextWidth('MINUTES', textFontSize);
    x = ((getTextWidth(handleDigit(toEnd['minutes']), digitFontSize) - textWidth) / 2) + 
        ((width - getTextWidth(text, digitFontSize)) / 2) +
        getTextWidth(text.substring(0, text.indexOf('  ', text.indexOf('   ') + 3) + 2), digitFontSize);
    ctx.fillText('MINUTES', x, y);
    
    textWidth = getTextWidth('SECONDS', textFontSize);
    x = ((getTextWidth(handleDigit(toEnd['seconds']), digitFontSize) - textWidth) / 2) + 
        ((width - getTextWidth(text, digitFontSize)) / 2) +
        getTextWidth(text.substring(0, text.lastIndexOf('   ') + 3), digitFontSize);
    ctx.fillText('SECONDS', x, y);
}

function afterDown(width, height, canvas) {
    let verCenterLine = height / 2;

    let input = document.getElementById('targetTime') || document.createElement('input');
    if(!document.getElementById('targetTime') || (document.getElementById('targetTime') && document.getElementById('targetTime').style.visibility == 'hidden')){
        input.setAttribute('type', 'date');
        input.setAttribute('id', 'targetTime');
        input.value =  input.value!==''?input.value:`${new Date().getFullYear()}-12-31`;
        input.addEventListener('keypress', (e) => {
            if(e.key == 'Enter') {
                if(input.valueAsNumber >= new Date()){
                    targetTime = input.valueAsNumber;
                    input.style.visibility = 'hidden';
                    init();
                }else {
                    alert('Please enter a date later than the current one!!!');
                }
            }
        });
        
        canvas.parentElement.appendChild(input);
    }
    input.setAttribute('style', `position: absolute;top: ${(verCenterLine * 0.4) + canvas.getBoundingClientRect().y}px;left: ${((width - input.getBoundingClientRect().width) / 2) + canvas.getBoundingClientRect().x}px;`);

    let digitFontSize = `bold ${height / 4}px Arial`,
        textFontSize = `${height / 12}px Arial`;

    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    
    ctx.font = digitFontSize;
    let text = 'D : O : N : E';
    let textWidth = getTextWidth(text,digitFontSize);
    ctx.fillText(text,(width - textWidth) / 2, verCenterLine * 1.2);

    ctx.font = digitFontSize.slice(digitFontSize.indexOf(' '));

    textWidth = getTextWidth('_', digitFontSize);
    let x = ((getTextWidth('D', digitFontSize) - textWidth) / 2) +
        ((width - getTextWidth(text, digitFontSize)) / 2),
        y = verCenterLine * 1.25;
    ctx.fillText('_', x, y);
    
    x = ((getTextWidth('O', digitFontSize) - textWidth) / 2) + 
        ((width - getTextWidth(text, digitFontSize)) / 2) +
        getTextWidth(text.substring(0, text.indexOf('O')), digitFontSize);
    ctx.fillText('_', x, y);
    
    x = ((getTextWidth('N', digitFontSize) - textWidth) / 2) + 
        ((width - getTextWidth(text, digitFontSize)) / 2) +
        getTextWidth(text.substring(0, text.indexOf('N')), digitFontSize);
    ctx.fillText('_', x, y);
    
    x = ((getTextWidth('E', digitFontSize) - textWidth) / 2) + 
        ((width - getTextWidth(text, digitFontSize)) / 2) +
        getTextWidth(text.substring(0, text.indexOf('E')), digitFontSize);
    ctx.fillText('_', x, y);

    textFontSize = `${height / 20}px Arial`;
    ctx.font = textFontSize;
    
    textWidth = getTextWidth('DAYS', textFontSize);
    x = ((getTextWidth('D', digitFontSize) - textWidth) / 2) +
        ((width - getTextWidth(text, digitFontSize)) / 2),
        y = verCenterLine * 1.5;
    ctx.fillText('DAYS', x, y);
    
    textWidth = getTextWidth('HOURS', textFontSize);
    x = ((getTextWidth('O', digitFontSize) - textWidth) / 2) + 
        ((width - getTextWidth(text, digitFontSize)) / 2) +
        getTextWidth(text.substring(0, text.indexOf('O')), digitFontSize);
    ctx.fillText('HOURS', x, y);
    
    textWidth = getTextWidth('MINUTES', textFontSize);
    x = ((getTextWidth('N', digitFontSize) - textWidth) / 2) + 
        ((width - getTextWidth(text, digitFontSize)) / 2) +
        getTextWidth(text.substring(0, text.indexOf('N')), digitFontSize);
    ctx.fillText('MINUTES', x, y);
    
    textWidth = getTextWidth('SECONDS', textFontSize);
    x = ((getTextWidth('E', digitFontSize) - textWidth) / 2) + 
        ((width - getTextWidth(text, digitFontSize)) / 2) +
        getTextWidth(text.substring(0, text.indexOf('E')), digitFontSize);
    ctx.fillText('SECONDS', x, y);
}

function getTextWidth(text, font) {
    let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    let context = canvas.getContext("2d");
    context.font = font;
    let metrics = context.measureText(text);
    return metrics.width;
}

function calculateTimeToEnd(targetTime) {
    let timeToEnd = (targetTime - new Date()) / 1000;
    let day = Math.floor(timeToEnd / 86400), 
        hours = Math.floor((timeToEnd % 86400) / 3600), 
        minutes = Math.floor(((timeToEnd % 86400) % 3600) / 60), 
        seconds = Math.floor(((timeToEnd % 86400) % 3600) % 60);
    let toEnd = {
        'days':day,
        'hours':hours, 
        'minutes':minutes, 
        'seconds':seconds,
        'timeToEnd':timeToEnd
    };
    return toEnd;
}

function setBackground(timeEnd) {
    document.getElementsByTagName('body')[0].style.backgroundColor = timeEnd?'#ef6bab':'#a968ec'
}