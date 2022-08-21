const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

//find all tags
router.get("/", async (req, res) => {
  try {
    const findTags = await Tag.findAll({
      include: { model: Product },
    });
    res.status(200).json(findTags);
  } catch (err) {
    res.status(500).json("Something went wrong", err);
  }
});

// find a single tag by its `id`
router.get("/:id", async (req, res) => {
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: { model: Product },
    });
    if (!singleTag) {
      res.status(404).json({ message: "No tag found with that id" });
      return;
    }
    res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json("Something went wrong", err);
  }
});

// create new tag
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json("Something went wrong", err);
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedTag) {
      res.status(404).json("No tag found with this id");
      return;
    }
    res.status(200).json({ message: "Tag has been updated" });
  } catch (err) {
    res.status(500).json("Something went wrong", err);
  }
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleted) {
      res.status(404).json({ message: "No tag found with this id" });
      return;
    }
    res.status(200).json({ message: "Tag has been deleted" });
  } catch (err) {
    res.status(500).json("Something went wrong", err);
  }
});

module.exports = router;
