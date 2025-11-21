import React from 'react';
import Cell from './Cell';

const Grid = ({ gridState, onCellClick }) => {
    return (
        <div className="grid grid-cols-3 gap-2 md:gap-4 p-2 md:p-4 bg-dark-gray rounded-lg border-2 border-billions-green shadow-[0_0_15px_rgba(0,255,157,0.3)]">
            {gridState.map((cell, index) => (
                <Cell
                    key={index}
                    type={cell.type}
                    isActive={cell.isActive}
                    showMessage={cell.showMessage}
                    onClick={() => onCellClick(index)}
                />
            ))}
        </div>
    );
};

export default Grid;
