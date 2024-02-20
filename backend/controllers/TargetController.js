import Product from "../models/ProductModel.js";
import Target from "../models/TargetModel.js";

export const getTargets = async (req, res) => {
  try {
    const response = await Target.findAll({
      where: req.query,
      include: Product,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getTargetsById = async (req, res) => {
  try {
    const response = await Target.findOne({
      where: {
        id: req.params.id,
      },
      include: Product,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const createTarget = async (req, res) => {
  try {
    await Target.create(req.body);
    res.status(201).json({ msg: "Target Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTarget = async (req, res) => {
  try {
    await Target.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Target Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTarget = async (req, res) => {
  try {
    await Target.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Target Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
