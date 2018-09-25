export default class Move {

    constructor(selectedIndex, previousMove, score) {
        this.selectedIndex = selectedIndex;
        this.previousMove = previousMove;
        this.score = score === undefined ? 0 : score;
        this.nextMoves = Array();
        this.logarray = new Array();

        if (this.previousMove) {
            this.previousMove.addNextMove(this);
        }
    }

    setScore(scoreToSet) {
        this.score = scoreToSet;
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
        let bestScore = isLowestWanted ? 100000 : -100000;

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

    propagateBestScore = (depth) => {

        if (depth === undefined) {
            depth = 0;
        }

        if (this.nextMoves.length === 0) {
            return this.score - depth; 
        }

        let sumOfScores = 0;
        this.nextMoves.forEach(move => {
            sumOfScores += move.propagateBestScore(depth+1);
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