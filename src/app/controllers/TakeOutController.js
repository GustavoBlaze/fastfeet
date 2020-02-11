import { isBefore, isAfter, setSeconds, setMinutes, setHours } from 'date-fns';
import Delivery from '../models/Delivery';

class TakeOutController {
  async update(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    // check if delivery exists
    if (!delivery) {
      return res
        .status(400)
        .json({ error: "There's no delivery with this id" });
    }

    // check if delivery has already been taken out
    if (delivery.start_date) {
      return res
        .status(401)
        .json({ error: 'This delivery has already been taken out' });
    }

    const start_date = new Date();

    const startInterval = setSeconds(setMinutes(setHours(start_date, 8), 0), 0);
    const endInterval = setSeconds(setMinutes(setHours(start_date, 18), 0), 0);

    // check if the taken out request is between 8 and 18 hours
    if (
      isBefore(start_date, startInterval) ||
      isAfter(start_date, endInterval)
    ) {
      return res.status(401).json({
        error: 'You can only take out a delivery between 08:00 and 18:00 hours',
      });
    }

    const {
      id,
      product,
      deliveryman_id,
      recipient_id,
    } = await delivery.update({ start_date });

    return res.json({ id, product, deliveryman_id, recipient_id, start_date });
  }
}

export default new TakeOutController();
