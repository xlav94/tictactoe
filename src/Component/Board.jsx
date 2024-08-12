import React, {useState, useEffect} from 'react';
import Tile from './Tile';
import Modal from './Modal';

import './Board.css'

function Board() {
    const borderStyle = ['tile border-bottom border-right','tile border-bottom border-right',
        'tile border-bottom', 'tile border-bottom border-right', 'tile border-bottom border-right',
        'tile border-bottom', 'tile border-right', 'tile border-right','tile' ];
        
    const winningCombinations = [
            [0, 1, 2], // Ligne du haut
            [3, 4, 5], // Ligne du milieu
            [6, 7, 8], // Ligne du bas
            [0, 3, 6], // Colonne de gauche
            [1, 4, 7], // Colonne du milieu
            [2, 5, 8], // Colonne de droite
            [0, 4, 8], // Diagonale principale
            [2, 4, 6], // Diagonale secondaire
        ];

    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurns, setPlayerTurns] = useState(true);
    const [player, setPlayer] = useState('X');
    const [click , setClick] = useState(true);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const win = checkWin();
        if (win) {
          setClick(false); // Désactiver les clics si un gagnant est trouvé
          setModalMessage(win);
        }
      }, [tiles]); // Recalcule lorsque les tiles changent

    const handleClick = (index) => {
        if (tiles[index] === null){
            const newTurn = playerTurns ? 'X' : 'O';
            const newTiles = [...tiles];
            newTiles[index] = newTurn;
            setTiles(newTiles);
            setPlayerTurns(!playerTurns);

            setPlayer(playerTurns ? 'O' : 'X');
            console.log(checkWin);
        }
    };

    const checkWin = () => {
        for (const [a, b, c] of winningCombinations) {
            if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
                return tiles[a]; // Retourne le gagnant ('X' ou 'O')
            }
        }
        return null; // Retourne null s'il n'y a pas de gagnant
    };

    const title = () => {
        const text = checkWin() === null ?  
        <div className={player === 'X' ? 'x-color' : 'o-color'}> {player}</div>: null;
        return text;
    };

    const restart = () => {
        setTiles(Array(9).fill(null));
        setPlayerTurns(true);
        setPlayer('X');
        setClick(true);
    };

    const closeModal = () => {
        setModalMessage('');
        restart(); // Réinitialise le jeu si désiré
      };
    

  return (
    <div className='board-container'>
        <div className='title'>
            <h1>Tic Tac Toe</h1>
        </div>
        <div className='board'>
            {tiles.map((tile, index)=> 
            <Tile 
            key={index} 
            border={borderStyle[index]} 
            value={tile}
            preview={click? player : null}
            onClick={() => click ? handleClick(index) : null} /> 
            )}
        </div>
        <h1 className='turn'>{title()} &nbsp; turn</h1>
        <button onClick={restart}>Restart</button>
        {modalMessage && <Modal winner={modalMessage} onClose={closeModal} />}
    </div>
    
  )
}

export default Board;
