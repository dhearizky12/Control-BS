import WorkingHour from "../models/WorkingHourModel.js";

export const getWorkingHours = async (req, res) => {
  try {
    const response = await WorkingHour.findAll({
      where: req.query,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getWorkingHoursById = async (req, res) => {
  try {
    const response = await WorkingHour.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const createWorkingHour = async (req, res) => {
  try {
    await WorkingHour.create(req.body);
    res.status(201).json({ msg: "WorkingHour Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateWorkingHour = async (req, res) => {
  try {
    await WorkingHour.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "WorkingHour Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteWorkingHour = async (req, res) => {
  try {
    await WorkingHour.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "WorkingHour Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
