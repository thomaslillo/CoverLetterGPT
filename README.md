# Cover Letter GPT

Have GPT build you a cover letter so you don't need to! This website and node server use the power of OpenAIs APIs to make your job application process easier.

## Project Contains

The project contains two main parts, a server and a client page that makes requests to the server.

### Node API

Node server that takes advantage of prompt engineering to build cover letters from a job description and resume.

### Webpage with HTMX

A simple website that uses HTMX to make requests to the node server.

## To Do

- Put node server in docker container.
- Allow user input of OpenAI api key
- Allow users to add specific parameters like length
- Allow saving of resumes in session
