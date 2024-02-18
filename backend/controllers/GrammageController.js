import Grammage from "../models/GrammageModel.js";

export const getGrammages = async (req, res) => {
  try {
    const response = await Grammage.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getGrammagesById = async (req, res) => {
  try {
    const response = await Grammage.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const createGrammage = async (req, res) => {
  try {
    await Grammage.create(req.body);
    res.status(201).json({ msg: "Grammage Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateGrammage = async (req, res) => {
  try {
    await Grammage.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Grammage Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteGrammage = async (req, res) => {
  try {
    await Grammage.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Grammage Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
