import { Op } from 'sequelize';
import Recipient from '../models/Recipient';
import Delivery from '../models/Delivery';

class DeliveryStatusController {
  async index(req, res) {
    const completed = req.query.completed || false;
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        signature_id: completed ? { [Op.ne]: null } : null,
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
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
