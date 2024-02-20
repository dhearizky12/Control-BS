import Group from "../models/GroupModel.js";

export const getGroups = async (req, res) => {
  try {
    const response = await Group.findAll({
      where: req.query,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getGroupsById = async (req, res) => {
  try {
    const response = await Group.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const createGroup = async (req, res) => {
  try {
    await Group.create(req.body);
    res.status(201).json({ msg: "Group Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateGroup = async (req, res) => {
  try {
    await Group.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Group Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteGroup = async (req, res) => {
  try {
    await Group.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Group Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
