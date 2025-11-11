const infoService = require('../app/services/info.service.js');
const { API_STATUS_CODES } = require('../constants/apiStatus.js');
const AppError = require('../utils/AppError.util.js');
const cloudinary = require('../utils/cloudinary.util.js');

// Helper: upload buffer to Cloudinary using data URI (consistent with PostController)
const uploadBufferToCloudinary = async (buffer, mimetype, filename) => {
  const fileData = `data:${mimetype};base64,${buffer.toString('base64')}`;
  const result = await cloudinary.uploader.upload(fileData, {
    folder: 'post_images',
    public_id: filename,
    overwrite: true,
  });
  return result.secure_url || result.url;
};

class InfoController {
  async createInfo(req, res, next) {
    try {
      const payload = { ...req.body };

      // Attach userId from auth middleware
      if (!req.user || !req.user.userId) {
        return next(new AppError('Authentication required', API_STATUS_CODES.UNAUTHORIZED));
      }
      payload.userId = req.user.userId;

      // If picture was uploaded (multer memory storage), upload to Cloudinary
      if (req.file && req.file.buffer) {
        try {
          const filename = req.file.originalname ? req.file.originalname.split('.')[0] : `info_${Date.now()}`;
          const url = await uploadBufferToCloudinary(req.file.buffer, req.file.mimetype, filename);
          payload.picture = url;
        } catch (err) {
          return next(new AppError('Image upload failed', API_STATUS_CODES.INTERNAL_SERVER_ERROR));
        }
      }
      const created = await infoService.createInfo(payload);
      res.status(API_STATUS_CODES.CREATED).json({
        success: true,
        message: 'Info created successfully',
        data: created,
      });
    } catch (error) {
      next(error);
    }
  }

  async getInfo(req, res, next) {
    try {
      const { id } = req.params;
      const info = await infoService.getInfoById(id);
      res.status(API_STATUS_CODES.SUCCESS).json({
        success: true,
        data: info,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateInfo(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      // Ensure user is authenticated (ownership checks can be added later)
      if (!req.user || !req.user.userId) {
        return next(new AppError('Authentication required', API_STATUS_CODES.UNAUTHORIZED));
      }

      // If picture provided, upload to Cloudinary and set picture URL
      if (req.file && req.file.buffer) {
        try {
          const filename = req.file.originalname ? req.file.originalname.split('.')[0] : `info_${Date.now()}`;
          const url = await uploadBufferToCloudinary(req.file.buffer, req.file.mimetype, filename);
          updateData.picture = url;
        } catch (err) {
          return next(new AppError('Image upload failed', API_STATUS_CODES.INTERNAL_SERVER_ERROR));
        }
      }

      const updated = await infoService.updateInfo(id, updateData);
      res.status(API_STATUS_CODES.SUCCESS).json({
        success: true,
        message: 'Info updated successfully',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteInfo(req, res, next) {
    try {
      const { id } = req.params;
      await infoService.deleteInfo(id);
      res.status(API_STATUS_CODES.SUCCESS).json({
        success: true,
        message: 'Info deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async listInfos(req, res, next) {
    try {
      const { type } = req.query; // optional: doctor, pharmacy, imageCenter
      const items = await infoService.listInfos(type);
      res.status(API_STATUS_CODES.SUCCESS).json({
        success: true,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new InfoController();
