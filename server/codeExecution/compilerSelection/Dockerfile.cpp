FROM ubuntu:latest

# Install essential build tools and dependencies
RUN apt-get update && \
    apt-get install -y \
    build-essential \
    cmake \
    gdb \
    && rm -rf /var/lib/apt/lists/*

# Install latest version of GCC
RUN apt-get update && \
    apt-get install -y software-properties-common && \
    add-apt-repository ppa:ubuntu-toolchain-r/test && \
    apt-get update && \
    apt-get install -y g++-11 && \
    update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-11 90 && \
    update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-11 90 && \
    update-alternatives --install /usr/bin/cpp cpp /usr/bin/cpp-11 90 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set environment variables for C++ compiler
ENV CXX=g++-11 \
    CC=gcc-11 \
    CPP=cpp-11

# Set the working directory
WORKDIR /compiler/cpp

# Copy the current directory contents into the container at /compiler/cpp
COPY . /compiler/cpp

# Set permissions for files
RUN chmod -R 777 /compiler/cpp

# Set entry point to an interactive shell
ENTRYPOINT ["/bin/bash"]
