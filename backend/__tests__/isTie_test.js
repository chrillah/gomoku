// Funktion för att kontrollera om spelet är oavgjort
function isTie(board) {
    // Logik för att kontrollera om tavlan är full utan en vinnare för att förklara oavgjort
    for (let row of board) {
        for (let cell of row) {
            if (cell === 0) {
                return false // Det finns en tom cell, spelet är inte oavgjort
            }
        }
    }
    return true // Tavlan är full, och ingen vinnare utses, det är oavgjort
}

// Ett Jest-test för isTie funktionen ovan
test('Check if isTie correctly identifies a tie on a full board', () => {
    const fullBoardWithNoWinner = [
      [1, 2, 1],
      [2, 1, 2],
      [2, 1, 1],
    ];

    const result = isTie(fullBoardWithNoWinner);

    expect(result).toBe(true); // Förväntas att isTie returnerar sant för en full bräda utan vinnare
  });

  test('Check if isTie correctly identifies a non-tie scenario', () => {
    const nonFullBoard = [
      [1, 0, 2],
      [2, 1, 2],
      [0, 1, 1],
    ];
    const result = isTie(nonFullBoard);

    expect(result).toBe(false); // Förväntas att isTie returnerar false för en bräda med tomma celler
  });
