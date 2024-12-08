export type TaskFormValues = {
    title: string;
    description: string;
    deadline: Date | null;
    user_id: string;
    status: 'open' | 'at_work' | 'review' | 'closed'
}