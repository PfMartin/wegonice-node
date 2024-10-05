# wegonice-node

API for the wegonice application

## Dev Setup

### Setup local database

- Make sure you have a `.env` file in the root of the project with the required variables
- You can use the `.example.env` file as a template
- Follow the steps below

```bash
cd database
docker compose up -d

cd ..
make db-create-user # Create new wegonice user for wegonice database
make db-connect-user # Verify connection
```
