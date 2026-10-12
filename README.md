# Foodie Restaurant App v2 (React Native + Node.js + Express + MongoDB)

A1 app + A2 backend. Folders: `src/` + `App.js` (Expo app), `server/` (API), `A1/` (old SRS/UML), `A2/` (SRS_v2.pdf + new diagrams).

## 1. Run the server
```
cd server
npm install
cp .env.example .env        # then fill in MONGO_URI and JWT_SECRET
npm run seed                # empties the DB and inserts 2 users, 15 menu items, 6 tables
npm run dev                 # prints "MongoDB connected" and the URL for your phone
```
`.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/restaurant_app?retryWrites=true&w=majority   # or mongodb://127.0.0.1:27017/restaurant_app
JWT_SECRET=any-long-random-string
```
Atlas: add your IP under Network Access. Rule tests (no DB needed): `npm test`.
Demo logins (password `pass1234`): customer `ali@test.com`, manager `sara@test.com`.

## 2. Run the app
```
npm install
npx expo install --fix
EXPO_PUBLIC_API_URL=http://192.168.1.15:5000 npx expo start     # use YOUR laptop IP
```
or edit `BASE_URL` in `src/api/client.js` (the only place it is defined). Android emulator: `http://10.0.2.2:5000`.
Phone and laptop must be on the same Wi-Fi; allow port 5000 in the firewall. If the IP changes, update BASE_URL.

## 3. Postman
Import `server/postman/restaurant-api.postman_collection.json`, set `baseUrl`, run `npm run seed`, then run the collection (requests named FAIL are expected to be rejected).

## Notes
- Public signup always creates a customer (manager accounts come from the seed) so nobody can make themselves a manager.
- Order status: forward only; Cancelled only while Pending. Total is always calculated by the server.
- Screen recording link (two-device test): _add here_
