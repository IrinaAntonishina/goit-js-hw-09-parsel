
const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

let btnActive = false;
let interval = null
  refs.btnStart.addEventListener('click', (evt) => {
    if(btnActive){
        
        return;
    }
    interval = setInterval(() => {
        btnActive = true;
        if(btnActive){
            refs.btnStart.setAttribute('disabled', true)
        }
        const colorBody = getRandomHexColor();
        refs.body.style.backgroundColor = `${colorBody}`;
        
    }, 1000)
    
})

const stop = refs.btnStop.addEventListener('click',() => {
clearInterval(interval);
if(btnActive){
    btnActive = false;
}
if(!btnActive){
    refs.btnStart.removeAttribute('disabled')
}
})