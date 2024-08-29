import { useState } from "react";
import "./App.css";
import dice1 from "./images/dice_1.png";
import dice2 from "./images/dice_2.png";
import dice3 from "./images/dice_3.png";
import dice4 from "./images/dice_4.png";
import dice5 from "./images/dice_5.png";
import dice6 from "./images/dice_6.png";

const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

export default function App() {
  const [showRules, setShowRules] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedNo, setSelectedNo] = useState(null);
  const [dice, setDice] = useState(1);
  const [noSelection, setNoSelection] = useState(false);

  function resetScore() {
    setScore(0);
    setDice(1);
    setSelectedNo(null);
  }
  function handleSelectedNo(selected) {
    setSelectedNo(selected === selectedNo ? null : selected);
  }

  function handleSetDice() {
    const randomized = Math.floor(Math.random() * 6) + 1;
    if (selectedNo) {
      setDice(randomized);
      setNoSelection(false);
      selectedNo === randomized
        ? setScore(score + selectedNo)
        : setScore(score < 2 ? 0 : score - 2);
    } else {
      setNoSelection(true);
    }
  }

  function handleShowRules() {
    showRules === false ? setShowRules(true) : setShowRules(false);
  }
  return (
    <div className="App">
      <SelectionAndScore
        score={score}
        handleSelectedNo={handleSelectedNo}
        selectedNo={selectedNo}
        noSelection={noSelection}
      />
      <DiceGame
        handleShowRules={handleShowRules}
        showRules={showRules}
        resetScore={resetScore}
        handleSetDice={handleSetDice}
        dice={dice}
      />
      {showRules && <HowToPlay />}
    </div>
  );
}

function SelectionAndScore({
  score,
  handleSelectedNo,
  selectedNo,
  noSelection,
}) {
  return (
    <div className="selection-container">
      <div className="total-score">
        <h1>{score}</h1>
        <p>Total Score</p>
      </div>
      <div className="selections">
        {noSelection ? (
          <div className="no-selection">
            <p>You have not selected any number</p>
          </div>
        ) : (
          ""
        )}
        <div className="buttons">
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <button
              key={number}
              className={`selection-button ${
                selectedNo === number ? "selected" : ""
              }`}
              onClick={() => handleSelectedNo(number)}
            >
              {number}
            </button>
          ))}
        </div>
        <p>
          <strong>Select Number</strong>
        </p>
      </div>
    </div>
  );
}

function DiceGame({
  showRules,
  handleShowRules,
  resetScore,
  dice,
  handleSetDice,
}) {
  return (
    <div className="dice-game">
      <img
        src={diceImages[dice - 1]}
        alt="dice"
        onClick={handleSetDice}
      />
      <h2>
        <strong>Click on Dice to roll</strong>
      </h2>
      <button className="dice-button" onClick={resetScore}>
        Reset Score
      </button>
      <button className="dice-button black-button" onClick={handleShowRules}>
        {showRules ? "Hide Rules" : "Show Rules"}
      </button>
    </div>
  );
}

function HowToPlay() {
  return (
    <div className="how-to-play">
      <h2>
        <strong>How to play dice game</strong>
      </h2>
      <p>Select any number</p>
      <p>Click on dice image</p>
      <p>
        after click on dice if selected number is equal to dice number you will
        get same point as dice
      </p>
      <p>if you get wrong guess then 2 point will be dedcuted </p>
    </div>
  );
}
