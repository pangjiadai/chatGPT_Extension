// Importing required modules
import { v4 as uuidv4 } from 'uuid';

// Function to get ChatGPT Access Token
async function getChatGPTAccessToken() {
  const resp = await fetch('https://chat.openai.com/api/auth/session');
  if (resp.status === 403) {
    throw new Error('CLOUDFLARE');
  }
  const data = await resp.json();
  if (!data.accessToken) {
    throw new Error('UNAUTHORIZED');
  }
  return data.accessToken;
}

// Function to send code to ChatGPT for debugging
async function sendCodeToChatGPTForDebugging(code) {
  const token = await getChatGPTAccessToken();
  const modelName = 'text-davinci-002-render'; // Replace with the model you want to use

  fetch('https://chat.openai.com/backend-api/conversation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      action: 'next',
      messages: [
        {
          id: uuidv4(),
          role: 'user',
          content: {
            content_type: 'text',
            parts: [`Debug this code: ${code}`],
          },
        },
      ],
      model: modelName,
      parent_message_id: uuidv4(),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const debugInfo = data.message?.content?.parts?.[0];
      if (debugInfo) {
        console.log(`Debug Info: ${debugInfo}`);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Example usage
// const userCode = 'const x = 10; console.log(x);'; // Replace with the code you want to debug
// sendCodeToChatGPTForDebugging(userCode);
