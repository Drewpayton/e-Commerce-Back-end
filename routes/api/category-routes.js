const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(categoryData)
  } catch (err){
      res.status(403).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })

    if(!categoryId){
      res.status(404).json({ message: 'No category with that id' })
    }

    res.status(200).json(categoryId)
  } catch (err) {
    res.status(403).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryPost = await Category.create({
      category_name: req.body.category_name
    }) 

    res.status(200).json(categoryPost)
  } catch (err) {
    res.status(404).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryPut = await Category.update({
      category_name: req.body.category_name
    },
    {
      where: { id: req.params.id }
    })

    if (!categoryPut) {
      res.status(404).json({ message: "There isn't a category with that id" })
    }
    
    res.status(200).json(categoryPut)
  } catch (err) {
    res.status(404).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryDel = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

  if (!categoryDel) {
    res.status(204).json({ message: "That category does not exsist"})
  }
  res.status(200).json(categoryDel)
  } catch (err) {
    res.status(404).json(err)
  }
});

module.exports = router;
