# 📌 Rättningsrapport – fed25s-the-crud-api-jesperringhog

## 🎯 Uppgiftens Krav:
# Inlämningsuppgift CRUD-api

I denna uppgift skall ni skapa ett api som tillhandahåller CRUD-operationer för en webshop.

## API:t

Api:t skall skapas med node.js och använda express. Routes och controllers skall finnas enligt god standard.
Varje route behöver returnera korrekt status och data.

## Client

För att kunna se någonting är det bra om ni skapar ett mycket enkelt frontend-projekt med syfte att kunna använda ert api. Ni får välja teknik helt själva här. Men en rekommendation är att använda vad ni har med för kunskaper och inte hoppa på någonting nytt. 

## Betyg G

- Ett api med node.js och express
- Routes och controllers är på plats
- Koppling med mongodb fungerar
- Endpoints för alla CRUD-operationer
- En modell för att hantera produkter. Som minst behöver en produkt ha egenskaperna:
  - Id
  - Namn
  - Pris

## Betyg VG

- Samtliga punkter för G
- Sortering på serversidan, både av produkter och ordrar
- Sökning på serversidan, både av produkter och ordrar
- En modell för ordrar:
  - En order innehåller information om en order (såsom kundinformation, datum, et.c.)
  - En order innehåller en lista med objekt. Dessa objekt beskriver vilken produkt som finns i varukorgen och hur många av den det finns
- Mycket liten frontend som gör anrop

## 🔍 ESLint-varningar:
- /app/repos/fed25s-the-crud-api-jesperringhog/frontend/src/services/productService.ts - no-console - Unexpected console statement.,no-console - Unexpected console statement.

## 🏆 **Betyg: G**
📌 **Motivering:** Backend är byggd med Node.js + Express och har en tydlig struktur med routes/controllers/models. MongoDB-koppling via mongoose finns och både Product- och Order-modeller är implementerade (Order med cartItems). CRUD-endpoints (POST/GET/PATCH/DELETE) finns för både produkter och ordrar, och det finns serverside-sortering och filtrering/sökning i getProducts/getOrders, vilket i sig ligger nära VG-kraven. Däremot finns flera konkreta brister som gör att API:t inte konsekvent returnerar korrekt status och data enligt god standard (t.ex. valideringsbuggar i POST, bristande return efter res.status(...), och PATCH-flöden som kan leda till dubbla responses eller felaktiga statuskoder). Dessutom är frontend-delen mycket minimal och gör i praktiken bara anrop för produkter (GET/POST), utan motsvarande anrop för ordrar och utan update/delete från klienten. Sammantaget uppfylls G-kraven tydligt, men helhetskvaliteten i validering/statuskoder samt den begränsade klientdelen gör att VG inte är motiverat utifrån den kod som faktiskt finns.

💡 **Förbättringsförslag:**  
1) Fixa validering i POST-routes (kritisk):
- productRouter.post: `if (name && name === "")` missar `undefined`. Använd t.ex. `if (!name || name.trim() === "")`.
- productRouter.post: `if (price && price === "")` är fel för number och missar `undefined`/NaN. Validera med `typeof price !== "number" || !Number.isFinite(price)`.
- orderRouter.post: `if (customer && customer === "")` bör vara `if (!customer || customer.trim() === "")`.

2) Säkerställ korrekt kontrollflöde och statuskoder i PATCH-routes (kritisk):
- Lägg `return` direkt efter alla `res.status(...).json(...)` för att undvika att koden fortsätter och försöker skicka fler responses.
- Skilj på 400 (ogiltig body) och 404 (resursen finns inte). Just nu blandas dessa i vissa felgrenar.

3) Returnera uppdaterad DB-data från controllers:
- Använd `{ new: true }` i `findOneAndUpdate` och returnera `updated` (DTO) istället för att returnera input-objektet. Annars kan responsen bli fel om DB ändrar/validerar data eller om ingen uppdatering skedde.

4) Gör sökning konsekvent med casing:
- Ni gör `p.name.toLowerCase().includes(filter.toString())` men normaliserar inte `filter`. Gör `filter.toString().toLowerCase()`.

5) Flytta sortering/filtrering till MongoDB när möjligt:
- Istället för att hämta allt och sortera/filtrera i minnet: använd `.find(...)` och `.sort(...)` för bättre prestanda och renare kod.

6) Förbättra ID/orderNumber-generering:
- `Date.now()`-baserade id:n kan krocka vid snabba requests. Överväg MongoDBs `_id`, UUID eller en robust sekvens.

7) Rensa upp i modeller/typer:
- CartItem-modellen verkar inte användas (endast schema i Order). Antingen använd modellen eller ta bort den.
- Standardisera typnamn (t.ex. `DbProduct`, `DbOrder`, `DbCartItem`) för läsbarhet.

8) Frontend för att tydligare nå VG:
- Lägg till minst GET/POST för ordrar från klienten (och gärna även PATCH/DELETE för både produkter och ordrar) så att det tydligt framgår att API:t används.

Avslutningsvis: du har en bra grund med tydlig struktur, fungerande MongoDB-koppling och ett API som i stora drag täcker kraven. Om du åtgärdar validering/statuskoder och gör klientanropen lite mer heltäckande har du väldigt goda förutsättningar att nå VG-nivå.