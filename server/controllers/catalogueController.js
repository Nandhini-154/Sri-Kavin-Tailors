const Catalogue = require("../models/catalogue");

const cloudinary = require("../utils/cloudinary");

const uploadCatalogue = async (req, res) => {

    try {

        console.log(req.body);

        console.log(req.file);

        const { title, mainCategory, subCategory } = req.body;

        // Check image exists

        if (!req.file) {

            return res.status(400).json({
                message: "Image not uploaded"
            });

        }

        // Upload image to cloudinary

        const result = await cloudinary.uploader.upload(
            req.file.path
        );

        // Auto Model ID generation

        let prefix = "";

        if (mainCategory === "Blouse Designs") {

            prefix = "BL";

        }

        else if (mainCategory === "Chudi Designs") {

            prefix = "CH";

        }

        else {

            prefix = "TL";

        }

        // Count existing documents

        const count = await Catalogue.countDocuments();

        // Generate Model ID

        const modelId = prefix + (100 + count + 1);

        // Save into MongoDB

        const newCatalogue = new Catalogue({

            title,

            mainCategory,

            subCategory,

            modelId,

            image: result.secure_url

        });

        await newCatalogue.save();

        res.status(201).json({

            message: "Catalogue Uploaded Successfully",

            data: newCatalogue

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {
    uploadCatalogue
};
