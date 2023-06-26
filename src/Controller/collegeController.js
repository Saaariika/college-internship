const mongoose = require('mongoose')
const collegeModel = require('../Model/College.js')

const college = async function (req, res) {
    try {
        if (req.body.name == undefined || req.body.name == "" || req.body.name == null || !req.body.name) { return res.status(400).send({ message: "name is needed", status: false }) }

        if (req.body.fullName == undefined || req.body.fullName == "" || req.body.fullName == null || !req.body.fullName) { return res.status(400).send({ message: "full name is needed", status: false }) }

        if (req.body.logolink == undefined || req.body.logolink == "" || req.body.logolink == null || !req.body.logolink) { return res.status(400).send({ message: "logolink is needed", status: false }) }

        if (req.body.isDeleted == true) {
            req.body.deletedAt = new Date()
        }

        const collegeData = await collegeModel.create(req.body)
        if (collegeData) { return res.status(201).send({ status: true, message: "college created successfully", data: collegeData }) }

    }
    catch (err) { return res.status(500).send({ Error: "internal server error", message: err.message }) }
}
module.exports={college}
