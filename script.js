const fs = require("node:fs/promises");
const readline = require("node:readline");

const featureName = process.argv.splice(2);

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(/\s+/g, "");
}

async function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

const createFeatureFilesAndFolders = async feature => {
  try {
    const containerName =
      feature.charAt(0).toUpperCase().trim() + feature.slice(1).trim();
    await fs.mkdir(`src/screens/${containerName}`);

    const baseContainerCode = `import {View} from "react-native"; const ${containerName} = () => {return (<View/>);};export default ${containerName};`;

    await fs.writeFile(
      `src/screens/${containerName}/${containerName}.js`,
      baseContainerCode,
    );

    await fs.writeFile(
      `src/screens/${containerName}/index.js`,
      `export { default as ${containerName} } from "./${containerName}";`,
    );

    const createActions = await askQuestion(
      `Create actions file for ${containerName}? (y/n): `,
    );

    if (createActions.toLowerCase() === "y") {
      await fs.open(`src/store/actions/${feature}.actions.js`, "a");
    }

    const createReducer = await askQuestion(
      `Create reducer file for ${containerName}? (y/n): `,
    );
    if (createReducer.toLowerCase() === "y") {
      const reducerCode = `
              import { createSlice } from "@reduxjs/toolkit";

              const initialState = {
                isLoading: false,
                errorMessage: "",
                successMessage: "",
              };

              const ${containerName}Reducer = createSlice({
                name: "${feature}",
                initialState,
                reducers: {
                  // standard reducer logic, with auto-generated action types per reducer
                },
                extraReducers: (builder) => {},
              });

              export default ${containerName}Reducer.reducer;
          `;

      await fs.writeFile(
        `src/store/reducers/${feature}.reducer.js`,
        reducerCode,
      );
    }
  } catch (error) {
    console.error(error);
  }
};

if (featureName.length) {
  createFeatureFilesAndFolders(camelize(featureName[0]));
} else {
  console.error("Please Provide Feature Name");
}
