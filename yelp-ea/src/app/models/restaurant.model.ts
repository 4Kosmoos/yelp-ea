export interface Restaurant {
    id: number;
    nom: string;
    adresse: string;
    description: string;
    categorie: 'Italien' | 'Français' | 'Japonais' | 'Autre'; // Enum simulé
    coordonnees: string; // Numéro de téléphone
    noteMoyenne: number;
    idUser: number; // ID du restaurateur
  }
