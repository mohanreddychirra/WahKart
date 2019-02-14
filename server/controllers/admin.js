import db from '../db/models';

const { Auth, VendorRequest, Shop } = db;

class AdminCtrl {
  /**
   * 
   * @description To check if the current logged in user is an admin
   * otherwise respond with ann unauthorized error 
   * @param {*} req 
   * @param {*} res 
   */
  static checkAdmin(req, res) {
    const { role } = req.payload;

    if (role !== 'admin') {
      res.status(401).json({
        message: 'Only an admin can access this resource'
      });
    }

    return true;
  }

  /**
   * 
   * @description To fetch vendor requests for admin to manage
   *  
   * @param {*} req 
   * @param {*} res 
   */
  static getRequests(req, res) {
    if (!AdminCtrl.checkAdmin(req, res)) return;

    VendorRequest.findAll({
      include: {
        model: Auth,
        attributes: [ 'email' ]
      }
    })
      .then(requests => {
        res.json(200, {
          message: 'Vendor requests fetched successfully',
          requests
        });
      })
      .catch((error) => {
        res.json(500, {
          message: 'Internal server error'
        });
      });

  }

  /**
   * 
   * @description This is used to update the status field of requests
   * to onne of : open, approved or disapproved
   * @param {*} req 
   * @param {*} res 
   */
  static updateRequest(req, res) {
    if (!AdminCtrl.checkAdmin(req, res)) return;

    const { requestId } = req.params; 
    const { status } = req.body; 

    // Update a specific vendor request
    VendorRequest.update({ status }, {
      where: { id: requestId },
      returning: true,
      plain: true
    })
      .then(result => {
        const request = result[1].dataValues;
        
        if (request.status !== 'approved') {
          return res.json(200, {
            message: 'Request updated successfully',
            request
          });
        }

        // If the update is to approve, create a shop for the vendor
        Shop.create({
          vendorId: request.vendorId,
          name: request.shopName
        })
          .then(() => {
            res.json(200, {
              message: 'Request updated successfully',
              request
            });
          })
          .catch(() => {
            res.json(500, {
              message: 'Internal server error'
            });
          });
      })
      .catch((error) => {
        res.json(500, {
          message: 'Internal server error'
        });
      });
  }
}

export default AdminCtrl;
