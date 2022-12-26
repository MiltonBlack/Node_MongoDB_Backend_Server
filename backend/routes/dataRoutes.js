const express = require("express");
const router = express.Router();
const { getData, setData, updateData, deleteData } = require('../controllers/dataController');

router.route('/').get(getData).post(setData);

router.route('/:id').delete(deleteData).put(updateData);

// router.get('/', getData) 

// router.post('/', setData)

// router.put('/:id', updateData)

// router.delete('/:id', deleteData)

module.exports = router;



// router.get('/api/data', (req, res) => {
//     // res.send('get Data')
//     res.status(200).json({ message: "get Data" })
// })
// router.post('/', (req, res) => {
//     res.status(200).json({ message: "set Data" })
// })
// router.put('/:id', (req, res) => {
//     res.status(200).json({ message: `Update Data ${req.params.id}` })
// })
// router.delete('/:id', (req, res) => {
//     res.status(200).json({ message: `Delete Data ${req.params.id}` })
// })