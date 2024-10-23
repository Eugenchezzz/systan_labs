// Предпочтения экспертов
const rankings = [
    [1, 3, 2, 5, 4], // Э1
    [1, 2, 4, 3, 5], // Э2
    [1, 2, 5, 3, 4], // Э3
    [2, 3, 1, 5, 4], // Э4
    [2, 4, 3, 1, 5]  // Э5
];

// Количество альтернатив
const n = 5;

// Инициализация матрицы предпочтений mik
const mik = Array.from({ length: n }, () => Array(n).fill(0));

// Подсчет предпочтений экспертов для каждой пары альтернатив
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (i !== j) {
            let countIoverJ = 0; // Счетчик для случаев, когда i предпочитается j
            for (let expert of rankings) {
                // Если альтернатива i выше j в ранжировании эксперта
                if (expert.indexOf(i + 1) < expert.indexOf(j + 1)) {
                    countIoverJ++;
                }
            }
            mik[i][j] = countIoverJ;
        }
    }
}

// Вывод матрицы предпочтений
console.log("Матрица предпочтений mik:");
for (let row of mik) {
    console.log(row.join(' '));
}

// Применение принципа Кондорсе
let condorcetWinner = null;

for (let i = 0; i < n; i++) {
    let isCondorcet = true;
    for (let j = 0; j < n; j++) {
        if (i !== j && mik[i][j] <= mik[j][i]) {
            isCondorcet = false;
            break;
        }
    }
    if (isCondorcet) {
        condorcetWinner = i + 1;
        break;
    }
}

// Вывод результата
if (condorcetWinner) {
    console.log(`Альтернатива Кондорсе: a${condorcetWinner}`);
} else {
    console.log("Альтернатива Кондорсе отсутствует.");
}
