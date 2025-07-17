import jwt from 'jsonwebtoken';

const SECRET = 'ton-secret-ultra-securise'; // Change ça en vrai secret !

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  // Utilisateurs autorisés (exemple simple)
  const USERS = [
    { email: 'rado@gmail.com', password: 'ok' },
  ];

  const user = USERS.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Identifiants invalides' });

  // Génère token JWT valide 7 jours
  const token = jwt.sign({ email }, SECRET, { expiresIn: '7d' });

  res.status(200).json({ token });
}
