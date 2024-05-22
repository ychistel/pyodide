// pyodide-worker.js

self.importScripts('https://cdn.jsdelivr.net/pyodide/v0.22.0/full/pyodide.js');

async function loadPyodideAndPackages() {
    // Charger Pyodide
    self.pyodide = await loadPyodide();
    console.log("Pyodide loaded");
}

loadPyodideAndPackages();

self.onmessage = async (event) => {
    const pythonScript = event.data.python;

    // Attendre que Pyodide soit prêt avant d'exécuter le script
    await self.pyodide.loadPackagesFromImports(pythonScript);
    let result;
    try {
        result = await self.pyodide.runPythonAsync(pythonScript);
    } catch (error) {
        result = `Error: ${error.message}`;
    }

    // Renvoyer le résultat au thread principal
    self.postMessage({ result });
};
