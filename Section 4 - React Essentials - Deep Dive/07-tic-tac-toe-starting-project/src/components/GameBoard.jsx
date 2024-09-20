import React, { useState } from 'react';

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

const GameBoard = ({onSelectSquare, activePlayerSymbol}) => {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    console.log(activePlayerSymbol);

    function handleSelectSquare(rowIndex, colIndex) {
        //not recommended.
        setGameBoard((prevGameBoard) => {
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
            console.log(updatedBoard[rowIndex][colIndex]);
            return updatedBoard;
        });

        onSelectSquare();
    }


    return (
        <ol id="game-board">
            {gameBoard.map(((row,rowIndex) => 
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) =>
                            <li key={colIndex}>
                                <button onClick={() => handleSelectSquare(rowIndex,colIndex)}>{playerSymbol}</button>
                            </li>
                        )}
                    </ol>
                </li>
            ))}
        </ol>   
    );
};

export default GameBoard;