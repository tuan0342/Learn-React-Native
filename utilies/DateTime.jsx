import moment from 'moment';
export const convertDateTime = datetime => {
  return moment(datetime).format('DD/MM/YYYY');
};
