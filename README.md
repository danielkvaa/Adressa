# 📢 Salgsplakat i Artikkel – Intervjuoppgave

Dette prosjektet er utviklet som en del av en teknisk caseoppgave til et intervju. Oppgaven gikk ut på å implementere en salgsplakat inne i en artikkel som blir synlig etter at brukeren har scrollet forbi cirka fire avsnitt.

## 📝 Oppgavebeskrivelse

Når en leser kommer inn på en artikkel, skal denne umiddelbart se åpen ut, men når leseren scroller nedover vil den bli låst etter ca 4 avsnitt og leseren vil ikke få lest innholdet. En salgsplakat blir da synlig. Du bestemmer selv design, format og plassering.

### Krav til salgsplakaten:
- Produktnavn, pris første måned og full pris (hentet fra eksternt API)
- Call-to-action (f.eks. abonner-knapp)
- Grafisk element (statisk eller animert)

## 🛠 Teknologier brukt

- [Next.js](https://nextjs.org/)
- React
- Tailwind CSS
- Lottie (for animasjon)
- Mock API / statisk JSON-data (for produktinformasjon)

## 🚀 Kom i gang

1. **Installer avhengigheter**

npm install


2. **Start utviklingsserver**

npm run dev


3. **Åpne i nettleser**
Gå til `http://localhost:3000` for å se prosjektet i aksjon.



## 🔗 Lenke til deployet versjon / demo

> _(valgfritt)_ Legg til lenke til Vercel, Netlify eller annen live-demo dersom du har lastet det opp.


## 🐛 Feilsøking ved installasjon

Dersom du får feil under `npm install`, som f.eks:

npm ERR! ERESOLVE could not resolve

eller

sh: node_modules/.bin/next: Permission denied

følg disse trinnene:

### 1. Slett tidligere avhengigheter

rm -rf node_modules package-lock.json


### 2. Installer med `--legacy-peer-deps`

Dette løser typiske avhengighetskonflikter med React-versjoner og tredjepartsbiblioteker.


npm install --legacy-peer-deps


### 3. Gi kjøretilgang til Next.js (dersom nødvendig)

Hvis du får en feilmelding om "Permission denied" på `next`, kjør:

chmod +x node_modules/.bin/next

### 4. Kjør prosjektet

npm run dev

Åpne deretter i nettleseren:  
[http://localhost:3000](http://localhost:3000)

---

Dersom problemet vedvarer, sjekk at du har riktig versjon av Node.js installert (anbefalt: v18.x eller nyere).

## 👤 Utviklet av
Daniel Kvålshagen
