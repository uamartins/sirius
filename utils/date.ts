function pad(number: number): string {
    return (number < 10) ? '0' + number : number.toString();
  }
  
  export function formatDate(date: Date): string {
    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate());
  }
  
  export function formatTime(date: Date): string {
    return pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds());
  }