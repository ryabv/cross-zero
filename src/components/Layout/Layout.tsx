import React, { useState, useCallback, useEffect } from 'react';
import './Layout.scss';
import { cn } from '@bem-react/classname';
import Cell from '../Cell/Cell';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../store';
import { getCount, throttle } from '../../utils';
import { CELL_SIZE } from '../../consts';
import { changeMap, ChangeMapPayload } from '../../store/actions';


interface IProps {

}

const cnLayout = cn('layout');

const Layout = function(props: IProps) {

    const [counts, setCounts] = useState({
        x: getCount(document.documentElement.clientWidth, CELL_SIZE),
        y: getCount(document.documentElement.clientHeight, CELL_SIZE),
    });
    const { activePlayer, toggleRestart } = useSelector((state: State) => state);
    const dispatch = useDispatch();

    const handleChangeMap = useCallback((payload: ChangeMapPayload) => {
        dispatch(changeMap(payload));
    }, [dispatch]);

    const handleResize = useCallback(
        throttle(() => {
            setCounts({
                x: getCount(document.documentElement.clientWidth, CELL_SIZE),
                y: getCount(document.documentElement.clientHeight, CELL_SIZE),
            })
        }, 300),
        []
    );

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    function addCells(): React.ReactNode {
        const rows = [];

        for (let row = 0; row < counts.y; row++) {
            const cells = [];

            for (let col = 0; col < counts.x; col++) {
                cells.push(
                    <Cell
                        key={col}
                        row={row}
                        col={col}
                        toggleRestart={toggleRestart}
                        handleChangeMap={handleChangeMap}
                        activePlayer={activePlayer}
                        className={cnLayout('cell')}
                    />
                );
            }

            rows.push(
                <tr key={row}>
                    {cells}
                </tr>
            );
        }

        return rows;
    }

    return (
        <table
            className={cnLayout()}
            style={{
                width: (CELL_SIZE * counts.x) + CELL_SIZE,
                height: (CELL_SIZE * counts.y) + CELL_SIZE,
            }}
        >
            <tbody>
                {addCells()}
            </tbody>
        </table>
    );
};

export default Layout;
