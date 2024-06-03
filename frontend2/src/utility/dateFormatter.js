// Function to format a given date into "Day Month, Year" format
export const formattedDate = (date) => {
    // Array of month abbreviations
    const mth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Create a new Date object from the input date
    const createdAtDate = new Date(date);
    
    // Extract the day of the month
    const day = createdAtDate.getDate();
    
    // Extract the month (0-11) and use it to get the month abbreviation
    const month = createdAtDate.getMonth();
    
    // Extract the full year
    const year = createdAtDate.getFullYear();
  
    // Return the formatted date string
    return `${day} ${mth[month]}, ${year}`;
}
