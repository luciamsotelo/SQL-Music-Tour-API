// FOLDER - controllers - FILE - stages_controller.js
// DEPENDENCIES
const stages = require('express').Router();
const db = require('../models');
const { Stage, Event } = db; 
const { Op } = require('sequelize');

// FIND ALL STAGES -- INDEX ROUTE
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            order: [['name', 'ASC']], 
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` },
            },
        });
        res.status(200).json(foundStages);
    } catch (error) {
        res.status(500).json(error);
    }
});

// FIND A SPECIFIC STAGE -- SHOW ROUTE
stages.get('/:name', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_name: req.params.name },
            // include:{ 
            //     model: Event, 
            //     as: "events",
            //     through: { attributes: [] }
            // },
            // order: [
            //     [{ model: Event, as: "events" }, 'date', 'ASC'],
            // ]
        })
        res.status(200).json(foundStage);
    } catch (error) {
        res.status(500).json(error);
    }
});

// CREATE A STAGE -- CREATE ROUTE
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body);
        res.status(200).json({
            message: 'Successfully inserted a new stage',
            data: newStage,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error: Stage not added',
            error: err.message,
        });
    }
});

// UPDATE A STAGE -- UPDATE ROUTE
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: { stage_id: req.params.id },
        });
        res.status(200).json({
            message: `Successfully updated ${updatedStages} stage(s)`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error: Stage not updated',
            error: err.message,
        });
    }
});

// DELETE A STAGE -- DELETE ROUTE
stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: { stage_id: req.params.id },
        });
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stage(s)`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error: Stage not deleted',
            error: err.message,
        });
    }
});

// EXPORT
module.exports = stages; 
