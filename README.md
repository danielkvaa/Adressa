
---

```markdown
#  Salgsplakat i artikkel – Intervjuoppgave

Dette prosjektet er utviklet som en del av en teknisk caseoppgave til intervju. Oppgaven gikk ut på å implementere en salgsplakat som vises inne i en artikkel etter at brukeren har scrollet forbi omtrent fire avsnitt.

---

##  Oppgavebeskrivelse

Når en leser åpner en artikkel, skal innholdet i utgangspunktet fremstå åpent. Etter at brukeren har scrollet forbi omtrent fire avsnitt, skal videre innhold låses og en salgsplakat vises i grensesnittet. Design, plassering og format er valgt fritt.

### Krav til salgsplakaten:

- Produktnavn, pris første måned og fullpris (hentet fra eksternt API)
- Call to action-element (f.eks. abonner-knapp)
- Et grafisk element (statisk eller animert)

---

##  Teknologier benyttet

- [Next.js](https://nextjs.org/)
- React
- Tailwind CSS
- Lottie (for animasjon)
- REST API (produktdata)

---

##  Kom i gang

### 1. Installer avhengigheter

```bash
npm install
```

### 2. Start utviklingsserver

```bash
npm run dev
```

### 3. Åpne prosjektet

Gå til `http://localhost:3000` i nettleseren.

---


---

##  Feilsøking – installasjon

Dersom du får en feil som:

```bash
npm ERR! ERESOLVE could not resolve
```

eller

```bash
sh: node_modules/.bin/next: Permission denied
```

følg disse trinnene:

### 1. Slett tidligere avhengigheter

```bash
rm -rf node_modules package-lock.json
```

### 2. Reinstaller med eldre dependency-håndtering

```bash
npm install --legacy-peer-deps
```

### 3. Gi kjøretilgang til Next.js-binæren (dersom nødvendig)

```bash
chmod +x node_modules/.bin/next
```

### 4. Kjør prosjektet

```bash
npm run dev
```

---

## ⚠️ Observasjon: Uregelmessig initial visning av paywall

Ved førstegangsinnlasting kan det i enkelte tilfeller observeres at paywallen **ikke vises umiddelbart** etter at brukeren har scrollet forbi de første fire avsnittene.

### Mulig årsak

Dette skyldes trolig en **tidsmessig forskyvning mellom DOM-rendering og aktivering av `IntersectionObserver`**. Dersom komponenten allerede er synlig i viewport i det observeren etableres, vil `isIntersecting` ikke nødvendigvis trigge som forventet – særlig i raske lastesituasjoner eller ved begrenset visningshøyde.

### Tiltak og løsning

Det er implementert en **fallback-mekanisme** som manuelt evaluerer komponentens posisjon kort tid etter initial innlasting. Dersom observeren ikke har trigget, vil denne sjekken aktivere visningen av paywallen. Dette gir en mer robust og forutsigbar brukeropplevelse.

---

##  Stolt Utviklet av

**Daniel Kvålshagen**
