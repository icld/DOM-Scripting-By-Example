// document.addEventListener('DOMContentLoaded', () => {
const form = document.getElementById('registrar');
const mainDiv = document.querySelector('.main')
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');

const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterSelectOptionList = ['--All--', 'yes', 'no', 'maybe']
const filterSelect = createSelect(filterSelectOptionList)

filterLabel.textContent = `Show me:`;
filterSelect.className = 'select';
div.appendChild(filterLabel);
div.appendChild(filterSelect);
mainDiv.insertBefore(div, ul);

// creates a select and several options based on a provided array. adds options to select 
function createSelect(arr) {
    const select = document.createElement('select');
    for (let i = 0; i < arr.length; i++) {
        let option = document.createElement('option');
        option.value = arr[i];
        option.text = arr[i];
        option.id = arr[i]
        select.add(option)
    }
    return select
}

filterSelect.addEventListener('change', (e) => {
    const optionValue = e.target.value;
    // const select = docuent
    const lis = ul.children;
    if (optionValue === '--All--') {
        for (let i = 0; i < lis.length; i++) {
            let li = lis[i];
            li.style.display = ''
        }
    } else if (optionValue === 'yes') {
        for (let i = 0; i < lis.length; i++) {
            let li = lis[i];
            if (li.className === 'respondedYes') {
                li.style.display = ''
            } else {
                li.style.display = 'none'
            }
        }
    } else if (optionValue === 'no') {
        for (let i = 0; i < lis.length; i++) {
            let li = lis[i];
            if (li.className === 'respondedNo') {
                li.style.display = ''
            } else {
                li.style.display = 'none'
            }
        }
    } else if (optionValue === 'maybe') {
        for (let i = 0; i < lis.length; i++) {
            let li = lis[i];
            if (li.className === 'respondedMaybe') {
                li.style.display = ''
            } else {
                li.style.display = 'none'
            }
        }
    }
});

function createLI(text) {
    function createElement(elementName, property, value) {
        const element = document.createElement(elementName);
        element[property] = value;
        return element
    }

    function appendToLI(elementName, property, value) {
        const element = createElement(elementName, property, value);
        li.appendChild(element);
        return element
    }
    const li = document.createElement('li');
    const liSelect = ['Are You Coming?', 'yes', 'no', 'maybe']

    appendToLI('span', 'textContent', text);
    appendToLI('label', 'textContent', 'Are You Coming?').appendChild(createSelect(liSelect));

    appendToLI('button', 'textContent', 'edit');
    appendToLI('button', 'textContent', 'remove');
    return li;
}

function alertMe() {
    const alertMe = document.createElement('div')
    const header = form.parentNode
    const button = form.lastElementChild;
    button.style.backgroundColor = 'red';
    alertMe.className = 'alert'
    alertMe.textContent = `You Forgot To Enter a Name!`;
    header.insertBefore(alertMe, form)
}

function removeAlert() {

    const header = form.parentNode
    const button = form.lastElementChild;
    const alertMe = document.getElementsByClassName('alert')[0];
    button.style.backgroundColor = '';
    // alertMe.className = 'alert'
    header.removeChild(alertMe)
}

// listens for submit in the form.  provides alert if empty string.  
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const header = form.parentNode
    const button = form.lastElementChild;
    const text = input.value;
    if (text == '' && button.style.backgroundColor != 'red') {
        alertMe()
    } else if (text === '' && button.style.backgroundColor === 'red') {
        removeAlert()
        alertMe()
    } else if (text != '' && button.style.backgroundColor === 'red') {
        input.value = ''
        const li = createLI(text)
        ul.appendChild(li);
        removeAlert()
    } else {
        input.value = ''
        const li = createLI(text)
        ul.appendChild(li);
    }

}
);



ul.addEventListener('change', (e) => {
    const select = e.target;
    const state = e.target.value;
    const listItem = select.parentNode.parentNode;

    if (state === 'yes') {
        listItem.className = 'respondedYes'
    } else if (state === 'no') {
        listItem.className = 'respondedNo'
    } else if (state === 'maybe') {
        listItem.className = 'respondedMaybe'
    }
});

ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        const li = button.parentNode;
        const ul = li.parentNode;
        const action = button.textContent
        const nameActions = {
            remove: () => {
                ul.removeChild(li);
            },
            edit: () => {
                const span = li.firstElementChild;
                const input = document.createElement('input');
                input.type = 'text';
                input.value = span.textContent;
                li.insertBefore(input, span);
                li.removeChild(span);
                button.textContent = 'save';
            },
            save: () => {
                const input = li.firstElementChild;
                const span = document.createElement('span')
                span.textContent = input.value;
                li.insertBefore(span, input);
                li.removeChild(input);
                button.textContent = 'edit'
            }
        }
        // select and run action in button's name
        nameActions[action]();
    }
});