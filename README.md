# Minter Server

With the Minter Server, effortlessly mint Items (NFTs) directly from your backend to enrich the gaming experience for users. This setup provides a foundational example; feel free to enhance and tailor it to your game's mechanics.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## 🛠 Tech Stack

- **Server:** TypeScript, Node.js, Express

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/3engine/MinterServer.git
```

### 2. Navigate to the Directory

```bash
cd MinterServer
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
npm run start
```

## 🌍 Environment Variables

To run this project, ensure you have the following environment variables set up in your `.env` file:

| Variable            | Description                               |
|---------------------|-------------------------------------------|
| `GAME_PRIVATE_KEY`  | Minter Private Key                        |
| `CONTRACT_ADDRESS`  | Address of the Item Contract              |
| `MONGODB_URI`       | MongoDB Connection URI                    |
| `NETWORK_RPC`       | EVM Network RPC                           |
| `APIKEY_3ENGINE`    | 3Engine API Key (Reach out for access)    |
| `API_3ENGINE`       | 3Engine API Endpoint                      |

## 📜 License

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
