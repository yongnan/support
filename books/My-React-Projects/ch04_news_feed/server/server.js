import path from 'path'
import fs from 'fs'

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter as Router } from "react-router-dom";
import Helmet from 'react-helmet';

import App from '../src/containers/App'
import Header from "../src/components/App/Header";

const PORT = 8080
const app = express()
const router = express.Router()

const serverRenderer = (req, res, next) => {
    const helmet = Helmet.renderStatic();
    fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).send('An error occurred')
        }

        const header = ReactDOMServer.renderToString(<Header />);
        const app = ReactDOMServer.renderToString(<Router><App /></Router>);

        data = data.replace(
            '<div id="root"></div>',
            `<div id="root">${header}${app}</div>`
        );
        data = data.replace(
            '<meta name="helmet"/>',
            `${helmet.title.toString()}${helmet.meta.toString()}`);
        return res.send(data);
    })
}
router.use('^/$', serverRenderer)

router.use(
    express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
)

// tell the app to use the above rules
app.use(router)

// app.use(express.static('./build'))
app.listen(PORT, () => {
    console.log(`SSR running on port ${PORT}`)
})
