'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const SUBTITLES = [
    'INITIALIZING SYSTEM ARCHITECTURE...',
    'COMPUTER SCIENCE & ENGINEERING',
    'GOVT. ENGINEERING COLLEGE PALAKKAD',
    'WELCOME TO CSE DEPT'
];

export default function LoadingScreen() {
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [subtitleIndex, setSubtitleIndex] = useState(0);

    useEffect(() => {
        // Fast path for returning session visitors
        if (typeof window !== 'undefined' && sessionStorage.getItem('cse_loader_dismissed')) {
            setIsVisible(false);
            return;
        }

        // Prevent body scroll during initial splash
        document.body.style.overflow = 'hidden';

        let animationFrameId;
        const startTime = performance.now();
        const DURATION = 1000; // Crisp 1.0s animation target

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const percentage = Math.min(Math.floor((elapsed / DURATION) * 100), 100);

            setProgress(percentage);

            if (elapsed < DURATION) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                // Begin smooth GPU fade-out
                setIsFading(true);
                sessionStorage.setItem('cse_loader_dismissed', 'true');
                document.body.style.overflow = '';

                setTimeout(() => {
                    setIsVisible(false);
                }, 350);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        const subtitleInterval = setInterval(() => {
            setSubtitleIndex((prev) => (prev + 1) % SUBTITLES.length);
        }, 280);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            clearInterval(subtitleInterval);
            document.body.style.overflow = '';
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-black text-white px-6 py-12 select-none overflow-hidden transition-opacity duration-350 ease-out ${
                isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
            <style>{`
                @keyframes spin-cw {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-ccw {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
                @keyframes enter-scale {
                    from { opacity: 0; transform: scale3d(0.9, 0.9, 1); }
                    to { opacity: 1; transform: scale3d(1, 1, 1); }
                }
                @keyframes enter-left {
                    from { opacity: 0; transform: translate3d(-15px, 0, 0); }
                    to { opacity: 1; transform: translate3d(0, 0, 0); }
                }
                @keyframes enter-right {
                    from { opacity: 0; transform: translate3d(15px, 0, 0); }
                    to { opacity: 1; transform: translate3d(0, 0, 0); }
                }
                @keyframes enter-cap {
                    from { opacity: 0; transform: translate3d(0, -18px, 0); }
                    to { opacity: 1; transform: translate3d(0, 0, 0); }
                }
            `}</style>

            {/* Background Tech Grid & Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* Header info */}
            <div className="w-full max-w-6xl flex justify-between items-center text-xs tracking-widest text-neutral-500 font-mono z-10">
                <div
                    style={{ animation: 'enter-left 0.3s ease-out forwards', willChange: 'transform, opacity' }}
                    className="flex items-center gap-2"
                >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    <span>CSE // SYSTEM ONLINE</span>
                </div>
                <div
                    style={{ animation: 'enter-right 0.3s ease-out forwards', willChange: 'transform, opacity' }}
                    className="font-mono text-neutral-400"
                >
                    ESTD. 1999
                </div>
            </div>

            {/* Central Animated Branding */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                <div
                    style={{ animation: 'enter-scale 0.35s ease-out forwards', willChange: 'transform, opacity' }}
                    className="relative flex items-center justify-center"
                >
                    {/* Ambient Rings (Pure CSS GPU keyframe animation) */}
                    <div
                        style={{
                            animation: 'spin-cw 12s linear infinite',
                            willChange: 'transform'
                        }}
                        className="absolute w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full border border-dashed border-white/20"
                    />
                    <div
                        style={{
                            animation: 'spin-ccw 18s linear infinite',
                            willChange: 'transform'
                        }}
                        className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-white/10"
                    />

                    {/* CSE Logo & Cap */}
                    <div className="relative flex items-center justify-center p-4 transform-gpu">
                        <Image
                            src="/cse.png"
                            width={280}
                            height={160}
                            alt="CSE Department"
                            className="w-[200px] md:w-[280px] object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] transform-gpu"
                            priority
                        />
                        <div
                            style={{ animation: 'enter-cap 0.35s ease-out 0.05s forwards', willChange: 'transform, opacity' }}
                            className="absolute -top-4 -left-2 md:-top-6 md:-left-4"
                        >
                            <Image
                                src="/cap.png"
                                width={100}
                                height={100}
                                alt="Graduation Cap"
                                className="w-[70px] md:w-[100px] object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Subtitle */}
                <div className="mt-8 h-6 flex items-center justify-center overflow-hidden">
                    <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-neutral-400 text-center uppercase transition-all duration-150">
                        {SUBTITLES[subtitleIndex]}
                    </p>
                </div>
            </div>

            {/* Bottom Progress Bar & Percentage */}
            <div className="w-full max-w-md flex flex-col items-center gap-3 z-10">
                <div className="w-full flex justify-between items-end font-mono">
                    <span className="text-xs text-neutral-500 tracking-wider">LOADING</span>
                    <span className="text-2xl md:text-3xl font-extrabold text-white tracking-wider">
                        {String(progress).padStart(3, '0')}%
                    </span>
                </div>

                {/* Sleek Progress Track */}
                <div className="w-full h-[3px] bg-neutral-900 rounded-full overflow-hidden relative">
                    <div
                        className="h-full bg-gradient-to-r from-neutral-600 via-neutral-300 to-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.7)] transition-all duration-75 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
