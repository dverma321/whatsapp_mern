export function extractDateTime(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1); // Adding 1 because getMonth returns zero-based month
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  
  function padZero(number) {
    return number.toString().padStart(2, "0");
  }
  