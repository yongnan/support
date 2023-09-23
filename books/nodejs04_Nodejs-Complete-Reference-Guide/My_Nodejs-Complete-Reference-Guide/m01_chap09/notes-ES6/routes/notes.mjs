'use strict';

import util from 'util';
import express from 'express';
//import * as notes from '../models/notes-memory';
import { ensureAuthenticated } from './users';
import * as notes from '../models/notes';
export const router = express.Router();

// Add Note. (create)
router.get('/add', ensureAuthenticated, (req, res, next) => {
    res.render('noteedit', {
        title: "Add a Note",
        docreate: true,
        notekey: "",
        user: req.user,
        note: undefined
    });
});

// Save Note (update)
router.post('/save', ensureAuthenticated, async (req, res, next) => {
    var note;
    if (req.body.docreate === "create") {
        note = await notes.create(req.body.notekey,
                req.body.title, req.body.body);
    } else {
        note = await notes.update(req.body.notekey,
                req.body.title, req.body.body);
        //util.inspect(note);
    }
    res.redirect('/notes/view?key='+ req.body.notekey);
    //res.redirect('/');
});

// Read Note (read)
router.get('/view', async (req, res, next) => {
    var note = await notes.read(req.query.key);
    res.render('noteview', {
        title: note ? note.title : "",
        notekey: req.query.key,
        user: req.user ? req.user : undefined,
        note: note
    });
});

// Edit note (update)
router.get('/edit', ensureAuthenticated, async (req, res, next) => {
    try {
        var note = await notes.read(req.query.key);
        res.render('noteedit', {
            title: note ? ("Edit " + note.title) : "Add a Note",
            docreate: false,
            notekey: req.query.key,
            user: req.user ? req.user : undefined,
            note: note
        });
    } catch (e) {
        error(`/edit ERROR ${e.stack}`);
        next(e);
    }
});

// Ask to Delete note (destroy)
router.get('/destroy', ensureAuthenticated, async (req, res, next) => {
    var note = await notes.read(req.query.key);
    res.render('notedestroy', {
        title: note ? `Delete ${note.title}` : "",
        notekey: req.query.key,
        user: req.user ? req.user : undefined,
        note: note
    });
});

// Really destroy note (destroy)
router.post('/destroy/confirm', ensureAuthenticated, async (req, res, next) => {
    await notes.destroy(req.body.notekey);
    res.redirect('/');
});

export function socketio(io) {
    notes.events.on('noteupdate',  newnote => {
        io.of('/view').emit('noteupdate', newnote);
    });
    notes.events.on('notedestroy', data => {
        io.of('/view').emit('notedestroy', data);
    });
};

import * as messages from '../models/messages-sequelize';

// Save incoming message to message pool, then broadcast it
router.post('/make-comment', ensureAuthenticated, async (req, res, next) => {
    try {
        await messages.postMessage(req.body.from,
            req.body.namespace, req.body.message);
        res.status(200).json({ });
    } catch(err) {
        res.status(500).end(err.stack);
    }
});

// Delete the indicated message
router.post('/del-message', ensureAuthenticated, async (req, res, next) => {
    try {
        await messages.destroyMessage(req.body.id, req.body.namespace);
        res.status(200).json({ });
    } catch(err) {
        res.status(500).end(err.stack);
    }
});