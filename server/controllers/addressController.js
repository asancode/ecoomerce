// import AddressModel from "../models/addressModel.js";
// import UserModel from "../models/userModel.js";
// export const addAddress = async (req, res) => {
//   try {
//     const userId = req.userId;

//     const {
//       address_line1,
//       city,
//       state,
//       pincode,
//       country,
//       mobile,
//       landmark,
//       addressType,
//       latitude,   // ✅ ye add karo
//       longitude,  // ✅ ye add karo
//     } = req.body;

//     const newAddress = new AddressModel({
//       address_line1,
//       city,
//       state,
//       pincode,
//       country,
//       mobile,
//       landmark,
//       addressType,
//       latitude: latitude != null ? Number(latitude) : null,
//       longitude: longitude != null ? Number(longitude) : null,
//       userId,
//     });

//     const savedAddress = await newAddress.save();

//     return res.status(201).json({
//       success: true,
//       message: "Address added",
//       data: savedAddress,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };
// // export const addAddress = async (req, res) => {
// //   try {
// //     const {
// //       address_line1,
// //       city,
// //       state,
// //       pincode,
// //       country,
// //       mobile,
// //       landmark,
// //       addressType,
// //     } = req.body;
// //     // const {
// //     //   address_line1,
// //     //   city,
// //     //   state,
// //     //   pincode,
// //     //   country,
// //     //   mobile,
// //     //   status,
// //     //   selected,
// //     // } = req.body;
// //     const userId = req.userId;
// //     // if (
// //     //   !address_line1 ||
// //     //   !city ||
// //     //   !state ||
// //     //   !pincode ||
// //     //   !country ||
// //     //   !mobile ||
// //     //   !userId
// //     // ) {
// //     //   return res.status(400).json({
// //     //     error: true,
// //     //     message: "Please fill all the fields",
// //     //     success: false,
// //     //   });
// //     // }
// //     const newAddress = new AddressModel({
// //       address_line1,
// //       city,
// //       state,
// //       pincode,
// //       country,
// //       mobile,
// //       userId,
// //       landmark,
// //       addressType,
// //     });
// //     const savedAddress = await newAddress.save();
// //     const updateAddress = await UserModel.updateOne(
// //       { _id: userId },
// //       { $push: { address_details: savedAddress._id } },
// //     );
// //     return res.status(201).json({
// //       success: true,
// //       message: "Address added successfully",
// //       address: savedAddress,
// //     });
// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message,
// //       error: true,
// //     });
// //   }
// // };
// export const getAddress = async (req, res) => {
//   try {
//     const address = await AddressModel.find({ userId: req.query.userId });

//     if (!address) {
//       return res.status(404).json({
//         success: false,
//         message: "Address not found",
//       });
//     } else {
//       const updateUser = await UserModel.updateOne(
//         { _id: req.query.userId },
//         { $push: { address_details: address?._id } },
//       );
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Address Get successfully",
//       address: address,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//       error: true,
//     });
//   }
// };
// export const deleteAddressController = async(req,res)=>{
//     try {
//         const userId = req.userId
//         const _id= req.params.id
//         if (!_id) {
//             return res.status(400).json({
//                 message:"provide _id",
//                 error:true,
//                 success:false
//             })
//         }
//         const deleItem = await AddressModel.deleteOne({_id:_id,userId:userId})
//         if (!deleItem) {
//             return res.status(404).json({
//                 message:"The Address not found",
//                 error:true,
//                 success:false
//             })
//         }
//         return res.json({
//             message:"Address Remove",
//             error:false,
//             success:true,
//             data:deleItem
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message:error.message||error,
//             error:true,
//             success:false
//         })
//     }
// }
// export const getSingleAddressController = async(req,res)=>{
//     try {
//   const id = req.params.id
//   const address = await AddressModel.findById({_id:id})
//   if (!address) {
//     return res.status(400).json({
//       message:"Address not Found",
//       error:true,
//       success:false
//     })
//   }
//     return res.status(200).json({
//       error:false,
//       success:true,
//       address:address
//     })
//     } catch (error) {
//         return res.status(500).json({
//             message:error.message||error,
//             error:true,
//             success:false
//         })
//     }
// }
// export const editAddress = async (req, res) => {
//   try {
//     const id = req.params.id
//     const {
//       address_line1,
//       city,
//       state,
//       pincode,
//       country,
//       mobile,
//       landmark,
//       addressType,
//     } = req.body;
  
//     const address = await AddressModel.findByIdAndUpdate(id,{
//       address_line1,
//       city,
//       state,
//       pincode,
//       country,
//       mobile,
//       landmark,
//       addressType,
//     });
//     return res.status(201).json({
//       success: true,
//       message: "Address Updated successfully",
//       address: address,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//       error: true,
//     });
//   }
// };
// // export const selectAddress = async (req, res) => {
// //   try {
// //     const userId = req.params._id;
// //     const address = await AddressModel.find({
// //       _id: req.params.id,
// //     });
// //     if (!address) {
// //       return res.status(404).json({
// //         message: error.message,
// //         error: true,
// //         success: false,
// //       });
// //     }else{
// //       const updateAddress = await AddressModel.findByIdAndUpdate( req.params.id,{
// //         selected:req?.body?.selected
// //       },
// //     {new:true})
// //     return res.status(200).json({
// //         error:false,
// //         success:true,
// //         address:updateAddress
// //       })
// //     }
// //   } catch (error) {
// //     return res.status(500).json({
// //       message: error.message,
// //       error: true,
// //       success: false,
// //     });
// //   }
// // };
import AddressModel from "../models/addressModel.js";
import UserModel from "../models/userModel.js";
export const addAddress = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      landmark,
      addressType,
      latitude,
      longitude,
    } = req.body;

    const newAddress = new AddressModel({
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      landmark,
      addressType,
      latitude: latitude != null ? Number(latitude) : null,
      longitude: longitude != null ? Number(longitude) : null,
      userId,
    });

    const savedAddress = await newAddress.save();

    return res.status(201).json({
      success: true,
      message: "Address added",
      data: savedAddress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const getAddress = async (req, res) => {
  try {
    const address = await AddressModel.find({ userId: req.query.userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    } else {
      const updateUser = await UserModel.updateOne(
        { _id: req.query.userId },
        { $push: { address_details: address?._id } },
      );
    }
    return res.status(200).json({
      success: true,
      message: "Address Get successfully",
      address: address,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: true,
    });
  }
};
export const deleteAddressController = async(req,res)=>{
    try {
        const userId = req.userId
        const _id= req.params.id
        if (!_id) {
            return res.status(400).json({
                message:"provide _id",
                error:true,
                success:false
            })
        }
        const deleItem = await AddressModel.deleteOne({_id:_id,userId:userId})
        if (!deleItem) {
            return res.status(404).json({
                message:"The Address not found",
                error:true,
                success:false
            })
        }
        return res.json({
            message:"Address Remove",
            error:false,
            success:true,
            data:deleItem
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}
export const getSingleAddressController = async(req,res)=>{
    try {
  const id = req.params.id
  const address = await AddressModel.findById({_id:id})
  if (!address) {
    return res.status(400).json({
      message:"Address not Found",
      error:true,
      success:false
    })
  }
    return res.status(200).json({
      error:false,
      success:true,
      address:address
    })
    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
}
export const editAddress = async (req, res) => {
  try {
    const id = req.params.id
    const {
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      landmark,
      addressType,
      latitude,   // ✅ FIX: was missing — edits used to silently wipe the
      longitude,  // ✅ FIX: saved location because these were never read
                  //         from req.body or passed to the update.
    } = req.body;
  
    const address = await AddressModel.findByIdAndUpdate(
      id,
      {
        address_line1,
        city,
        state,
        pincode,
        country,
        mobile,
        landmark,
        addressType,
        // ✅ FIX: only overwrite when a value was actually sent, so an
        // edit that doesn't touch location doesn't null it out.
        ...(latitude != null ? { latitude: Number(latitude) } : {}),
        ...(longitude != null ? { longitude: Number(longitude) } : {}),
      },
      { new: true }, // ✅ FIX: return the updated doc, not the stale one
    );
    return res.status(201).json({
      success: true,
      message: "Address Updated successfully",
      address: address,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: true,
    });
  }
};