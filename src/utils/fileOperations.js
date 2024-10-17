import { promises as fs } from 'fs';
import path from 'path';

// Function to read data from a JSON file
export const readJSONFile = async (filename) => {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', filename);
    const fileContents = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    throw error;
  }
};

// Function to write data to a JSON file
export const writeJSONFile = async (filename, data) => {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing file ${filename}:`, error);
    throw error;
  }
};
