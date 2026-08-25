// GOOGLE APPS SCRIPT
// 1. Create a free Google Sheet called "Sécherheetsdag 2026 - Umeldungen".
// 2. Extensions > Apps Script.
// 3. Replace the existing code with this code.
// 4. Deploy > New deployment > Web app.
// 5. Execute as: Me
// 6. Who has access: Anyone
// 7. Copy the Web app URL into config.js as REGISTRATION_ENDPOINT.

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp", "Virnumm", "Familljennumm", "E-Mail",
      "Telefon", "Feierläscher", "Bemierkung"
    ]);
  }

  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.firstName || "",
    data.lastName || "",
    data.email || "",
    data.phone || "",
    data.extinguishers || "",
    data.message || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ok: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
