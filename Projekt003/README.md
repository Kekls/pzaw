# Projekt 02 - Serwer HTTP z Express i dynamicznymi widokami

## Opis
Aplikacja webowa Todo Kalendarz napisana w Express.js z dynamicznymi widokami EJS. Umożliwia dodawanie zadań z deadline'ami, wyświetlanie ich na liście oraz usuwanie pojedynczych wpisów lub wszystkich danych naraz.

## Funkcjonalności

-  Dynamiczne wyświetlanie aktualnej daty i godziny
-  Dodawanie zadań z opisem i deadline'em (POST /message)
-  Usuwanie pojedynczych zadań (POST /delete/:id)
-  Usuwanie wszystkich zadań (POST /clear)
-  Wizualne oznaczanie przeterminowanych zadań (czerwony, przekreślony tekst)
-  Responsywny interfejs z CSS

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

Aplikacja działa na: `http://localhost:8080`

## Struktura projektu
```
projekt02/
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