// Buka Google Spreadsheet > Extensions > Apps Script > tempel kode ini > Deploy > New deployment > Web app
// (Execute as: Me, Who has access: Anyone). Salin URL berakhiran /exec ke data.js.
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s = ss.getSheetByName('Hasil') || ss.insertSheet('Hasil');
  if (s.getLastRow() === 0) s.appendRow(['Timestamp','Nama Peserta Didik','Kelas','Nilai','Jumlah Benar','Jumlah Salah','Persentase','Status','Waktu Pengerjaan','Jawaban Uraian']);
  var d = JSON.parse(e.postData.contents);
  s.appendRow([new Date(), d.nama, d.kelas, d.nilai, d.benar, d.salah, d.persen, d.status, d.waktu, d.uraian || '']);
  return ContentService.createTextOutput('OK');
}
