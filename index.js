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

let drags = new Set() //set of all active drags
document.addEventListener("touchmove", function(event){
  if(!event.isTrusted)return //don't react to fake touches
  Array.from(event.changedTouches).forEach(function(touch){
    drags.add(touch.identifier) //mark this touch as a drag
  })
})
document.addEventListener("touchend", function(event){
  if(!event.isTrusted)return
  let isDrag = false
  Array.from(event.changedTouches).forEach(function(touch){
    if(drags.has(touch.identifier)){
      isDrag = true
    }
    drags.delete(touch.identifier) //touch ended, so delete it
  })
  if(!isDrag && document.activeElement == document.body){
    //note that double-tap only happens when the body is active
    event.preventDefault() //don't zoom
    event.stopPropagation() //don't relay event
    event.target.focus() //in case it's an input element
    event.target.click() //in case it has a click handler
    event.target.dispatchEvent(new TouchEvent("touchend",event))
    //dispatch a copy of this event (for other touch handlers)
  }
})

document.addEventListener('touchmove', function(event){
    if (event.scale !== 1) event.preventDefault(); //if a scale gesture, don't
  })



