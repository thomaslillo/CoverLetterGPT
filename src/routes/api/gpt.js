import axios from 'axios';

/**
 * @param {{ body: { prompt1: any; prompt2: any; }; }} req
 */
export async function post(req) {
  const { prompt1, prompt2 } = req.body;
  const prompt = `${prompt1}\n${prompt2}`;

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt,
      max_tokens: 100
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}`
      }
    });

    return {
      status: 200,
      body: {
        response: response.data.choices[0].text
      }
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        error: 'OpenAI API request failed'
      }
    };
  }
}
