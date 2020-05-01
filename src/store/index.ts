import { createStore } from 'redux';
import { reducer } from './reducer';

export type State = ReturnType<typeof reducer>;
export const store = createStore(reducer);
