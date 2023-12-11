# My Wallet - Back-end

Back-end API for My Wallet, a financial transactions management solution.

## About

My Wallet is a web browser application with which you can manage every single aspect of your financial transactions.

## Documentation

Below you will find all the system functionalities with their associated routes and expected input and output values.

</br>

<details>

<summary>POST /accounts/signup</summary>

<b> Creates a new account with given user name, email and password. </b>

Input: user's name, email and password

```javascript
    {
	    userName: string;
	    email: string;
        password: string;
    }
```

Output: Status 201 Created

```http
    Created
```

</details>

<details>

<summary>POST /accounts</summary>

<b> Creates a new session with the provided account data. </b>

Input: user's registered email and password

```javascript
    {
	    email: string;
	    password: string;
    }
```

Output: generated authentication token

```http
    token
```

</details>

<details>

<summary>POST /transactions/new-entry/:type</summary>

<b> Creates a new transaction of either of two types, income or expense. </b>

Input: transaction value, description and date

```javascript
    {
        value: number;
        description: string;
        date: string; //Following "DD/MM" format
    }
```

Output: Status 201 Created

```http
    Created
```

</details>

<details>

<summary>GET /transactions/home</summary>

<b> Returns an user's transactions. </b>

Output: array of all transactions plus the user name.

```javascript
        {
            userName: string;
        	transactions: 
            [
                {
                    _id: string;
                    accountId: string;
                    type: string;
                    value: number;
                    description: string;
                    date: string; //Following "DD/MM" format
                },
                {...},
            ];
        }
```

</details>

<details>

<summary>DELETE /transactions/:id</summary>

<b> Delete transaction with given id. </b>

Output: Status 202 Accepted

```http
    Accepted
```

</details>

<details>

<summary>PUT /transactions/edit-entry/:type/:id</summary>

<b> Update transaction data of given type and id. </b>

Input: transaction new value and description

```javascript
    {
        value: number;
        description: string;
    }
```

Output: Status 202 Accepted

```http
    Accepted
```

</details>

## Deploy

You can experiment the system's features rigth [here](https://my-wallet-api-zzvl.onrender.com)

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Configure the `.env` file using the `.env.example` file
4. Run the back-end in a development environment:

```bash
npm run dev
```

## Building and starting for production

```bash
npm run build
npm start
```

## What to do when add new ENV VARIABLES

There are several things you need to do when you add new ENV VARIABLES:
- Add them to `.env.example` file
