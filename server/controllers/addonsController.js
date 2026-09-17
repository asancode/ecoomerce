// import AddOn from "../models/AddOn.js";

// export const createAddon = async (req, res) => {
//   try {

//     const addon = new AddOn(req.body);

//     await addon.save();

//     res.status(201).json({
//       success: true,
//       data: addon,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// export const getAddons = async (req, res) => {
//   try {

//     const addons = await AddOn.find();

//     res.json({
//       success: true,
//       data: addons,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//     });
//   }
// };


// export const deleteAddon = async (req, res) => {
//   try {

//     await AddOn.findByIdAndDelete(req.params.id);

//     res.json({
//       success: true,
//       message: "Addon deleted",
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//     });
//   }
// };