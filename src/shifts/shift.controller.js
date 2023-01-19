const express = require('express');


function shiftRoutes(Shifts) {
    const router = express.Router();

    router.get("/", async (req, res) => {
        try {
            let shifts = Shifts();

            res.status(200)
                .json({
                    success: true,
                    shifts: shifts
                });

        } catch (error) {
            res.status(400)
                .json({
                    success: false,
                    message: error.message
                });
        }
    });


    return router;
}

module.exports.shiftRoutes = shiftRoutes;