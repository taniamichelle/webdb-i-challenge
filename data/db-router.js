const express = require('express');

const db = require('./dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
        .select('*')
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
        .where({ id })
        .first()
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
})

router.post('/', (req, res) => {
    const accountData = req.body;
    db('accounts')
        .insert(accountData, 'id')
        .then(([id]) => {
            db('accounts')
                .where({ id })
                .first()
                .then(account => {
                    res.status(200).json(account)
                })
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

router.put('/:id', (req, res) => {
    const updated = req.body;
    db('accounts')
        .where('id', req.params.id)
        .update(updated)
        .then(count => {
            res.status(200).json({ message: `Updated ${count} records.` });
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

router.delete('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            res.status(200).json({ message: `Deleted ${count} records.` });
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

module.exports = router;
