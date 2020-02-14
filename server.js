const express = require('express');
const db = require('./model/db');
const jsonMiddleware = express.json();

const portNumber = 8080;

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Expose-Headers", "Access-Control-*")
    res.header("Access-Control-Allow-Headers", "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD')
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    next();
});
app.get('/', (req, res) => {
    res.sendFile('./view/index.html');
});

app.post('/actions/update/:id/:isCheck', (req, res) => {
    db.updateCheck(req.params.id, req.params.isCheck)
        .then(() => {
            return res.status(200).send('update!');
        })
        .catch((err) => {
            return res.status(500).send(err);
        })

})

app.get('/actions/all', (req, res) => {
    console.log('Fetching information for', );
    db.getAllAction()
        .then((response) => {
            return res.status(200).json(response);
        })
        .catch((err) => {
            return res.status(500).send(err);
        })
});

app.get('/actions/:action/infos', (req, res) => {
    console.log('Fetching information for', req.params.action);
    db.getAction(req.params.action)
        .then((actions) => {
            if (actions.length) {
                return res.status(200).json(actions);
            } else {
                return res.status(404).send('action ' + req.params.actions + ' not found');
            }
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
});

app.get('/actions/delete/:id', (req, res) => {
    console.log('Fetching information for', req.params.id);
    const sup = req.params.id;
    db.delAction(req.params.id)
        .then((id) => {
            return res.status(200).send(sup + ' est supprimer');
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
});

app.post('/actions/add/:action', (req, res) => {
    if (!req.params || !req.params.action || typeof req.params.action !== 'string' || req.params.action.length < 1) {
        return res.status(400).send('Parameter "action" is required, should be a string with length > 0')
    }
    db.addAction(req.params.action)
        .then((action) => {
            return res.status(200).send('ajouter!');
        })
        .catch((err) => {
            return res.status(500).send(err);
        })
});



app.listen(portNumber, () => {
    console.log('Express application listening on port', portNumber);
});