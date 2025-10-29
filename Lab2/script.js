
class Trace {
    static enabled = true;
    static indentLevel = 0;
    static indentSize = 2;

    static getIndent() {
        return ' '.repeat(this.indentLevel * this.indentSize);
    }

    static Indent() {
        this.indentLevel++;
    }

    static Unindent() {
        if (this.indentLevel > 0) this.indentLevel--;
    }

    static WriteLine(message) {
        if (this.enabled) {
            console.log(this.getIndent() + message);
        }
    }

    static WriteLineIf(condition, message) {
        if (this.enabled && condition) {
            console.log(this.getIndent() + message);
        }
    }

    static Assert(condition, message = "Assertion failed") {
        if (this.enabled && !condition) {
            console.error(this.getIndent() + `[ASSERTION FAILED] ${message}`);
        }
    }

    static TraceInformation(message) {
        if (this.enabled) {
            console.info(this.getIndent() + `[INFO] ${message}`);
        }
    }
}


function calculateSequenceSum(p, q, x0, x1, n) {
    if (n < 0) {
        throw new Error("n должно быть неотрицательным");
    }

    let sum = 0;
    let xPrev2 = x0;  
    let xPrev1 = x1; 

    Trace.Indent();
    Trace.TraceInformation(`Вычисление суммы первых ${n} элементов последовательности`);
    Trace.WriteLine(`Начальные значения: x0 = ${x0}, x1 = ${x1}, p = ${p}, q = ${q}`);

    if (n === 0) {
        sum = x0;
        Trace.WriteLine(`Сумма = ${sum}`);
        Trace.Unindent();
        return sum;
    }

    if (n === 1) {
        sum = x0 + x1;
        Trace.WriteLine(`Сумма = ${sum}`);
        Trace.Unindent();
        return sum;
    }

    sum = x0 + x1;

    for (let i = 2; i <= n; i++) {
        const xi = p * xPrev1 + q * xPrev2;

        // Проверка арифметического переполнения
        Trace.Assert(
            !isNaN(xi) && isFinite(xi),
            `Арифметическое переполнение при вычислении x${i} = ${xi}`
        );

        sum += xi;

        Trace.WriteLine(`x${i} = ${xi} | Сумма = ${sum}`);

        xPrev2 = xPrev1;
        xPrev1 = xi;
    }

    Trace.WriteLine(`Итоговая сумма = ${sum}`);
    Trace.Unindent();

    return sum;
}

function main() {
    Trace.Indent();

    try {
        // p=2, q=1, x0=1, x1=1, n=5
        const result = calculateSequenceSum(2, 1, 1, 1, 5);
        console.log("РЕЗУЛЬТАТ: " + result);
    } catch (error) {
        console.error("Ошибка:", error.message);
    }

    Trace.Unindent();
}

main();