function onFormSubmit(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const email = e.values[1]; // Assuming Mail ID is the first question
  const day1 = e.values[2]; // Assuming Day 1 is the second question
  const day2 = e.values[3]; // Assuming Day 2 is the third question
  const mobile = e.values[4]; // Assuming Mobile Number is the fourth question

  // Get the current date
  const today = new Date();
  const todayString = today.toISOString().split('T')[0]; // Format YYYY-MM-DD

  // Check if the email has already submitted
  const emailRange = sheet.getRange("B2:B" + sheet.getLastRow()).getValues(); // Assuming Mail ID is in column B
  const emailSubmitted = emailRange.flat().includes(email);

  // Check submissions for Day 1
  const day1Range = sheet.getRange("C2:C" + sheet.getLastRow()).getValues(); // Assuming Day 1 is in column C
  const day1Count = day1Range.flat().filter(date => date === day1).length;

  // Check if the submission limit is reached
  if (emailSubmitted) {
    throw new Error("This email has already submitted the form.");
  } else if (day1Count >= 8) {
    throw new Error("Submission limit reached for " + day1 + ". Please choose another day.");
  }
}
