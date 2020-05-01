export const CHANGE_MAP = 'CHANGE_MAP';

export interface IChangeMap {
    type: typeof CHANGE_MAP,
    payload: ChangeMapPayload,
};

export type ChangeMapPayload = {
    col: number;
    row: number;
    type: string;
};


export const changeMap = (payload: ChangeMapPayload) => ({
    type: CHANGE_MAP,
    payload,
});
