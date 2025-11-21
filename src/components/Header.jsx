import React from 'react';
import { Heart } from 'lucide-react';

const Header = ({ score, lives }) => {
    return (
        <header className="w-full max-w-md flex flex-col items-center gap-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-billions-green text-center drop-shadow-[0_0_10px_rgba(0,255,157,0.5)]">
                BILLIONS<br />NETWORK
            </h1>

            <div className="w-full flex justify-between items-center px-4 py-2 bg-dark-gray/80 rounded-lg border border-gray-800 backdrop-blur-sm">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Balance</span>
                    <span className="text-xl md:text-2xl font-mono text-billions-green font-bold">
                        {score} $BILL
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    {[...Array(3)].map((_, i) => (
                        <Heart
                            key={i}
                            className={`w-6 h-6 ${i < lives ? 'fill-glitch-red text-glitch-red' : 'text-gray-700'}`}
                        />
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;
