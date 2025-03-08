export interface Week {
    month: string;
    weekNumber: number;
    startDate: string;
    endDate: string;
  }
  
  export const generateCalendarWeeks = (): Week[] => {
    const weeks: Week[] = [];
    const currentDate = new Date(); // Start from the current month
    const currentYear = currentDate.getFullYear();
  
    for (let month = currentDate.getMonth(); month >= 0; month--) {
      let date = new Date(currentYear, month, 1);
      let weekNumber = 1; // Reset week number for each month
  
      while (date.getMonth() === month) {
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(startDate.getDate() + 6);
  
        weeks.push({
          month: startDate.toLocaleString('default', { month: 'long' }),
          weekNumber, // Start from 1 for each month
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        });
  
        weekNumber++; // Increment week number within the same month
  
        // Move to next week
        date.setDate(date.getDate() + 7);
      }
    }
  
    return weeks;
  };
  