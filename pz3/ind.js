// Оценки экспертов
const weights = [
    [1, 2, 3], // Э1
    [2, 1, 3], // Э2
    [2, 3, 1], // Э3
    [3, 2, 1], // Э4
    [3, 1, 2], // Э5
    [1, 2, 3]  // Э6
];

// Количество экспертов и альтернатив
const m = weights.length;
const n = weights[0].length;

// Суммирование оценок для каждой альтернативы
const totalScores = weights[0].map((_, index) => {
    return weights.reduce((sum, expert) => sum + expert[index], 0);
});

// Найдём наилучшую альтернативу (с минимальной суммой баллов)
const bestAlternativeIndex = totalScores.indexOf(Math.min(...totalScores));
const alternatives = [
    'Построить новое общежитие',
    'Снять многоквартирный дом и частично оплачивать жилье',
    'Назначить доплату незаселенным студентам'
];

console.log("Сумма оценок по альтернативам:");
alternatives.forEach((alt, index) => {
    console.log(`${alt}: ${totalScores[index]}`);
});

// Выводим наилучшую альтернативу
console.log("\nНаилучшая альтернатива:", alternatives[bestAlternativeIndex]);

// Проверка согласованности экспертных оценок

// Среднее значение суммы оценок по альтернативам
const Ravg = totalScores.reduce((sum, score) => sum + score, 0) / n;

// Считаем сумму квадратов отклонений ранговых сумм от среднего
const S = totalScores.reduce((sum, score) => sum + Math.pow(score - Ravg, 2), 0);

// Вычисляем коэффициент конкордации Кендэлла
const W = (12 * S) / (m * m * (Math.pow(n, 3) - n));

console.log("\nКоэффициент конкордации Кендэлла (W):", W.toFixed(4));

// Выводим результат согласованности
if (W > 0.7) {
    console.log("Высокая степень согласованности.");
} else if (W > 0.4) {
    console.log("Средняя степень согласованности.");
} else {
    console.log("Низкая степень согласованности.");
}
