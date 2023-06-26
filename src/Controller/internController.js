const mongoose = require('mongoose')
const internModel = require('../Model/Intern.js')
const collegeModel = require('../Model/College.js')

const createIntern = (async (req, res) => {
    try {
        if (req.body.name == undefined || req.body.name == "" || req.body.name == null || !req.body.name) { return res.status(400).send({ message: "name is needed", status: false }) }

        if (req.body.email == undefined || req.body.email == "" || req.body.email == null || !req.body.email) { return res.status(400).send({ message: "email  is needed", status: false }) }

        if (req.body.mobile == undefined || req.body.mobile == "" || req.body.mobile == null || !req.body.mobile) { return res.status(400).send({ message: "mobile is needed", status: false }) }

        if (mongoose.Types.ObjectId.isValid(req.body.collegeId) == false) return res.status(400).send({ staus: false, Error: "collegeId is Invalid" })

        if (req.body.collegeId == undefined || req.body.collegeId == "" || req.body.collegeId == null || !req.body.collegeId) { return res.status(400).send({ message: "collegeId is needed", status: false }) }
        const emailRegex = /.*@[a-z0-9.-]*/i;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ message: 'Invalid email', status: false });
        }

        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(req.body.mobile)) {
            return res.status(400).json({ message: 'Invalid mobile number', status: false });
        }
        const dataToCheckForEmail = await internModel.findOne({ email: req.body.email })
        if (dataToCheckForEmail) { return res.status(400).send({ status: false, message: "email already exist" }) }
        const dataToCheckForMobile = await internModel.findOne({ mobile: req.body.mobile })
        if (dataToCheckForMobile) { return res.status(400).send({ status: false, message: "mobile number already exist" }) }
        const internData = await internModel.create(req.body)
        if (internData) { return res.status(201).send({ status: true, message: "success", data: internData }) }


    }
    catch (err) { return res.status(500).send({ Error: "internal server error", message: err.message }) }
})

const getCollegeDetails = async function (req, res) {
    try {
        const collegeName = req.query.collegeName;
        if (!collegeName || collegeName.trim() === '') {
            return res.status(400).json({ message: 'collegeName is required', status: false });
        }
        const collegeData = await collegeModel.findOne({ name: collegeName })
        if (!collegeData) { return res.status(400).send({ status: false, message: "college not found" }) }
        let collegeId = collegeData._id
        // console.log(collegeId)
        let allIntern = await internModel.find({ collegeId: collegeId })
        if (!allIntern) { return res.status(400).send({ status: false, message: "no intern found" }) }
        // console.log(allIntern)
        let result = {
            name: collegeData.name,
            fullName: collegeData.fullName,
            logolink: collegeData.logolink,
            interests: allIntern
        }
        return res.status(200).send({ status: true, data: result })


    }
    catch (err) {
        return res.status(500).send({ Error: "internal server error", message: err.message })
    }
}
module.exports = { createIntern, getCollegeDetails }