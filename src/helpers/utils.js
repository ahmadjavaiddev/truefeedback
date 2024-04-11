export const checkEmailIsValid = (email) => {
     const allowEmails = [
          "gmail.com",
          "outlook.com",
          "yahoo.com",
          "hotmail.com",
     ];
     const valueOfEmail = email.toLowerCase().trim().split("@")[1];
     return allowEmails.includes(valueOfEmail);
};
