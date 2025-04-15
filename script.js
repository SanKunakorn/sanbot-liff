
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

const GAS_URL = "https://script.google.com/macros/s/AKfycbzHh2whTRjedoCy-5NPwL1gvuCqSDLASRIFdjurzTQOBJux4bI7rTj8wUh5dWWn6xJi-Q/exec"; // แทนที่ด้วย URL จริงจาก GAS
let mapID = '';

// ดึงแผนที่จาก GAS
async function loadMap() {
  const response = await fetch(`${GAS_URL}?getMap=true&latitude=${lat}&longitude=${lon}`);
  const data = await response.json();
  if (data.fileUrl) {
    //document.getElementById("map-img").src = data.fileUrl;
    return data.fileId;
  }
  return '';
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


async function settext() {
  let user = document.getElementById("user").value;
  let datetimeInput = document.getElementById("datetime");
  let datetime = datetimeInput.value ? new Date(datetimeInput.value) : new Date();
  let detail = document.getElementById("detail").value;
  let latlong = document.getElementById("latlong").value;
  let options = { year: 'numeric', month: 'short', day: 'numeric' };
  let thaiDate = datetime.toLocaleDateString('th-TH', options);
  let mapLink = "https://maps.google.com?q=" + latlong;
  let qrurl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(mapLink);
  let message = 'เรียน ผู้บังคับบัญชา\n-------------------------\n     วันนี้( ' + thaiDate + ' )\n' + user + ' ' + detail + '\nแผนที่: ' + mapLink + '\n     จึงเรียนมาเพื่อโปรดทราบ';
    // 👇 รอให้โหลดภาพแผนที่เสร็จ
    let mapimg = await loadMap();

  return { message, mapLink, qrurl, mapimg };
}






// ฟังก์ชันดึงข้อมูล IP
async function getIPFromAPI(userip) {
  try {
    const apiUrl = `http://ip-api.com/json/${userip}`;
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();

      if (data.status === "success") {
        return [
          `IP Address: ${data.query}`,
          `📍ประเทศ: ${data.country} (${data.countryCode})`,
          `📍พื้นที่: ${data.region} (${data.regionName})`,
          `📍เมือง: ${data.city}`,
          `📍Timezone: ${data.timezone}`,
          `📍ผู้ให้บริการ: ${data.isp}`,
          `📍Org: ${data.org}`,
          `📍As: ${data.as}`,
          `📍Google Maps: <a href="https://maps.google.com?q=${data.lat},${data.lon}" target="_blank">ดูในแผนที่</a>`
        ].join('<br>');
      } else {
        return `ไม่สามารถดึงข้อมูล IP ได้: ${data.message}`;
      }
    } else {
      return `ไม่สามารถเชื่อมต่อ API ได้: Response code ${response.status}`;
    }
  } catch (error) {
    return `เกิดข้อผิดพลาด: ${error.message}`;
  }
}

