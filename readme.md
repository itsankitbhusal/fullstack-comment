# Readme 👇

## Clone The Repository

```bash
> git clone https://github.com/itsankitbhusal/fullstack-comment
```

## Setup Backend

```bash
> cd fullstack-comment && cd backend
```

1. Install the dependencies

   ```bash
   > composer install
   ```

1. Create a new database for it|| can also create while migrating
1. Add the **database name**, **user**, **password** in `.env` file referring to `.env.example`
1. Run the migration
   ```bash
    > php artisan migrate
   ```
1. Seed the comment table for some data

   ```bash
   > php artisan db:seed --class=CommentSeeder
   ```

1. Start the backend server now

   ```bash
   > php artisan serve
   ```

   after the server is ready you can view something like this in terminal

   ```bash
      INFO  Server running on [http://127.0.0.1:8000].
   ```

## Setup Frontend

```bash
> cd fullstack-comment && cd frontend
```

1. Install the dependencies
   ```bash
   > pnpm install
   ```
2. Add the environment variables referring to `.env.example` add the backend url and add `/api` at end
   ```bash
   VITE_API_URL=http://127.0.0.1:8000/api
   ```
3. Run the frontend project

   ```bash
   > pnpm run dev
   ```

## API Documentation

[Click here to visit API Documentation](https://documenter.getpostman.com/view/23451188/2sA3JGdi6a)

# Thank You 😃
