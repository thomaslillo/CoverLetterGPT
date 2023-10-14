import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const openaiApiKey = process.env.OPENAI_API_KEY;

app.use(express.json());
app.use(express.static('public'));

// "home page"
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Cover Letter GPT</h1>');
});

// basic get request health check
app.get('/health-check', (req, res) => {
    console.log('Health Check Request Received');
    // collect server information to return
    const serverInfo = {
        serverName: "CoverLetterGPT",
        serverPort: process.env.PORT,
        serverIP: process.env.SERVER_IP,
        serverTime: new Date().toISOString(),
        serverStatus: 'UP'
    }
    res.status(200).json(serverInfo);
    console.log(serverInfo);
    console.log('Health Check Request Completed');
    console.log(' ');        
});

// the endpoint to call from html
app.post('/generate-cover-letter', async (req, res) => {
    try {
        const { jobDescription, resume } = req.body;
        const coverLetter = await generateCoverLetter(jobDescription, resume);
        // can enable second filter to check and edit the cover letter if quality is bad
        //const refinedCoverLetter = await checkCoverLetter(jobDescription, coverLetter);
        res.json({ coverLetter });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while generating the cover letter.' });
    }
});

// function that generates the inital cover letter
async function generateCoverLetter(jobDescription, resume) {
    const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions';
    // the prompt with added directive
    const prompt = `Using the resume in triple quotes create a cover letter of 250-350 
                    words for the job decription in triple square brackets. 
                    \n\n """ ${resume} """
                    \n\n [[[ ${jobDescription} ]]]`;

    const response = await fetch(openaiEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt,
            max_tokens: 150, // Adjust as needed
        }),
    });

    // for viewing
    console.log(response.status);

    if (response.ok) {
        const data = await response.json();
        return data.choices[0].text;
    } else {
        throw new Error('OpenAI API request failed');
    }
}

// function that checks and edits the generated cover letter compared to the description
async function checkCoverLetter(jobDescription, coverLetter) {
    const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions';
    // the prompt with added directive
    const prompt = `Compare the cover letter in triple quotes to the job 
                    decription in triple square brackets and make an necessary adjustments
                    so that language from the cover letter matches the language in the job description: 
                    \n\n """ ${coverLetter} """
                    \n\n [[[ ${jobDescription} ]]]`;

    const response = await fetch(openaiEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt,
            max_tokens: 150, // Adjust as needed
        }),
    });

    // if the response is ok then return the data
    if (response.ok) {
        const data = await response.json();
        return data.choices[0].text;
    } else {
        throw new Error('OpenAI API request failed');
    }
}

// export function for testing
export { generateCoverLetter }

// start the server and listen for requests
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
