FROM java:8-jre

ADD ./build/libs/notification-service-1.0-SNAPSHOT.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/notification-service-1.0-SNAPSHOT.jar"]

EXPOSE 8000