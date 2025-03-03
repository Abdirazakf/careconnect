# **CareConnect**

CareConnect is a React Native app designed for baby monitoring. It provides live video streaming, music playback controls, and a modern, intuitive interface to help parents monitor and soothe their babies.

## **Features**
- 📹 **Live Video Streaming**: Stream real-time video directly from a connected Raspberry Pi camera.
- 🎵 **Music Controls**: Play or stop lullabies remotely to comfort your baby.
- 🌙 **Dark Mode**: Seamlessly switch between light and dark modes for an optimized user experience.
- ⚡ **Modern UI**: Clean, intuitive interface with smooth navigation.
- 🌐 **Network Communication**: Send commands to a backend server for remote control.

---

## **Screenshots**
*(Add relevant screenshots here for better visualization)*

---

## **Technologies Used**
- **React Native**: Framework for building cross-platform mobile apps.
- **Expo**: Development platform for faster debugging and testing.
- **expo-av**: Library for video playback and streaming.
- **Fetch API**: Enables communication with the backend server.
- **NativeBase**: For building a modern and responsive user interface.
- **React Navigation**: Navigation management for multi-screen flows.

---

## **Installation**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Abdirazakf/careconnect.git
   cd careconnect
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Install Expo CLI (if not already installed)**:
   ```bash
   npm install -g expo-cli
   ```

---

## **Running the App**

1. **Start the Development Server**:
   ```bash
   npm start
   ```

2. **Test the App**:
   - Download the Expo Go app on your mobile device.
   - Scan the QR code displayed in the terminal or on the Expo dashboard to run the app on your device.

---

## **Configuration**

1. Replace `<pi-ip-address>` and `<port>` in your `Dashboard.js` with the IP address and port of your Raspberry Pi backend server:
   ```javascript
   const url = "http://<pi-ip-address>:<port>";
   ```

2. Configure MQTT broker credentials in `Notifications.js` if applicable:
   ```javascript
   const options = {
     username: '<your-username>',
     password: '<your-password>',
   };
   ```

---

## **Contributions**

Contributions are always welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## **Contact**

For questions, suggestions, or feedback:
- **Email**: [farahabdirazak13@gmail.com](mailto:farahabdirazak13@gmail.com)
- **GitHub**: [Abdirazakf](https://github.com/Abdirazakf)