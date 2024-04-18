import Product from "../model/productSchema.js";

export const getProducts = async (request, response) => {
  try {
    const products = await Product.find({});

    response.json(products);
  } catch (error) {
    response.json(error.message);
  }
};

export const getProductById = async (request, response) => {
  try {
    const products = await Product.findOne({ id: request.params.id });
    response.json(products);
  } catch (error) {
    response.json(error.message);
  }
};
