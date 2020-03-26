import * as Yup from 'yup';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import { checkIndividualDate } from '../helpers/CheckDate';

class TakeOutController {
  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { deliveryman_id, id } = req.params;

    const delivery = await Delivery.findOne({
      where: {
        deliveryman_id,
        id,
        canceled_at: null,
        signature_id: null,
      },
    });

    // check if delivery exists
    if (!delivery) {
      return res
        .status(400)
        .json({ error: "There's no delivery with this id" });
    }

    // check if start_date is okay
    const start_date = parseISO(req.body.start_date);

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
