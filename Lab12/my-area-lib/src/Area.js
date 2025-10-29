class Area {
    constructor(R) {
        this.R = R;
    }

    IsPointInArea(x, y) {
        if (x * x + y * y > this.R * this.R) {
            return false;
        }

        if (x >= 0) {
            return true;
        }
        
        if ((y >= -x && y >= 0) || (y < -x && y < 0)) {
            return true;
        }

        return false;
    }
}

module.exports = Area;