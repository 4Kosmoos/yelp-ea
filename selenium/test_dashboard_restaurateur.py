import sys
import time
import tempfile
import shutil
import os
import uuid

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

print("🚀 Lancement du test Selenium avec login...")

# Créer un répertoire temporaire unique pour le profil Chrome
temp_profile_dir = tempfile.mkdtemp()

# Configuration des options Chrome
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--remote-debugging-port=9222")  # Permet de vérifier les logs à distance
chrome_options.add_argument("--window-size=1920x1080")
chrome_options.add_argument(f"--user-data-dir={temp_profile_dir}")

# Initialisation du driver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

test_success = False

try:
    # 🔐 Connexion
    driver.get("http://localhost:4200/login")
    time.sleep(2)

    login_field = driver.find_element(By.ID, "login")
    password_field = driver.find_element(By.ID, "password")
    login_field.send_keys("owner")
    password_field.send_keys("ownerpass")
    password_field.send_keys(Keys.RETURN)

    # ⏳ Attente de la redirection vers le dashboard
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "table.dashboard-table"))
    )

    # ✅ Vérification de la table
    restaurants_table = driver.find_element(By.CSS_SELECTOR, "table.dashboard-table")
    print("✅ Table des restaurants trouvée")

    rows = restaurants_table.find_elements(By.TAG_NAME, "tr")
    if len(rows) > 1:
        print("✅ Restaurants affichés avec succès")
        test_success = True
    else:
        print("❌ Aucun restaurant trouvé")

except Exception as e:
    print(f"❌ Erreur lors du test de la page: {str(e)}")

finally:
    driver.quit()
    time.sleep(2)
    backup_dir = f"{temp_profile_dir}_backup_{uuid.uuid4()}"
    os.rename(temp_profile_dir, backup_dir)
    shutil.rmtree(backup_dir, ignore_errors=True)

print("🧹 Test terminé et nettoyage effectué.")

if not test_success:
    sys.exit(1)
