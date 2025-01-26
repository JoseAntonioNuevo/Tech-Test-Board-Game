# Board Game - Fullstack Technical Test

This is a simple 1-dimensional board game built for two players (`red` and `blue`). The game is designed to run in a single browser, without multiplayer functionality, authentication, or structured storage.

## Table of Contents

- [Game Description](#game-description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Game Rules](#game-rules)
- [Tests](#tests)
- [Docker Support](#docker-support)
- [Notes](#notes)

---

## Game Description

The board game consists of a 1-dimensional board (`N` fields) where players take turns coloring fields to dominate the board. The game ends when one player has captured all fields of the other player.

This project is implemented using a modern JavaScript framework (e.g., Vue, Angular, or React).

---

## Features

- **Dynamic Board**: The board size is customizable, based on user input before starting the game.
- **Turn-Based Gameplay**: Players alternate turns, with each move affecting nearby fields according to set rules.
- **Game Restart**: A "Start" button to start or restart the game at any time.
- **Winner Detection**: Automatically determines the winner based on the game rules.
- **Docker Support**: Easily set up and run the application with `docker-compose`.
- **Testing**: Includes tests with an automated testing command.

---

## Installation

To run the application locally, follow these steps:

1. Clone the repository:

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

4. Open the application in your browser (usually runs at `http://localhost:3000`).

---

## Usage

### Starting the Game

1. Enter the desired board size (integer `N`).
2. Click the "Start" button to initialize the board.
3. The first player is chosen randomly.

### Playing the Game

- Players take turns clicking on a field to make a move.
- The interface indicates whose turn it is (`red` or `blue`).
- The game follows defined rules for how fields are colored (see below).

---

## Game Rules

### Making a Move

1. Players can:
   - Paint uncolored fields.
   - Recolor fields captured by the opposing player.
2. Fields change according to the following:
   - **Rule 1**: A player cannot move on a field already painted in their color but can move on an uncolored field or one painted by the opponent.
   - **Rule 2**: If empty fields are adjacent to the move and are followed by fields of the same player's color, those empty fields are also colored.
   - **Rule 3**: If opposing fields are adjacent to the move and are followed by fields of the same player's color (with no empty fields separating them), the opposing fields are recolored.
3. The game ends when a player completely dominates the board, either by:
   - Filling all fields with their color, or
   - Capturing all fields of the opposing player.

---

## Tests

Automated tests are included in the project to verify core functionalities. To run tests:

### Without Docker

```bash
npm test
```

### With Docker

```bash
docker-compose run app npm test
```

---

## Docker Support

The application is fully containerized using Docker. To run the application with Docker:

1. Build and run the container:
   ```bash
   docker-compose build
   ```
2. Visit `http://localhost:3000` in your browser.

3. Run Tests: docker-compose run app npm test

---

## Uploaded on Netfily

I also uploaded the app on netlify so you can access online:
https://smartpoint-tech-test-joseantonio.netlify.app

## Notes

- **Atomic Commits**: The repository uses small, clear, and atomic commits to ensure clarity in development history.
- **Initial Commit**: The project starts with a commit for scaffolding/boilerplate code before custom changes.

---
