import React from 'react';

import './Modal.css';

function Modal({winner, onClose}) {
    return (
        <div className='modal-overlay'>
          <div className= {`modal-content ${winner === 'X' ? 'x-color' : 'o-color'}`}>
            <h2>{winner} Win!</h2>
            <button onClick={onClose}>New Game</button>
          </div>
        </div>
      );
}

export default Modal
