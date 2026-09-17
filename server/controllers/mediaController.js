import cloudinary from "../config/cloudinary.js";

export const getMedia = async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      max_results: 100,
    });

    const media = result.resources.map((file) => ({
      id: file.asset_id,
      public_id: file.public_id,
      name: file.public_id.split("/").pop(),
      url: file.secure_url,
      type: "image",
      width: file.width,
      height: file.height,
      format: file.format,
      created_at: file.created_at,
    }));

    res.status(200).json(media);
  } catch (error) {
    console.error("Cloudinary media error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch Cloudinary images",
      error: error.message,
    });
  }
};