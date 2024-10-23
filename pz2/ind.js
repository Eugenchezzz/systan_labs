// Оценки компетентности экспертов
const R1 = 8;
const R2 = 8.5;

// Матрица весов целей
const weights = [
    [0.2, 0.14, 0.16, 0.5], // Э1
    [0.4, 0.25, 0.15, 0.2], // Э2
];

// Сумма компетентностей
const Rsum = R1 + R2;

// Относительные оценки компетентности экспертов
const Z1 = R1 / Rsum;
const Z2 = R2 / Rsum;

// Альтернативы
const alternatives = [
    'Построить метрополитен',
    'Приобрести 2-этажный автобус',
    'Расширить транспортную сеть',
    'Ввести скоростной трамвай'
];

// Вычисление итоговых весов целей и вывод их с названиями
const finalWeights = weights[0].map((_, index) => {
    return weights[0][index] * Z1 + weights[1][index] * Z2;
});

console.log("Итоговые веса целей с соответствующими альтернативами:");
alternatives.forEach((alt, index) => {
    console.log(`${alt}: ${finalWeights[index].toFixed(4)}`);
});

// Нахождение лучшей альтернативы
const bestAlternativeIndex = finalWeights.indexOf(Math.max(...finalWeights));
console.log("\nНаилучшая альтернатива:", alternatives[bestAlternativeIndex]);
