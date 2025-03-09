const testProxy = async () => {
    try {
        const response = await fetch('/api/test'); // Make a GET request to /api/test
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the JSON response
        console.log('Response:', data); // Log the response to the console
        return data;
    } catch (error) {
        console.error('Error:', error); // Log any errors
        throw error;
    }
};

// Call the function to test the proxy
testProxy();