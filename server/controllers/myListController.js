import MyListModel from "../models/myListModel.js";

export const addToMyListController = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId,variation, productTitle, image, price, catName, rating } =
      req.body;
      const item = await MyListModel.findOne({
        userId,
        productId
      })
      if(item){
        return res.status(400).json({
          message:"Item already in MyList"
        })
      }
      const myList = new MyListModel({
        productId,variation, productTitle, image, price,rating, catName,userId
      })
      const save = await myList.save()
      return res.status(200).json({
        error:false,
        data:myList,
        success:true,message:"The Product save in the my list"
      })
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteToMyListController = async (req, res) => {
  try {
   const myListItem = await MyListModel.findById(req.params.id)
if (!myListItem) {
  return res.status(404).json({
    error:true,
    success:false,
    message:"The Item with this given id was not found"
  })
}
const deleteItem = await MyListModel.findByIdAndDelete(req.params.id)
if (!deleteItem) {
  return res.status(404).json({
    error:true,
    success:false,
    message:"The item is not deleted"
  })
}
return res.status(200).json({
  success:true,
  error:false,
  message:"The item removed from My List"
})
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getMyListController = async (req, res) => {
  try {
const userId = req.userId
const myListItem = await MyListModel.find({
  userId
})
return res.status(200).json({
  error:false,
  success:true,
  data:myListItem
})
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
