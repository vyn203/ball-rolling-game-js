let game = document.getElementById('game');
let character = document.getElementById('character');
let both = 0;
let counter = 0;
let charMove;
let counterArray = [];

function moveLeft(){
    let characterXpos = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    if(characterXpos > 0){
    character.style.left = characterXpos - 2 + "px"
    }
}

function moveRight(){
    let characterXpos = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    if(characterXpos < 380){
    character.style.left = characterXpos + 2 + "px"
    }
}

document.addEventListener('keydown', function(e){
    if(both == 0){
        both++
        if(e.key == "ArrowLeft"){
           charMove =  setInterval(moveLeft, 1)
        }
        if(e.key == "ArrowRight"){
            charMove = setInterval(moveRight, 1)
        }
    }
});

document.addEventListener('keyup', function(e){
    clearInterval(charMove)
    both = 0
});

var blocks = setInterval(function(){

    let prevBlock_top = 0;
    let prevHole_top = 0;

    let prevBlock = document.getElementById("block"+(counter-1))
    let prevHole = document.getElementById("hole"+(counter-1))

    if(counter > 0){
        prevBlock_top = parseInt(window.getComputedStyle(prevBlock).getPropertyValue('top'))
        prevHole_top = parseInt(window.getComputedStyle(prevHole).getPropertyValue('top'))
    }
    if(prevBlock_top < 400  || counter == 0){
        block = document.createElement('div')
        block.setAttribute('class', "block")
        block.setAttribute('id', "block" + counter)
        block.style.top = prevBlock_top + 100 + "px"

        hole = document.createElement('div')
        hole.setAttribute('class', "hole")
        hole.setAttribute('id', "hole" + counter)
        randomPos = Math.floor(Math.random() * 360)
        hole.style.left = randomPos + "px"
        hole.style.top = prevHole_top + 100 + "px"
        game.appendChild(block)
        game.appendChild(hole)
        counterArray.push(counter)
        counter++
    }

    characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
    characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    drop = 0

    if(characterTop <= 0){
        alert("Game over. Score: " + (counter - 9));
        clearInterval(blocks);
        location.reload();
    }

    for(var i=0; i<counterArray.length; i++){
        current = counterArray[i]
        Cblock = document.getElementById('block' + current)
        Chole = document.getElementById('hole' + current)
        Cblock_top = parseFloat(window.getComputedStyle(Cblock).getPropertyValue('top'))
        Chole_left = parseFloat(window.getComputedStyle(Chole).getPropertyValue('left'))
        Cblock.style.top = Cblock_top - 0.5 + 'px'
        Chole.style.top = Cblock_top - 0.5 + 'px'

       if(Cblock_top < -20){
           counterArray.shift()
           Cblock.remove()
           Chole.remove()
       }

       if(Cblock_top-20<characterTop && Cblock_top>characterTop){
            drop++;
            if(Chole_left<=characterLeft && Chole_left+20>=characterLeft)
                drop = 0;
       }
    }

    if(drop==0){
        if(characterTop < 400)
            character.style.top = characterTop + 2 + "px"
    }
        else
            character.style.top = characterTop - 0.5 + "px"

},1)