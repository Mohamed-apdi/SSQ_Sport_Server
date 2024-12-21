import Product from "../models/product.js";



// create product

export const createProduct = async (req, res) => {
    
    try {
        const newProduct = await Product.create(req.body);
        newProduct.save();
        res.json(newProduct);
    } catch (error) {
        res.status(500).send({ message: "internal server error" });
    }
}


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
        const findProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if(!findProduct) return res.status(404).send({ message: "product not found" });
        res.json(findProduct);
    } catch (error) {
        res.status(500).send({ message: "internal server error" });
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