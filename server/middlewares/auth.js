// // import jwt from 'jsonwebtoken';
// // import UserModel from "../models/userModel.js";
// // const auth = (req, res, next) => {
// //     try {
// //         var token = req?.cookies?.accessToken || req?.headers?.authorization?.split(" ")[1];
// //         // if (!token) {
// //         //     token= req.query.token
// //         // }
// //         if (!token) {
// //             return res.status(401).json({ message: "Unauthorized: No token provided" });
// //         }
// //         const decoded = jwt.verify(token, process.env.JWT_KEY_ACCESS_TOKEN);
// //         if (!decoded) {
// //             return res.status(401).json({ message: "Unauthorized: Invalid token",error:true,success:false });
// //         }
// //         req.userId = decoded.id;
// //         next();
// //     } catch (error) {
// //         return res.status(500).json({ message: "you have not loing",
// //             error: true,
// //             success: false
// //          });
// //     }
// //     // try {
// //     //     const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];
// //     //     if(!token){
// //     //         return res.status(401).json({message:"Unauthorized: No token provided",error:true,success:false})
// //     //     }
// //     //     const decoded = jwt.verify(token,process.env.JWT_KEY_ACCESS_TOKEN);
// //     //     if(!decoded){
// //     //         return res.status(401).json({message:"Unauthorized: Invalid token",error:true,success:false})
// //     //     }
// //     //     req.userId = decoded._id;
// //     //     next();
// //     // } catch (error) {
// //     //     return res.status(500).json({
// //     //         message: "you have not loing",
// //     //         error: true,
// //     //         success: false
// //     //     })
// //     // }
// // }
// // export default auth;


// // export const adminMiddleware = async (req, res, next) => {
// //   try {
// //     if (!req.userId) {
// //       return res.status(401).json({
// //         success: false,
// //         error: true,
// //         message: "Authentication required",
// //       });
// //     }

// //     const user = await UserModel.findById(req.userId)
// //       .select("role");

// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         error: true,
// //         message: "User not found",
// //       });
// //     }

// //     if (user.role !== "admin") {
// //       return res.status(403).json({
// //         success: false,
// //         error: true,
// //         message: "Admin access required",
// //       });
// //     }

// //     next();
// //   } catch (error) {
// //     console.error("Admin middleware error:", error);

// //     return res.status(500).json({
// //       success: false,
// //       error: true,
// //       message: "Failed to verify admin permission",
// //     });
// //   }
// // };

// // // export default adminMiddleware;
// // // import jwt from "jsonwebtoken";

// // // const auth = (req, res, next) => {
// // //   try {
// // //     let token;

// // //     if (req.cookies?.accessToken) {
// // //       token = req.cookies.accessToken;
// // //     }

// // //     if (!token && req.headers.authorization?.startsWith("Bearer ")) {
// // //       token = req.headers.authorization.split(" ")[1];
// // //     }

// // //     if (!token) {
// // //       return res.status(401).json({
// // //         message: "Unauthorized: Token missing",
// // //         error: true,
// // //         success: false,
// // //       });
// // //     }

// // //     const decoded = jwt.verify(token, process.env.JWT_KEY_ACCESS_TOKEN);

// // //     req.userId = decoded.id;
// // //     req.userRole = decoded.role;

// // //     next();
// // //   } catch (error) {
// // //     return res.status(401).json({
// // //       message: "Unauthorized: Invalid or expired token",
// // //       error: true,
// // //       success: false,
// // //     });
// // //   }
// // // };

// // // export default auth;
// import jwt from "jsonwebtoken";
// import UserModel from "../models/userModel.js";

// const auth = (req, res, next) => {
//   try {
//     const token =
//       req?.cookies?.accessToken || req?.headers?.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         message: "Unauthorized: No token provided",
//         error: true,
//         success: false,
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_KEY_ACCESS_TOKEN);
//     if (!decoded) {
//       return res.status(401).json({
//         message: "Unauthorized: Invalid token",
//         error: true,
//         success: false,
//       });
//     }

//     req.userId = decoded.id;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Unauthorized: Invalid or expired token",
//       error: true,
//       success: false,
//     });
//   }
// };

// export default auth;

// // Admin-only access check. Must run AFTER `auth` middleware (needs req.userId).
// export const adminMiddleware = async (req, res, next) => {
//   try {
//     if (!req.userId) {
//       return res.status(401).json({
//         success: false,
//         error: true,
//         message: "Authentication required",
//       });
//     }

//     const user = await UserModel.findById(req.userId).select("role");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "User not found",
//       });
//     }

//     if (user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "Admin access required",
//       });
//     }

//     next();
//   } catch (error) {
//     console.error("Admin middleware error:", error);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: "Failed to verify admin permission",
//     });
//   }
// };
// import jwt from "jsonwebtoken";
// import UserModel from "../models/userModel.js";

// const auth = (req, res, next) => {
//   try {
//     const token =
//       req?.cookies?.accessToken || req?.headers?.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         message: "Unauthorized: No token provided",
//         error: true,
//         success: false,
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_KEY_ACCESS_TOKEN);
//     if (!decoded) {
//       return res.status(401).json({
//         message: "Unauthorized: Invalid token",
//         error: true,
//         success: false,
//       });
//     }

//     req.userId = decoded.id;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Unauthorized: Invalid or expired token",
//       error: true,
//       success: false,
//     });
//   }
// };

// export default auth;

// // Admin-only access check. Must run AFTER `auth` middleware (needs req.userId).
// // export const adminMiddleware = async (req, res, next) => {
// //   try {
// //     if (!req.userId) {
// //       return res.status(401).json({
// //         success: false,
// //         error: true,
// //         message: "Authentication required",
// //       });
// //     }

// //     const user = await UserModel.findById(req.userId).select("role");

// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         error: true,
// //         message: "User not found",
// //       });
// //     }

// //     if (user.role !== "admin") {
// //       return res.status(403).json({
// //         success: false,
// //         error: true,
// //         message: "Admin access required",
// //       });
// //     }

// //     next();
// //   } catch (error) {
// //     console.error("Admin middleware error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       error: true,
// //       message: "Failed to verify admin permission",
// //     });
// //   }
// // };
// export const adminMiddleware = async (req, res, next) => {
//   try {
//     if (!req.userId) {
//       return res.status(401).json({
//         success: false,
//         error: true,
//         message: "Authentication required",
//       });
//     }

//     const user = await UserModel.findById(req.userId).select("role");

//     // 🔍 Debug log — dekho req.userId kya hai aur user mila ya nahi
//     console.log("adminMiddleware check → req.userId:", req.userId, "| found:", !!user);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         error: true,
//         message: "User not found",
//       });
//     }

//     if (user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         error: true,
//         message: "Admin access required",
//       });
//     }

//     next();
//   } catch (error) {
//     console.error("Admin middleware error:", error);
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: "Failed to verify admin permission",
//     });
//   }
// };

import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

// ============================================================
// AUTH — verifies the access token and attaches req.userId
// ============================================================

const auth = (req, res, next) => {
  try {
    const token =
      req?.cookies?.accessToken || req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
        error: true,
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY_ACCESS_TOKEN);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token",
        error: true,
        success: false,
      });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
      error: true,
      success: false,
    });
  }
};

export default auth;

// ============================================================
// ADMIN MIDDLEWARE — must run AFTER `auth` (needs req.userId)
//
// ✅ FIX: role is stored lowercase in the schema ("admin"/"user"),
// so the comparison must be lowercase too — this was the bug
// that blocked every role-change/delete/list request even for
// real admins.
// ============================================================

export const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Authentication required",
      });
    }

    const user = await UserModel.findById(req.userId).select("role");

    if (!user) {
      // If this ever fires for a genuinely logged-in admin, it
      // almost always means the browser is holding a stale token
      // (e.g. the DB was reset/reseeded after the token was issued).
      // Logging out and logging back in re-issues a token with the
      // current _id and resolves it.
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }

    if ((user.role || "").toLowerCase() !== "admin") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Admin access required",
      });
    }

    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Failed to verify admin permission",
    });
  }
};