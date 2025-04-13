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

driver = webdriver.Chrome(options=options)

try:
    print("🚀 Lancement du test Selenium avec login...")
    driver.get("http://localhost:4200")

    # Attendre que le champ login soit présent
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

    # Attendre une redirection ou un élément spécifique après login ?
    # WebDriverWait(driver, 10).until(...)  <-- À adapter si besoin

except Exception as e:
    print(f"❌ Erreur lors du test de la page: {e}")
    with open("page_dump.html", "w", encoding="utf-8") as f:
        f.write(driver.page_source)
    raise
finally:
    driver.quit()
    print("🧹 Test terminé et nettoyage effectué.")
