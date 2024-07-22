const finalizeDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: 'Entrega não encontrada' });
    }

    const tempoDecorrido = Math.floor((new Date() - new Date(delivery.iniciado)) / 60000); // Calcular tempo decorrido em minutos
    delivery.isActive = false;
    delivery.finalizado = new Date();
    delivery.tempoDecorrido = tempoDecorrido;

    await delivery.save();
    res.status(200).json(delivery);
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
