# TypeScript Setup (ohne Framework)

## 1. Projekt initialisieren

```bash
npm init -y
```

## 2. TypeScript & tsx installieren

```bash
npm install --save-dev typescript tsx
```

- **typescript** — der TypeScript-Compiler (`tsc`), ermöglicht Type-Checking
- **tsx** — führt `.ts`-Dateien direkt aus (ohne vorher zu kompilieren)

## 3. `tsconfig.json` erstellen

Erstelle eine Datei `tsconfig.json` im Projektroot:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["*.ts"]
}
```

| Option            | Bedeutung                                   |
| ----------------- | ------------------------------------------- |
| `target`          | Ziel-JavaScript-Version                     |
| `module`          | Modulsystem (CommonJS für Node)             |
| `strict`          | Aktiviert alle strengen Type-Checks         |
| `esModuleInterop` | Bessere Kompatibilität mit CommonJS-Imports |
| `skipLibCheck`    | Überspringt Type-Checks in `node_modules`   |
| `noEmit`          | Kein JS-Output — nur Type-Checking          |
| `include`         | Welche Dateien geprüft werden sollen        |

## Nutzung

### Datei ausführen

```bash
npx tsx 01-variablen.ts
```

### Alle Dateien type-checken

```bash
npx tsc
```

### IDE

Nach dem Erstellen der `tsconfig.json` zeigt VS Code / Cursor automatisch Typ-Fehler inline an.
