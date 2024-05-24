from pyscript import document

def afficher(event):
    input_a = document.querySelector("#a")
    input_b = document.querySelector("#b")
    a = input_a.value
    b = input_b.value
    output_div = document.querySelector('#output')
    output_div.innerText = max(a,b)

def max(a,b):
    if a < b:
        print(b)
        return b
    else:
        print(a)
        return a