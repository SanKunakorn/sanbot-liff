
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

  async function CheckIP() {
    var txtip = document.getElementById('txtip').value;
    var apiUrl = 'http://ip-api.com/json/' + txtip;
    try {
      var response = await fetch(apiUrl);
      if (response.ok) {
        // แปลง JSON ที่ได้รับเป็น JavaScript object
        var data = await response.json();
        // ทำสิ่งที่คุณต้องการกับข้อมูลที่ได้
        var ipResult = 
          "\n📍ประเทศ: " + data.country + ": " + data.countryCode +
          "\n📍พื้นที่: " + data.region + ":" + data.regionName +
          "\n📍เมือง: " + data.city +
          "\n📍Timezone: " + data.timezone +
          "\n📍ผู้ให้บริการ: " + data.isp +
          "\n📍Org: " + data.org + "\n📍As: " + data.as +
          "\n📍https://maps.google.com?q=" + data.lat + "," + data.lon
        ;
        alert(`${ipResult}`);
        sendMessagebot(ipResult);
      } else {
        alert('Error: ' + response.status);
      }
    } catch (error) {
      alert('Error occurred: ' + error);
    }
  }



  async function sendMessagebot(message) {
    
    try {
      // เรียกใช้ LIFF API เพื่อส่งข้อความ
      await liff.sendMessages([
        {
          type: 'text',
          text: message, // ข้อความที่ต้องการส่ง
        }
        // สามารถเพิ่มประเภทของข้อความและข้อมูลเพิ่มเติมตามต้องการ
      ]);

      alert("Message sent successfully!");
      document.getElementById("mainform").reset()
    } catch (error) {
      alert("Error occurred while trying to send message:", error);
    }
  }




  
  async function sendFlexBot(key, results) {
    try {
      // เรียกใช้ LIFF API เพื่อส่งข้อความ
      await liff.sendMessages([
        {
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
                      "text": key,
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
                      "text": results,//ผล
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
      ]);
      alert("Message sent successfully!");
      document.getElementById("txtip").reset()
    } catch (error) {
      alert("Error occurred while trying to send message:", error);
    }
  }
