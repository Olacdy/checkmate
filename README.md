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

Here's what you need to be able to run Papermark:

- Node.js (version >= 18)
- MySQL (I use [PlanetScale](https://planetscale.com/))
- [Pusher](https://pusher.com/) (for webhooks)
- [Google OAuth Client](https://console.cloud.google.com/apis/credentials) (for authentication)
- [GitHub OAuth Client](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) (for authentication)
- [Resend](https://resend.com) (for sending emails)

### 1. Clone the repository

```shell
git clone https://github.com/mfts/papermark.git
cd papermark
```

### 2. Install npm dependencies

```shell
npm install
```

### 3. Copy the environment variables to `.env`

```shell
cp .env.example .env
```

### 4. Configure the variables in `.env`

| Variable                   | Value                                  |
| -------------------------- | -------------------------------------- |
| NEXTAUTH_SECRET            | a random string                        |
| DATABASE_URL               | < MySQL database URL >                 |
| GOOGLE_CLIENT_ID           | < Google Client ID >                   |
| GOOGLE_CLIENT_SECRET       | < Google Client Secret >               |
| GITHUB_CLIENT_ID           | < GitHub Client ID >                   |
| GITHUB_CLIENT_SECRET       | < GitHub Client Secret >               |
| RESEND_API_KEY             | < Resend API KEY >                     |
| NEXT_PUBLIC_BASE_URL       | < Your base domain or localhost:3000 > |
| PUSHER_APP_ID              | < Pushers' App ID >                    |
| NEXT_PUBLIC_PUSHER_APP_KEY | < Pushers' App KEY >                   |
| PUSHER_APP_SECRET          | < Pushers' App Secret >                |

### 5. Initialize the database

```shell
npx prisma db push
```

### 6. Run the dev server

```shell
npm run dev
```

### 7. Open the app in your browser

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

CheckMate is an open-source project and we welcome contributions from the community.

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.
