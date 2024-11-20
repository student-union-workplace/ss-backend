export type EventFormValues = {
    lastEvent: string,
    title: string,
    theme: string,
    description: string,
    date: Date | null,
    place: string[],
    responsible: string[],
    team: string[]
}