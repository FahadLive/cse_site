'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import './styles.css';

export default function LoadingOverlay() {
    const [isMounted, setIsMounted] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Fast path: session cache check for returning visitors (0ms overhead)
        if (typeof window !== 'undefined' && sessionStorage.getItem('cse_overlay_dismissed')) {
            setIsMounted(false);
            return;
        }

        // Prevent body scroll during initial splash presentation
        document.body.style.overflow = 'hidden';

        // Timer 1: Trigger GPU compositor fade-out after 700ms CSS progress fill
        const fadeTimer = setTimeout(() => {
            setIsFading(true);
            try {
                sessionStorage.setItem('cse_overlay_dismissed', 'true');
            } catch (e) {
                // Ignore quota/private browsing storage errors
            }
            document.body.style.overflow = '';
        }, 700);

        // Timer 2: Complete DOM unmount after 350ms CSS fade-out transition
        const unmountTimer = setTimeout(() => {
            setIsMounted(false);
        }, 1050);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(unmountTimer);
            document.body.style.overflow = '';
        };
    }, []);

    if (!isMounted) return null;

    return (
        <aside
            aria-label="System Loading Overlay"
            aria-live="polite"
            className={`loader-overlay-root ${isFading ? 'is-fading' : ''}`}
        >
            {/* Background Tech Grid & Glow - Decorative */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
            />

            {/* Header Status Bar */}
            <div className="w-full max-w-6xl flex justify-between items-center text-xs tracking-widest text-neutral-500 font-mono z-10">
                <div className="flex items-center gap-2 loader-enter-left">
                    <span
                        aria-hidden="true"
                        className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    />
                    <span>CSE // SYSTEM ONLINE</span>
                </div>
                <div className="font-mono text-neutral-400 loader-enter-right">
                    ESTD. 1999
                </div>
            </div>

            {/* Central Animated Branding */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                <div className="relative flex items-center justify-center loader-enter-scale">
                    {/* Ambient Rings (Pure GPU CSS Keyframe Animations) */}
                    <div
                        aria-hidden="true"
                        className="loader-spin-cw absolute w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full border border-dashed border-white/20"
                    />
                    <div
                        aria-hidden="true"
                        className="loader-spin-ccw absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-white/10"
                    />

                    {/* CSE Logo & Graduation Cap */}
                    <div className="relative flex items-center justify-center p-4 transform-gpu">
                        <Image
                            src="/cse.png"
                            width={280}
                            height={160}
                            alt="Computer Science Department Logo"
                            className="w-[200px] md:w-[280px] object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] transform-gpu"
                            priority
                        />
                        <div className="loader-enter-cap absolute -top-4 -left-2 md:-top-6 md:-left-4">
                            <Image
                                src="/cap.png"
                                width={100}
                                height={100}
                                alt="Graduation Cap Icon"
                                className="w-[70px] md:w-[100px] object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Subtitle Transition */}
                <div className="mt-8 h-6 flex items-center justify-center overflow-hidden">
                    <p className="loader-subtitle-anim text-xs md:text-sm font-mono tracking-[0.25em] text-neutral-400 text-center uppercase">
                        COMPUTER SCIENCE & ENGINEERING
                    </p>
                </div>
            </div>

            {/* Bottom Progress Bar Track */}
            <div className="w-full max-w-md flex flex-col items-center gap-3 z-10">
                <div className="w-full flex justify-between items-end font-mono">
                    <span className="text-xs text-neutral-500 tracking-wider">SYSTEM INITIALIZING</span>
                    <span className="text-xs text-neutral-400 tracking-wider">CSE.GECPKD</span>
                </div>

                {/* Compositor ScaleX Progress Fill */}
                <div className="w-full h-[3px] bg-neutral-900 rounded-full overflow-hidden relative">
                    <div className="loader-progress-bar h-full w-full bg-gradient-to-r from-neutral-600 via-neutral-300 to-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
                </div>
            </div>
        </aside>
    );
}
