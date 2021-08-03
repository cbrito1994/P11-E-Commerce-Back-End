const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  let productsTag = await Tag.findAll({ include: [
    { model: Product, through: ProductTag, as: 'tags_products' }
  ]}); 
  res.json(productsTag);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  let TagId = await Tag.findByPk(req.params.id, {
    include: [
      { model: Product, through: ProductTag, as: 'tags_products' }
    ]
  });
  res.json(TagId);
});

router.post('/', async (req, res) => {
  // create a new tag
  let newTag = await Tag.create(req.body);
  res.json(newTag);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  let tagId = await Tag.update(req.params.id);
  res.json(tagId);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  let tagId = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });
  res.json(tagId);
});

module.exports = router;
