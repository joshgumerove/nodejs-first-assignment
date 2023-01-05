const routesHandler = (req, res) => {
  console.log("listening on port 3000");
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>Hello From Nodejs</h1>");
    res.write(
      "<form action='/create-user' method='POST'><input type='text' name='create-user'/><button type='submit'>Submit</button></form>"
    );
    res.write("</body>");
    res.write("</html>");
    res.end();
  }

  if (url === "/users") {
    res.write("<html><body><h1>Dummy User List</h1></body></html>");
    res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      console.log(message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  }
};

module.exports = routesHandler;
