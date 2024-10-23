// Попарные сравнения экспертов (оценки в долях единицы)
const comparisons = [
    // [Z1-Z2, Z1-Z3, Z1-Z4, Z1-Z5, Z2-Z3, Z2-Z4, Z2-Z5, Z3-Z4, Z3-Z5, Z4-Z5]
    [0.6, 0.5, 0.7, 0.4, 0.5, 0.4, 0.6, 0.3, 0.7, 0.4], // Эксперт 1
    [0.4, 0.6, 0.6, 0.5, 0.5, 0.4, 0.5, 0.4, 0.6, 0.3]  // Эксперт 2
];

// Количество экспертов
const m = comparisons.length;

// Суммируем оценки попарных сравнений для каждого проекта
const totalScores = [0, 0, 0, 0, 0]; // Для Z1, Z2, Z3, Z4, Z5

// Проходим по каждому эксперту
for (let i = 0; i < m; i++) {
    const expert = comparisons[i];

    // Добавляем оценки для каждого проекта
    totalScores[0] += expert[0] + expert[1] + expert[2] + expert[3]; // Z1
    totalScores[1] += (1 - expert[0]) + expert[4] + expert[5] + expert[6]; // Z2
    totalScores[2] += (1 - expert[1]) + (1 - expert[4]) + expert[7] + expert[8]; // Z3
    totalScores[3] += (1 - expert[2]) + (1 - expert[5]) + (1 - expert[7]) + expert[9]; // Z4
    totalScores[4] += (1 - expert[3]) + (1 - expert[6]) + (1 - expert[8]) + (1 - expert[9]); // Z5
}

// Сумма всех оценок
const totalSum = totalScores.reduce((sum, score) => sum + score, 0);

// Вычисляем нормированные веса для каждого проекта
const weights = totalScores.map(score => score / totalSum);

// Выводим нормированные веса и ранжируем проекты
const alternatives = [
    'Бесплатные разговоры внутри сети',
    'Подарки каждому новому абоненту',
    'Льготы тем, кто привел друзей',
    'Телефоны в рассрочку',
    '60 минут звонков на город бесплатно'
];

console.log("Нормированные веса для каждого проекта:");
alternatives.forEach((alt, index) => {
    console.log(`${alt}: ${weights[index].toFixed(4)}`);
});

// Находим наилучшую альтернативу
const bestAlternativeIndex = weights.indexOf(Math.max(...weights));
console.log("\nНаилучшая альтернатива:", alternatives[bestAlternativeIndex]);

// Проверка согласованности оценок экспертов с помощью коэффициента Спирмена
// Функция для вычисления рангов
function rankArray(arr) {
    const sorted = [...arr].sort((a, b) => b - a); // Сортируем по убыванию
    return arr.map(val => sorted.indexOf(val) + 1); // Присваиваем ранги
}

// Ранжируем оценки экспертов
const ranksExpert1 = rankArray(totalScores.map((_, index) => comparisons[0][index]));
const ranksExpert2 = rankArray(totalScores.map((_, index) => comparisons[1][index]));

// Вычисляем коэффициент ранговой корреляции Спирмена
function spearmanCorrelation(rank1, rank2) {
    const n = rank1.length;
    const diffSquaredSum = rank1.reduce((sum, rank, i) => {
        return sum + Math.pow(rank - rank2[i], 2);
    }, 0);
    return 1 - (6 * diffSquaredSum) / (n * (n * n - 1));
}

const spearman = spearmanCorrelation(ranksExpert1, ranksExpert2);
console.log("\nКоэффициент ранговой корреляции Спирмена:", spearman.toFixed(4));

if (spearman > 0.7) {
    console.log("Высокая согласованность оценок экспертов.");
} else if (spearman > 0.4) {
    console.log("Средняя согласованность оценок экспертов.");
} else {
    console.log("Низкая согласованность оценок экспертов.");
}
