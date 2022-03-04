require('dotenv').config({ path: ".env" })
const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const connectDB = require('./Config/db')
const path = require('path')
const { format, rarity, defaultEdition } = require('./Config/config')
var multer = require('multer')
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(format.width, format.height)
const ctx = canvas.getContext("2d")

let metadata = [];
let attributes = [];
let hash = [];
let decodedHash = [];
const Exists = new Map();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

connectDB()


app.use('/api/auth', require('./Routes/auth'))
app.use('/api/layout', require('./Routes/layout'))



let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let i = 0

        fs.mkdir(`./Layers/${file.fieldname}`, () => {
            cb(null, `./Layers/${file.fieldname}`)
        })
    },
    filename: function (req, file, cb) {
        // console.log(file)
        cb(null, file.originalname)
        // cb(null, Date.now() + '-' + file.originalname)
    }
})

let upload = multer({ storage }).any()



const buildDir = `build`;
const metDataFile = '_metadata.json';
const layersDir = `Layers`;

const addRarity = _str => {
    let itemRarity;

    rarity.forEach((r) => {
        if (_str.includes(r.key)) {
            itemRarity = r.val;
        }
    });

    return itemRarity;
};

const cleanName = _str => {
    let name = _str.slice(0, -4);
    rarity.forEach((r) => {
        name = name.replace(r.key, "");
    });
    return name;
};

const addMetadata = _edition => {
    console.log("add meta data working")
    let dateTime = Date.now();
    let tempMetadata = {
        hash: hash.join(""),
        decodedHash: decodedHash,
        edition: _edition,
        date: dateTime,
        attributes: attributes,
    };
    metadata.push(tempMetadata);
    attributes = [];
    hash = [];
    decodedHash = [];
};

const createMetaData = () => {
    fs.stat(`${buildDir}/${metDataFile}`, (err) => {
        if (err == null || err.code === 'ENOENT') {
            fs.writeFileSync(`${buildDir}/${metDataFile}`, JSON.stringify(metadata, null, 2));
        } else {
            console.log('Oh no, error: ', err.code);
        }
    });
};

const addAttributes = (_element, _layer) => {
    let tempAttr = {
        id: _element.id,
        layer: _layer.name,
        name: _element.name,
        rarity: _element.rarity,
    };
    attributes.push(tempAttr);
    hash.push(_layer.id);
    hash.push(_element.id);
    decodedHash.push({ [_layer.id]: _element.id });
};


const getElements = path => {
    console.log('get elements working')
    return fs
        .readdirSync(path)
        .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
        .map((i, index) => {
            return {
                id: index + 1,
                name: cleanName(i),
                fileName: i,
                rarity: addRarity(i),
            };
        });
};

const saveLayer = (_canvas, _edition) => {
    fs.writeFileSync(`${buildDir}/${_edition}.png`, _canvas.toBuffer("image/png"));
};


const drawLayer = async (_layer, _edition) => {

    const rand = Math.random();
    let element =
        _layer.elements[Math.floor(rand * _layer.number)] ? _layer.elements[Math.floor(rand * _layer.number)] : null;
    if (element) {
        addAttributes(element, _layer);
        const image = await loadImage(`${_layer.location}${element.fileName}`);

        ctx.drawImage(
            image,
            _layer.position.x,
            _layer.position.y,
            _layer.size.width,
            _layer.size.height
        );
        saveLayer(canvas, _edition);
    }
};



const layersSetup = layersOrder => {
    console.log(layersOrder)
    const layers = layersOrder.map((layerObj, index) => {
        console.log(layerObj, "LAYERSS")
        // let number = fs.readdirSync(`./Layers/${layerObj.name}/`).length
        return ({
            id: index,
            name: layerObj.name,
            location: `${layersDir}/${layerObj.name}/`,
            elements: getElements(`${layersDir}/${layerObj.name}/`),
            position: { x: 0, y: 0 },
            size: { width: format.width, height: format.height },
            number: layerObj.number
        })
    })

    return layers;
};


const createFiles = async (edition, _layerOder) => {
    console.log("create files working")

    const layers = layersSetup(_layerOder);

    console.log(layers, 'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')

    let numDupes = 0;
    for (let i = 1; i <= edition; i++) {
        await layers.forEach(async (layer) => {
            await drawLayer(layer, i);
        });

        let key = hash.toString();
        if (Exists.has(key)) {
            console.log(
                `Duplicate creation for edition ${i}. Same as edition ${Exists.get(
                    key
                )}`
            );
            numDupes++;
            if (numDupes > edition) break; //prevents infinite loop if no more unique items can be created
            i--;
        } else {
            Exists.set(key, i);
            addMetadata(i);
            console.log("Creating edition " + i);
        }
    }
};


app.post('/generate', async (req, res) => {

    // const { inputFields } = req.body
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        // await req.files.map(file => layerOrd.push({
        //     fil
        // }))


        let layerOrd = []
        let promise = new Promise((resolve, reject) => {

            if (fs.existsSync(`./Layers`)) {
                fs.readdir(`./Layers`, function (err, folders) {
                    folders.forEach(folderName => {
                        const imagesLength = fs.readdirSync(`./Layers/${folderName}/`).length
                        layerOrd.push({ name: folderName, number: imagesLength })
                        resolve(layerOrd)
                    });
                })

            } else {
                reject("errr")
                console.log("File Do Not Exist")
            }
        })

        // p1.then((result)=>{
        //     console.log(result, "1st console")

        //     createFiles(5, layerOrd)
        //     createMetaData()
        // })


        Promise.all([promise]).then(res => {
            console.log(res)
            createFiles(100, layerOrd)
            createMetaData()
        })

        // req.files.forEach(file => {
        //     console.log(file)
        //     fs.readdir(`${file.destination}`, function (err, files) {
        //         // "files" is an Array with files names
        //         if (!files) return
        //         console.log(files)
        //     });

        // })
        return console.log(req.files)

        return res.status(200).send(req.file)
    })





    // if (!inputFields) return

    // inputFields.forEach((inputField, index) => {
    //     fs.mkdir(`./Layers/${inputField.LayerName}`, () => {
    //         // fs.writeFileSync(`${inputField.images[index].name}`)
    //         console.log("running")
    //     })
    // });

    // console.log(inputFields)



})

// app.use(express.static(path.join(__dirname , "../client/build")));
// app.get("*" , (req,res)=>{
//     res.sendFile(path.resolve(__dirname , "../client/build/index.html"))
// })


// app.post('/test', (req, res) => {
//     res.send("WORKING")
// })


const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
    console.log("server is running")
})



process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});
