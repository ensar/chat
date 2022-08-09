import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const currentTime = () => {
  return dayjs().format('HH:mm');
};
