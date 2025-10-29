const checkPoint = require('../src/point');

describe('checkPoint', () => {
    const R = 5;
    const EPS = 0.001; 

    describe('Класс 1: точка в 1 области', () => {
        test('центр круга', () => {
            const point = new checkPoint(R);
            expect(point.TestPoint(0, 0)).toBe('1 область');
            // Граничные значения
            expect(point.TestPoint(EPS, 0)).toBe('1 область');
            expect(point.TestPoint(-EPS, 0)).toBe('1 область');
            expect(point.TestPoint(0, EPS)).toBe('1 область');
            expect(point.TestPoint(0, -EPS)).toBe('1 область');
        });

        test('ниже линии y = x + R', () => {
            const point = new checkPoint(R);
            expect(point.TestPoint(-2, 2)).toBe('1 область');
            // Граничные значения
            expect(point.TestPoint(-2, 2 - EPS)).toBe('1 область'); 
            expect(point.TestPoint(-2, 2 + EPS)).toBe('1 область'); 
        });

        test('на границе круга (ось Y)', () => {
            const point = new checkPoint(R);
            expect(point.TestPoint(0, R)).toBe('1 область');
            // Граничные значения
            expect(point.TestPoint(0, R - EPS)).toBe('1 область');
            expect(point.TestPoint(0, R + EPS)).toBe('3 область'); // вне круга
        });

        test('на границе круга (ось X)', () => {
            const point = new checkPoint(R);
            expect(point.TestPoint(-R, 0)).toBe('1 область');
            // Граничные значения
            expect(point.TestPoint(-R + EPS, 0)).toBe('1 область');
            expect(point.TestPoint(-R - EPS, 0)).toBe('3 область'); // вне круга
        });
    });

    describe('Класс 2: точка в 2 области', () => {
        test('выше линии y = x + R', () => {
            const point = new checkPoint(R);
            expect(point.TestPoint(-2, 4)).toBe('2 область');
            // Граничные значения
            expect(point.TestPoint(-2, 4 - EPS)).toBe('2 область'); 
            expect(point.TestPoint(-2, 4 + EPS)).toBe('2 область'); // чуть выше
        });

        test('в четвёртом квадранте', () => {
            const point = new checkPoint(R);
            expect(point.TestPoint(3, -4)).toBe('2 область');
            // Граничные значения
            expect(point.TestPoint(3 + EPS, -4)).toBe('2 область');
            expect(point.TestPoint(3 - EPS, -4)).toBe('2 область');
            expect(point.TestPoint(3, -4 + EPS)).toBe('2 область');
            expect(point.TestPoint(3, -4 - EPS)).toBe('2 область');
        });

        test('в четвёртом квадранте, на границе', () => {
            const point = new checkPoint(R);
            expect(point.TestPoint(4, -3)).toBe('2 область');
            // Граничные значения
            expect(point.TestPoint(4 + EPS, -3)).toBe('2 область');
            expect(point.TestPoint(4 - EPS, -3)).toBe('2 область');
            expect(point.TestPoint(4, -3 + EPS)).toBe('2 область');
            expect(point.TestPoint(4, -3 - EPS)).toBe('2 область');
        });
    });

    describe('Класс 3: точка в 3 области', () => {
        test('вне круга, правее', () => {
            const point = new checkPoint(R);
            expect(point.TestPoint(R + EPS, 0)).toBe('3 область');
            // Граничные значения
            expect(point.TestPoint(R, 0)).toBe('1 область'); // на границе
            expect(point.TestPoint(R - EPS, 0)).toBe('1 область'); // внутри
        });

        test('вне круга, выше', () => {
            const point = new checkPoint(R);
            expect(point.TestPoint(0, R + EPS)).toBe('3 область');
            // Граничные значения
            expect(point.TestPoint(0, R)).toBe('1 область');
            expect(point.TestPoint(0, R - EPS)).toBe('1 область');
        });

        test('вне круга, в первом квадранте', () => {
            const point = new checkPoint(R);
            expect(point.TestPoint(4, 4)).toBe('3 область');
            // Граничные значения
            expect(point.TestPoint(4 - EPS, 4 - EPS)).toBe('3 область');
            expect(point.TestPoint(4 + EPS, 4 + EPS)).toBe('3 область');
            expect(point.TestPoint(3.999, 3.999)).toBe('3 область');
        });
    });

    describe('Класс 4: точка на границе между 1 и 2', () => {
        test('на линии y = x + R, относится к 1 области', () => {
            const point = new checkPoint(R);
            expect(point.TestPoint(-1, 4)).toBe('1 область');
            // Граничные значения
            expect(point.TestPoint(-1, 4 - EPS)).toBe('1 область'); // чуть ниже
            expect(point.TestPoint(-1, 4 + EPS)).toBe('2 область'); // чуть выше
        });

        test('ещё одна точка на линии y = x + R', () => {
            const point = new checkPoint(R);
            expect(point.TestPoint(-2.5, 2.5)).toBe('1 область');
            // Граничные значения
            expect(point.TestPoint(-2.5, 2.5 - EPS)).toBe('1 область');
            expect(point.TestPoint(-2.5, 2.5 + EPS)).toBe('2 область');
        });
    });

    describe('Класс 5: точка на границе между 2 и 3', () => {
        test('на границе круга, в четвёртом квадранте', () => {
            const point = new checkPoint(R);
            expect(point.TestPoint(3, -4)).toBe('2 область');
            // Граничные значения
            expect(point.TestPoint(3 + EPS, -4)).toBe('2 область');
            expect(point.TestPoint(3 - EPS, -4)).toBe('2 область');
            expect(point.TestPoint(3, -4 + EPS)).toBe('2 область');
            expect(point.TestPoint(3, -4 - EPS)).toBe('2 область');
        });

        test('на границе круга, во втором квадранте, выше линии', () => {
            const point = new checkPoint(R);
            const x = -3.5355339059327378; 
            const y = 3.5355339059327378;  
            expect(point.TestPoint(x, y)).toBe('2 область');
            // Граничные значения
            expect(point.TestPoint(x + EPS, y)).toBe('2 область');
            expect(point.TestPoint(x - EPS, y)).toBe('2 область');
            expect(point.TestPoint(x, y + EPS)).toBe('2 область');
            expect(point.TestPoint(x, y - EPS)).toBe('2 область'); 
        });
    });
});