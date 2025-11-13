
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                // The result includes the data URL prefix (e.g., "data:image/png;base64,"),
                // so we need to remove it to get just the base64 data.
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
            } else {
                reject(new Error("Couldn't process the selected file. Please try a different image."));
            }
        };
        reader.onerror = (error) => reject(error);
    });
};