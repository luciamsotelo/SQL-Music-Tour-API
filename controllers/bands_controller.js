// FOLDER - controllers - FILE - bands_controller.js
// DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')
const { Band, Meet_Greet, Event, Set_Time } = db
const { Op } = require('sequelize')


// FIND ALL BANDS -- INDEX ROUTE
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC BAND --SHOW ROUTE
bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name },
            // include: [
            //     { 
            //         model: Meet_Greet, 
            //         as: "meet_greets", 
            //         attributes: { exclude: ["band_id", "event_id"]},
            //         include: { 
            //             model: Event, 
            //             as: "event",
            //             where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`} }
            //         }     
            //     },
            //     {
            //         model: Set_Time,
            //         as: "set_times",
            //         attributes: { exclude: ["band_id", "event_id"]},
            //         include: { 
            //             model: Event, 
            //             as: "event",
            //             where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`} } 
            //         }
            //     }
            // ],
            // order: [
            //     [{ model: Meet_Greet, as:"meet_greets"}, {model: Event, as: "event"}, 'date', 'DESC'],
            //     [{ model: Set_Time, as: 'set_times' }, { model: Event, as: "event" }, 'date', 'DESC']
            // ]
        });
        res.status(200).json(foundBand);
    } catch (error) {
        console.error('Error in bands route:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

// CREATE A BAND -- CREATE ROUTE
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body);
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({
            message: 'Error: Band not added',
            error: err.message // Include the error message in the response
        });
    }
});

// UPDATE A BAND -- UPDATE ROUTE
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({
            message: 'Error: Band not updated',
            error: err.message // Include the error message in the response
        });
    }
})

// DELETE A BAND -- DELETE ROUTE
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({
            message: 'Error: Band not deleted',
            error: err.message // Include the error message in the response
        });
    }
})

// EXPORT
module.exports = bands