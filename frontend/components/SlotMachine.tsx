import React, { useState } from 'react';
import styles from '../styles/SlotMachine.module.css';

const SlotMachine: React.FC = () => {
  const [username, setUsername] = useState('');
  const [reel1, setReel1] = useState('C');
  const [reel2, setReel2] = useState('L');
  const [reel3, setReel3] = useState('O');
  const [message, setMessage] = useState('');
  const [credits, setCredits] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  

  const handleRoll = async () => {
    if (!username) {
      alert('Please enter a username');
      return;
    }

    try{

      const response = await fetch('http://localhost:4000/roll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
  
      const result = await response.json();
  
      setIsSpinning(true);
      setMessage('')
      setReel1('')
      setReel2('')
      setReel3('')
  
      setTimeout(() => {
        setReel1(result.reel1);
      }, 1 * 1000);
  
      setTimeout(() => {
        setReel2(result.reel2);
      }, 2 * 1000);
  
      setTimeout(() => {
        setReel3(result.reel3);
  
        setMessage(result.message);
        setCredits(result.credits);
        setIsSpinning(false);
  
      }, 3 * 1000);
    } catch (error) {
        console.error('Error spinning the slot machine:', error);
        setIsSpinning(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{fontSize:'4rem'}}>Jackpot!</h1>
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          style={{ fontSize: '1.5rem', padding: '5px', marginBottom: '20px' }}
        />
      </div>
      <div style={{ fontSize: '2rem', margin: '20px' }}>
        <span 
        className={`${styles.reel} ${isSpinning && styles.spin}`}
        style={{ '--spin-duration': `1s` } as React.CSSProperties}
        >{reel1}</span>
        <span 
        className={`${styles.reel} ${isSpinning && styles.spin}`}
        style={{ '--spin-duration': `2s` } as React.CSSProperties}
        >{reel2}</span>
        <span 
        className={`${styles.reel} ${isSpinning && styles.spin}`}
        style={{ '--spin-duration': `3s` } as React.CSSProperties}
        >{reel3}</span>
      </div>
      <button
        onClick={handleRoll}
        className={styles.roll_btn}
        disabled={isSpinning}
      >
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{message}</p>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Credits: {credits}</p>
    </div>
  );
};

export default SlotMachine;