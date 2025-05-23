'use client'
import React, { useEffect, useRef, useState } from 'react'
import './DotGroup.css'
import { useDetectWindow } from '@/app/hooks/useDetectWindow';


type Dot = {
    x: number;
    y: number;
    active: boolean;
};
export default function DotsGroup() {
    const windowWidth = useDetectWindow();
    const [dots, setDots] = useState<Dot[][]>(
        Array.from({ length: windowWidth >= 1024 ? 25 : 25 },
            (_, y) =>
                Array.from({ length: windowWidth >= 1024 ? 25 : 25 }, (_, x) => ({
                    x,
                    y,
                    active: false
                }))
        )
    );
    const timeoutIds = useRef<NodeJS.Timeout[]>([]);
    const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
        // Manhattan distance for diamond-shaped propagation
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    };


    const handleDotClick = (clickedX: number, clickedY: number) => {
        // Clear any existing animations
        timeoutIds.current.forEach(id => clearTimeout(id));
        timeoutIds.current = [];

        // Calculate distances and group dots by distance
        const distanceMap = new Map<number, Dot[]>();
        dots.forEach(row => row.forEach(dot => {
            const distance = calculateDistance(dot.x, dot.y, clickedX, clickedY);
            if (!distanceMap.has(distance)) {
                distanceMap.set(distance, []);
            }
            distanceMap.get(distance)?.push(dot);
        }));

        const distances = Array.from(distanceMap.keys()).sort((a, b) => a - b);

        // Schedule activation for each distance tier
        distances.forEach(distance => {
            const activateDelay = distance * 100; // 100ms between tiers
            const deactivateDelay = activateDelay + 600; // 500ms animation duration

            // Activate tier
            timeoutIds.current.push(setTimeout(() => {
                setDots(prev => prev.map(row => row.map(dot => {
                    const d = calculateDistance(dot.x, dot.y, clickedX, clickedY);
                    return d === distance ? { ...dot, active: true } : dot;
                })));
            }, activateDelay));

            // Deactivate tier
            timeoutIds.current.push(setTimeout(() => {
                setDots(prev => prev.map(row => row.map(dot => {
                    const d = calculateDistance(dot.x, dot.y, clickedX, clickedY);
                    return d === distance ? { ...dot, active: false } : dot;
                })));
            }, deactivateDelay));
        });
    };
    useEffect(() => {
        return () => {
            // Cleanup timeouts on unmount
            timeoutIds.current.forEach(id => clearTimeout(id));
        };
    }, []);


    return (
        <div className="dots-group absolute top-1/2 sm:end-0 -translate-y-1/2 h-full w-1/2 grid grid-cols-[repeat(25,1fr)] -z-10" >
            {
                dots.flat().map((dot, i) => {
                    return (
                        <div key={`${dot.x}-${dot.y}`}
                            onClick={() => handleDotClick(dot.x, dot.y)}
                            className="p-2 cursor-crosshair dot" data-index={i}>
                            <div className=""
                                style={{
                                    transform: dot.active ? 'translateY(-16px)' : 'translateY(0)',
                                    opacity: dot.active ? '1' : '.35',
                                    scale: dot.active ? '1.3' : '1',
                                }}
                            ></div>
                        </div>
                    )
                })
            }
        </div>
    )
}
