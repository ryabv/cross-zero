import React, { useState, useCallback, useEffect } from 'react';
import './Layout.scss';
import { cn } from '@bem-react/classname';
import Cell, { CELL_SIZE } from '../Cell/Cell';
import { useDispatch, useSelector } from 'react-redux';
import { changeActivePlayer, State } from '../../store';


interface IProps {

}

const cnLayout = cn('layout');

const getCount = (viewportSize: number) => {
    return Math.floor(viewportSize / CELL_SIZE);
};

function throttle(callback: () => void, wait: number, immediate = false) {
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
}

const Layout = function(props: IProps) {
    const [counts, setCounts] = useState({
        x: getCount(document.documentElement.clientWidth),
        y: getCount(document.documentElement.clientHeight),
    });
    const { activePlayer } = useSelector((state: State) => state);
    const dispatch = useDispatch();

    const cellsCount = counts.x * counts.y;

    const changePlayer = useCallback(() => {
        dispatch(changeActivePlayer());
    }, [dispatch]);

    const handleResize = useCallback(
        throttle(() => {
            setCounts({
                x: getCount(document.documentElement.clientWidth),
                y: getCount(document.documentElement.clientHeight),
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

        for (let i = 0; i < counts.y; i++) {
            const cells = [];

            for (let j = 0; j < counts.x; j++) {
                cells.push(
                    <Cell
                        key={j}
                        activePlayer={activePlayer}
                        changePlayer={changePlayer}
                        className={cnLayout('cell')}
                    />
                );
            }

            rows.push(
                <tr key={i}>
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
