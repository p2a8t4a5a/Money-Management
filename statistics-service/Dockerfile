FROM openjdk:11-jdk

ADD ./build/libs/statistics-service-1.0-SNAPSHOT.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/statistics-service-1.0-SNAPSHOT.jar"]

EXPOSE 7000