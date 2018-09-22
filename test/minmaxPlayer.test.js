import { Move} from '../src/minmaxPlayer';

describe('propagateScore', () => {
    it('should propagate score up one level', () => {

        let firstMove = new Move(-1);
        new Move(4, firstMove, -10);
        
        firstMove.propagateBestScore();
        
        expect(firstMove.score).toBe(-10);
    });

    it('should propagate score up two levels', () => {

        let firstMove = new Move(-1);
        let nextMove = new Move(3, firstMove);
        new Move(4, nextMove, -10);

        firstMove.propagateBestScore(true);

        expect(nextMove.score).toBe(-10);
        expect(firstMove.score).toBe(-10);
    });

    it('should propagate scores from two end moves', () => {

        let firstMove = new Move(-1);
        let nextMove = new Move(3, firstMove);
        new Move(4, nextMove, -10);
        new Move(8, nextMove, 10);
        
        firstMove.propagateBestScore();
        
        expect(nextMove.score).toBe(0);
        expect(firstMove.score).toBe(0);
    }); 
});

describe('Move constructor', () => {
    it('should set previous move correctly across multiple levels', () => {

        let firstMove = new Move(-1);
        let nextMove = new Move(3, firstMove);
        let endMove1 = new Move(4, nextMove, -10);
        let endMove2 = new Move(8, nextMove, 10);
        
        expect(endMove1.previousMove).toBe(nextMove);
        expect(endMove2.previousMove).toBe(nextMove);
        expect(nextMove.previousMove).toBe(firstMove);
        expect(firstMove.previousMove).toBe(undefined);
    });
});