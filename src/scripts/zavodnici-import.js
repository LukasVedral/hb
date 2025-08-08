$(document).ready(function () {
  Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vTyDDjh5LRMUqH8Gw4seB6TUEZdR5Vh_0OcOpzZDlMpDnTOGuwqX8MqGuDhnDx3j4S_XC6fVPawmXJb/pub?gid=0&single=true&output=csv&nocache=" + Date.now(), {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;

      data.forEach(row => {
        if (row["Id."] && row["Název týmu"]) {
          const htmlRow = `
            <tr>
              <td>${row["Id."]}</td>
              <td>${row["Název týmu"]}</td>
              <td>${row["Kategorie"]}</td>
              <td>${row["Závodník 1"]}</td>
              <td>${row["Závodník 2"]}</td>
              <td>${row["Odhlášení"] || ""}</td>
            </tr>`;
          $('#table').append(htmlRow);
        }
      });

      $('#zavodnici').DataTable({
        language: {
          url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/cs.json'
        }
      });
    }
  });
});