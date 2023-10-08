# CheckMate

## About

This project focuses on simple task - to create schema for data validation with simple UI.

After creating one, users would be able to get an endpoint to validate their data with included authorization key.

All validations will be displayed in real-time, for all schemas or for each individual.

Try to validate data with a sample schema:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 33,
  "birthDate": "10-10-1990"
}
```

On this endpoint (no authorization key required): `https://checkmate-inky.vercel.app/api/v1/1`

## Running locally

1. Populate .env file according to .env.example

2. Install all the dependencies:

```bash
npm i
```

3. Start development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
