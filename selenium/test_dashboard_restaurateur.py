from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
import time
import tempfile
import shutil
import os
import uuid


# Créer un répertoire temporaire unique pour le profil Chrome
temp_profile_dir = tempfile.mkdtemp()

# Configuration des options Chrome
chrome_options = Options()
chrome_options.add_argument("--headless")  # Mode sans interface graphique
chrome_options.add_argument("--no-sandbox")  # Évite les restrictions dans certains environnements
chrome_options.add_argument(f"--user-data-dir={temp_profile_dir}")  # Spécifier un chemin unique

# Initialisation du driver avec les options configurées
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    # Accéder à la page de login
    driver.get("http://localhost:4200/login")

    # Attendre que la page se charge (si nécessaire)
    time.sleep(2)

    # Remplir les champs de login
    login_field = driver.find_element(By.ID, "login")
    password_field = driver.find_element(By.ID, "password")

    # Entrer les identifiants
    login_field.send_keys("owner")
    password_field.send_keys("ownerpass")

    # Soumettre le formulaire
    password_field.send_keys(Keys.RETURN)

    time.sleep(3)

    # Vérifier si la page du dashboard restaurateur est bien affichée
    try:
        # Vérifier si la table des restaurants est visible sur la page du dashboard restaurateur
        restaurants_table = driver.find_element(By.CSS_SELECTOR, "table.dashboard-table")
        print("Table des restaurants trouvée")

        rows = restaurants_table.find_elements(By.TAG_NAME, "tr")
        if len(rows) > 1:
            print("Restaurants affichés avec succès")
        else:
            print("Aucun restaurant trouvé")

    except Exception as e:
        print(f"Erreur lors du test de la page: {str(e)}")

finally:
    # Fermer proprement le navigateur
    driver.quit()

    # Attendre quelques secondes pour s'assurer que Chrome libère tous les fichiers
    time.sleep(3)

    # Renommer le dossier temporaire avant suppression (pour éviter le verrouillage immédiat)
    backup_dir = f"{temp_profile_dir}_backup_{uuid.uuid4()}"
    os.rename(temp_profile_dir, backup_dir)

    # Supprimer le dossier renommé (ignore les erreurs en cas de fichiers verrouillés)
    shutil.rmtree(backup_dir, ignore_errors=True)

print("Test terminé et nettoyage effectué.")
