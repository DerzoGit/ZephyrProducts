## Authentification

| Méthode | Point d'accès  | Request Body  | Réponse | Fonction |
|---------|----------------|---------------|---------|----------|
| PUT     | `/auth/signup` | `{ "nom": "utilisateur1", "password": "MotDePasse123!" }` | `200 OK` - Utilisateur créé <br> `400 Bad Request` - Champ manquant ou mot de passe invalide <br> `409 Conflict` - Utilisateur existe déjà | Création d'un nouvel utilisateur, employé par défaut |
| POST    | `/auth/login`  | `{ "nom": "utilisateur1", "password": "MotDePasse123!" }` | `200 OK` - Token de connexion <br> `400 Bad Request` - Champ manquant <br> `404 Not Found` - Utilisateur non trouvé <br> `401 Unauthorized` - Mot de passe incorrect | Connexion à un utilisateur existant |

## Produits

| Méthode | Point d'accès      | Request Body                              | Réponse | Fonction |
|---------|--------------------|-------------------------------------------|---------|----------|
| GET     | `/products`        | N/A                                       | `200 OK` - Liste de produits | Récupération de tous les produits, réservé aux utilisateurs connectés |
| GET     | `/products/:id`    | N/A                                       | `200 OK` - Produit trouvé <br> `400 Bad Request` - ID incorrect <br> `404 Not Found` - Produit non trouvé | Récupération d'un produit spécifique via son ID, réservé aux utilisateurs connectés |
| POST    | `/products`        | `{ "userId": 5, "nom": "NouveauProduit", "description": "Description du nouveau produit" }` | `200 OK` - Produit créé <br> `400 Bad Request` - Données manquantes <br> `403 Forbidden` - Permissions insuffisantes <br> `409 Conflict` - Produit existe déjà | Création d'un nouveau produit, réservé au rôle "Admin" |
| PUT     | `/products/:id`    | `{ "nom": "ProduitMisAJour", "description": "Nouvelle description" }` | `200 OK` - Produit mis à jour <br> `400 Bad Request` - ID incorrect ou données manquantes <br> `403 Forbidden` - Permissions insuffisantes <br> `404 Not Found` - Produit non trouvé <br> `409 Conflict` - Nom du produit existe déjà | Modification d'un produit existant, réservé au rôle "Admin" |
| DELETE  | `/products/:id`    | N/A                                       | `204 No Content` - Produit supprimé <br> `400 Bad Request` - ID incorrect <br> `403 Forbidden` - Permissions insuffisantes <br> `404 Not Found` - Produit non trouvé | Supression d'un produit existant, réservé au rôle "Admin" |
