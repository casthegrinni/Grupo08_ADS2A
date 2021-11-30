FROM openjdk:11
COPY PulsatrixCLIDocker.jar /db_config.ini/ /PulsatrixCLI/
WORKDIR /PulsatrixCLI/
ENTRYPOINT [ "java", "-jar", "PulsatrixCLIDocker.jar" ]
