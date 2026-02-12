const axios = require('axios');

async function testAPI() {
    try {
        console.log('Testing backend API...\n');

        const response = await axios.post('http://localhost:5000/api/analyze-resume', {
            resumeText: 'John Doe - Full Stack Developer with 3 years experience in React, Node.js, and MongoDB. Built multiple production applications.',
            role: 'Full Stack Developer',
            companyType: 'Startup'
        });

        console.log('✅ API is working!\n');
        console.log('Response data:');
        console.log(JSON.stringify(response.data, null, 2));

    } catch (error) {
        console.log('❌ API Error:');
        console.log('Status:', error.response?.status);
        console.log('Message:', error.message);
        console.log('Data:', error.response?.data);
    }
}

testAPI();
