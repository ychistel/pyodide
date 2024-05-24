function initializeCodeMirror() {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
        mode: 'python',
        lineNumbers: true,
    });

    const modal = document.getElementById('editorModal');
    const showEditorButton = document.getElementById('showEditorButton');
    const closeButton = document.getElementsByClassName('close')[0];

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
