import React, { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import Card from './Card';
import './styles/MainContent.css';

function MainContent() {
  const animals = [
    'Aardvark',
    'Aardwolf',
    'Addax',
    'African_Civet',
    'African_Elephant',
    'African_Golden_Cat',
    'African_Golden_Wolf',
    'African_Wild_Ass',
    'Aye-aye',
    'Barbary_Sheep',
    'Bat-eared_Fox',
    'Black-backed_Jackal',
    'Black-footed_Cat',
    'Black_Rhino',
    'Black_Wildebeest',
    'Blue_Wildebeest',
    'Bongo',
    'Bonobo',
    'Brown-fur_Seal',
    'Brown_Hyena',
    'Buffalo',
    'Bunyoro_Rabbit',
    'Cape_Fox',
    'Caracal',
    'Cheetah',
    'Chimpanzee',
    'Crested_Porcupine',
    'Dama_Gazelle',
    'Dikdik',
    'Drill',
    'Dromedary',
    'Dugong',
    'Duiker',
    'Dwarf_Lemur',
    'Eland',
    'Elephant_Shrew',
    'Ethiopian_Hare',
    'Ethiopian_Wolf',
    'Falanouc',
    'Fennec',
    'Forest_Hog',
    'Fossa',
    'Four-toed_Hedgehog',
    'Gelada',
    'Gemsbok',
    'Genet',
    'Gerenuk',
    'Giant_Pangolin',
    'Giraffe',
    'Golden_Mole',
    'Gorilla',
    'Greater_Cane_Rat',
    'Greater_Galago',
    'Grevy123s_Zebra',
    'Grysbok',
    'Gundi',
    'Hamadryas_Baboon',
    'Hippo',
    'Hirola',
    'Honey_Badger',
    'Hyrax',
    'Impala',
    'Indri',
    'Kewel',
    'Kob',
    'Kudu',
    'Kusimanse',
    'Lechwe',
    'Leopard',
    'Lion',
    'Long-tailed_Pangolin',
    'Lycaon',
    'Mandrill',
    'Meerkat',
    'Nubian_Ibex',
    'Nyala',
    'Okapi',
    'Olive_Baboon',
    'Oribi',
    'Plains_Zebra',
    'Potto',
    'Pygmy_Hippo',
    'Red-fronted_Gazelle',
    'Red_Hartebeest',
    'Red_River_Hog',
    'Red_Rock_Hare',
    'Red-ruffed_Lemur',
    'Ring-tailed_Lemur',
    'Ring-tailed_Vontsira',
    'Riverine_Rabbit',
    'Sable_Antelope',
    'Sand_Cat',
    'Scimitar-horned_Oryx',
    'Serval',
    'Sitatunga',
    'Slender_Mongoose',
    'Southern_Reedbuck',
    'Sportive_Lemur',
    'Spotted_Hyena',
    'Spotted-necked_Otter',
    'Springbok',
    'Springhare',
    'Steenbok',
    'Striped_Hyena',
    'Striped_Polecat',
    'Thomson123s_Gazelle',
    'Warthog',
    'Waterbuck',
    'Water_Chevrotain',
    'West_African_Manatee',
    'White_Rhino',
  ];
  const [currentScore, setCurrentScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [card1, setCard1] = useState('');
  const [card2, setCard2] = useState('');
  const [card3, setCard3] = useState('');
  const [animalsNotGuessed, setAnimalsNotGuessed] = useState(animals);
  const [animalsGuessed, setAnimalsGuessed] = useState([]);
  const [resultText1, setResultText1] = useState('Sorry :(');
  const [resultText2, setResultText2] = useState('You lost');

  useEffect(() => {
    const cardDivs = document.querySelectorAll('.card-div');
    cardDivs.forEach((cardDiv) => {
      cardDiv.classList.add('showup');
    });
    drawAnimals();
    const storedTopScore = localStorage.getItem('topScore') || 0;
    setTopScore(storedTopScore);
  }, []); // [] makes useEffect to run only once, when the page loads

  useEffect(() => {
    if (animalsNotGuessed.length !== 0) {
      drawAnimals();
    }
  }, [animalsNotGuessed]); //runs when animalsNotGuessed updates

  function drawAnimals() {
    let tmpAnimal1 = animals[Math.floor(Math.random() * animals.length)];
    let tmpAnimal2;
    let tmpAnimal3;
    do {
      tmpAnimal2 = animals[Math.floor(Math.random() * animals.length)];
    } while (tmpAnimal2 === tmpAnimal1);
    do {
      tmpAnimal3 = animals[Math.floor(Math.random() * animals.length)];
    } while (tmpAnimal3 === tmpAnimal1 || tmpAnimal3 === tmpAnimal2);
    // checks if all drawn animals have been guessed yet
    if (
      animalsGuessed.includes(tmpAnimal1) &&
      animalsGuessed.includes(tmpAnimal2) &&
      animalsGuessed.includes(tmpAnimal3)
    ) {
      //chooses random number and assigns random not guessed animal to appropriate tmpAnimal variable
      let index = Math.floor(Math.random() * 3);
      if (index === 1) {
        tmpAnimal1 =
          animalsNotGuessed[
            Math.floor(Math.random() * animalsNotGuessed.length)
          ];
      } else if (index === 2) {
        tmpAnimal2 =
          animalsNotGuessed[
            Math.floor(Math.random() * animalsNotGuessed.length)
          ];
      } else {
        tmpAnimal3 =
          animalsNotGuessed[
            Math.floor(Math.random() * animalsNotGuessed.length)
          ];
      }
    }
    setCard1(tmpAnimal1);
    setCard2(tmpAnimal2);
    setCard3(tmpAnimal3);
  }

  function playRound(selectedAnimal) {
    if (animalsGuessed.includes(selectedAnimal)) {
      setResultText1('Sorry :(');
      setResultText2('You lost');
      messageDisplay();
    } else {
      let tmpScore = currentScore + 1;
      checkScore(tmpScore);
      if (tmpScore !== animals.length) {
        const cardDivs = document.querySelectorAll('.card-div');
        cardDivs.forEach((cardDiv) => {
          cardDiv.classList.add('hidecard');
          cardDiv.classList.add('unclickable');
          cardDiv.classList.remove('showup');
        });
        setTimeout(() => {
          setAnimalsGuessed(animalsGuessed.concat(selectedAnimal));
          setAnimalsNotGuessed(
            animalsNotGuessed.filter((x) => x != selectedAnimal)
          );
          cardDivs.forEach((cardDiv) => {
            cardDiv.classList.remove('hidecard');
            cardDiv.classList.remove('unclickable');
            cardDiv.classList.add('showup');
          });
        }, 1600);
      }
    }
  }

  function checkScore(score) {
    if (score > topScore) {
      setTopScore(score);
      localStorage.setItem('topScore', score);
    }
    setCurrentScore(score);
    if (score === animals.length) {
      setResultText1('Congratulations!!!');
      setResultText2('You won!');
      messageDisplay();
    }
  }

  function tryAgain() {
    const message = document.querySelector(`#game-result-message`);
    message.classList.add('unclickable');
    message.classList.remove('unhide');
    const restartButton = document.querySelector('#restart-game-button');
    restartButton.classList.remove('unclickable');
    const cards = document.querySelectorAll('.card-div');
    cards.forEach((card) => {
      card.classList.remove('unclickable');
    });
    newGame();
  }

  function newGame() {
    setResultText1('');
    setResultText2('');
    setCurrentScore(0);
    const cardDivs = document.querySelectorAll('.card-div');
    cardDivs.forEach((cardDiv) => {
      cardDiv.classList.add('hidecard');
      cardDiv.classList.add('unclickable');
      cardDiv.classList.remove('showup');
    });
    setTimeout(() => {
      cardDivs.forEach((cardDiv) => {
        cardDiv.classList.remove('hidecard');
        cardDiv.classList.remove('unclickable');
        cardDiv.classList.add('showup');
      });

      setAnimalsGuessed([]);
      setAnimalsNotGuessed(animals);
    }, 1600);
  }

  function messageDisplay() {
    const message = document.querySelector(`#game-result-message`);
    message.classList.add('unhide');
    message.classList.remove('unclickable');
    const restartButton = document.querySelector('#restart-game-button');
    restartButton.classList.add('unclickable');
    const cards = document.querySelectorAll('.card-div');
    cards.forEach((card) => {
      card.classList.add('unclickable');
      card.classList.add('hide-card');
    });
  }
  return (
    <div id="main-content">
      <div id="background-image-photo"></div>
      <Scoreboard currentScore={currentScore} topScore={topScore} />
      <div className="card-div" onClick={() => playRound(card1)}>
        <Card value={card1} />
      </div>
      <div className="card-div" onClick={() => playRound(card2)}>
        <Card value={card2} />
      </div>
      <div className="card-div" onClick={() => playRound(card3)}>
        <Card value={card3} />
      </div>
      <button id="restart-game-button" type="button" onClick={newGame}>
        Restart
      </button>
      <div id="game-result-message" className="unclickable">
        <p>{resultText1}</p> <p>{resultText2}</p>
        <button id="try-again-button" type="button" onClick={tryAgain}>
          Try Again
        </button>
      </div>
    </div>
  );
}

export default MainContent;
