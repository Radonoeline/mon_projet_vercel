export default function handler(req, res) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).send("// Unauthorized");
  }

  const token = auth.replace("Bearer ", "");
  const decoded = Buffer.from(token, "base64").toString();
  const email = decoded.split(":")[0];

  // Contrôle d’accès simple
  const allowedUsers = ["admin@example.com", "demo@demo.com"];
  if (!allowedUsers.includes(email)) {
    return res.status(403).send("// Forbidden");
  }

  res.setHeader("Content-Type", "application/javascript");
  res.send(`alert("Hello ${email}");`);
}
