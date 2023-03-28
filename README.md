# Scrap & Trace Mobile Application (React Native/JavaScript)

## Install Instructions

As a part of the Scrap and Trace project, we developed a mobile application for Android and iOS devices. This application was developed using React Native, a framework for developing mobile applications using JavaScript. This repository contains the source code for the application. To get started with the application, you will need to install the following:

- Node.js
- npm
- npx
- Expo Go
- Visual Studio Code
- Git

To get started, you will first need to install Visual Studio Code. You can download the installer for your operating system from [here](https://code.visualstudio.com/download). Once installed, it is recommended that you install the following extensions:

- **React Native Tools (by Microsoft)** - This extension provides support for React Native development in Visual Studio Code.
- **React-Native/React/Redux snippets for es6/es7 (by EQuimper)** - This extension provides snippets for React Native development in Visual Studio Code.
- **ES7+ React/Redux/React-Native snippets (by dsznajder)** - This extension provides snippets for React Native development in Visual Studio Code.
- **WSL (by Microsoft)** - This extension provides support for the Windows Subsystem for Linux (WSL) in Visual Studio Code. (This is only required if you are using Windows.)

Next, clone the repository from GitHub. You can do this by running the following command in your terminal or using the Visual Studio Code Git interface:

```bash
git clone git@github.com:scrap-and-trace/ScrapAppReact.git
```

Note that at this time, the repository is private, so you will need to have access to the repository in order to clone it. It will be made public once the project is complete.

Once you have downloaded the repository, you will need to install `nvm`, which is a Node Version Manager. This will allow you to easily switch between different versions of Node.js. You can install `nvm` by running the following command on Unix-like systems such as GNU/Linux and macOS:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

You can also install Node.js directly through your distribution's package manager.

Note that on Windows, the team recommended that you install `nvm` using the Windows Subsystem for Linux (WSL). You can find instructions on how to do this [here](https://docs.microsoft.com/en-us/windows/wsl/install-win10). Once you have installed WSL, you can install `nvm` by running the following command:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Alternatively, you can install `nvm-windows` by downloading the installer from [here](https://github.com/coreybutler/nvm-windows/releases).

Once `nvm` has been installed, you will need to install Node.js. You can do this by running the following command:

```bash
nvm install node
```

This will install the latest version of Node.js, which is typically what the app will be using. Once installed, you can check that Node.js has been installed by running `nvm ls`.

Now, navigate to the directory where you cloned the repository. Once there, you will need to install the dependencies for the project. Specifically, you will need to install `npx`, which is a package runner built for Node.js, utilised by Expo CLI, which is the tool we will be using to run the app. You can install `npx` by running the following command:

```bash
npm install -g npx
```

Once `npx` has been installed, open the project in Visual Studio Code. NPX will automatically install the dependencies for the project. You can get started by running the following command:

```bash
npx expo start
```

This will start the development server for the app. You can then scan the QR code using the Expo Go app on your mobile device to run the app. Expo Go is available for both Android and iOS devices. You can download it from the Google Play Store or the App Store. Note that you will need to be connected to the same network as your computer in order to run the app. Once you have scanned the QR code, the app will start running on your device.

It is important to note that the app will not work properly unless you have the backend server running and correctly configured.

# Scrap & Trace Backend Server (Django/Python)

## Install Instructions

Similarly, we developed a backend server for the mobile application. This server was developed using Django, a Python web framework. This repository contains the source code for the server. To get started with the server, you will need to install the following:

- Python 3.9 or higher
- pip
- python3-venv (optional, but recommended)
- tmux (optional, but recommended)

First, you will need to install Python 3.9.2. You can download the installer for your operating system from [here](https://www.python.org/downloads/release/python-392/). Once installed, you will need to install `pip`, which is the Python package manager. You can do this by running the following command:

```bash
python -m ensurepip --upgrade
```

Once `pip` has been installed, you will need to set up the virtual environment for the project. While optional, it is highly recommended that you use a virtual environment for the project. This will allow you to install the dependencies for the project without affecting the rest of your system. Once the virtual environment has been created, you will need to activate it. To do this, install `python3-venv` by running the following command:

Ubuntu/Debian:

```bash
sudo apt install python3-venv
```

Fedora/CentOS/RHEL:

```bash
sudo dnf install python3-venv
```

Once installed, navigate to a folder where you would like to store the project. Once there, you can create a virtual environment for the project by running the following command:

```bash
python -m venv venv
```

Once the virtual environment has been created, you will need to activate it. You can do this by running the following command:

```bash
source venv/bin/activate
```

Note that on Windows, you will need to run the following command instead:

```bash
venv\Scripts\activate.bat
```

Once the virtual environment has been activated, you will need to clone the repository from GitHub. You can do this by running the following command in your terminal or using the Visual Studio Code Git interface:

```bash
git clone https://github.com/scrap-and-trace/ScrapAppDjango.git
```

Note that at this time, the repository is private, so you will need to have access to the repository in order to clone it. It will be made public once the project is complete. Once you have downloaded the repository, you will need to install the dependencies for the project. You can do this by running the following command:

```bash
pip install -r requirements.txt
```

Once the dependencies have been installed, you can run the server by running the following command:

```bash
python manage.py runserver 0.0.0.0:8000
```

This will allow the server to be accessible from other devices on the network. You can then access the server by navigating to `http://<ip-address>:8000` in your browser. Note that you will need to replace `<ip-address>` with the IP address of the device running the server.

If you would like to run the server in the background, you can use `tmux`. You can install `tmux` by running the following command(s):

Ubuntu/Debian:

```bash
sudo apt install tmux
```

Fedora/CentOS/RHEL:

```bash
sudo dnf install tmux
```

Once `tmux` has been installed, you can run the server in the background by running the following commands:

```bash
tmux
python manage.py runserver 0.0.0.0:8000
```

You can attach and detach from the server at any time using `tmux attach` and `tmux detach`, respectively.

If you would like for the server to be accessible from the internet, you will need to set up port forwarding on your router. You can find instructions on how to do this [here](https://portforward.com/router.htm). Note that you will need to forward port 8000 to the IP address of the device running the server with the protocol set to TCP.
