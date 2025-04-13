from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.alert import Alert
import time

# Configuration Chrome headless
options = Options()
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-notifications")
options.add_argument("--disable-extensions")
options.add_argument("--disable-popup-blocking")
options.add_argument("--incognito")
options.add_argument('--disable-gpu')
options.add_argument('--remote-debugging-port=9222')

driver = webdriver.Chrome(options=options)

try:
    print("🚀 Lancement du test Selenium...")
    driver.get("http://localhost:4200")

    # Connexion utilisateur
    WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.ID, "login")))
    driver.find_element(By.ID, "login").send_keys("owner")
    driver.find_element(By.ID, "password").send_keys("ownerpass")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    print("✅ Connexion effectuée.")

    # Attente bouton "Ajouter un restaurant"
    ajout_btn = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Ajouter un restaurant')]"))
    )
    ajout_btn.click()
    print("📋 Ouverture du formulaire d’ajout.")

    # Attente du formulaire
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "name")))

    # Remplissage du formulaire
    driver.find_element(By.ID, "name").send_keys("Selenium Test Resto")
    driver.find_element(By.ID, "address").send_keys("123 Rue Test")
    driver.find_element(By.ID, "phone").send_keys("0123456789")
    driver.find_element(By.ID, "description").send_keys("Ajouté automatiquement via test Selenium.")

    # Coche une catégorie si dispo
    categories = driver.find_elements(By.CSS_SELECTOR, "input[type='checkbox']")
    if categories:
        categories[0].click()

    # Envoi du formulaire
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    print("📨 Formulaire soumis.")

    # Optionnel : petite pause pour laisser Angular réagir
    time.sleep(2)

    # Gestion des alertes si présentes
    try:
        WebDriverWait(driver, 5).until(EC.alert_is_present())
        Alert(driver).accept()
        print("✅ Alerte acceptée.")
    except:
        print("✅ Pas d'alerte.")

    # Vérifie la redirection
    print("⏳ Attente de redirection vers la liste des restaurants...")
    WebDriverWait(driver, 20).until(
        lambda d: "/restaurants" in d.current_url or "/dashboard" in d.current_url or "/ajout" not in d.current_url
    )

    print(f"📍 URL actuelle après soumission : {driver.current_url}")

    if "ajout" in driver.current_url:
        print("⚠️ Redirection non détectée, mais on continue la vérification.")

    # Attente disparition spinner
    try:
        WebDriverWait(driver, 15).until_not(
            EC.presence_of_element_located((By.CLASS_NAME, "spinner-border"))
        )
        print("✅ Chargement terminé.")
    except:
        print("⚠️ Spinner toujours visible, ou non trouvé.")

    # Vérifie la présence du restaurant
    resto_present = WebDriverWait(driver, 20).until(
        EC.presence_of_element_located(
            (By.XPATH, "//table//td[contains(text(), 'Selenium Test Resto')]")
        )
    )
    if resto_present:
        print("✅ Restaurant ajouté trouvé dans la liste !")

    # Affiche les erreurs JS si présentes (utile sur GitHub Actions)
    try:
        for entry in driver.get_log("browser"):
            print(f"[Browser Console] {entry}")
    except:
        print("ℹ️ Logs navigateur non disponibles (non supportés en headless parfois).")

except Exception as e:
    print(f"❌ Erreur pendant le test : {e}")
    with open("page_dump.html", "w", encoding="utf-8") as f:
        f.write(driver.page_source)
    raise
finally:
    driver.quit()
    print("🧹 Test terminé, navigateur fermé.")
