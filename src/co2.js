// Route béton

// Saisir la longueur du tracé recouvert de panneaux solaires
const longueurTracé = 1000; //parseFloat(prompt("Entrez la longueur du tracé en mètres :"))

// Définir la largeur constante et la valeur de epaisseur
const largeur = 3;
const epaisseur = 0.12;

// Fonction pour calculer le volume de béton en fonction de la longueur du tracé
function calculerVolume(longueur) {
    // Calculer le volume en multipliant la longueur par la largeur et par epaisseur
    const volume = longueur * largeur * epaisseur;
    return volume;
}

// Calculer le volume de béton nécessaire
const volumeBéton = calculerVolume(longueurTracé);

// Afficher le volume de béton nécessaire
console.log("Le volume de béton nécessaire pour un tracé de", longueurTracé, "mètres est de", volumeBéton, "mètres cubes.");

// Définir la masse volumique du béton en kg/m^3
const masseVolumiqueBeton = 2350;

// Calculer la quantité de béton en fonction du volume et de la masse volumique
const quantiteBeton = volumeBéton * masseVolumiqueBeton;

// Afficher la quantité de béton nécessaire
console.log("La quantité de béton nécessaire est de", quantiteBeton, "kilogrammes.");

// Définir l'impact du béton en kg de CO2 par kg de béton
const impactBetonRoute = 0.109;

// Calculer la quantité de CO2 due au béton sur un an
const quantiteCO2BetonRoute = quantiteBeton * impactBetonRoute;

// Afficher la quantité de CO2 due au béton sur un an
console.log("La quantité de CO2 due au béton pour la route sur un an est de", quantiteCO2BetonRoute, "kilogrammes.");


// Structure en bois

// Définir la constante d'impact du bois en kg de CO2 par mètre de tracé
const impactBoisStructure = 0.504;

// Définir la durée de vie de la structure en bois en années
const dureeDeVieBois = 40;

// Calculer la quantité de CO2 due à la structure en bois sur un an
function calculerQuantiteCO2Bois(longueurTracé, impact, dureeDeVie) {
    const quantiteCO2Bois = (longueurTracé * impact) / dureeDeVie;
    return quantiteCO2Bois;
}

const quantiteCO2BoisStructure = calculerQuantiteCO2Bois(longueurTracé, impactBoisStructure, dureeDeVieBois);

// Afficher la quantité de CO2 générée par la structure en bois sur un an
console.log("La quantité de CO2 générée par la structure en bois sur un an est de", quantiteCO2BoisStructure, "kilogrammes.");


// Structure en béton

// Définir la constante d'impact du béton en kg de CO2 par mètre de tracé
const impactBetonStructure = 40.984;

// Définir la durée de vie de la structure en béton en années
const dureeDeVieBeton = 40;

// Calculer la quantité de CO2 due à la structure en béton sur un an
const quantiteCO2BetonStructure = (longueurTracé * impactBetonStructure) / dureeDeVieBeton;

// Afficher la quantité de CO2 générée par la structure en béton sur un an
console.log("La quantité de CO2 générée par la structure en béton sur un an est de", quantiteCO2BetonStructure, "kilogrammes.");


// Calcul production solaire

// Définir les constantes
const irradiation = 1200; // Irradiation solaire en W/m² ATTENTION : VALEUR DEFINI SELON VILLAGE CHOISI DANS CSV
const surfacePanneaux = 1.83; // Surface des panneaux en m²
const rendementPanneau = 0.23; // Rendement des panneaux
const chaine = 0.83; // Efficacité de la chaîne
const nombrePanneauxLargeur = 4; // Nombre de panneaux en largeur

// Fonction pour calculer le nombre de panneaux en longueur en fonction de la longueur du tracé
function calculerNombrePanneauxLongueur(longueurTracé) {
    return longueurTracé / 1.7;
}

// Calculer l'énergie solaire produite
const nombrePanneauxLongueur = calculerNombrePanneauxLongueur(longueurTracé);
const energieProduite = irradiation * surfacePanneaux * rendementPanneau * chaine * nombrePanneauxLargeur * nombrePanneauxLongueur;

// Afficher l'énergie solaire produite
console.log("L'énergie solaire produite est de", energieProduite, "W.");


// Impact énergie solaire

// Définir la constante d'impact du CO2 solaire en kg de CO2 par kWh
const impactCO2Solaire = 0.037;

// Calculer la quantité de CO2 due à la production d'énergie solaire
const quantiteCO2Solaire = energieProduite * impactCO2Solaire;

// Afficher la quantité de CO2 due à la production d'énergie solaire
console.log("La quantité de CO2 générée par la production d'énergie solaire est de", quantiteCO2Solaire, "kilogrammes.");


// Impact total de CO2 sur une année
const impactTotalCO2 = quantiteCO2Solaire + quantiteCO2BetonStructure + quantiteCO2BoisStructure + quantiteCO2BetonRoute;

// Afficher l'impact total de CO2 sur une année
console.log("L'impact total de CO2 sur une année est de", impactTotalCO2, "kilogrammes.");

// Définir la constante du nombre de jours de travail par année
const nombreJoursTravailParAnnee = 235; 

// Saisir la distance entre deux communes en kilomètres
const distanceEntreCommunes = 2; //parseFloat(prompt("Entrez la distance entre deux communes en kilomètres :"));

let distanceParcourueParAnnee;

// Vérifier si la valeur saisie est valide
if (!isNaN(distanceEntreCommunes) && distanceEntreCommunes > 0) {
    // Calculer la distance parcourue par année en multipliant le nombre de jours de travail par la distance entre deux communes
    distanceParcourueParAnnee = nombreJoursTravailParAnnee * distanceEntreCommunes;

    // Afficher le résultat
    console.log("La distance parcourue par année est de", distanceParcourueParAnnee, "kilomètres.");
} else {
    console.log("Veuillez saisir une distance valide entre deux communes.");
}


// Définir la constante de quantité de CO2 par kilomètre
const quantiteCO2ParKilometre = 133.5; // Exemple de valeur, peut être ajusté selon votre contexte

// Calculer la quantité de CO2 générée en multipliant la distance parcourue par année par la constante de quantité de CO2 par kilomètre
const quantiteCO2Generee = distanceParcourueParAnnee * quantiteCO2ParKilometre;

// Afficher le résultat
console.log("La quantité de CO2 générée est de", quantiteCO2Generee, "kilogrammes.");

// Calculer la quantité de voitures nécessaires pour compenser l'impact total de CO2
const quantiteVoituresNecessaires = impactTotalCO2 / quantiteCO2Generee;

// Afficher le résultat
console.log("La quantité de voitures nécessaires pour compenser l'impact total de CO2 est d'environ", quantiteVoituresNecessaires.toFixed(2), "voitures.");


