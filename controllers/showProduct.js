exports.showProduct=async function (req,res){
    const productFound=Product.findById(req.params.id);
    if(!productFound) return res.status(204).json();
    return res.json(productFound);
}