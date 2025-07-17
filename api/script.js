import jwt from 'jsonwebtoken';

const SECRET = 'ton-secret-ultra-securise';

export default function handler(req, res) {
  // CORS simplifié (adapte selon besoin)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Token manquant' });
    return;
  }

  try {
    // Vérifie le token et récupère la charge utile
    const payload = jwt.verify(token, SECRET);

    // Si token valide, renvoie ton code JS sécurisé
    const code = `
      alert("Bienvenue ${payload.email} ! Code sécurisé chargé.");
      // Place ici ton vrai code JS à protéger
    `;
    res.status(200).send(code);

  } catch (err) {
    res.status(401).json({ error: 'Token invalide ou expiré' });
  }
}
