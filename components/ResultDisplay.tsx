import React from 'react';
import { AlertTriangleIcon, BotIcon, LoadingSpinner } from './icons';

interface ResultDisplayProps {
    analysis: string;
    isLoading: boolean;
    error: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ analysis, isLoading, error }) => {
    return (
        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 flex flex-col">
            <h2 className="text-lg font-semibold text-neutral-300 mb-4 flex-shrink-0">AI Analysis</h2>
            <div className="flex-grow bg-neutral-950/50 rounded-lg p-4 overflow-y-auto min-h-[300px] prose prose-invert prose-sm sm:prose-base max-w-none prose-p:text-neutral-300 prose-headings:text-white prose-strong:text-white prose-a:text-white hover:prose-a:text-neutral-300">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full text-neutral-400 space-y-3">
                        <LoadingSpinner className="animate-spin h-8 w-8 text-neutral-500" />
                        <span className="text-sm">Analyzing your image...</span>
                    </div>
                )}
                {error && (
                    <div className="flex flex-col items-center justify-center h-full text-red-500 text-center space-y-3">
                        <AlertTriangleIcon className="h-8 w-8" />
                        <div>
                            <p className="font-semibold">Oops! Something went wrong.</p>
                            <p className="text-sm text-red-500/80">{error}</p>
                        </div>
                    </div>
                )}
                {!isLoading && !error && !analysis && (
                    <div className="flex flex-col items-center justify-center h-full text-neutral-600">
                        <BotIcon className="h-12 w-12 mb-4" />
                        <p className="text-sm">Your results will appear here once the analysis is done.</p>
                    </div>
                )}
                {analysis && (
                    <div className="whitespace-pre-wrap">
                        {analysis}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultDisplay;