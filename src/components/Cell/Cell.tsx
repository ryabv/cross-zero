import React, { useState, useCallback, useEffect } from 'react';
import './Cell.scss';
import { cn } from '@bem-react/classname';
import { Player } from '../../store/reducer';
import { CELL_SIZE } from '../../consts';
import { ChangeMapPayload } from '../../store/actions';

interface IProps {
    className?: string;
    activePlayer: Player;
    row: number;
    col: number;
    handleChangeMap: (payload: ChangeMapPayload) => void;
    toggleRestart: boolean;
}

const cnCell = cn('cell');

const Cell = function(props: IProps) {
    const [player, setPlayer] = useState('');
    const { className, activePlayer, row, col, handleChangeMap, toggleRestart } = props;

    useEffect(() => {
        setPlayer('');
    }, [toggleRestart]);
    
    const handleClick = useCallback(() => {
        if (!player) {
            handleChangeMap({ row, col, type: activePlayer });
            setPlayer(activePlayer);
        }
    }, [player, activePlayer, handleChangeMap, col, row]);

    return (
        <td
            onClick={handleClick}
            className={cnCell({filled: player}, [className])}
            style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
            }}
        ></td>
    );
};

export default Cell;
