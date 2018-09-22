
export default class MinMaxPlayer {

    constructor() {
        this.endMoves = Array();
        this.calculations = 0;
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
        this.endMoves.forEach(x => x.propagateBestScore(0));        
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
            this.endMoves.push(new Move(null, previousMove, winner === 'X' ? 10 : -10))
            return; // Gewinner steht fest.
        }

        const unfilledSquares = this._calculateUnfilledSquares(board);

        if (unfilledSquares.length === 0) {
            this.endMoves.push(new Move(null, previousMove, 0));
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
            return board[3];
        }
        
        if (this._calculateWinnerForIndices(board, 2, 5, 8)) {
            return board[6];
        }
        
        // Diagonale
        if (this._calculateWinnerForIndices(board, 0, 4, 8)) {
            return board[0];
        }

        if (this._calculateWinnerForIndices(board, 2, 4, 6)) {
            return board[3];
        }

        return null;
    }

    _calculateWinnerForIndices(board, index1, index2, index3) {
        return board[index1] === board[index2] && board[index2] === board[index3];
    }
}

export class Move {

    constructor(selectedIndex, previousMove, score) {
        this.selectedIndex = selectedIndex;
        this.previousMove = previousMove;
        this.score = score === undefined ? 0 : score;
        this.nextMoves = Array();

        if (this.previousMove) {
            this.previousMove.addNextMove(this);
        }
    }
 
    addNextMove = (move) => {
        this.nextMoves.push(move);
    }

    getNextBestMove = (isLowestWanted) => {

        if (this.nextMoves.length === 0)
        {
            return null;
        }        

        let bestMove;
        let bestScore = isLowestWanted ? 1000 : -1000;

        this.nextMoves.forEach(move => {

            if (isLowestWanted && move.score < bestScore) {
                bestMove = move;
                bestScore = move.score;
            }

            if (!isLowestWanted && move.score > bestScore) {
                bestMove = move;
                bestScore = move.score;
            }
        });

        return bestMove;
    }

    propagateBestScore = (verbose) => {

        if (this.nextMoves.length === 0) {
            return this.score;
        }

        let sumOfScores = 0;
        this.nextMoves.forEach(move => {
            sumOfScores += move.propagateBestScore(verbose);
        });

        this.score = sumOfScores;
        return sumOfScores;
    }

    findPath = (indices) => {

        if (indices.length === 0)
        {
            return this;
        }

        const next = this.nextMoves.find(x => x.selectedIndex === indices[0]);
        if (next === undefined) {
            console.log(`no entry for index ${indices[0]}`);
        }

        return next.findPath(indices.slice(1));
    }
}