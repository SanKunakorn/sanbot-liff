
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

async function getIpLocation() {
  var ip = document.getElementById('txtkey').value;
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();

    var message =
      `IP Address: ${data.query}
    📍ประเทศ: ${data.country} : ${data.countryCode}
    📍พื้นที่: ${data.region} : ${data.regionName}
    📍เมือง: ${data.city}
    📍Timezone: ${data.timezone}
    📍ผู้ให้บริการ: ${data.isp}
    📍Org: ${data.org}
    📍As: ${data.as}
    📍https://maps.google.com?q=${data.lat},${data.lon}`;

    alert(message);
    return message; // Returning the message is optional
  } catch (error) {
    console.error('Error fetching IP location:', error);
    alert('Error fetching IP location. Please try again.'); // Inform the user about the error
    throw error; // Re-throw the error to handle it upstream if needed
  }
}



async function sendFlexBot() {
  try {
    var ip = await getIpLocation(); // เรียกใช้ getIpLocation() และรอให้ค่าส่งกลับมา
    // สร้าง Flex Message โดยใช้ค่า ip ที่ได้จาก getIpLocation()
    var flexMessage = {
      "type": "flex",
      "altText": "ระบบตอบกลับ",
      "contents": {
        "type": "bubble",
        "header": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "ผลการค้นหา",
              "weight": "bold",
              "size": "xl",
              "align": "center"
            },
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "icon",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                },
                {
                  "type": "text",
                  "text": 'เช็ค IP',
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            }
          ]
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "margin": "lg",
          "spacing": "sm",
          "contents": [
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "Results",
                  "color": "#aaaaaa",
                  "size": "sm",
                  "flex": 1
                },
                {
                  "type": "text",
                  "text": ip,//ผล
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            },
            {
              "type": "separator"
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "separator"
            },
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "San BOT",
                "uri": "http://line.me/ti/p/~@223zypdp"
              },
              "color": "#00FF66"
            },
          ],
          "flex": 0
        },
        "styles": {
          "header": {
            "backgroundColor": "#99FFFF"
          }
        }
      }
    }

    // เรียกใช้ LIFF API เพื่อส่งข้อความ Flex Message
    await liff.sendMessages([flexMessage]);

    alert("Message sent successfully!");
    document.getElementById("txtip").reset();
  } catch (error) {
    alert("Error occurred while trying to send message: " + error);
  }
}

