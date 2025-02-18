const API_URL = 'http://localhost:5000';

export const analyzeResume = async (file, jobDescription) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('jobDescription', jobDescription);

        const response = await fetch(`${API_URL}/analyze`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}; 