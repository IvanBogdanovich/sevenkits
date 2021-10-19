// mutation observer
let observer;

const init = () => {
    // node observed
    let paragraphes = document.querySelector('#first')
    paragraphes.addEventListener('click', change)

    let config = {
        attributes: true, // change attributes node
        attributeFilter: ['data', 'custom'], // watch only this attributes.
        childList: true, // only children node
        subtree: true, // all deep children
        characterData: true, // text node
    };

    // declare Observer and observe for watch node
    observer = new MutationObserver(mutated)
    observer.observe(paragraphes, config)
}

// callback for observed node
const change = (ev) => {
    let paragraphes = ev.currentTarget

    paragraphes.textContent = 'yo yo mother fuck'
    paragraphes.setAttribute('data', 'some-data')
}

// function argument for MutationObserver
const mutated = (mutationList) => {
    console.log('mutationList', mutationList)
    for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
            console.log('children was changed')
        }
        else if (mutation.type === 'attributes') {
            console.log(mutation.attributeName)
        }
    }

    // disconnect observe
    observer.disconnect();
}

document.addEventListener('DOMContentLoaded', init)


// submit for xhr
function sendData() {
    const data = {
        name: 'super duper user',
        color: 'rebeccapurple'
    }
    const url = '/super-site/'

    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader(
        'Content-type',
        'application/json'
    )
    xhr.send(JSON.stringify(data))
}
