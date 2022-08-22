const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: { model: Product},
    })
    res.status(200).json(allCategories)
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});

// find one category by its `id` value
router.get('/:id', async(req, res) => {
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: { model: Product },
    })
    if (!oneCategory) {
      res.status(404).json({ message: 'No category was found with that id'});
      return;
    } 
      res.status(200).json(oneCategory)
    } catch (err) {
      res.status(500).json('Something went wrong', err)
    }
  });

// create new category  
router.post('/', async(req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(400).json('Something went wrong', err)
  }
});

// update category by `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    })
    if (!updatedCategory) {
      res.status(404).json('No category found with this id');
      return;
    }
    res.status(200).json({ message: 'Category has been updated'})
  } catch (err) {
    res.status(500).json('Something went wrong', err)
  }
});

// delete category by `id` value
router.delete ('/:id', async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: {
        id: req.params.id
      },
    })
    if (!deleted) {
      res.status(404).json({ message: 'No category was found with this id'})
      return;
    }
    res.status(200).json('Category was deleted')
  } catch (err) {
    res.status(500).json('Something went wrong', err);
  }
});

module.exports = router;
