import db from '../db/models';

const { Auth, VendorRequest, Shop } = db;

class AdminCtrl {
  static checkAdmin(req, res) {
    const { role } = req.payload;

    if (role !== 'admin') {
      res.status(401).json({
        message: 'Only an admin can access this resource'
      });
    }

    return true;
  }

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

  static updateRequest(req, res) {
    if (!AdminCtrl.checkAdmin(req, res)) return;

    const { requestId } = req.params; 
    const { status } = req.body; 

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

        Shop.create({
          vendorId: request.vendorId,
          name: request.shopName
        })
          .then((shop) => {
            res.json(200, {
              message: 'Request updated successfully',
              request
            });
          })
          .catch((error) => {
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
