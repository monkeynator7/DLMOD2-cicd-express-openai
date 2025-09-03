** render service suspended **

```yaml
openapi: 3.0.0
info:
  title: Express Server API
  version: 1.0.0
  description: >
    Basic Express server that loads environment variables from a `.env` file,  
    listens on a configurable port (default 3000), provides status information,  
    and integrates with OpenAI's GPT-3.5 Turbo for chat responses.
servers:
  - url: http://localhost:3000
paths:
  /:
    get:
      summary: Root endpoint
      description: Returns a simple text message indicating that the Express server is running.
      responses:
        '200':
          description: Successful response with text.
          content:
            text/plain:
              schema:
                type: string
                example: "Express server working!"

  /status:
    get:
      summary: Server status endpoint
      description: Returns a JSON object indicating the server is running and includes the current timestamp.
      responses:
        '200':
          description: Successful status response.
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: "ok"
                  timestamp:
                    type: string
                    format: date-time
                    example: "2025-09-02T21:14:45.123Z"

  /chat:
    post:
      summary: Get an AI-generated answer to a question
      description: >
        Accepts a JSON body containing a `question` string and returns  
        an AI-generated response using OpenAI's GPT-3.5 Turbo model.  
        Validates the input and handles errors gracefully.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                question:
                  type: string
                  description: The question to ask the AI.
                  example: "What is the capital of France?"
              required:
                - question
      responses:
        '200':
          description: Successful response with AI-generated answer.
          content:
            application/json:
              schema:
                type: object
                properties:
                  answer:
                    type: string
                    description: The AI-generated answer.
                example:
                  answer: "The capital of France is Paris."
        '400':
          description: Invalid request when the question is missing or not a valid non-empty string.
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Details about why the request failed.
                example:
                  error: "Question is required and must be a non-empty string."
        '500':
          description: Internal server error when communication with OpenAI fails.
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    description: Details about the internal error.
                example:
                  error: "Error communicating with OpenAI"
