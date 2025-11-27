
import moment from 'moment';

export function formatDate(date: string): string{
    const dateMoment = moment(date);
    const dayBeforeYesterday = moment().subtract(2, 'day');
    const today = moment();
    
    if (dateMoment.isSame(today, 'D')) return "today";
    if (dateMoment.isBefore(today, 'D') && dateMoment.isAfter(dayBeforeYesterday), 'D') return 'yesterday';

    return dateMoment.format('MMMM DD'); //does not include the year
}