import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const StartMenu = ({ onStart, highScore }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md gap-8 z-50">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center"
            >
                <h1 className="text-4xl md:text-6xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-billions-green drop-shadow-[0_0_15px_rgba(0,255,157,0.5)] mb-2">
                    BILLIONS
                </h1>
                <h2 className="text-xl md:text-2xl font-mono text-white tracking-widest">BOT OR NOT</h2>
            </motion.div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full bg-dark-gray/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 flex flex-col items-center gap-4 shadow-2xl"
            >
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                    <Trophy size={20} />
                    <span className="font-mono font-bold">HIGH SCORE: {highScore}</span>
                </div>

                <div className="w-full flex flex-col gap-3">
                    <button
                        onClick={() => onStart('easy')}
                        className="w-full py-3 md:py-4 bg-gradient-to-r from-green-500/20 to-green-500/10 border border-green-500/50 hover:border-green-500 text-green-400 font-bold rounded transition-all hover:scale-[1.02] active:scale-95 text-sm md:text-base"
                    >
                        EASY
                        <span className="block text-[10px] md:text-xs font-normal opacity-70 mt-1">5 LIVES • SLOW SPEED</span>
                    </button>

                    <button
                        onClick={() => onStart('medium')}
                        className="w-full py-3 md:py-4 bg-gradient-to-r from-neon-cyan/20 to-neon-cyan/10 border border-neon-cyan/50 hover:border-neon-cyan text-neon-cyan font-bold rounded transition-all hover:scale-[1.02] active:scale-95 text-sm md:text-base"
                    >
                        MEDIUM
                        <span className="block text-[10px] md:text-xs font-normal opacity-70 mt-1">3 LIVES • NORMAL SPEED</span>
                    </button>

                    <button
                        onClick={() => onStart('hard')}
                        className="w-full py-3 md:py-4 bg-gradient-to-r from-glitch-red/20 to-glitch-red/10 border border-glitch-red/50 hover:border-glitch-red text-glitch-red font-bold rounded transition-all hover:scale-[1.02] active:scale-95 text-sm md:text-base"
                    >
                        HARD
                        <span className="block text-[10px] md:text-xs font-normal opacity-70 mt-1">1 LIFE • FAST SPEED</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default StartMenu;
