"use strict"

document.addEventListener("DOMContentLoaded", (e) => {
    const switchBtn = document.querySelector('.switch-btn'),
          switchCircle = document.querySelector('.switch-btn_circle'),
          body = document.querySelector('.body'),
          keyboardBtn = document.querySelector('.game__keyboard'),
          gameBtn = document.querySelectorAll('.game__btn'),
          gameWord = document.querySelector('.game__word'),
          lifePlace = document.getElementById('lifeIsGood'),
          winLoseWord = document.getElementById('word'),
          inputNewGame = document.querySelector('.new-game__input'),
          addForm = document.querySelector('.new-game__form'),
          eyeOpen = document.querySelector('.eyeIcon'),
          eyeClose = document.querySelector('.eyeIcon-hiden');

        // Man variables
    const man = document.querySelector('.game__hangman'),
          rope = document.querySelector('.rope'),
          head = document.querySelector('.head'),
          bodyMan = document.querySelector('.figure'),
          handLeft = document.querySelector('.hand-left'),
          handRight = document.querySelector('.hand-right'),
          legLeft = document.querySelector('.leg-left'),
          legRight = document.querySelector('.leg-right');

    // Switch color
    switchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        switchCircle.classList.toggle('active');
        body.classList.toggle('active');
        if (body.classList.contains('active')) {
            localStorage.setItem('theme', 'active');
        } else {
            localStorage.setItem('theme', 'inactive');
        }
    });

    if (localStorage.getItem('theme') === 'active') {
        switchCircle.classList.add('active');
        body.classList.add('active');
    }

    try {

        eyeOpen.addEventListener('click', (e) => {
            eyeClose.classList.remove('active');
            eyeOpen.classList.add('active');
            inputNewGame.type = 'password';
        });
        eyeClose.addEventListener('click', (e) => {
            eyeClose.classList.add('active');
            eyeOpen.classList.remove('active');
            inputNewGame.type = 'text';
        });

        addForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let formInput = document.querySelector('#impact').value;

            const regex = /^[a-zA-Z]+$/;

            const errorForm = document.querySelector('.new-game__error'),
                  errorBtn = document.querySelector('.new-game__btn');
                  
            const wrongMessage = {
                characters: '- Please enter only latin characters.',
                number: '- Maximum number of characters 15.'
            }

            if (!regex.test(formInput) || formInput.length >= 15) {
                errorForm.innerHTML = `<div class="new-game__error mt10">${wrongMessage.characters}</br>${wrongMessage.number}</div>`;
                errorBtn.style.cssText = `margin-top: 50px;`;
                return;
            } 

            localStorage.setItem('inputValue', formInput.toUpperCase());
            document.location.replace('http://localhost:3000/game.html');

        })
       
    } catch {}

    let mainWord = `${localStorage.getItem('inputValue')}`;
    let startLife = 8;
    
    // Keyboard
    try{
        maskWord(mainWord);
        currentlyLifes(startLife);

        keyboardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target && e.target.matches('.game__btn.active')){

                // Doesn't let press the button again

            } else if (e.target && e.target.matches('.game__btn')){
                gameBtn.forEach((item, i) => {
                    if (item == e.target){
                        item.classList.add('active');
                        checkLetter(item.textContent);
                    }
                })
            }
        });
    } catch {}
    

    function maskWord (str){
        for (let i = 0; i < str.length; i++){
            gameWord.textContent += '_';
        }   
    }

    function checkLetter (letter){
        if (mainWord.indexOf(letter) !== -1){
            let position = []; 
            let word = gameWord.textContent;
            let index = mainWord.indexOf(letter);
            while (index !== -1){
                position.push(index);
                index = mainWord.indexOf(letter, index + 1);
            }

            let wordArray = word.split('');
            position.forEach(index => wordArray[index] = letter);
            const newString = wordArray.join('');
            if (newString === mainWord){
                document.location.replace('http://localhost:3000/win.html');
            }
            gameWord.textContent = newString;

        } else { 
            startLife = startLife -1;
            currentlyLifes(startLife);
            switch(startLife){
                case 7:
                    rope.classList.add("show", "down");
                    break;
                case 6:
                    head.classList.add("show", "down");
                    break;
                case 5:
                    bodyMan.classList.add("show", "down");
                    break;
                case 4:
                    handLeft.classList.add("show", "down");
                    break;
                case 3:
                    handRight.classList.add("show", "down");
                    break;
                case 2:
                    legLeft.classList.add("show", "down");
                    break;
                case 1:
                    legRight.classList.add("show", "down");
                    break;
                case 0:
                    document.location.replace('lose.html');
                    wasWord(mainWord);
            }
        }
    }

    function currentlyLifes (num){
        lifePlace.textContent = num;
    }

    function wasWord (word){
        winLoseWord.textContent = word;
    }

    try{
        wasWord(mainWord);
    } catch {}

});