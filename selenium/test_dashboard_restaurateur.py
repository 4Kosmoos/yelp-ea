from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
import time

# Configuration du driver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

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

# Attendre un moment pour voir si la connexion fonctionne
time.sleep(3)

# Vérifier si la page du dashboard restaurateur est bien affichée
try:
    # Vérifier si la table des restaurants est visible sur la page du dashboard restaurateur
    restaurants_table = driver.find_element(By.CSS_SELECTOR, "table.table")
    print("Table des restaurants trouvée")

    rows = restaurants_table.find_elements(By.TAG_NAME, "tr")
    if len(rows) > 1:
        print("Restaurants affichés avec succès")
    else:
        print("Aucun restaurant trouvé")

except Exception as e:
    print(f"Erreur lors du test de la page: {str(e)}")

# Fermer le navigateur
driver.close()
driver.quit()
