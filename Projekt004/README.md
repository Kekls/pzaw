# Projekt 04 - Serwer HTTP z Express z dynamicznymi widokami oraz bazą SQLite

## Opis

Aplikacja webowa "myTodos" - Kalendarz napisana w Express.js z dynamicznymi widokami EJS. Umożliwia dodawanie zadań z deadline'ami, wyświetlanie ich na liście, edytowanie danych oraz usuwanie pojedynczych wpisów lub wszystkich danych naraz. Dane są przechowywane w sposób nieulotny za pomocą bazy danych SQLite. Aplikacja posiada również system kont użytkowników, dzięki czemu każdy zalogowany użytkownik ma dostęp tylko do swoich danych. Dodatkowo aplikacja posiada jednego administratora z dostępem do panelu administracyjnego, gdzie widzi on dane wszystkich użytkowników oraz ich listę — może je edytować, usuwać oraz nadawać użytkownikom uprawnienia administratora.

## Funkcjonalności

- Dynamiczne wyświetlanie aktualnej daty i godziny
- Dodawanie zadań z opisem i deadline'em
- Usuwanie pojedynczych zadań
- Usuwanie wszystkich zadań
- Edytowanie pojedynczych zadań
- Wizualne oznaczanie przeterminowanych zadań (czerwony, przekreślony tekst)
- Responsywny interfejs z CSS
- Dane przechowywane w sposób nieulotny w bazie SQLite
- Konta użytkowników — rejestracja, logowanie i wylogowanie
- Dostęp wyłącznie do danych danego użytkownika
- Rola administratora z funkcjami:
    * Widok danych wszystkich użytkowników
    * Możliwość edycji danych wszystkich użytkowników
    * Możliwość usunięcia danych wszystkich użytkowników
    * Nadawanie uprawnień administratora
- Zabezpieczenia:
    * Kontrola dostępu do podstron (autoryzacja)
    * Hashowanie haseł technologią Argon2
    * Sesje użytkowników z konfigurowalnym sekretem
    * Walidacja danych wejściowych

## Wymagania

- Node.js >= 18.x
- npm >= 9.x

## Instalacja
```bash
npm install
```

## Plik .env

Przed uruchomieniem aplikacji można utworzyć plik `.env`, który będzie przechowywał wrażliwe dane konfiguracyjne:
```env
PORT=twój_port
DB_PATH=twoja_ścieżka
SESSION_SECRET=twój_sekret
```

W przypadku braku pliku `.env` aplikacja uruchomi się z następującymi wartościami domyślnymi:

| Zmienna          | Wartość domyślna          |
|------------------|---------------------------|
| `PORT`           | `8080`                    |
| `DB_PATH`        | `./db/TodoDatabase.db`    |
| `SESSION_SECRET` | `1234`                    |

> Nie używaj domyślnego `SESSION_SECRET` w środowisku produkcyjnym.

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

**Dodanie nowego administratora** (z zabezpieczeniem przed utworzeniem dwóch administratorów):
```bash
npm run createAdmin
```

**Awaryjne utworzenie bazy danych:**
```bash
npm run createDB
```

Aplikacja działa domyślnie pod adresem: `http://localhost:8080`

## Struktura projektu
```
projekt004/
├── db/
│   ├── connection.js
│   ├── createAdmin.js
│   ├── seed.js
│   ├── createDB.js
│   └── TodoDatabase.db          # lokalizacja domyślna (brak pliku .env)
├── public/
│   ├── style.css
│   └── images/
│       └── icon192.png
├── routes/
│   ├── adminPanel.js
│   ├── edit.js
│   ├── login.js
│   ├── main.js
│   └── register.js
├── views/
│   ├── adminPanel.ejs
│   ├── edit.ejs
│   ├── login.ejs
│   ├── main.ejs
│   ├── userForm.ejs
│   └── partials/
│       └── head.ejs
├── .env                         # proponowana lokalizacja (dodana do .gitignore)
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

> Plik `.env` oraz baza danych są dodane do `.gitignore` — nie trafią przypadkowo do repozytorium.

---

## Autor

Kekls
Kontakt: bartorgan@gmail.com