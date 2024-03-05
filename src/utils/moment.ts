import moment from 'moment';
import 'moment/dist/locale/ru';
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment);

moment.locale('ru');

export const duration = (duration: string): string => moment.duration(duration)
    .format('h:mm:ss').padStart(4, '0:0');

export const posted = (time: string): string => moment(time).fromNow();

