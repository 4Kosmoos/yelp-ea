from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.alert import Alert

# Setup Chrome
options = Options()
options.add_argument("--headless")  # Pour exécuter Chrome en mode sans tête
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-notifications")  # Désactive les notifications
options.add_argument("--disable-extensions")  # Désactive les extensions
options.add_argument("--disable-popup-blocking")  # Désactive le blocage des popups
options.add_argument("--incognito")  # Utilise le mode incognito pour éviter certaines popups

driver = webdriver.Chrome(options=options)

try:
    print("🚀 Lancement du test Selenium avec login...")
    driver.get("http://localhost:4200")

    # Attente du champ de login
    print("⏳ Attente du champ de login...")
    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.ID, "login"))
    )
    print("✅ Champ de login trouvé !")

    # Remplir les champs
    driver.find_element(By.ID, "login").send_keys("owner")
    driver.find_element(By.ID, "password").send_keys("ownerpass")

    # Soumettre le formulaire
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    print("📤 Formulaire soumis.")

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

    import time
    time.sleep(5)  # Pause de 5 secondes avant de chercher l'élément

    # Attente de redirection vers la page restaurant
    print("⏳ Attente de redirection vers la page des restaurants...")
    WebDriverWait(driver, 15).until(
    EC.presence_of_element_located((By.TAG_NAME, "h2"))
    )
    assert "Liste de mes restaurants" in driver.page_source
    print("✅ Redirection vers la page de restaurants détectée.")

    # Attendre que le spinner disparaisse
    print("⏳ Attente que le chargement se termine...")
    WebDriverWait(driver, 15).until_not(
        EC.presence_of_element_located((By.CLASS_NAME, "spinner-border"))
    )
    print("✅ Chargement terminé.")

    # Vérifier la table ou le message d'absence
    try:
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "table.dashboard-table tbody tr"))
        )
        print("✅ Table de restaurants détectée.")
    except:
        print("❗ Table non détectée, vérification du message d'absence...")
        msg = driver.find_element(By.CLASS_NAME, "no-restaurants").text
        assert "Aucun restaurant trouvé" in msg
        print("✅ Message 'Aucun restaurant trouvé' détecté.")

except Exception as e:
    print(f"❌ Erreur lors du test : {e}")
    with open("page_dump.html", "w", encoding="utf-8") as f:
        f.write(driver.page_source)
    raise

finally:
    driver.quit()
    print("🧹 Test terminé et nettoyage effectué.")
