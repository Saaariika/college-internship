const express=require('express')
const router=express.Router()
const collegeController=require('../Controller/collegeController.js')
const internController=require('../Controller/internController.js')



router.post('/create-College',collegeController.college)
router.post('/create-intern',internController.createIntern)
router.get('/getCollegeDetails',internController.getCollegeDetails)







module.exports=router;