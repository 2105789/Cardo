import { useEffect, useRef } from 'react';
import './Dice.css';

const Dice = () => {
  const diceRef = useRef(null);

  const randomDice = () => {
    const random = Math.floor(Math.random() * 3) + 1;
    rollDice(random);
  };

  const rollDice = (random) => {
    const dice = diceRef.current;
    if (!dice) return;

    dice.style.animation = 'rolling 4s';

    setTimeout(() => {
      switch (random) {
        case 1:
          // Front and back both show 1
          dice.style.transform = Math.random() < 0.5 
            ? 'rotateX(0deg) rotateY(0deg)'      // Front face (1)
            : 'rotateX(180deg) rotateY(0deg)';   // Back face (1)
          break;
        case 2:
          // Bottom and top both show 2
          dice.style.transform = Math.random() < 0.5 
            ? 'rotateX(-90deg) rotateY(0deg)'    // Bottom face (2)
            : 'rotateX(90deg) rotateY(0deg)';    // Top face (2)
          break;
        case 3:
          // Right and left both show 3
          dice.style.transform = Math.random() < 0.5 
            ? 'rotateX(0deg) rotateY(90deg)'     // Right face (3)
            : 'rotateX(0deg) rotateY(-90deg)';   // Left face (3)
          break;
        default:
          break;
      }
      dice.style.animation = 'none';
    }, 4050);
  };

  return (
    <div className="dice-container">
      <div className="dice" ref={diceRef}>
        <div className="face front"></div>
        <div className="face back"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
        <div className="face right"></div>
        <div className="face left"></div>
      </div>
      <button className="roll" onClick={randomDice}>
        Roll Dice
      </button>
    </div>
  );
};

export default Dice; 