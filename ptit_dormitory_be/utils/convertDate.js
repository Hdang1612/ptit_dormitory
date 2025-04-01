import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import dayjs from 'dayjs';
dayjs.extend(customParseFormat);
// Hàm chuẩn hóa ngày từ Excel
export const parseDate = (value) => {
  if (!value) return null;
  if (!isNaN(value)) {
    return dayjs(new Date(1899, 11, 30).getTime() + value * 86400000).format(
      'YYYY-MM-DD',
    );
  }
  const parsedDate = dayjs(
    value,
    ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'],
    true,
  );
  return parsedDate.isValid() ? parsedDate.format('YYYY-MM-DD') : null;
};
