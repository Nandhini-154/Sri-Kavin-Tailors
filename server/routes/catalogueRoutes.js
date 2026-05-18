

const express = require("express");
const router = express.Router();

const upload = require("../utils/multer");
const Catalogue = require("../models/Catalogue");

const { uploadCatalogue } = require("../controllers/catalogueController");

// upload
router.post("/upload", upload.single("image"), uploadCatalogue);

// GET ALL PRODUCTS 🔥
router.get("/", async (req, res) => {

    try {

        const data = await Catalogue.find().sort({ createdAt: -1 });

        res.json(data);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {

    try {

        const item = await Catalogue.findById(req.params.id);

        res.json(item);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

router.delete("/:id", async (req, res) => {

    try {

        await Catalogue.findByIdAndDelete(req.params.id);

        res.json({
            message: "Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }

});
router.put(
    "/:id",
    upload.single("image"),
    async (req, res) => {

        try {

            const updateData = {

                title: req.body.title,
                mainCategory: req.body.mainCategory,
                subCategory: req.body.subCategory

            };

            // CLOUDINARY IMAGE URL

            if (req.file) {

                updateData.image = req.file.path;
            }

            const updatedItem =
                await Catalogue.findByIdAndUpdate(
                    req.params.id,
                    updateData,
                    { new: true }
                );

            res.json(updatedItem);

        } catch (err) {

            console.log(err);

            res.status(500).json({
                message: err.message
            });
        }
    }
);
module.exports = router;