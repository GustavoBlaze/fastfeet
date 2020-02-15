import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { delivery, problem } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Entrega cancelada',
      template: 'cancellation',
      context: {
        deliveryman: delivery.deliveryman.name,
        product: delivery.product,
        recipient: delivery.recipient.name,
        street: delivery.recipient.street,
        number: delivery.recipient.number,
        complement: delivery.recipient.complement || 'Sem complemento',
        city: delivery.recipient.city,
        state: delivery.recipient.state,
        zip_code: delivery.recipient.zip_code,
        date: format(
          parseISO(delivery.canceled_at),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        description: problem.description,
      },
    });
  }
}

export default new CancellationMail();
