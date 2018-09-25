import Move from './Move';

export default class MinMaxPlayer {

    constructor() {
        this.endMoves = Array();
        this.calculations = 0;
        this.currentPath = Array();
    }

    calculateMoves() {
/*
        console.log('training started');
        let emptyBoard = Array(9).fill(null);
        emptyBoard[0] = 'X';
        emptyBoard[1] = 'O';
        emptyBoard[3] = 'X';
        emptyBoard[4] = 'O';
        this._calculateMovesForBoard(emptyBoard);
        console.log('training done');

        console.log('calculating moves started');
        this._calculcateBestMoves(this.firstMove);
        console.log('calculating moves done');
        */
    }

    calculateMoveTree() {
        let emptyBoard = Array(9).fill(null);
        this._calculateMovesForBoard(emptyBoard);
    }

    calculateNext(index) {

        this.currentPath.push(index);

        let currentNode = this.firstMove.findPath(this.currentPath);
        let bestMove = currentNode.getNextBestMove(true);

        this.currentPath.push(bestMove.selectedIndex);
    }

    calculateMovesFindPath() {

        console.log('training started');
        let emptyBoard = Array(9).fill(null);
        this._calculateMovesForBoard(emptyBoard);
        console.log('training done');

        console.log('calculating moves started');
        this._calculcateBestMoves(this.firstMove.findPath([0, 1, 3, 4]));
        console.log('calculating moves done');

    }

    _calculateMovesForBoard(board) {

        this.firstMove = new Move(-1);
        this._calculateMovesRecursive(board, 'O', this.firstMove);
        this.firstMove.propagateBestScore(0);        
    }

    _calculcateBestMoves(initalMove) {
        let nextBestMove = initalMove;
        while (nextBestMove !== null && nextBestMove !== undefined) {
            nextBestMove = nextBestMove.getNextBestMove(false);            
            if (nextBestMove !== null && nextBestMove !== undefined && nextBestMove.selectedIndex !== null) {
                console.log(nextBestMove.selectedIndex);
            }
        }
    }
 
    _calculateMovesRecursive(board, previousPlayer, previousMove) {

        const currentPlayer = previousPlayer === 'O' ? 'X' : 'O';

        const winner = this._calculateWinner(board);

        if (winner) {
            previousMove.setScore(winner === 'X' ? 10 : -10);
            return; // Gewinner steht fest.
        }

        const unfilledSquares = this._calculateUnfilledSquares(board);

        if (unfilledSquares.length === 0) {
            previousMove.setScore(0);
            return; // Unentschieden.
        }

        unfilledSquares.forEach(index => {
            
            const nextBoard = board.slice();
            nextBoard[index] = currentPlayer;

            this._calculateMovesRecursive(nextBoard, currentPlayer, new Move(index, previousMove));
        });
    }

    _calculateUnfilledSquares(board) {

        let unfilledSquares = Array();

        board.forEach((value, index) => {
            if (value === null) {
                unfilledSquares.push(index);
            }
        });

        return unfilledSquares;
    }

    _calculateWinner(board) {
 
        // Zeilen
        if (this._calculateWinnerForIndices(board, 0, 1, 2)) {
            return board[0];
        }

        if (this._calculateWinnerForIndices(board, 3, 4, 5)) {
            return board[3];
        }
        
        if (this._calculateWinnerForIndices(board, 6, 7, 8)) {
            return board[6];
        }
        
        // Spalten
        if (this._calculateWinnerForIndices(board, 0, 3, 6)) {
            return board[0];
        }

        if (this._calculateWinnerForIndices(board, 1, 4, 7)) {
            return board[1];
        }
        
        if (this._calculateWinnerForIndices(board, 2, 5, 8)) {
            return board[2];
        }
        
        // Diagonale
        if (this._calculateWinnerForIndices(board, 0, 4, 8)) {
            return board[0];
        }

        if (this._calculateWinnerForIndices(board, 2, 4, 6)) {
            return board[2];
        }

        return null;
    }

    _calculateWinnerForIndices(board, index1, index2, index3) {
        return board[index1] === board[index2] && board[index2] === board[index3];
    }
}