import Production from "../models/ProductionModel.js";
import Shift from "../models/ShiftModel.js";

export const getProductions = async (req, res) => {
  try {
    const response = await Production.findAll({
      include: Shift,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductionsById = async (req, res) => {
  try {
    const response = await Production.findOne({
      where: {
        id: req.params.id,
      },
      include: Shift,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const createProduction = async (req, res) => {
  try {
    await Production.create(req.body);
    res.status(201).json({ msg: "Production Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProduction = async (req, res) => {
  try {
    await Production.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Production Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduction = async (req, res) => {
  try {
    await Production.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Production Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
