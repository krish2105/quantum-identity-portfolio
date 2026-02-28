'use client';

export default function CRTOverlay() {
    return (
        <div
            className="pointer-events-none fixed inset-0 z-50 h-screen w-screen opacity-15 crt-overlay"
            style={{ mixBlendMode: 'overlay' }}
        />
    );
}
