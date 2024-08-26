const http2 = require("http2");

const SERVER_URL = "https://http2-server-service:8000";

let flag = false;

function makeRequest() {
  if (flag) {
    return;
  }

  flag = true;

  const client = http2.connect(SERVER_URL, {
    rejectUnauthorized: false,
  });

  const req = client.request({
    ":method": "POST",
    ":path": "/",
    "Content-Type": "application/json",
  });

  req.write(JSON.stringify({ message: "hii" }));
  req.end();

  let responseBody = "";

  req.on("data", (chunk) => {
    responseBody += chunk.toString();
  });

  req.on("end", () => {
    try {
      const jsonResponse = JSON.parse(responseBody);
      console.log(jsonResponse.message);
    } catch (err) {
      console.error("Error parsing JSON:", err);
    }

    client.close();
    flag = false;

    setTimeout(makeRequest, 1000);
  });

  req.on("error", (err) => {
    console.error("Error:", err);
    client.close();
    flag = false;

    setTimeout(makeRequest, 1000);
  });
}

makeRequest();
