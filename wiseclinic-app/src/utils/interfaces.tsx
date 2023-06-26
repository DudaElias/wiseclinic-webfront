export interface Consulta {
  id: string,
  paciente: {
    cpf: string,
    nome: string,
  },
  checkin: boolean,
  profissional: {
    nome: string,
  },
  horario: string,
  especialidade: string
}

export interface Profissional {
  nome: string,
  doc: string
}