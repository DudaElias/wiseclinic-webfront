import { Dayjs } from "dayjs"

export function formatDate(date: Dayjs) {
    const data = date.get('year').toString() + "-" + (date.get('month') + 1 < 10 ? "0" : "") + (date.get('month') + 1).toString() + "-" + (date.get('date') + 1 < 10 ? "0" : "") + date.get('date').toString()
    return data
}

export function formatHorario(date: string) {
    let horario = date.split("T")[1]
    return horario.substring(0, horario.length - 3)
}
