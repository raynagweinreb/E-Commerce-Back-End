const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll(
    {
      include: {
        model: Product,
        attributes:['product_name']
      }
    }
  ).then(catResponse=> res.json(catResponse))
  .catch(err=> {
    console.log(err);
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['category_id']
    }
  }).then(catResponse => res.json(catResponse))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then(catResponse => res.json(catResponse))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
    where: {
      id: req.params.id
    }
  }
  ).then(catResponse => {
    if(!catResponse){
      res.status(404).json({message: "We're sorry we can not find a product with that ID"});
      return;
    }
    res.json(catResponse)
  }).catch(err=>{
    console.log(err);
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(catResponse => {
    if (!catResponse){
      res.status(404).json({ message: " We're sorry we can not find a product with that ID"});
      return;
    }
    res.json(catResponse);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

module.exports = router;
