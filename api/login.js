export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  // ⚠️ Base utilisateur simple en dur (tu peux l’améliorer avec Supabase)
  const USERS = [
    { email: "admin@example.com", password: "secret" },
    { email: "demo@demo.com", password: "1234" }
  ];

  const user = USERS.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Identifiants invalides" });

  // Token simple base64 (à remplacer par vrai JWT pour la prod)
  const token = Buffer.from(email + ":ok").toString("base64");
  res.status(200).json({ token });
}

