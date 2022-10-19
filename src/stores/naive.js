function calculateDaysBetweenDates(){
    const date1 = new Date('2019-01-01');
    const date2 = new Date('2019-01-10');
    return (date2 - date1) / (1000 * 60 * 60 * 24);
}
