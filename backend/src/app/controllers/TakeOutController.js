import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import { checkIndividualDate } from '../helpers/CheckDate';

class TakeOutController {
  async update(req, res) {
    const { deliveryman_id, id } = req.params;

    const delivery = await Delivery.findOne({
      where: {
        deliveryman_id,
        id,
        canceled_at: null,
        signature_id: null,
      },
    });

    if (!delivery) {
      return res
        .status(400)
        .json({ error: "There's no delivery with this id" });
    }

    const start_date = new Date();

    const checkDate = checkIndividualDate(start_date);
    if (checkDate.error) {
      return res.status(400).json(checkDate);
    }

    const takenOutDeliveries = await Delivery.count({
      where: {
        deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(start_date), endOfDay(start_date)],
        },
      },
    });

    if (takenOutDeliveries >= 5) {
      return res
        .status(401)
        .json({ error: 'You can take just 5 deliveries per day' });
    }

    const { product, recipient_id, end_date } = await delivery.update({
      start_date,
    });

    return res.json({
      id,
      product,
      deliveryman_id,
      recipient_id,
      start_date,
      end_date,
    });
  }
}

export default new TakeOutController();
