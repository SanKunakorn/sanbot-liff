
getLocation()
let lat, lon
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude
      lon = position.coords.longitude
      //แสดง lat long ใน textbox
      document.getElementById("latlong").value = lat + ',' + lon;
    });
  }
}

function validateThaiID(id) {
  // ตรวจสอบความยาวของเลขบัตรประชาชน
  if (id.length !== 13) {
    return false;
  }
  // ตรวจสอบว่าเป็นตัวเลขทั้งหมดหรือไม่
  if (!/^\d{13}$/.test(id)) {
    return false;
  }
  // คำนวณเช็คดิจิตอล
  var sum = 0;
  for (var i = 0; i < 12; i++) {
    sum += parseInt(id.charAt(i)) * (13 - i);
  }
  var checkDigit = (11 - (sum % 11)) % 10;
  // เปรียบเทียบเช็คดิจิตอล
  return parseInt(id.charAt(12)) === checkDigit;
}




function settext() {
  let user = document.getElementById("user").value;
  let datetimeInput = document.getElementById("datetime");
  let datetime = datetimeInput.value ? new Date(datetimeInput.value) : new Date(); // Check if datetime input is empty, if yes, use current date
  let detail = document.getElementById("detail").value;
  let latlong = document.getElementById("latlong").value;
  // Options for Thai locale
  let options = { year: 'numeric', month: 'short', day: 'numeric' };
  // Convert the date to Thai locale
  let thaiDate = datetime.toLocaleDateString('th-TH', options);
  let message = 'เรียน ผู้บังคับบัญชา' + "\n-------------------------" + '\n     วันนี้( ' + thaiDate + ' )' + "\n" + user + ' ' + detail + "\n แผนที่: https://maps.google.com?q=" + latlong + '\n   ' + "     จึงเรียนมาเพื่อโปรดทราบ";
  alert(`${message}`)
  return message;
}


function IptoText(data) {
  // ตัวอย่างการสร้างข้อความจากข้อมูลที่ได้รับ
  var myIP =
  `IP Address: ${data.query}
  📍ประเทศ: ${data.country} : ${data.countryCode}
  📍พื้นที่: ${data.region} : ${data.regionName}
  📍เมือง: ${data.city}
  📍Timezone: ${data.timezone}
  📍ผู้ให้บริการ: ${data.isp}
  📍Org: ${data.org}
  📍As: ${data.as}
  📍https://maps.google.com?q=${data.lat},${data.lon}`;
  return myIP;
}














