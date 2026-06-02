# Nuxt Showcase

Eine kleine Nuxt-Showcase-Anwendung mit Aufgaben-Spotlight, Routing-Demo,
dynamischen Feature-Seiten und einer API-Route.

## Setup

Installiere zuerst die Abhaengigkeiten:

```bash
npm install
```

## Entwicklung

Starte den Entwicklungsserver:

```bash
npm run dev
```

Die Anwendung ist danach unter `http://localhost:3000` erreichbar.

## Build

```bash
npm run build
```

## Vorschau des Produktions-Builds

```bash
npm run preview
```

## Projektstruktur

- `app/pages` enthaelt die automatisch erzeugten Routen.
- `app/components` enthaelt wiederverwendbare UI-Komponenten.
- `app/composables` enthaelt wiederverwendbare Logik.
- `server/api` enthaelt die Nuxt-Server-API-Routen.

Lokale Ordner wie `node_modules`, `.nuxt`, `.output` und Cache-Verzeichnisse
werden nicht in Git aufgenommen.
