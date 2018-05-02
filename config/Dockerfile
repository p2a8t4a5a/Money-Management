FROM java:8-jre

ADD ./build/libs/config-1.0-SNAPSHOT.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/config-1.0-SNAPSHOT.jar"]

HEALTHCHECK --interval=10s --timeout=3s CMD curl -f http://localhost:8888/admin/health || exit 1

EXPOSE 8888