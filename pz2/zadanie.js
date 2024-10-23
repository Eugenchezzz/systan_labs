// Оценки компетентности экспертов
const R1 = 4;
const R2 = 3;
const R3 = 9;
const R4 = 5;

// Матрица весов целей
const weights = [
    [10, 7, 9], // Э1
    [3, 4, 5],  // Э2
    [8, 6, 10], // Э3
    [4, 2, 7]   // Э4
];

// Сумма компетентностей
const Rsum = R1 + R2 + R3 + R4;

// Относительные оценки компетентности экспертов
const Z1 = R1 / Rsum;
const Z2 = R2 / Rsum;
const Z3 = R3 / Rsum;
const Z4 = R4 / Rsum;

// Альтернативы
const alternatives = [
    'Построить новое общежитие',
    'Снять многоквартирный дом и частично оплачивать жилье',
    'Назначить доплату незаселенным студентам'
];

// Вычисление итоговых весов целей
const finalWeights = weights[0].map((_, index) => {
    return (
        weights[0][index] * Z1 +
        weights[1][index] * Z2 +
        weights[2][index] * Z3 +
        weights[3][index] * Z4
    );
});

// Вывод итоговых весов и предпочтений
console.log("Итоговые веса целей с соответствующими альтернативами:");
alternatives.forEach((alt, index) => {
    console.log(`${alt}: ${finalWeights[index].toFixed(4)}`);
});

// Нахождение лучшей альтернативы
const bestAlternativeIndex = finalWeights.indexOf(Math.max(...finalWeights));
console.log("\nНаилучшая альтернатива:", alternatives[bestAlternativeIndex]);
