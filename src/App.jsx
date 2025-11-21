import React, { useState, useEffect, useCallback, useRef } from 'react';
import Grid from './components/Grid';
import Header from './components/Header';
import GameOver from './components/GameOver';
import StartMenu from './components/StartMenu';

const HUMAN_CHANCE = 0.7; // 70% chance of human

const DIFFICULTY_SETTINGS = {
    easy: { lives: 5, baseSpawnRate: 1200, minSpawnRate: 600, speedFactor: 0.95 },
    medium: { lives: 3, baseSpawnRate: 1000, minSpawnRate: 400, speedFactor: 0.9 },
    hard: { lives: 1, baseSpawnRate: 800, minSpawnRate: 300, speedFactor: 0.85 },
};

function App() {
    const [gameState, setGameState] = useState('menu'); // menu, playing, gameover
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [difficulty, setDifficulty] = useState('medium');
    const [gridState, setGridState] = useState(Array(9).fill({ type: null, isActive: false }));
    const [spawnRate, setSpawnRate] = useState(1000);

    const [notification, setNotification] = useState(null);

    const humansSpawnedRef = useRef(0);
    const timerRef = useRef(null);

    useEffect(() => {
        const savedHighScore = localStorage.getItem('billions_highscore');
        if (savedHighScore) {
            setHighScore(parseInt(savedHighScore, 10));
        }
    }, []);

    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('billions_highscore', score.toString());
        }
    }, [score, highScore]);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const startGame = (selectedDifficulty) => {
        const settings = DIFFICULTY_SETTINGS[selectedDifficulty];
        setDifficulty(selectedDifficulty);
        setLives(settings.lives);
        setSpawnRate(settings.baseSpawnRate);
        setScore(0);
        setGridState(Array(9).fill({ type: null, isActive: false }));
        humansSpawnedRef.current = 0;
        setGameState('playing');
        setNotification(null);
    };

    const spawnCharacterLogic = useCallback(() => {
        setGridState(prevGrid => {
            const availableIndices = prevGrid.map((cell, idx) => !cell.isActive ? idx : null).filter(idx => idx !== null);

            if (availableIndices.length === 0) return prevGrid;

            const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

            let type = 'bot';

            if (humansSpawnedRef.current >= 15) {
                type = 'javi';
                humansSpawnedRef.current = 0; // Reset counter
            } else {
                const isHuman = Math.random() < HUMAN_CHANCE;
                type = isHuman ? 'human' : 'bot';
                if (isHuman) {
                    humansSpawnedRef.current += 1;
                }
            }

            const newGrid = [...prevGrid];
            newGrid[randomIndex] = {
                type: type,
                isActive: true,
                id: Date.now(),
                showMessage: false // For Javi message
            };

            // Auto-hide
            setTimeout(() => {
                setGridState(currentGrid => {
                    if (currentGrid[randomIndex].id === newGrid[randomIndex].id) {
                        const updatedGrid = [...currentGrid];
                        updatedGrid[randomIndex] = { ...updatedGrid[randomIndex], isActive: false };
                        return updatedGrid;
                    }
                    return currentGrid;
                });
            }, spawnRate * 1.5);

            return newGrid;
        });
    }, [spawnRate]);

    useEffect(() => {
        if (gameState === 'playing') {
            timerRef.current = setInterval(spawnCharacterLogic, spawnRate);
        }
        return () => clearInterval(timerRef.current);
    }, [gameState, spawnRate, spawnCharacterLogic]);

    const handleCellClick = (index) => {
        if (gameState !== 'playing') return;

        const cell = gridState[index];
        if (!cell.isActive) return;

        if (cell.type === 'javi') {
            // Show message and give bonus
            setNotification("Javi give me Super Og");

            setScore(prev => prev + 30);

            // Hide character immediately
            setGridState(prev => {
                const newGrid = [...prev];
                newGrid[index] = { ...newGrid[index], isActive: false };
                return newGrid;
            });

        } else {
            // Normal logic
            // Hide immediately
            setGridState(prev => {
                const newGrid = [...prev];
                newGrid[index] = { ...newGrid[index], isActive: false };
                return newGrid;
            });

            if (cell.type === 'human') {
                setScore(prev => {
                    const newScore = prev + 10;
                    if (newScore % 50 === 0) {
                        const settings = DIFFICULTY_SETTINGS[difficulty];
                        setSpawnRate(rate => Math.max(settings.minSpawnRate, rate * settings.speedFactor));
                    }
                    return newScore;
                });
            } else if (cell.type === 'bot') {
                setLives(prev => {
                    const newLives = prev - 1;
                    if (newLives <= 0) {
                        setGameState('gameover');
                    }
                    return newLives;
                });
            }
        }
    };

    const handleRestart = () => {
        setGameState('menu');
        setNotification(null);
    };

    return (
        <div className="min-h-screen bg-void-black flex flex-col items-center justify-center p-2 md:p-4 font-mono text-white selection:bg-neon-cyan selection:text-black relative overflow-hidden">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/20 to-void-black pointer-events-none" />

            {notification && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
                    <div className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.6)] text-xl md:text-2xl animate-bounce whitespace-nowrap border-4 border-black">
                        {notification}
                    </div>
                </div>
            )}

            {gameState === 'menu' && (
                <StartMenu onStart={startGame} highScore={highScore} />
            )}

            {gameState === 'playing' && (
                <>
                    <Header score={score} lives={lives} />

                    <main className="relative z-10">
                        <Grid gridState={gridState} onCellClick={handleCellClick} />
                    </main>

                    <div className="mt-8 text-center text-gray-500 text-sm">
                        <p>TAP HUMANS (BLUE) TO VERIFY</p>
                        <p className="text-glitch-red mt-1">AVOID BOTS (RED)</p>
                        <p className="text-yellow-400 mt-1 text-xs">FIND JAVI FOR BONUS!</p>
                    </div>
                </>
            )}

            {gameState === 'gameover' && (
                <GameOver score={score} onRestart={handleRestart} />
            )}
        </div>
    );
}

export default App;
