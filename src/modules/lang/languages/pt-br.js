export default {
  months: [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro'
  ],
  days_small: [
    { end_week: true, name: 'D' },
    { end_week: false, name: 'S' },
    { end_week: false, name: 'T' },
    { end_week: false, name: 'Q' },
    { end_week: false, name: 'Q' },
    { end_week: false, name: 'S' },
    { end_week: true, name: 'S' }
  ],
  days: [
    { end_week: true, name: 'Domingo' },
    { end_week: false, name: 'Segunda' },
    { end_week: false, name: 'Terça' },
    { end_week: false, name: 'Quarta' },
    { end_week: false, name: 'Quinta' },
    { end_week: false, name: 'Sexta' },
    { end_week: true, name: 'Sábado' }
  ],
  days_full: [
    { end_week: true, name: 'Domingo' },
    { end_week: false, name: 'Segunda-Feira' },
    { end_week: false, name: 'Terça-Feira' },
    { end_week: false, name: 'Quarta-Feira' },
    { end_week: false, name: 'Quinta-Feira' },
    { end_week: false, name: 'Sexta-Feira' },
    { end_week: true, name: 'Sábado' }
  ],
  components: {
    day: {
      title: 'Eventos',
      messages: {
        nothing_today: 'Não há nada para hoje, fique tranquilo!',
        nothing_future: 'Não há nada para este dia, fique tranquilo!',
        nothing_past: 'Não houve nada neste dia, fique tranquilo!'
      }
    }
  }
}
