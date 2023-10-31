const PouchDB = require('pouchdb');

const localDB = new PouchDB('DataServer');
const remoteDB = new PouchDB('http://admin:ingeniero@192.168.1.106:5984/remotedb');

function post() {

    var usuario = {
        /* _id: new Date().toISOString(), */
        document: document.getElementById("idNumber").value,
        name: document.getElementById("idName").value,
        lastName: document.getElementById("idLastName").value,
        address: document.getElementById("idAddress").value,
        socialClass: document.getElementById("idSocialClass").value,
        phone: document.getElementById("idPhone").value,
        email: document.getElementById("idEmail").value,
    };

    if (usuario.document == "" || usuario.name == "" ||
     usuario.lastName == "" || usuario.address == "" ||
     usuario.socialClass == "" || usuario.phone == "" ||
     usuario.email == "") {
        alert("Por favor llene todos los campos");
        return;
    }else{
        localDB.put(usuario).then(function (response) {
            alert('Se agregó el usuario');
        }).catch(function (err) {
            alert('El usuario no se registró');
            console.log(err, "No se pudo agregar el usuario");
        });
    }
}


var show = document.getElementById("show");

if (show){
    show.addEventListener("click", () => {
        localDB.allDocs({ include_docs: true }).then(function (docs) {
            console.log(docs.rows);
            let tbody = document.getElementById("tbody");
            tbody.innerHTML = ""; // Clear the existing rows
            for (let i = 0; i < docs.rows.length; i++) {
                let tr = document.createElement("tr");
                let doc = docs.rows[i].doc;
                Object.keys(doc).forEach(key => {
                    let td = document.createElement("td");
                    td.textContent = doc[key];
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            }
        });
    });
}



function sync() {

    localDB.replicate.to(remoteDB).on('complete', function () {
        alert("Base de datos sincronizada con éxito");
        console.log("Se sincronizó la base de datos");
    }).on('error', function (err) {
        alert("Error al sincronizar la base de datos");
        console.log("Error al sincronizar la base de datos: ", err);
    });

    /* localDB.sync(remoteDB, {
        live: true,
        retry: true
    }).on('change', function (change) {
        console.log("Cambios: ", change);
    }).on('error', function (err) {
        console.log("Error al sincronizar con la base de datos: ", err);
    });
     */
}

/* sync.addEventListener('click', () => {
    
}) */