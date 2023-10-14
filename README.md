# Cover Letter GPT

Have GPT build you a cover letter so you don't need to! This website and node server use the power of OpenAIs APIs to make your job application process easier.

## Project Contains

The project contains two main parts, a server and a client page that makes requests to the server.

**Espress.js REST API**

Express.js REST API running on a node.js server that takes advantage of prompt engineering to build cover letters from a job description and resume.

**Webpage with HTMX**

A simple website that uses HTMX to make requests to the node server.

## How to Run

**Build the image**

Go to the server folder that has the Dockerfile and run the following command to build the Docker image. The -t flag lets you tag your image so it's easier to find later using the docker images command:

```docker build . -t <your username>/cover-letter-gpt```

**Run the Image**

Running the image with -d runs the container in detached mode, leaving the container running in the background. The -p flag redirects a public port to a private port inside the container. Run the image you previously built:

```docker run -p 49160:8080 -d <your username>/cover-letter-gpt```

## To Do

- Allow user input of OpenAI api key
- Allow users to add specific parameters like length
- Allow saving of resumes in session
