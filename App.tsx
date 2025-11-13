import React, { useState, useCallback } from 'react';
import { analyzeImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import InputPanel from './components/InputPanel';
import ResultDisplay from './components/ResultDisplay';
import { MRLifeHubIcon, CheckCircleIcon } from './components/icons';

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
            <div className="max-w-4xl mx-auto">
                <header className="flex flex-col items-center text-center gap-3 mb-12">
                    <MRLifeHubIcon className="w-12 h-12 text-neutral-400" />
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Welcome to MR LifeHub</h1>
                    <p className="text-neutral-400 text-sm sm:text-base max-w-2xl">This tool helps you analyze your physical space, organize your tasks, and get helpful suggestions powered by AI.</p>
                </header>

                <main className="flex flex-col items-center gap-10">
                    <section className="w-full bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
                        <h2 className="text-xl font-bold text-center text-white mb-4">Key Features</h2>
                        <ul className="space-y-3 text-neutral-400">
                            <li className="flex items-start">
                                <CheckCircleIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-white" />
                                <span>Upload an image of your desk or room for a smart analysis.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircleIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-white" />
                                <span>Get custom suggestions to improve your productivity and daily routines.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircleIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-white" />
                                <span>Identifies different objects within your uploaded image.</span>
                            </li>
                        </ul>
                    </section>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;