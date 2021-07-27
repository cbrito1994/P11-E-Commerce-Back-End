const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  let results = await Category.findAll(Product);
  res.json(results);
  // Category.findAll(Product).then(response => {res.json(response)})
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  let id = req.params.id;
  let category = await Category.findByPk(id, {
    include: [Product]
  });
  if(!category) {
    res.status(404).json({ message: 'Category not found'})
    return;
  }
  res.json(category);
});

router.post('/', async (req, res) => {
  // create a new category
  let newCategory = req.body;
  let categoryResponse = await Category.create(newCategory);
  res.json(categoryResponse);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  let id = req.params.id;
  if(id){
    let updatedCategory = await Category.update(req.body, { where:
      { id: id }
    });
    res.json(updatedCategory);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  let id = req.params.id;
  let deletedCategory = await Category.destroy(req.body, {
    where: {
      id: id
    }
  })
  res.json(deletedCategory)
});

module.exports = router;
