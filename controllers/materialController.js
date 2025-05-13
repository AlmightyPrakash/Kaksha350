const Material = require("../model/materialModel");

exports.uploadMaterialController = async (req, res) => {
  try {
    const { title, description, fileUrl } = req.body;

    if (!title || !fileUrl) {
      return res.status(400).json({
        success: false,
        message: "Title and file URL are required",
      });
    }

    const newMaterial = new Material({
      title,
      description,
      fileUrl,
      uploadedBy: req.user.id,
    });

    await newMaterial.save();

    res.status(201).json({
      success: true,
      message: "Study material uploaded successfully",
      material: newMaterial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload material",
      error: error.message,
    });
  }
};
