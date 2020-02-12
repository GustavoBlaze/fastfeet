import * as Yup from 'yup';
import { parseISO } from 'date-fns';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import CheckDate from '../helpers/CheckDate';

class TakeOutController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        signature_id: null,
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
    const { end_date } = delivery;

    const checkDate = CheckDate(start_date, end_date);
    if (checkDate.error) {
      return res.status(400).json(checkDate);
    }

    const takenOutDeliveries = await Delivery.count({
      where: {
        deliveryman_id,
        id,
      },
    });

    if (takenOutDeliveries >= 5) {
      return res
        .status(401)
        .json({ error: 'You can take just 5 deliveries per day' });
    }

    const { product, recipient_id } = await delivery.update({ start_date });

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
