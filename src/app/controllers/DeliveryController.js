import * as Yup from 'yup';
import { parseISO } from 'date-fns';
import CheckDate from '../helpers/CheckDate';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll();
    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { recipient_id, deliveryman_id, product } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const { id } = await Delivery.create({
      recipient_id,
      deliveryman_id,
      product,
    });

    return res.json({ id, recipient_id, deliveryman_id, product });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }
    // check if delivery exists
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    // check if recipient exists
    if (recipient_id && !(await Recipient.findByPk(recipient_id))) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    // check if deliveryman exissts
    if (deliveryman_id && !(await Deliveryman.findByPk(deliveryman_id))) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const startDate = req.body.start_date
      ? parseISO(req.body.start_date)
      : null;

    const endDate = req.body.end_date ? parseISO(req.body.end_date) : null;

    const checkDate = CheckDate(startDate, endDate);
    if (checkDate.error) {
      return res.status(400).json(checkDate);
    }

    const { id, product, start_date, end_date } = await delivery.update(
      req.body
    );

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      product,
      start_date,
      end_date,
    });
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Can not find this delivery' });
    }

    await delivery.destroy();

    return res.status(200).json();
  }
}

export default new DeliveryController();
