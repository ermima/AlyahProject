import axios from 'axios';

const testProxy = async () => {
    try {
        const response = await axios.get('/api/test'); // Make a GET request to /api/test
        console.log('Response:', response.data); // Log the response to the console
        return response.data;
    } catch (error) {
        console.error('Error:', error); // Log any errors
        throw error;
    }
};

// Call the function to test the proxy
testProxy();