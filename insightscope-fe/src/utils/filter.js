export const filter = (data, date, age, gender) => {
  let newData = [...data];
  // console.log("data in filter", data);
  /* console.log("data in filter", date);
  console.log("data in filter", age);
  console.log("data in filter", gender); */

  // Filter by date range
  if (date.startDate !== undefined && date.endDate !== undefined) {
    newData = newData.filter((item) => {
      const itemDateParts = item.Day.split("/"); // Split the date string
      const itemDate = new Date(
        itemDateParts[2],
        itemDateParts[1] - 1,
        itemDateParts[0]
      ); // Create a new Date object
      console.log(date.endDate);
      return itemDate <= date.endDate && itemDate >= date.startDate;
    });
  }

  // console.log(newData);

  // Filter by age
  if (age) {
    newData = newData.filter((item) => item.Age === age);
  }

  // Filter by gender
  if (gender) {
    newData = newData.filter((item) => item.Gender === gender);
  }

  // console.log("newData", newData);
  return newData;
};

// console.log(filter(dataFromBe, dateRange, "15-25", "Female"));
