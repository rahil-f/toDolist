displayAll()

function displayAll() {
    var url = "http://localhost:8080/actions/all";
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = function() {
        var todo = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.log(todo[1])
            display(todo);
        } else {
            console.error(todo);
        }
    }
    xhr.send();
}

function display(todo) {
    const total = document.getElementById('total');

    const i = 0;
    for (const value of todo) {
        var div = document.createElement("div");
        div.setAttribute('id', 'lel')
        var checkbox = document.createElement("INPUT");
        var del = document.createElement("BUTTON")
        checkbox.setAttribute('value', value._id)
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("onclick", "update(this)");
        if (value.isCheck == 'true') {
            div.style.backgroundColor = 'green'
            checkbox.checked = true;
        } else {
            div.style.backgroundColor = 'red'
            checkbox.checked = false;
        }
        del.setAttribute('value', value._id)
        del.setAttribute("onclick", "deletetodo(this)");
        del.innerHTML = 'delete';
        div.innerText = value.action;
        total.appendChild(div);
        div.appendChild(checkbox)
        div.appendChild(del);
    }
}

function clear() {
    document.getElementById('total').innerHTML = '';
}

function update(obj) {
    const id = obj.value;
    let isCheck = 'true';
    if (!obj.checked) {
        isCheck = 'false';
    }
    var url = "http://localhost:8080/actions/update/" + id + "/" + isCheck;
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.send();
    clear();
    displayAll()
}

function deletetodo(obj) {
    const id = obj.value;

    var url = "http://localhost:8080/actions/delete/" + id;
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.send();
    clear();
    displayAll()
}


function newtodo(obj) {
    const action = obj.todo.value;
    console.log(action);
    var url = "http://localhost:8080/actions/add/" + action;
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.send();
    clear();
    displayAll()
}