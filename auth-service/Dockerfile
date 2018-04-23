FROM java:8-jre

ADD ./build/libs/auth-service-1.0-SNAPSHOT.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/auth-service-1.0-SNAPSHOT.jar"]

EXPOSE 5000