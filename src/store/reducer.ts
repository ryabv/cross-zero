import { checkWin, getInitState } from '../utils';
import { CELL_SIZE } from '../consts';
import { IChangeMap, CHANGE_MAP } from './actions';



export enum Player {
    CROSS = 'cross',
    ZERO = 'zero',
};

export const reducer = (state = getInitState(Player.CROSS, CELL_SIZE), action: IChangeMap) => {
    switch (action.type) {
        case CHANGE_MAP:
            const map = [...state.map];
            const { row, col, type } = action.payload;
            const { activePlayer, winCount, toggleRestart } = state;
            map[row][col] = type;

            const won = checkWin(map, map[row], col, winCount, activePlayer);

            if (won) {
                alert(activePlayer + ' won!');
                return {...getInitState(Player.CROSS, CELL_SIZE), toggleRestart: !toggleRestart};
            }

            return {
                ...state,
                map,
                activePlayer: activePlayer === Player.CROSS ? Player.ZERO : Player.CROSS,
            };
        default:
            return state;
    }
};
