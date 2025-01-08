import { imageUpload } from "../middlewares/upload.js";
import Product from "../models/product.js";


// create product
export const createProduct = async (req, res) => {
    try {
        const { name, brand, categories, colors, price, type, description } = req.body;
        // Check if the number of images exceeds the limit
        if (req.files.length > 5) {
            return res.status(400).send({ message: "You can upload a maximum of 5 images." });
        }
        // Upload images to Cloudinary
        const imageUploadPromises = req.files.map(async (file) => {
            return await imageUpload(file.buffer, file.mimetype);
        });

        const images = await Promise.all(imageUploadPromises);


        // Create the product with image URLs
        const newProduct = await Product.create({
            name,
            brand,
            categories,
            colors,
            price,
            type,
            description,
            images,
        });

        res.json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};


// get all product
export const allProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).send({ message: "internal server error" });
    }
}

// get a product 
export const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const findProduct = await Product.findById(id);
        if(!findProduct) return res.status(404).send({ message: "product not found" });
        res.json(findProduct);
    } catch (error) {
        res.status(500).send({ message: "internal server error" });
        
    }
};

// update a product
export const updateProduct = async (req, res) => {
    const { id } = req.params;

    try {
       // Find the product by ID
       const product = await Product.findById(id);
       if (!product) {
           return res.status(404).send({ message: "Product not found" });
       }

       // Check if the total number of images exceeds the limit
       if (product.images.length + req.files.length > 5) {
        return res.status(400).send({ message: "You can upload a maximum of 5 images." });
    }

       // Handle image uploads if new images are provided
       let updatedImages = product.images;
       if (req.files && req.files.length > 0) {
           // Upload images to Cloudinary
        const imageUploadPromises = req.files.map(async (file) => {
            return await imageUpload(file.buffer, file.mimetype);
        });

        const images = await Promise.all(imageUploadPromises);
           updatedImages = [...product.images, ...images];
       }

        // Update product data
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                ...req.body,
                images: updatedImages,
            },
            { new: true } // Return the updated product
        );

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).send({ message: `${error}` });
    }
};

// Delete an image from a product
export const deleteImage = async (req, res) => {
    const { id, imageId } = req.params;

    try {
        // Find the product by ID
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        // Remove the image from the product's images array
        product.images = product.images.filter((image) => image._id.toString() !== imageId);

        // Save the updated product
        await product.save();

        res.json({ message: "Image deleted successfully", product });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};

// delete a product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const findProduct = await Product.findByIdAndDelete(id);
        if(!findProduct) return res.status(404).send({ message: "product not found" });
        res.json({ message: "product deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "internal server error" });
    }
}

// Get products overview aggregate
export const getProductsOverview = async (req, res) => {
    try {
        const productsOverview = await Product.aggregate([
            {
                $group: {
                    _id: "$categories", // Group by the "categories" field
                    count: { $sum: 1 }, // Count the number of products in each group
                },
            },
            {
                $sort: { count: -1 }, // Sort by count in descending order
            },
            {
                $project: {
                    _id: 0, // Exclude the default _id field
                    category: "$_id", // Rename _id to category
                    count: 1, // Include the count field
                },
            },
        ]);

        res.status(200).json(productsOverview);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};