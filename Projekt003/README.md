# Projekt 03 - Serwer HTTP z Express z dynamicznymi widokami oraz bazą SQLite

## Opis
Aplikacja webowa Todo Kalendarz napisana w Express.js z dynamicznymi widokami EJS. Umożliwia dodawanie zadań z deadline'ami, wyświetlanie ich na liście oraz usuwanie pojedynczych wpisów lub wszystkich danych naraz. Dane są przechowywane w sposób nieulotny za pomocą bazy danych napisanej w języku SQLite.

## Funkcjonalności

- Dynamiczne wyświetlanie aktualnej daty i godziny
- Dodawanie zadań z opisem i deadline'em (POST /message)
- Usuwanie pojedynczych zadań (POST /delete/:id)
- Usuwanie wszystkich zadań (POST /clear)
- Wizualne oznaczanie przeterminowanych zadań (czerwony, przekreślony tekst)
- Responsywny interfejs z CSS
- Dane przechowywane w sposób nieulotny w bazie SQLite

## Instalacja
```bash
npm install
```

## Uruchomienie

**Tryb produkcyjny:**
```bash
npm start
```

**Tryb deweloperski (z auto-restartowaniem przy zmianach):**
```bash
npm run dev
```

**Wypełnienie bazy danych danymi testowymi:**
```bash
npm run seedDB
```

Aplikacja działa na: `http://localhost:8080`

## Struktura projektu
```
projekt03/
├── db/
│   └── connection.js
│   └── seed.js
│   └── TodoDatabase.db
├── public/
│   └── style.css
├── views/
│   └── index.ejs
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```
---

## Autor
Kekls 
Kontakt: bartorgan@gmail.com