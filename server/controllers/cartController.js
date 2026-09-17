import CartModel from '../models/cart.models.js';
import CartProductModel from '../models/cartProductsModel.js'
import ProductModel from '../models/productModel.js';
import UserModel from '../models/userModel.js'

// export const addToCartItemController = async(req,res)=>{
//     try {
//         const userId = req.userId
//         const {productId} = red.body
//         if (!productId) {
//             return res.status(402).json({
//                 message:"provide Product",
//                 error:true,
//                 success:false
//             })
//         }
//         const checkItemCart = await CartProductModel.findOne({
//             userId:userId,
//             productId:productId
//         })
//         if (checkItemCart) {
//            return res.status(400).json({
            
//            }) 
//         }
//         const cartItem = new CartProductModel({
//             quantity:1,
//             userId:userId,
//             productId:productId,
//         })
//         const save = await cartItem.save()
//         const upadteCartUser = await UserModel.updateOne({_id:userId},{
//             $push:{
//                 shopping_cart:productId
//             }
//         })
//         return res.json({
//             data:save,
//             message:'Item Add Successfully',
//             error:false,
//             success:true
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message:error.message||error,
//             error:true,
//             success:false
//         })
//     }
// }


export const addToCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity,slug ,variation,catName, productTitle, image, price, rating,subTotal } = req.body;

    // 🔴 Validation
    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        error: true,
        success: false,
      });
    }

    // 🔴 Check product exists
    const productExists = await ProductModel.findById(productId);
    if (!productExists) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

  // ✅ Check if already in cart
    const existingCartItem = await CartModel.findOne({ userId, productId });
    if (existingCartItem) {
      return res.status(400).json({
        message: "Product already added to cart",
        error: true,
        success: false,
      });
    }


    // 🟢 Add to cart
    const cartItem = new CartModel({
      userId,
      productId,
      quantity,
      productTitle,
      image,
      price,
      rating,
      subTotal,
      variation,
      catName,
      slug,
    });

    const savedCartItem = await cartItem.save();

    // 🟢 Update user cart list (optional)
    await UserModel.updateOne(
      { _id: userId },
      { $addToSet: { shopping_cart: productId } } // prevents duplicates
    );

    return res.status(201).json({
      message: "Item added to cart successfully",
      error: false,
      success: true,
      data: savedCartItem,
    });
  } catch (error) {
    console.error("Add To Cart Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};
export const getCartItemController = async (req,res)=>{
    try {
        const  userId = req.userId
        const cartItem = await CartModel.find({
            userId
        }).populate('productId')
        return res.json({
            data:cartItem,
            error:false,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:true
        })        
    }
}
export const updateCartItemQtyController = async(req,res)=>{
    try {
       const userId = req.userId
       const {_id,qty}=req.body 
       if (!_id || !qty) {
        return res.status(400).json({
            message:"provide _id,qty"
        })
       }
       const updateCartItem= await CartModel.updateOne({_id:_id,userId:userId},{quantity:qty})
       return res.json({
        message:"Update Cart",
        success:true,
        error:false,
        data:updateCartItem
       })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}
export const deleteCartItemQtyController = async(req,res)=>{
    try {
        const userId = req.userId
        const {id }= req.params
        if (!id) {
            return res.status(400).json({
                message:"provide _id",
                error:true,
                success:false
            })
        }
        const deleCartItem = await CartModel.deleteOne({_id:id,userId:userId})
        if (!deleCartItem) {
            return res.status(404).json({
                message:"The product in the cart is not found",
                error:true,
                success:false
            })
        }
        // // const user = await UserModel.findOne({
        // //     _id:userId
        // // })
        // // const cartItems = user.shopping_cart
        // const updatedInterests = [...cartItems.slice(0,cartItems.indexOf(productId)),...cartItems.slice(cartItems.indexOf(productId)+1)]
        // user.shopping_cart =updatedInterests
        // await user.save()
        return res.json({
            message:"Item Remove",
            error:false,
            success:true,
            data:deleCartItem
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}
export const emptyeCartController = async(req,res)=>{
  try {
    const userId = req.params.id
    // const cartItems = await CartProductModel.find({userId:userId})
    await CartProductModel.deleteMany({userId:userId})
    return res.status(200).json({
      error:false,
      success:true,
    })
  } catch (error) {
    return res.status(500).json({
      message:error.message || error,
      error:true,
      success:false
    })
  }
}