.. _index:

Welcome to My Project's documentation!
======================================

.. raw:: html
        
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        #editor {
            height: 300px;
            border: 1px solid #ccc;
        }
        #output {
            margin-top: 20px;
            padding: 10px;
            border: 1px solid #ccc;
            background-color: #f9f9f9;
        }
        .modalpython {
            display: none;
            position: fixed;
            z-index: 5000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
            padding-top: 60px;
            padding-left:30px;
        }
        .modalpython-content {
            background-color: #fefefe;
            margin: 2% auto;
            padding: 4px;
            border: 1px solid #888;
            width: 96%%;
        }
        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }
        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
    </style>
    <h1>Python Code Editor with PyScript</h1>
    <button id="showEditorButton">Afficher l'éditeur</button>

    <div id="editorModal" class="modalpython-content">
        <span class="close">&times;</span>
        <textarea id="editor"></textarea>
        <button id="runButton">Run</button>
        <button id="clearButton">Effacer</button>
        <button id="downloadButton">Télécharger</button>
        <input type="file" id="uploadInput" style="display:none;">
        <button id="uploadButton">Téléverser</button>
        <div id="output"></div>
    </div>
    
    <script>
        function initializeCodeMirror() {
            const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
                mode: 'python',
                lineNumbers: true,
                theme: "default"
            });

            const modal = document.getElementById('editorModal');
            const showEditorButton = document.getElementById('showEditorButton');
            const closeButton = document.getElementsByClassName('close')[0];
            modal.style.display = 'none';

            showEditorButton.onclick = function() {
                modal.style.display = 'block';
            }

            closeButton.onclick = function() {
                modal.style.display = 'none';
            }

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            }

            document.getElementById('runButton').addEventListener('click', () => {
                const code = editor.getValue();
                const existingScript = document.getElementById('pyscript-exec');
                if (existingScript) {
                    existingScript.remove();
                }
                const pyscript = document.createElement('py-script');
                pyscript.setAttribute('output', 'output');
                pyscript.id = 'pyscript-exec';
                pyscript.innerHTML = code;
                document.body.appendChild(pyscript);
            });

            document.getElementById('clearButton').addEventListener('click', () => {
                editor.setValue('');
                document.getElementById('output').innerHTML = '';
            });

            document.getElementById('downloadButton').addEventListener('click', () => {
                const code = editor.getValue();
                const blob = new Blob([code], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'code.py';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });

            document.getElementById('uploadButton').addEventListener('click', () => {
                document.getElementById('uploadInput').click();
            });

            document.getElementById('uploadInput').addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const content = e.target.result;
                        editor.setValue(content);
                    };
                    reader.readAsText(file);
                }
            });
        }

        // Vérifiez la disponibilité de CodeMirror et initialisez l'éditeur
        document.addEventListener('DOMContentLoaded', function () {
            function checkCodeMirror() {
                if (typeof CodeMirror !== 'undefined') {
                    initializeCodeMirror();
                } else {
                    setTimeout(checkCodeMirror, 50);
                }
            }
            checkCodeMirror();
        });

    </script>
    