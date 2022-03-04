const express = require('express')
const router = express.Router()
const LayoutSchema = require('../Models/LayoutSchema')


router.post('/save', async (req, res) => {
    const { Layout } = req.body
    const result = new LayoutSchema({ Layout })
    result.save()
})

router.post('/update', async (req, res) => {
    const { sectionObject, id, fieldName, layoutObject } = req.body

    let obj = {};

    obj[`Layout.${layoutObject}.${fieldName}`] = sectionObject

    LayoutSchema.findOneAndUpdate({ _id: id }, { $set: obj }, { new: true, upsert: true }, async (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })

})
router.get('/getLayout', async (req, res) => {
    const result = await LayoutSchema.findOne({})
    res.json({
        success: true,
        layout: result
    })
})

router.get('/generate', async (req, res) => {

})


module.exports = router