from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Setup Chrome
options = Options()
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--log-level=3")
options.add_argument("--remote-debugging-port=0")


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

    # Attente de redirection vers la page restaurant
    print("⏳ Attente de redirection vers la page des restaurants...")
    WebDriverWait(driver, 30).until(
        EC.text_to_be_present_in_element((By.TAG_NAME, "h2"), "Liste de mes restaurants")
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
