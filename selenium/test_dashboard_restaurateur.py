from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.alert import Alert
import time

# Configuration Chrome headless avec désactivation des popups
options = Options()
options.add_argument("--headless")  # Pour exécuter Chrome en mode sans tête
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-notifications")
options.add_argument("--disable-extensions")
options.add_argument("--disable-popup-blocking")
options.add_argument("--incognito")

driver = webdriver.Chrome(options=options)

try:
    print("🚀 Lancement du test Selenium...")
    driver.get("http://localhost:4200")

    # ⏳ Connexion utilisateur "owner"
    WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.ID, "login")))

    driver.find_element(By.ID, "login").send_keys("owner")
    driver.find_element(By.ID, "password").send_keys("ownerpass")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    print("✅ Connexion effectuée.")

    # ⏳ Attente bouton "Ajouter un restaurant"
    ajout_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Ajouter un restaurant')]"))
    )
    ajout_btn.click()
    print("📋 Ouverture du formulaire d’ajout.")

    # ⏳ Attente du formulaire
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "name")))

    # 📝 Remplissage du formulaire
    driver.find_element(By.ID, "name").send_keys("Selenium Test Resto")
    driver.find_element(By.ID, "address").send_keys("123 Rue Test")
    driver.find_element(By.ID, "phone").send_keys("0123456789")
    driver.find_element(By.ID, "description").send_keys("Ajouté automatiquement via test Selenium.")

    # ☑️ Cocher la première catégorie si dispo
    categories = driver.find_elements(By.CSS_SELECTOR, "input[type='checkbox']")
    if categories:
        categories[0].click()

    # 📤 Envoi du formulaire
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    print("📨 Formulaire soumis.")
    print(f"📍 URL actuelle après soumission : {driver.current_url}")
    print("⏳ Attente de redirection vers la page des restaurants...")

    # Gestion des alertes
    try:
        WebDriverWait(driver, 5).until(EC.alert_is_present())
        alert = Alert(driver)
        alert.accept()
        print("✅ Alerte acceptée.")
    except:
        print("✅ Pas d'alerte.")

    # Attente explicite sur un h2 qui indique que la page est bien chargée
    WebDriverWait(driver, 30).until(
        EC.presence_of_element_located((By.XPATH, "//h2[contains(text(), 'Liste de mes restaurants')]"))
    )
    print("✅ Redirection vers la page de restaurants détectée.")

    # Attente que le spinner disparaisse
    print("⏳ Attente que le chargement se termine...")
    try:
        WebDriverWait(driver, 15).until_not(
            EC.presence_of_element_located((By.CLASS_NAME, "spinner-border"))
        )
        print("✅ Chargement terminé.")
    except:
        print("⚠️ Spinner non trouvé ou toujours visible — vérifie l'affichage.")

    # Vérification du restaurant ajouté
    resto_present = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.XPATH, "//table//td[contains(text(), 'Selenium Test Resto')]")
        )
    )
    if resto_present:
        print("✅ Restaurant ajouté trouvé dans la liste !")

except Exception as e:
    print(f"❌ Erreur pendant le test : {e}")
    with open("page_dump.html", "w", encoding="utf-8") as f:
        f.write(driver.page_source)
    raise
finally:
    driver.quit()
    print("🧹 Test terminé, navigateur fermé.")
