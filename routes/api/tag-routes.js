const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagGet = await Tag.findAll({
      include: [{ model:Product }]
    });

    res.status(200).json(tagGet);
  } catch (err){
    res.status(403).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagGetId = await Tag.findByPk(req.params.id, {
      include: [{ model:Product }]
    });

    if (!tagGetId) {
      res.status(403).json({ message: "Incorrect id"});
    };
    res.status(200).json(tagGetId);
  } catch (err) {
    res.status(403).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagPost = await Tag.create({
      tag_name: req.body.tag_name
    })

    res.status(200).json(tagPost)
  } catch (err) {
    res.status(403).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagPut = await Tag.update({
      tag_name: req.body.tag_name
    },
    {
      where: req.params.id
    })

    if (!tagPut) {
      res.status(403).json({ message: "Id does not exsist"})
    }

    res.status(200).json(tagPut)
  } catch (err) {
    res.status(403).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDel = await Tag.destroy({
      where: req.params.id
    })

    if (!tagDel) {
      res.status(403).json({ message: "Id does not exsist"})
    }
    res.status(200).json(tagDel)
  } catch (err) {
    res.status(403).json(err);
  }
});

module.exports = router;
