import * as Yup from 'yup';
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
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }
    // check if delivery exists
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    // check if recipient exists
    if (
      req.body.recipient_id &&
      !(await Recipient.findByPk(req.body.recipient_id))
    ) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    // check if deliveryman exissts
    if (
      req.body.deliveryman_id &&
      !(await Deliveryman.findByPk(req.body.deliveryman_id))
    ) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const { id, recipient_id, deliveryman_id, product } = await delivery.update(
      req.body
    );

    return res.json({ id, recipient_id, deliveryman_id, product });
  }
}

export default new DeliveryController();
