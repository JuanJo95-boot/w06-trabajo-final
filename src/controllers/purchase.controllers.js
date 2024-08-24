const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Category = require('../models/Category');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({
        where: { userId },
        include: [
            {
                model: Product,
                attributes: { exclude: ['updateAt', 'createdAt'] },
                include: [
                    {
                       model: Category,
                       attributes: ['name', 'id'] 
          }
        ]
      }
    ]
 });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Purchase.create(req.body);
    return res.status(201).json(result);
});



module.exports = {
    getAll,
    create,
    
}