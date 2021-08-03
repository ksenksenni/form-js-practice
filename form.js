let form = document.querySelector('form');
let areas = document.querySelectorAll('.area');
let button = document.querySelector('btn');

const createNotice = (message, color) => {
    const notice = document.createElement('div');
    notice.classList.add('notice', color);

    const text = document.createElement('p');
    text.textContent = message;

    const btn = document.createElement('div');
    btn.classList.add('close-btn');

    btn.onclick = removeNotice

    notice.appendChild(text)
    notice.appendChild(btn)

    const inputName = form.querySelector('input[name="name"]');
    inputName.parentNode.insertBefore(notice, inputName);
}

function removeNotice() {
    let notice = document.querySelector('.notice');

    if (notice) {
        notice.remove()
    }
}


form.onsubmit = function(evt) {
    evt.preventDefault()

    const params = {
        name: form.elements.name.value,
        email: form.elements.email.value,
        phone: form.elements.phone.value,
    }

    fetch('http://localhost:3000/registration', {
        method: 'POST',
        headers: {
            "Origin": 'http://localhost:3000/',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

        body: `name=${params.name}&email=${params.email}&phone=${params.phone}`,

    }).then(function(res) {
        if (res.status !== 200) {
            throw new Error();
        }
    }).then(function() {
        console.log('good')
        createNotice("Все ок", "green")
        for (let area of areas) {
            area.value = '';
        }
    }).catch(function() {
        createNotice("Все плохо", "red")
        console.log('bad')
    });
    button.onclick = removeNotice
}
