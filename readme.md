# TypeScriptin tyypit: Users & Posts

Tässä tehtävässä harjoitellaan TypeScriptin tyyppien määrittelyä ja tyyppien hyödyntämistä osana ohjelmalogiikkaa Node.js-ympäristössä. Tehtävänä on lukea kahdesta erillisestä JSON-tiedostosta [käyttäjiä](./data/users.json) ja [postauksia](./data/posts.json), ja yhdistellä käyttäjät niitä vastaaviin postauksiin.

Tehtävän suorittamiseksi tarvitset [Node.js-suoritusympäristön](https://nodejs.org/) sekä npm-pakettienhallintasovelluksen, joka tulee tyypillisesti Node.js-asennuksissa mukana. Suosittelemme käyttämään tehtävissä [uusinta LTS-versiota (Long Term Support)](https://github.com/nodejs/release#release-schedule).

## GitHub classroom

Tehtävä arvostellaan käyttäen [GitHub classroom](https://classroom.github.com/) -palvelua, joka suorittaa ohjelmasi ja tarkastaa sekä pisteyttää tulokset automaattisesti. Taustalla GitHub classroom hyödyntää [GitHub actions](https://github.com/features/actions) -nimistä jatkuvan integroinnin palvelua.

Voit tarvittaessa lähettää tehtävän tarkastettavaksi monta kertaa. Tee tällöin uusi commit ja vie (push) muutokset GitHubiin. Varmista kuitenkin, että viimeisin tekemäsi commit tuottaa parhaat pisteet.

Ratkaisusi "käyttöliittymän" ei tarvitse noudattaa pilkulleen annettuja esimerkkejä, mutta toimintalogiikan tulee olla oleellisilta osin samanlainen. Automaattisen arvioinnin vuoksi ohjelmasi tulee esim. käynnistyä täsmälleen samoilla komennoilla kuin tehtävänannossa on esitetty.

## Tehtävän kloonaaminen

Kun olet hyväksynyt tehtävän GitHub classroomissa ja saanut repositoriosta henkilökohtaisen kopion, kloonaa se itsellesi `git clone` -komennolla. Siirry sen jälkeen VS Code:en editoimaan tiedostoja.

Kloonatessasi repositoriota **varmista, että Git-osoitteen lopussa on oma GitHub-käyttäjänimesi**. Jos käyttäjänimesi puuttuu osoitteesta, kyseessä ei ole henkilökohtainen kopiosi tehtävästä. Luo tässä tapauksessa oma classroom-kopio tehtävästä itsellesi Teams-tehtävästä löytyvän linkin avulla.

## Riippuvuuksien asentaminen

Aloita asentamalla projektin riippuvuudet, jotka on määritelty `package.json`-tiedostossa:

```sh
npm install
```

Riippuvuudet sisältävät sekä [TypeScript-kielen](https://www.npmjs.com/package/typescript), [Vitest-testaustyökalun](https://www.npmjs.com/package/vitest) että [`tsx`](https://www.npmjs.com/package/tsx)-paketin TypeScript-kielisen koodin suorittamiseksi Node.js:llä. Lisäksi mukana on [@types/node](https://www.npmjs.com/package/@types/node)-paketti, joka sisältää Node.js:n tyyppimäärittelyt.

## Tehtävän data

Tehtävässä hyödynnetään staattista JSON-muotoista dataa [dummyjson.com](https://dummyjson.com)-palvelusta. Tehtäväpohjan tiedostot [users.json](./data/users.json) sekä [posts.json](./data/posts.json) on ladattu suoraan tehtäväpohjaan DummyJSON-projektin [GitHub-repositoriosta](https://github.com/Ovi/DummyJSON/blob/master/src/data/), joten niitä ei tarvitse ladata ohjelmassasi verkon yli, vaan ne voidaan lukea tiedostojärjestelmästä.

**Users:** [users.json](./data/users.json)

-   Dokumentaatio: https://dummyjson.com/docs/users
-   Lähde: https://github.com/Ovi/DummyJSON/blob/master/src/data/users.json
-   Lisenssi: https://github.com/Ovi/DummyJSON/blob/master/LICENSE

**Posts:** [posts.json](./data/posts.json)

-   Dokumentaatio: https://dummyjson.com/docs/posts
-   Lähde: https://github.com/Ovi/DummyJSON/blob/master/src/data/posts.json
-   Lisenssi: https://github.com/Ovi/DummyJSON/blob/master/LICENSE

### JSON-tietojen lukeminen ja tyypittäminen

JSON-muotoista dataa voidaan käsitellä Node.js-sovelluksissa useilla eri tavoilla. Tyypillisesti dataa saadaan joko http-pyyntöjen kautta tai sitä voidaan lukea tiedostojärjestelmästä. Tässä tehtävässä data on tallennettu paikallisiin tiedostoihin, joten ne luetaan suoraan tiedostojärjestelmästä käyttäen Node.js:n `readFile`- ja `JSON.parse`-funktioita. Tiedostot lukeva koodi löytyy valmiina tehtäväpohjasta tiedostosta [src/usersAndPosts.ts](./src/usersAndPosts.ts):

```ts
// these variables specify the relative paths to the JSON files:
const usersFile = new URL('../data/users.json', import.meta.url);

// the file is read and parsed into an array of User objects:
const users: User[] = JSON.parse(await readFile(usersFile, 'utf8'));
```

Yllä esiintyvä `User`-tyyppi on ennalta määritetty omassa [valmiissa tiedostossaan](./src/types/User.ts), mutta sinun tulee itse määritellä `Post`-tietotyypille sopiva tyyppi [omaan tiedostoonsa](./src/types/Post.ts).

## Osa 1: Post-tyyppi (40 %)

Tehtävän 1. osassa sinun tulee määritellä [posts.json](./data/posts.json) -tiedoston datalle oma tietotyyppi `type Post`. Yksittäinen Post-objekti on muodoltaan esimerkiksi seuraavanlainen:

```json
{
    "id": 42,
    "title": "When the compiler laughs at you",
    "body": "I spent three hours debugging my TypeScript code, only to realize I had a semicolon in the wrong place.",
    "userId": 67,
    "tags": ["typescript", "debugging", "programmer-life", "bugs"],
    "reactions": 1337
}
```

Kaikkia attribuutteja ei ole aivan välttämätöntä määritellä osaksi tyyppiä, koska niitä ei käytetä tehtävän seuraavassa osassa. Määrittele tyyppiin **vähintään** attribuutit `id`, `title`, `body` ja `userId`. Tyyppi tulee tallentaa tiedostoon [src/types/Post.ts](./src/types/Post.ts). Luomasi tyyppi tulee julkaista tiedostosta seuraavasti:

```ts
export type Post = {
  // ...
};
```

💡 _TypeScript-tyyppejä voidaan muodostaa manuaalisesti, mutta tyyppejä voidaan myös generoida varsin suoraviivaisesti olemassa oleville JSON-tietorakenteille esim. ChatGPT:n tai [muiden online-työkalujen](https://www.google.com/search?q=json+to+typescript+type+online) avulla. **Jos generoit tyypit automaattisesti, lisää koodiisi kommenttina lähdeviite käyttämääsi työkaluun tai palveluun**._

## Osa 2: Käyttäjien ja postausten yhdisteleminen (60 %)

Tehtävän toisessa osassa sinun tulee toteuttaa skripti [usersAndPosts.ts](./src/usersAndPosts.ts), joka lukee edellä esitellyt JSON-tiedostot ja tulostaa niissä olevien käyttäjien nimet sekä postausten otsikot (`title`). Tiedot tulee tulostaa siten, että kunkin käyttäjän nimi tulostetaan muodossa `firstName lastName`, minkä jälkeen tulostetaan kaikkien kyseisen käyttäjän tekemien postausten otsikot.

Postaukset voidaan yhdistää käyttäjiin vertailemalla `Post`-olioiden `userId`-attribuutteja `user`-olioiden `id`-attribuutteihin. Suosittelemme tulostamaan tiedot siten, että ohjelman tuloste noudattaa [Markdown-syntaksia](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax), eli esimerkiksi seuraavasti:

```markdown
# Terry Medhurst

-   They rushed out the door.
-   The paper was blank.
-   So what is the answer? How can you stand

# Sheldon Quigley

-   It's an unfortunate reality that we don't teach people how to make money
-   Things aren't going well at all
-   He swung back the fishing pole and cast the line
-   Are you getting my texts???

...
```

Arvioinnin kannalta tulosteen yksityiskohdilla ei ole painoarvoa, kunhan et muuta nimiä, otsikoita tai niiden keskinäistä järjestystä. **Käyttäjien ja kunkin käyttäjän omien postausten tulee olla samassa järjestyksessä keskenään kuin annetuissa JSON-tiedostoissa**.

💡 Ongelma voitaisiin ratkaista esimerkiksi sisäkkäisillä toistorakenteilla, mutta tässä tehtävässä tarkoituksena on harjoitella ECMAScriptin edistyneempiä ominaisuuksia sekä esimerkiksi `map`-, `filter`- ja `forEach`-taulukkofunktioita. Suosittelemme siis vahvasti perehtymään esimerkiksi seuraaviin lähteisiin:

-   [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
-   [filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
-   [forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
-   [reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

MDN Web Docs, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

## Ohjelman suorittaminen ja testaaminen

Kun olet asentanut tehtäväpohjan riippuvuudet `npm install`-komennolla, voit suorittaa ratkaisusi `npm start`-komennolla:

```sh
npm start
```

`start`-skripti sekä testeissä käytetty `test`-skripti on määritetty [package.json](./package.json)-tiedostossa seuraavasti:

```js
{
  "scripts": {
    "start": "tsx src/usersAndPosts.ts",
    "test": "vitest run"
  },
  /* ... */
}
```

`npm start` suorittaa taustalla komennon `tsx src/usersAndPosts.ts`. Testit suoritetaan puolestaan [Vitest-testityökalun](https://vitest.dev/) avulla komennolla `npm test`:

```sh
npm test
```

Mikäli testit eivät mene läpi, kiinnitä erityisesti huomiota saamasi virheraportin _Message_-kohtaan.


# Lisenssit ja tekijänoikeudet

## Node.js

> _"Node.js is available under the [MIT license](https://opensource.org/licenses/MIT). Node.js also includes external libraries that are available under a variety of licenses. See [LICENSE](https://github.com/nodejs/node/blob/HEAD/LICENSE) for the full license text."_
>
> https://github.com/nodejs/node#license

## TypeScript

TypeScript itsessään on lisensoitu Apache-2.0 -lisenssillä: https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt

## Vitest

Vitest-työkalu on lisensoitu MIT-lisenssillä: https://github.com/vitest-dev/vitest/blob/main/LICENSE

### Tsx

Tsx-työkalu on lisensoitu MIT-lisenssillä: https://github.com/privatenumber/tsx/blob/master/LICENSE

## DummyJSON

Tehtävässä hyödynnetyn [DummyJSON](https://github.com/Ovi/DummyJSON/)-palvelun on kehittänyt [Muhammad Ovi (Owais)](https://github.com/Ovi/) ja se on lisensoitu MIT-lisenssillä: [https://github.com/Ovi/DummyJSON/blob/master/LICENSE](https://github.com/Ovi/DummyJSON/blob/master/LICENSE).

## Tämä tehtävä

Tämän tehtävän on kehittänyt Teemu Havulinna ja se on lisensoitu [Creative Commons BY-NC-SA -lisenssillä](https://creativecommons.org/licenses/by-nc-sa/4.0/). Tehtävänannon, lähdekoodien ja testien toteutuksessa on hyödynnetty ChatGPT-kielimallia sekä GitHub copilot -tekoälyavustinta.
