import React, { useState } from 'react';

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, colIndex) {
        //not recommended.
        setGameBoard((prevGameBoard) => {
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            prevGameBoard[rowIndex][colIndex] = 'X';
            return updatedBoard;
        });
    }


    return (
        <ol id="game-board">
            {initialGameBoard.map(((row,rowIndex) => 
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