exports.shownearcomp = async (req, res) => {
  try {
    const { location, category } = req.body;
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
