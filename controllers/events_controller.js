// FOLDER - controllers - FILE - events_controller.js
// DEPENDENCIES
const events = require('express').Router();
const db = require('../models');
const { Event, Meet_Greet, Set_Time, Stage, Band } = db 
const { Op } = require('sequelize');

// FIND ALL EVENTS -- INDEX ROUTE
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [['date', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` },
            },
        });
        res.status(200).json(foundEvents);
    } catch (error) {
        res.status(500).json(error);
    }
});

// FIND A SPECIFIC EVENT -- SHOW ROUTE
events.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { name: req.params.name },
            // include: [
            //     { 
            //         model: Meet_Greet, 
            //         as: "meet_greets", 
            //         attributes: { exclude: [ "event_id", "band_id" ] },
            //         include: {
            //         model: Band, 
            //         as: "band", 
            //         } 
            //     },
            //     { 
            //         model: Set_Time, 
            //         as: "set_times",
            //         attributes: { exclude: [ "event_id", "stage_id", "band_id" ] },
            //         include: [
            //             { model: Band, as: "band" },
            //             { model: Stage, as: "stage" }
            //         ]
            //     },
            //     { 
            //         model: Stage, 
            //         as: "stages",
            //         through: { attributes: [] }
            //     }
            // ]
        })
        res.status(200).json(foundEvent);
    } catch (error) {
        res.status(500).json(error);
    }
});

// CREATE AN EVENT -- CREATE ROUTE
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newEvent,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error: Event not added',
            error: err.message,
        });
    }
});

// UPDATE AN EVENT -- UPDATE ROUTE
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: { event_id: req.params.id },
        });
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error: Event not updated',
            error: err.message,
        });
    }
});

// DELETE AN EVENT -- DELETE ROUTE
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: { event_id: req.params.id },
        });
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error: Event not deleted',
            error: err.message,
        });
    }
});

// EXPORT
module.exports = events;
