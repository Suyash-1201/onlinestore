# --- Stage 1: Build the application ---
FROM maven:3.9.9-eclipse-temurin-25-alpine AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# --- Stage 2: Optimized runtime environment ---
FROM eclipse-temurin:25-jre-alpine
WORKDIR /app

# 1. Copy the compiled JAR file
COPY --from=build /app/target/*.jar app.jar

# 2. Copy the ca.pem file from your local project root into the container
COPY ca.pem /app/ca.pem


RUN keytool -importcert -alias aiven-mysql \
    -file /app/ca.pem \
    -keystore $JAVA_HOME/lib/security/cacerts \
    -storepass changeit -noprompt

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "-Dserver.port=${PORT}", "app.jar"]