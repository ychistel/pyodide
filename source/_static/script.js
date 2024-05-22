//window.languagePluginUrl = 'https://cdn.jsdelivr.net/pyodide/v0.16.1/full/';
languagePluginLoader.then(function () {
    console.log(pyodide.runPython(`
        import sys
        sys.version
    `));
    console.log(pyodide.runPython('print(1 + 2)'));
});