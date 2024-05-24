self.importScripts('https://cdn.jsdelivr.net/pyodide/v0.22.0/full/pyodide.js');

async function initializePyodide() {
    self.pyodide = await loadPyodide();
}

let pyodideReadyPromise = initializePyodide();

self.onmessage = async (event) => {
    await pyodideReadyPromise;

    const { code } = event.data;

    if (typeof code !== 'string') {
        self.postMessage({ error: 'Le code reçu n\'est pas une chaîne de caractères.' });
        return;
    }

    try {
        let result = await self.pyodide.runPythonAsync(code);
        console.log(code);
        self.postMessage({ result });
    } catch (error) {
        self.postMessage({ error: error.message });
    }
};
