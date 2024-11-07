export const filter = (data, date, age, gender) => {
  let newData = [...data];

  if (date.startDate !== undefined && date.endDate !== undefined) {
    newData = newData.filter((item) => {
      const itemDateParts = item.Day.split("/");
      const itemDate = new Date(
        itemDateParts[2],
        itemDateParts[1] - 1,
        itemDateParts[0]
      );
      return itemDate <= date.endDate && itemDate >= date.startDate;
    });
  }

  if (age) {
    newData = newData.filter((item) => item.Age === age);
  }

  if (gender) {
    newData = newData.filter((item) => item.Gender === gender);
  }

  return newData;
};
