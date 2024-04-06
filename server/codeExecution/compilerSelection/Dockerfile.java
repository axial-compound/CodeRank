FROM adoptopenjdk:latest

# Set the working directory
WORKDIR /compiler/java


# Install essential build tools and dependencies for Java compilation
RUN apt-get update && \
    apt-get install -y \
    default-jdk \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for Java compiler
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64

# Set entry point to an interactive shell
ENTRYPOINT ["/bin/bash"]
