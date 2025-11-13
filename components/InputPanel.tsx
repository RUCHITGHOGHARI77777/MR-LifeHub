import React, { useState, useCallback, ChangeEvent } from 'react';
import { ImageIcon, LoadingSpinner } from './icons';

interface InputPanelProps {
    onImageChange: (file: File | null) => void;
    prompt: string;
    onPromptChange: (value: string) => void;
    onAnalyze: () => void;
    isLoading: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ onImageChange, prompt, onPromptChange, onAnalyze, isLoading }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImageChange(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            onImageChange(null);
            setPreviewUrl(null);
        }
    }, [onImageChange]);

    return (
        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-6 flex flex-col">
            <div className="flex-grow flex flex-col">
                <label htmlFor="image-upload" className="block text-sm font-medium text-neutral-400 mb-2">Step 1: Choose an Image</label>
                <div className="relative mt-1 flex-grow flex justify-center items-center p-4 border border-neutral-700 rounded-lg cursor-pointer bg-neutral-950/50 hover:border-neutral-600 transition-colors duration-300 min-h-[200px]">
                    <div className="space-y-1 text-center">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="mx-auto max-h-60 rounded-md object-contain" />
                        ) : (
                            <>
                                <ImageIcon className="mx-auto h-12 w-12 text-neutral-600" />
                                <div className="flex text-sm text-neutral-500">
                                    <p className="pl-1">Drop an image here or click to upload</p>
                                </div>
                                <p className="text-xs text-neutral-600">Supports PNG, JPG (max 10MB)</p>
                            </>
                        )}
                    </div>
                    <input id="image-upload" name="image-upload" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={handleFileChange} />
                </div>
            </div>

            <div className="flex-shrink-0">
                <label htmlFor="prompt" className="block text-sm font-medium text-neutral-400">Step 2: Write a Prompt</label>
                <div className="mt-1">
                    <textarea
                        rows={3}
                        name="prompt"
                        id="prompt"
                        className="block w-full shadow-sm sm:text-sm border-neutral-700 bg-neutral-800 rounded-md focus:ring-neutral-500 focus:border-neutral-500 transition duration-300 placeholder:text-neutral-500"
                        placeholder="e.g., Describe my desk setup and suggest improvements."
                        value={prompt}
                        onChange={(e) => onPromptChange(e.target.value)}
                    />
                </div>
            </div>

            <button
                type="button"
                onClick={onAnalyze}
                disabled={isLoading}
                className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-semibold rounded-md shadow-sm text-black bg-white hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-neutral-900 disabled:bg-neutral-700 disabled:text-neutral-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
            >
                {isLoading ? (
                    <>
                        <LoadingSpinner className="animate-spin -ml-1 mr-3 h-5 w-5" />
                        Thinking...
                    </>
                ) : (
                    "Start Analysis"
                )}
            </button>
        </div>
    );
};

export default InputPanel;