FROM openjdk:11
COPY PulsatrixCLI.jar /db_config.ini/ /PulsatrixCLI/
WORKDIR /PulsatrixCLI/
ENTRYPOINT [ "java", "-jar", "PulsatrixCLI.jar" ]
