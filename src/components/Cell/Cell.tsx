import React, { useState, useCallback } from 'react';
import './Cell.scss';
import { cn } from '@bem-react/classname';
import { Player } from '../../store';

interface IProps {
    className?: string;
    activePlayer: Player;
    changePlayer: () => void;
}

const cnCell = cn('cell');
export const CELL_SIZE = 50;

const Cell = function(props: IProps) {
    const [player, setPlayer] = useState('');
    const { className, activePlayer, changePlayer } = props;
    
    const handleClick = useCallback(() => {
        if (!player) {
            changePlayer();
            setPlayer(activePlayer);
        }
    }, [player, changePlayer, activePlayer]);

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
