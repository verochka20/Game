let clicks = 0;
let beginning = 0;

const TIMEOUT = 30000;

const display = document.querySelector('#display');
const button = document.querySelector('#button');
const counter = document.querySelector('#counter');
const bonus = document.querySelector('#bonus');


if (confirm("Собирайте бонусы и зарабытавайте средства")) {
    beginning = 1;
} else {
    counter.textContent = "И чего ты сюда пришёл?";
}

beginning && (button.onclick = start);

function start() {
    const starTime = Date.now();
    let lastclicktime =0;

    display.textContent =  formatTime(TIMEOUT);


    button.onclick  = () => {
        if (Date.now()-lastclicktime<100){
            numBonus=5;
            bonus.textContent = '+5$';
        }
        else{
            lastclicktime=Date.now();
            numBonus=1;
            bonus.textContent = '+1$';

        }
        
        counter.textContent = (clicks+=(numBonus)) + '$';
        lastclicktime=Date.now();
        setTimeout(() => {
            bonus.textContent = '';
        }, 500);
    }

 
    

    const interval = setInterval(() => {
        const delta = Date.now() - starTime;
        display.textContent =  formatTime(TIMEOUT - delta);
    },100);

    const timeout = setTimeout(() =>{
        button.onclick = null;
        display.textContent = 'Вы получили ' + (clicks-1) + ' $';
        counter.textContent ='Игра окончена';

        clearInterval(interval);
        clearTimeout(timeout);
    }, TIMEOUT);
}


function formatTime(ms){
    return Number.parseFloat(ms/1000).toFixed(1);
}



