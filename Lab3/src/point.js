
class checkPoint {
    constructor(R) {
        if (R <= 0) {
            throw new Error("R must be > 0");
        }
        this.R = R;
    }   

    #isInCircle(x, y) {
        return Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(this.R, 2)
    }
    #isInCutSector(x, y) {
        const inFourthQuadrant = x > 0 && y < 0;

        const inSecondQuadrant = x < 0 && y > 0 && y > x + this.R;

        return inFourthQuadrant || inSecondQuadrant;
    }
    TestPoint(x, y) {
        if (this.#isInCircle(x, y) && !this.#isInCutSector(x, y)) {
            return '1 область'
        } else if (this.#isInCutSector(x, y)) {
            return '2 область'
        } else {
            return '3 область'
        }
    } 
}

module.exports = checkPoint;