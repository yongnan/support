import * as model from '../model/item.mjs'
const CatalogItem = model.CatalogItem
const contentTypeJson = {
    'Content-Type' : 'application/json'
}
const contentTypePlainText = {
    'Content-Type' : 'text/plain'
}
const interServerError = 'Internal Server Error'
import fs from 'fs'

export async function findAllItems(res){
    try{
        let result = await CatalogItem.find()
        if (result != null) {
            res.json(result)
        } else {
            res.json({})
        }
    } catch (err){
        console.error(err)
        return null
    }
}

export async function findItemById(gfs, req, res){
    try {
        let result = await CatalogItem.findOne({itemId: req.params.itemId})
        if (!result) {
            if (res != null) {
                res.writeHead(404, contentTypePlainText)
                res.end('Not Found')
            }
            return
        }

        var options = {
            filename: result.itemId,
        }
        gfs.exist(options, function (error, found) {
            if (found) {
                res.setHeader('Content-Type', 'application/json')
                var imageUrl = req.protocol + '://' + req.get('host') + req.baseUrl + req.path + '/image'
                res.setHeader('Image-Url', imageUrl)
                res.send(result)
            } else {
                res.json(result)
            }
        })
    } catch (err){
        console.error(err)
        res.writeHead(500, contentTypePlainText)
        return
    }
}

export async function findItemsByAttribute(key, value, res){
    try{
        var filter = {}
        filter[key] = value
        let result = await CatalogItem.find(filter)
        if (!result) {
            if (res != null) {
                res.writeHead(200, contentTypeJson)
                res.end({})
            }
            return
        }
        if (res != null){
            res.setHeader('Content-Type', 'application/json')
            res.send(result)
        }
    } catch (err){
        console.error(err)
        res.writeHead(500, contentTypePlainText)
        res.end('Internal server error')
        return
    }
}

export async function findItemsByCategory(category, res){
    try{
        let result = await CatalogItem.find({categories: category})
        if (!result) {
            if (res != null) {
                res.writeHead(404, contentTypePlainText)
                res.end('Not Found')
            }
            return
        }

        if (res != null){
            //res.setHeader(contentTypeJson)
            res.setHeader('Content-Type', 'application/json')
            res.send(result)
        }
        console.log(result)
    } catch (err){
        console.error(error)
        res.writeHead(500,	contentTypePlainText)
        return
    }
}

export async function saveItem(req, res){
    let locationUrl, itemImageUrl
    try {
        var item = toItem(req.body)
        console.log(item)
        let result = await CatalogItem.findOne({itemId: item.itemId})
        if (!result) {
            console.log('Item does not exist. Creating a new one')
            result = await item.save()
            if ( !req.path.endsWith('/') ) {
                locationUrl = req.protocol + '://' + req.get('host') + req.baseUrl + req.path + '/' + result.itemId
            } else {
                locationUrl = itemImageUrl = req.protocol + '://' + req.get('host') + req.baseUrl + req.path + result.itemId
            }
            res.setHeader('Location', locationUrl)
            res.end(JSON.stringify(req.body))
        } else {
            console.log('Updating existing item')
            result.itemId = item.itemId
            result.itemName = item.itemName
            result.price = item.price
            result.currency = item.currency
            result.categories = item.categories
            result.save()
            res.json(JSON.stringify(result))
        }
    } catch (err){
        console.log(err)
        res.writeHead(500, contentTypePlainText)
        res.end('Internal Server Error')
        res.end(JSON.stringify(req.body))
    }
}

export async function remove(req, res){
    try{
        console.log('Deleting item with id: '	+ req.params.itemId)
        let data = await CatalogItem.findOne({itemId: req.params.itemId})
        if (!data) {
            console.log('Item not found')
            if (res != null) {
                res.writeHead(404, contentTypePlainText)
                res.end('Not Found')
            }
            return
        } else {
            data.remove(function(error){
                if (!error) {
                    data.remove()
                    res.json({'Status': 'Successfully deleted'})
                }
                else {
                    console.log(error)
                    res.writeHead(500, contentTypePlainText)
                    res.end(interServerError)
                }
            })
        }
    } catch (err){
        console.log(err)
        if (res != null) {
            res.writeHead(500, contentTypePlainText)
            res.end(interServerError)
        }
        return
    }
}

export async function saveImage(gfs, mongodb, req, res){
    try{
        // Check if is existing image
        let file = await mongodb.collection('fs.files').findOne({filename: req.params.itemId})
        if (file != null) {
            let itemId = req.params.itemId
            var options = {
                filename : itemId,
            }

            let chunks = await mongodb.collection('fs.chunks')
            chunks.remove(options, function (error, image) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Successfully deleted privious image chunks for item: ' + itemId)
                }
            })

            let files = await mongodb.collection('fs.files')
            files.remove(options, function (error, image) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Successfully deleted privous image files for primary item: ' + itemId)
                }
            })
        }


        var writeStream = gfs.createWriteStream({
            filename: req.params.itemId,
            //filename: req.files.files.name,
            mode: 'w',
            content_type: req.files.files.type,
            metadata: req.body
        })

        writeStream.on('error', function (error) {
            res.send('500', 'Internal Server Error')
            console.log(error)
            return
        })

        writeStream.on('close', function () {
            readImage(gfs, mongodb, req, res)
        })
        //req.pipe(writeStream)
        fs.createReadStream(req.files.files.path).pipe(writeStream)
    } catch (err){
        console.log(err)
        if (res != null) {
            res.writeHead(500, contentTypePlainText)
            res.end(interServerError)
        }
        return
    }
}

export async function getImage(gfs, mongodb, req, res){
    readImage(gfs, mongodb, req, res)
}

async function readImage(gfs, mongodb, req, res) {
    try{
        let file = await mongodb.collection('fs.files').findOne({filename: req.params.itemId})
        if (file != null) {
            var imageStream = gfs.createReadStream({
                filename: req.params.itemId,
                mode: 'r'
            })

            imageStream.on('error', function (error) {
                console.log(error)
                res.send('404', 'Not found')
                return
            })

            var itemImageUrl = req.protocol + '://' + req.get('host') + req.baseUrl + req.path
            var itemUrl = itemImageUrl.substring(0, itemImageUrl.indexOf('/image'))
            //res.setHeader('Content-Type', 'image/jpeg')
            res.setHeader('Content-Type', file.contentType)
            res.setHeader('Item-Url', itemUrl)
            imageStream.pipe(res)
        }else{
            console.log(error)
            res.send('404', 'Not found')
            return
        }
    } catch (err){
        console.log(err)
        if (res != null) {
            res.writeHead(500, contentTypePlainText)
            res.end(interServerError)
        }
        return
    }
}

export function deleteImage(gfs, mongodb, itemId, res) {
    console.log('Deleting image for itemId:' + itemId)

    var options = {
        filename : itemId,
    }

    var chunks = mongodb.collection('fs.chunks')
    chunks.remove(options, function (error, image) {
        if (error) {
            console.log(error)
            res.send('500', 'Internal Server Error')
            return
        } else {
            console.log('Successfully deleted image for item: ' + itemId)
        }
    })

    var files = mongodb.collection('fs.files')
    files.remove(options, function (error, image) {
        if (error) {
            console.log(error)
            res.send('500', 'Internal Server Error')
            return
        }

        if (image === null) {
            res.send('404', 'Not found')
            return
        } else {
            console.log('Successfully deleted image for primary item: ' + itemId)
            res.json({'deleted': true})
        }
    })
}

export function paginate(model, req, res) {
    var pageSize = parseInt(req.query.limit)
    var page = parseInt(req.query.page)
    if (isNaN(pageSize)) {
        pageSize = 100
    }
    if (isNaN(page) ) {
        page = 1
    }

    model.paginate({}, {page:page, limit:pageSize},
        function (error, result){
            if(error) {
                console.log(error)
                res.writeHead('500',
                    {'Content-Type' : 'text/plain'})
                res.end('Internal Server Error')
            }
            else {
                res.json(result)
            }
        })
}

function toItem(body) {
    return new CatalogItem({
        itemId: body.itemId,
        itemName: body.itemName,
        price: body.price,
        currency: body.currency,
        categories: body.categories
    })
}

