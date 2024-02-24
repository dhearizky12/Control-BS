import Shift from "../models/ShiftModel.js";
import WorkingHour from "../models/WorkingHourModel.js";

export const getShifts = async (req, res) => {
  try {
    const response = await Shift.findAll({
      where: req.query,
      include: [
        { model: WorkingHour, as: "startWorkingHour" },
        { model: WorkingHour, as: "endWorkingHour" },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getShiftsById = async (req, res) => {
  try {
    const response = await Shift.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const createShift = async (req, res) => {
  try {
    await Shift.create(req.body);
    res.status(201).json({ msg: "Shift Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateShift = async (req, res) => {
  try {
    await Shift.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Shift Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteShift = async (req, res) => {
  try {
    await Shift.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Shift Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
