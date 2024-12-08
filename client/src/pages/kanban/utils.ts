export const getStatus = (status: 'open' | 'at_work' | 'review' | 'closed') => {
    switch (status) {
        case 'open':
            return 'Открыта';
        case 'at_work':
            return 'В работе';
        case 'review':
            return 'На проверке';
        case 'closed':
            return 'Выполнена';
        default:
            return
    }
}