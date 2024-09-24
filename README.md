# Text Modification Project

This project is a Node.js application that modifies text files using various strategies. It reads input files from an `input` folder, applies specified modification strategies, and saves the results in an `output` folder.

## Features

- Supports multiple text modification strategies:
  - LowerCaseStrategy: Converts text to lowercase
  - UpperCaseStrategy: Converts text to uppercase
  - ReverseTextStrategy: Reverses the text (both lines and characters)
  - RemoveStringStrategy: Removes specified strings from the text

## Project Structure

```
project_root/
│
├── src/
│   ├── config/
│   ├── errors/
│   ├── interfaces/
│   ├── services/
│   ├── strategies/
│   ├── tests/
│   ├── utils/
│   └── index.ts
│
├── input/
├── output/
├── .env
└── package.json
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

## Usage

To run the application:

```
npm start
```

This will process the input files using the defined strategies and save the results in the output folder.

To run tests:

```
npm test
```

## Configuration

You can modify the input files and strategies in `src/index.ts`:

- `inputFiles`: Array of input file names
- `strategies`: Array of strategy combinations to apply to each input file

## Environment Variables

- `INPUT_FOLDER`: Path to the input folder (default: ./input)
- `OUTPUT_FOLDER`: Path to the output folder (default: ./output)
