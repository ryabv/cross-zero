import { createStore } from 'redux';

const CHANGE_ACTIVE_PLAYER = 'SET_ACTIVE_PLAYER';

export enum Player {
    CROSS = 'cross',
    ZERO = 'zero',
};

interface IChangeActivePlayer {
    type: typeof CHANGE_ACTIVE_PLAYER,
}

export const changeActivePlayer = () => ({
    type: CHANGE_ACTIVE_PLAYER,
});

const initState = {
    activePlayer: Player.CROSS,
};

const reducer = (state = initState, action: IChangeActivePlayer) => {
    switch (action.type) {
        case CHANGE_ACTIVE_PLAYER:
            return {
                ...state,
                activePlayer: state.activePlayer === Player.CROSS ? Player.ZERO : Player.CROSS,
            }
        default:
            return state;
    }
};

export const store = createStore(reducer);
