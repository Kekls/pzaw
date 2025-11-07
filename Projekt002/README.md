# Projekt 02 - Serwer HTTP z Express

## Opis
Aplikacja webowa napisana w Express.js z dynamicznymi widokami EJS. 
Umożliwia dodawanie wpisów do księgi gości.

## Instalacja
```bash
npm install
```

## Uruchomienie

- Tryb produkcyjny: `npm start`
- Tryb deweloperski (z auto-restartowaniem): `npm run dev`

Aplikacja działa na `http://localhost:8080`

## Funkcjonalności

- Dynamiczne wyświetlanie aktualnej godziny
- Dodawanie wpisów do księgi gości (POST /message)
- Usuwanie wszystkich wpisów (POST /clear)

## Struktura projektu
```
projekt02/
├── views/
│   └── index.ejs
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Autor
email: bartorgan@gmail.com
pseudonim: Kleks