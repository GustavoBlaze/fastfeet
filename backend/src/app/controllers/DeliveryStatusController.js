import { Op } from 'sequelize';
import Recipient from '../models/Recipient';
import Delivery from '../models/Delivery';

class DeliveryStatusController {
  async index(req, res) {
    const completed = req.query.completed || false;
    const { page = 1 } = req.query;
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        signature_id: completed ? { [Op.ne]: null } : null,
      },
      limit: 6,
      offset: (page - 1) * 6,
      order: ['createdAt'],
      attributes: ['id', 'product', 'start_date', 'end_date', 'createdAt'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
      ],
    });

    return res.status(200).json(deliveries);
  }
}

export default new DeliveryStatusController();
