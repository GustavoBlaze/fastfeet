import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import File from '../models/File';

class CompleteController {
  async update(req, res) {
    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const delivery = await Delivery.findOne({
      where: {
        id: req.params.delivery_id,
        deliveryman_id: req.params.deliveryman_id,
      },
    });

    if (!delivery) {
      return res
        .status(400)
        .json({ error: "There's no delivery with this id" });
    }

    if (!delivery.start_date) {
      return res
        .status(400)
        .json({ error: 'This delivery must been taken out before.' });
    }

    const { signature_id } = req.body;
    const signature = await File.findByPk(signature_id);

    if (!signature) {
      return res
        .status(400)
        .json({ error: "There's no signature with this id" });
    }

    const {
      id,
      recipient_id,
      deliveryman_id,
      product,
      start_date,
      end_date,
    } = await delivery.update({ signature_id, end_date: new Date() });

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      product,
      start_date,
      end_date,
    });
  }
}

export default new CompleteController();
