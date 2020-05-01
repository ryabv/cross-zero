import { Player } from "./store/reducer";

export const getInitState = (activePlayer: Player, cellSize: number) => ({
    activePlayer,
    map: createMap(
        getCount(document.documentElement.clientHeight, cellSize),
        getCount(document.documentElement.clientWidth, cellSize),
    ),
    toggleRestart: false,
    winCount: Number(prompt('Сколько символов подряд нужно для победы:', '3')),
});

export function getCount (viewportSize: number, cellSize: number) {
    return Math.floor(viewportSize / cellSize);
};

export function throttle(callback: () => void, wait: number, immediate = false) {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let initialCall = true;
    
    return function() {
        const callNow = immediate && initialCall;
        const next = () => {
            callback.apply(this, arguments);
            timeout = null;
        };
        
        if (callNow) { 
            initialCall = false;
            next();
        }
    
        if (!timeout) {
            timeout = setTimeout(next, wait);
        }
    }
};

export function createMap(rows: number, cols: number) {
    const map = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(null);
        }
        map.push(row);
    }

    return map;
};

export function winRow(row: Array<string | null>, winCount: number, activePlayer: string) {
    const rowLength = row.length;
    let count = 0;

    for (let col = 0; col < rowLength; col++) {
        if (row[col] === activePlayer) {
            count++;
            
            if (count >= winCount) {
                return true;
            }
        } else {
            count = 0;
        }
    }

    return false;
};

export function winCol(map: Array<Array<string | null>>, col: number, winCount: number, activePlayer: string) {
    const mapLength = map.length;
    let count = 0;

    for (let row = 0; row < mapLength; row++) {
        
        if (map[row][col] === activePlayer) {
            count++;

            if (count >= winCount) {
                return true;
            }
        } else {
            count = 0;
        }
    }

    return false;
};

export function winDiagonal(map: Array<Array<string | null>>, winCount: number, activePlayer: string) {
    const rowLength = map.length;
    const colLength = map[0].length;
    let count = 0;

    // left-top to right-bottom
    for (let col = 0; col < colLength; col++) {
        let currCol = col;
        for (let row = 0; row < rowLength; row++) {
            if (currCol === colLength - 1) {
                break;
            }

            if (map[row][currCol] === activePlayer) {
                count++;

                if (count >= winCount) {
                    return true;
                }
            } else {
                count = 0;
            }
            currCol++;
        }
    }

    for (let row = 0; row < rowLength; row++) {
        let currRow = row;
        for (let col = 0; col < colLength; col++) {
            if (currRow === rowLength - 1) {
                break;
            }

            if (map[currRow][col] === activePlayer) {
                count++;

                if (count >= winCount) {
                    return true;
                }
            } else {
                count = 0;
            }
            currRow++;
        }
    }

    // right-top to left-bottom
    for (let col = 0; col < colLength; col++) {
        let currCol = col;
        for (let row = 0; row < rowLength; row++) {
            if (currCol < 0) {
                break;
            }

            if (map[row][currCol] === activePlayer) {
                count++;

                if (count >= winCount) {
                    return true;
                }
            } else {
                count = 0;
            }

            currCol--;
        }
    }

    for (let row = 0; row < rowLength; row++) {
        let currRow = row;
        for (let col = colLength - 1; col >= 0; col--) {
            if (currRow === rowLength - 1) {
                break;
            }

            if (map[currRow][col] === activePlayer) {
                count++;

                if (count >= winCount) {
                    return true;
                }
            } else {
                count = 0;
            }
            currRow++;
        }
    }

    return false;
};


export function checkWin(map: Array<Array<string | null>>, row: Array<string | null>, col: number, winCount: number, activePlayer: string) {
    return (
        winRow(row, winCount, activePlayer) ||
        winCol(map, col, winCount, activePlayer) ||
        winDiagonal(map, winCount, activePlayer)
    );
};