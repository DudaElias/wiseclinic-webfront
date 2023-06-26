export interface Consulta {
  id: string,
  paciente: {
    cpf: string,
    nome: string,
  },
  check_in: boolean,
  medico: {
    nome: string
  }
  dentista: {
    nome: string
  },
  profissional: {
    nome: string,
  },
  horario: string,
  especialidade: string
}