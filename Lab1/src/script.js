function sum(x, N) {              // 1
    let s = 0;                    // 2
    for (let i = 0; i < N; i++) { // 3
        s += x[i];                // 4
    }                             // 5
    return s;                     // 6
}                                 // 7

function ReadInt(prompt) {        // 9
                                  // 10
                                  // 11
    return Number.parseInt(prompt, 10) || 0; // 12
}                                 // 13

function main() {                 // 14
    const N = 10;                 // 15
    const a = [1, 3, -5, 0, 4, 6, -1, 9, 3, 2]; // 16

    let m = a[0];                 // 17
    for (let i = 1; i < N; i++) { // 18
        if (m < a[i]) {           // 19
            m = a[i];             // 20
        }                         // 21
    }                             // 22

    console.log(m);               // 23

    let s;                        // 24
    s = sum(a, N);                // 25

    console.log(s);               // 26

    let z = s / m;                // 27
    let k = 0;                    // 28

    for (let i = 0; i < N; i++) { // 29
        if (a[i] > z) {           // 30
            k += a[i];            // 31
        } else {                  // 32
            k -= a[i];            // 33
        }                         // 34
    }                             // 35

    console.log(k);               // 36

    let x, y;                     // 37

    x = ReadInt("4");               // 38
    y = ReadInt("4");               // 39

    s = 0;                        // 40
    while ((x !== 0) && (y !== 0)) { // 41
        x--;                      // 42
        y--;                      // 43
        s += x + y;               // 44
    }                             // 45

    console.log(s);               // 46
}                                 // 47

main();                           // 48