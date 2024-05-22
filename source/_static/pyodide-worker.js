// pyodide-worker.js

// Vérifiez que nous sommes dans un contexte de WebWorker
if (typeof importScripts !== 'undefined') {
    console.log("Running in a WebWorker context");
    importScripts('https://cdn.jsdelivr.net/pyodide/v0.22.0/full/pyodide.js');

    let pyodideReadyPromise = (async () => {
        try {
            self.pyodide = await loadPyodide();
            console.log("Pyodide loaded successfully");
        } catch (error) {
            console.error("Error loading Pyodide:", error);
        }
    })();

    self.onmessage = async (event) => {
        const pythonScript = event.data.python;

        await pyodideReadyPromise;  // Assurez-vous que Pyodide est chargé avant de traiter les messages

        try {
            await self.pyodide.loadPackagesFromImports(pythonScript);
            let result;
            try {
                result = await self.pyodide.runPythonAsync(pythonScript);
            } catch (error) {
                result = `Error in Python script: ${error.message}`;
            }

            self.postMessage({ result });
        } catch (error) {
            console.error("Error during Pyodide execution:", error);
            self.postMessage({ result: `Error: ${error.message}` });
        }
    };
} else {
    console.error("importScripts is not defined. This script should be run in a WebWorker.");
}
