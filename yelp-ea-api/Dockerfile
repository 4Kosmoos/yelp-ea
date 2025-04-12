# Utilisation d'une image de base Java
FROM eclipse-temurin:21-jdk-alpine

# Spécifie le fichier JAR généré par Maven (change selon ton nom de fichier)
ARG JAR_FILE=target/yelp-ea-api-0.0.1-SNAPSHOT.jar

# Vérifie que le fichier .jar existe et est copié dans l'image Docker
COPY ${JAR_FILE} app.jar

# Définir le point d'entrée pour l'exécution de l'application
ENTRYPOINT ["java", "-jar", "/app.jar"]
