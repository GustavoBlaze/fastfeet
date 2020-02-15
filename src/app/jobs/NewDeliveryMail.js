import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, product, recipient } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova entrega',
      template: 'newdelivery',
      context: {
        deliveryman: deliveryman.name,
        product,
        recipient: recipient.name,
        street: recipient.street,
        number: recipient.number,
        complement: recipient.complement || 'Sem complemento',
        city: recipient.city,
        state: recipient.state,
        zip_code: recipient.zip_code,
      },
    });
  }
}

export default new NewDeliveryMail();
