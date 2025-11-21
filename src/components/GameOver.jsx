import React from 'react';
import { motion } from 'framer-motion';
import { Share2, RefreshCw } from 'lucide-react';

const GameOver = ({ score, onRestart }) => {
    const shareText = `I just verified ${score / 10} Humans on the @billions_ntwk. Trust is the new currency. $BILL #BillionsNetwork`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-sm bg-dark-gray border-2 border-glitch-red rounded-xl p-8 flex flex-col items-center text-center shadow-[0_0_30px_rgba(255,0,60,0.3)]"
            >
                <h2 className="text-4xl font-pixel text-glitch-red mb-2 animate-pulse">SYSTEM FAILURE</h2>
                <p className="text-gray-400 mb-6">Trust levels critical.</p>

                <div className="mb-8">
                    <span className="text-sm text-gray-500 uppercase tracking-widest">Total Earned</span>
                    <div className="text-5xl font-mono text-billions-green font-bold mt-2">
                        {score} <span className="text-2xl">$BILL</span>
                    </div>
                </div>

                <div className="flex flex-col w-full gap-3">
                    <a
                        href={shareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <Share2 size={20} />
                        SHARE ON X
                    </a>

                    <button
                        onClick={onRestart}
                        className="w-full py-3 px-4 bg-transparent border border-neon-cyan text-neon-cyan font-bold rounded hover:bg-neon-cyan/10 transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={20} />
                        REBOOT SYSTEM
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default GameOver;
