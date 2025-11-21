import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import humanHead from '../assets/human_head.jpg';
import botHead from '../assets/bot_head.png';
import javiHead from '../assets/javi.jpg';

const Cell = ({ type, isActive, onClick, showMessage }) => {
    return (
        <div
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-void-black rounded-md border border-gray-800 relative overflow-hidden cursor-pointer active:scale-95 transition-transform"
            onClick={onClick}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 to-void-black opacity-50" />

            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <img
                            src={type === 'human' ? humanHead : type === 'javi' ? javiHead : botHead}
                            alt={type}
                            className={`w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-lg ${type === 'bot' ? 'animate-glitch' : ''} ${type === 'javi' ? 'rounded-full border-2 border-yellow-400' : ''}`}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Cell;
