document.addEventListener("DOMContentLoaded", () => {

  const board = document.querySelector('.game-board');
  const triesEl = document.getElementById('tries');
  const bestEl = document.getElementById('best');

  const images = ['bee.jpg','penguin.jpg','cat.jpg','turtle.jpg'];
  let cards = [...images, ...images];
  cards.sort(() => Math.random() - 0.5);

  let firstCard = null;
  let lockBoard = false;
  let tries = 0;
  let matchedPairs = 0;

  // Crée les cartes
  cards.forEach(img => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<img src="./images/${img}" alt="memory image">`;
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });

  function flipCard() {
    if (lockBoard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');

    if (!firstCard) {
      firstCard = this;
    } else {
      checkMatch(this);
    }
  }

  function checkMatch(secondCard) {
    lockBoard = true;
    tries++;
    triesEl.textContent = tries;

    const firstImg = firstCard.querySelector('img').src;
    const secondImg = secondCard.querySelector('img').src;

    if (firstImg === secondImg) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      matchedPairs++;
      resetTurn();
      if (matchedPairs === images.length) {
        setTimeout(() => {
          alert(`🎉 Vous avez gagné en ${tries} tentatives !`);
          updateBestScore(tries);
          resetGame();
        }, 500);
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetTurn();
      }, 1000);
    }
  }

  function resetTurn() {
    [firstCard, lockBoard] = [null, false];
  }

  function updateBestScore(current) {
    const best = localStorage.getItem('bestScore') || 0;
    if (best === 0 || current < best) {
      localStorage.setItem('bestScore', current);
      bestEl.textContent = current;
    } else {
      bestEl.textContent = best;
    }
  }

  function resetGame() {
    board.innerHTML = '';
    tries = 0;
    triesEl.textContent = tries;
    matchedPairs = 0;
    cards.sort(() => Math.random() - 0.5);
    cards.forEach(img => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `<img src="./images/${img}" alt="memory image">`;
      card.addEventListener('click', flipCard);
      board.appendChild(card);
    });
  }

  
  bestEl.textContent = localStorage.getItem('bestScore') || 0;

});
