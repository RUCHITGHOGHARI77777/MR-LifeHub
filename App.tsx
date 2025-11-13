import React, { useState, useCallback } from 'react';
import { analyzeImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import InputPanel from './components/InputPanel';
import ResultDisplay from './components/ResultDisplay';
import { GeminiIcon } from './components/icons';

const App: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [analysis, setAnalysis] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleAnalyze = useCallback(async () => {
        if (!imageFile || !prompt.trim()) {
            setError('Please provide an image and a prompt.');
            return;
        }

        setIsLoading(true);
        setError('');
        setAnalysis('');

        try {
            const base64Data = await fileToBase64(imageFile);
            const imageData = {
                mimeType: imageFile.type,
                data: base64Data,
            };
            
            const result = await analyzeImage(imageData, prompt);
            setAnalysis(result);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [imageFile, prompt]);

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col items-center text-center gap-2 mb-10">
                    <GeminiIcon className="w-10 h-10 text-neutral-400" />
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Image Analyzer</h1>
                    <p className="text-neutral-400 text-sm sm:text-base max-w-md">Upload an image and ask Gemini anything about it. Built for clarity and focus.</p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <InputPanel
                        onImageChange={setImageFile}
                        prompt={prompt}
                        onPromptChange={setPrompt}
                        onAnalyze={handleAnalyze}
                        isLoading={isLoading}
                    />
                    <ResultDisplay
                        analysis={analysis}
                        isLoading={isLoading}
                        error={error}
                    />
                </main>
            </div>
        </div>
    );
};

export default App;