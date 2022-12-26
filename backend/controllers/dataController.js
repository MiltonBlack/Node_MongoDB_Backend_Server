const Data = require('../model/dataModel');
const asyncHandler = require('express-async-handler');

// @desc Get Data
// @route GET /api/data
// @access Private
const getData = async (req, res) => {
    const data = await Data.find()
    res.status(200).json(data);
}

// @desc Set Data
// @route POST /api/data
// @access Private
const setData =  async (req, res) => {    
    const createData = await Data.create({
        name: req.body.name,
    }) 
    console.log(req.body);
    res.status(201).json(createData)
}

// @desc Update Data
// @route PUT /api/data
// @access Private
const updateData = async (req, res) => {
    const data = await Data.findById(req.params.id)
    if(!data) {
        res.status(400)
        throw new Error('Data not Found')
    }
    const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedData)
}

// @desc Delete Data
// @route DELETE /api/data
// @access Private
const deleteData = asyncHandler(async (req, res) => {
    // get the data from data base first as in update
    const data = await Data.findById(req.params.id)
    if(!data) {
        res.status(400)
        throw new Error('Data not Found')
    }
    await data.remove()
    res.status(200).json({ message: `Deleted Data ${req.params.id}` })
}) 

module.exports = {
    getData,
    setData,
    updateData,
    deleteData
}