export const getOriginalDate = (dateToConvert) => {
     const date = new Date(dateToConvert);

     const formattedDate = new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
     }).format(date);

     return formattedDate;
};
