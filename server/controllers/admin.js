import db from '../db/models';

const { Auth, VendorRequest } = db;

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

    VendorRequest.update( { status }, {
      where: { id: requestId }
    })
      .then(request => {        
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

  }
}

export default AdminCtrl;
