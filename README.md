# My Wallet - Back-end

Back-end API for My Wallet, a financial transactions management solution.

## About

My Wallet is a web browser application with which you can manage every single aspect of your financial transactions.

## Documentation

Below you will find all the system functionalities with their associated routes and expected input and output values.

</br>

<details>

<summary>POST /participants</summary>

<b> Creates a participant with a given initial balance. </b>

Input: participant's name and initial balance.

```typescript
    {
	    name: string;
	    balance: number; // represented in cents, i.e. $ 10.00 -> 1000
    }
```

Output: created participant object

```typescript
    {
    	id: number;
    	createdAt: string;
    	updatedAt: string;
    	name: string;
    	balance: number; // represented in cents, i.e. $ 10.00 -> 1000
    }
```

</details>

<details>

<summary>POST /games</summary>

<b> Creates a new game, with an initial score of 0x0 and marked as not finished. </b>

Input: name of the home team and the visiting team.

```typescript
    {
	    homeTeamName: string;
	    awayTeamName: string;
    }
```

Output: created game object

```typescript
    {
    	id: number;
        createdAt: string;
        updatedAt: string;
        homeTeamName: string;
        awayTeamName: string;
        homeTeamScore: number; // initially 0
        awayTeamScore: number; // initially 0
        isFinished: boolean; // initially false
    }
```

</details>

<details>

<summary>POST /bets</summary>

<b> Register a bet from a participant in a specific game. The bet amount is then immediately deducted from the participant's balance. </b>

Input:

```typescript
    {
        homeTeamScore: number;
        awayTeamScore: number;
        amountBet: number; // represented in cents, i.e. $ 10.00 -> 1000
        gameId: number;
        participantId: number;
    }
```

Output: created bet object

```typescript
    {
        id: number;
        createdAt: string;
        updatedAt: string;
        homeTeamScore: number;
        awayTeamScore: number;
        amountBet: number; // represented in cents, i.e. $ 10.00 -> 1000
        gameId: number;
        participantId: number;
        status: string; // can be PENDING, WON or LOST
        amountWon: number || null; // null when the bet is still PENDING; number if the bet is already WON or LOST, with the amount won represented in cents
    }
```

</details>

<details>

<summary>POST /games/:id/finish </summary>

<b> Finish a game and consequently update all bets linked to it, calculating the amount won in each one and updating the balance of the winning participants. </b>

Input: game's final score.

```typescript
    {
    	homeTeamScore: number;
    	awayTeamScore: number;
    }
```

Output: updated game object

```typescript
    {
    	id: number;
    	createdAt: string;
    	updatedAt: string;
    	homeTeamName: string;
    	awayTeamName: string;
    	homeTeamScore: number;
    	awayTeamScore: number;
    	isFinished: boolean;
    }
```

</details>

<details>

<summary>GET /participants</summary>

<b> Returns all participants and their respective balances. </b>

Output: array of all participants.

```typescript
    [
        {
        	id: number;
        	createdAt: string;
        	updatedAt: string;
        	name: string;
        	balance: number; // represented in cents, i.e. $ 10.00 -> 1000
        },
        {...}
    ]
```

</details>

<details>

<summary>GET /games</summary>

<b> Returns all registered games. </b>

Output: array of all games.

```typescript
    [
        {
        	id: number;
    		createdAt: string;
    		updatedAt: string;
    		homeTeamName: string;
    		awayTeamName: string;
    		homeTeamScore: number;
    		awayTeamScore: number;
    		isFinished: boolean;
        },
        {...}
    ]
```

</details>

<details>

<summary>GET /games/:id</summary>

<b> Returns the data for a game along with the bets linked to it. </b>

Output: the game object containing the array of bets placed on it.

```typescript
    {
    id: number;
    createdAt: string;
    updatedAt: string;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamScore: number;
    awayTeamScore: number;
    isFinished: boolean;
    bets: {
        id: number;
        createdAt: string;
        updatedAt: string;
        homeTeamScore: number;
        awayTeamScore: number;
        amountBet: number; // represented in cents, i.e. R$ 10.00 -> 1000
        gameId: number;
        participantId: number;
        status: string; // can be PENDING, WON or LOST
        amountWon: number || null; // null when the bet is still PENDING; number if the bet is already WON or LOST, with the amount won represented in cents
    }[]
}
```

</details>

## Deploy

You can experiment the system's features rigth [here](https://betly-api.onrender.com)

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with whatever name you want
4. Configure the `.env.development` file using the `.env.example` file (see "Running application locally or inside docker section" for details)
5. Run all migrations

```bash
npm run dev:migration:run
```

6. Run the back-end in a development environment:

```bash
npm run dev
```

## How to run tests

1. Follow the steps in the last section
2. Configure the `.env.test` file using the `.env.example` file (see "Running application locally or inside docker" section for details)
3. Run all migrations:

```bash
npm run test:migration:run
```

4. Run test:

```bash
npm run test
```

## Building and starting for production

```bash
npm run build
npm start
```

## Running migrations or generate prisma clients

Before running migrations make sure you have a postgres db running based on `.env.development` or `.env.test` file for each environment.

You can operate on databases for different environments, but it is necessary to populate correct env variables for each environment first, so in order to perform db operations type the following commands:

- `npm run dev:migration:run` - run migrations for development environment by loading envs from .env.development file. It uses [dotenv-cli](https://github.com/entropitor/dotenv-cli#readme) to load envs from .env.development file.
- `npm run test:migration:run` - the same, but for test environment.

- `npm run dev:migration:generate -- --name ATOMIC_OPERATION_NAME` - generate and run migration and prisma client for development environment by loading envs from .env.development file. Replace `ATOMIC_OPERATION_NAME` by the name of the migration you want to generate.

## What to do when add new ENV VARIABLES

There are several things you need to do when you add new ENV VARIABLES:
- Add them to `.env.example` file
- Add them to your local `.env.development` and `.env.test` files
