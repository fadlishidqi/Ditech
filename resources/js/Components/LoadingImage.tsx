import React, { useState } from 'react';

interface LoadingImageProps {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
    onLoad?: () => void;
    skeletonClassName?: string;
}

const LoadingImage: React.FC<LoadingImageProps> = ({
    src,
    alt,
    className = "",
    containerClassName = "",
    onLoad,
    skeletonClassName = "",
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleImageLoad = () => {
        setIsLoading(false);
        setHasError(false);
        onLoad?.();
    };

    const handleImageError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <div className={`relative ${containerClassName}`}>
            {/* Skeleton Loading State */}
            {isLoading && (
                <div
                    className={`absolute inset-0 ${className} ${skeletonClassName} bg-gray-300 animate-pulse overflow-hidden`}
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-slow"></div>
                </div>
            )}

            {/* Error State */}
            {hasError && (
                <div
                    className={`absolute inset-0 ${className} bg-gray-200 flex items-center justify-center`}
                >
                    <div className="flex flex-col items-center space-y-1 text-gray-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={1.5} 
                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" 
                            />
                        </svg>
                        <span className="text-xs">Image failed</span>
                    </div>
                </div>
            )}

            {/* Actual Image */}
            <img
                src={src}
                alt={alt}
                className={`${className} ${
                    isLoading || hasError ? 'opacity-0' : 'opacity-100'
                } transition-opacity duration-300`}
                onLoad={handleImageLoad}
                onError={handleImageError}
            />

            {/* Custom CSS for shimmer animation */}
            <style>{`
                @keyframes shimmer-slow {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                .animate-shimmer-slow {
                    animation: shimmer-slow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default LoadingImage;