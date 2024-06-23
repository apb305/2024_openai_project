# AI Document Chatbot

A simple AI chatbot app that enables you to chat with your documents through an easy-to-use interface.  For authentication, the app uses Firebase's Email AuthProvider, as well as Google and Facebook OAuth providers.

### Demo

https://github.com/apb305/2024_openai_project/assets/25408995/6e5ef1bf-e30d-4d50-ad76-531b18cacb5a



### Technologies used in this project:
* Vite JS
* Node JS/ Express
* Bootstrap framework
* Mongo DB (to store user and chat data)
* Firebase Auth
* Firebase admin sdk
* OpenAI

### Application Features:
* Account creation
* You can create multiple chats, each with different documents attached, and delete unwanted chats.
* Chat data is saved to a database.

### Setup
1. Add the Firebase JavaScript SDK to the frontend by following the setup instructions [here](https://firebase.google.com/docs/web/setup). This allows you to use Firebase authorization services on the client side.
2. Add the Firebase Admin SDK to the backend by following the setup instructions [here](https://firebase.google.com/docs/admin/setup). This tool is used to generate and verify Firebase auth tokens from the frontend, enabling users to access their data from MongoDB.
3. Create a MongoDB database by following the instructions [here](https://www.mongodb.com/products/platform/atlas-database).
4. Sign up for an OpenAI API Key by following the instructions [here](https://platform.openai.com/docs/overview).
5. Navigate to [http://localhost:4000](http://localhost:4000).

Create a .env file in the server folder and add your credentials as follows:

## Mongo
ATLAS_URI= 

## Firebase Admin SDK
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_CERT_URL=
FIREBASE_CLIENT_CERT_URL=
FIREBASE_UNIVERSE_DOMAIN=

## OpenAI
OPENAI_API_KEY=

