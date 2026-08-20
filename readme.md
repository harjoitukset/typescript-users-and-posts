# TypeScriptin tyypit: Users & Posts

Tässä tehtävässä harjoitellaan TypeScriptin tyyppien määrittelyä ja tyyppien hyödyntämistä osana ohjelmalogiikkaa. Tehtävänä on lukea kahdesta erillisestä JSON-tiedostosta [käyttäjiä](./data/users.json) ja [postauksia](./data/posts.json), ja yhdistellä käyttäjät niitä vastaaviin postauksiin.

Tehtävän suorittamiseksi tarvitset [Node.js-suoritusympäristön](https://nodejs.org/) sekä npm-pakettienhallintasovelluksen, joka tulee tyypillisesti Node.js-asennuksissa mukana. Suosittelemme käyttämään tehtävissä [uusinta LTS-versiota (Long Term Support)](https://github.com/nodejs/release#release-schedule).

> [!TIP]
> Suosittelemme ratkaisemaan tämän tehtävän [kehityskontissa](https://code.visualstudio.com/docs/devcontainers/containers) tai [CodeSpacessa](https://github.com/features/codespaces), joka tarjoaa valmiiksi määritetyn ympäristön, jossa Node.js ja npm ovat asennettuina.
>
> Kehityskontti eristää projektin muusta käyttöjärjestelmästä, joten sillä voi olla myös positiivisia tietoturvavaikutuksia.
>
> Katso lisätietoja [kehityskontin readme.md-tiedostosta](./.devcontainer/readme.md).


## Tehtävän aloittaminen

Kun olet luonut repositoriosta henkilökohtaisen kopion, kloonaa se itsellesi `git clone` -komennolla. Siirry sen jälkeen VS Code:en editoimaan tiedostoja. Vaihtoehtoisesti [voit avata tehtävän CodeSpacessa](https://docs.github.com/en/codespaces/developing-in-a-codespace/creating-a-codespace-for-a-repository#creating-a-codespace).


## Riippuvuuksien asentaminen

Aloita asentamalla projektin riippuvuudet, jotka on määritelty [`package.json`-tiedostossa](./package.json):

```sh
npm install
```

Riippuvuudet sisältävät sekä [TypeScript-kielen](https://www.npmjs.com/package/typescript) ja [Vitest-testaustyökalun](https://www.npmjs.com/package/vitest). Lisäksi mukana on [@types/node](https://www.npmjs.com/package/@types/node)-paketti, joka sisältää Node.js:n tyyppimäärittelyt.


## Tehtävän data

Tehtävässä hyödynnetään staattista JSON-muotoista dataa [dummyjson.com](https://dummyjson.com)-palvelusta. Tehtäväpohjan tiedostot [users.json](./data/users.json) sekä [posts.json](./data/posts.json) on ladattu suoraan tehtäväpohjaan DummyJSON-projektin [GitHub-repositoriosta](https://github.com/Ovi/DummyJSON/blob/master/src/data/), joten niitä ei tarvitse ladata ohjelmassasi verkon yli, vaan ne voidaan lukea tiedostojärjestelmästä.

**Users:** [users.json](./data/users.json)

-   Dokumentaatio: https://dummyjson.com/docs/users
-   Lähde: https://github.com/Ovi/DummyJSON/blob/master/raw/users/users.json
-   Lisenssi: https://github.com/Ovi/DummyJSON/blob/master/LICENSE

**Posts:** [posts.json](./data/posts.json)

-   Dokumentaatio: https://dummyjson.com/docs/posts
-   Lähde: https://github.com/Ovi/DummyJSON/blob/master/raw/posts/posts.json
-   Lisenssi: https://github.com/Ovi/DummyJSON/blob/master/LICENSE


### JSON-tietojen lukeminen ja tyypittäminen

JSON-muotoista dataa voidaan käsitellä Node.js-sovelluksissa useilla eri tavoilla. Tyypillisesti dataa saadaan esimerkiksi http-pyyntöjen kautta tai sitä voidaan lukea tiedostojärjestelmästä tai tietokannasta.

Tässä tehtävässä data on tallennettu paikallisiin tiedostoihin, joten ne luetaan suoraan tiedostojärjestelmästä käyttäen [`readFile`-funktiota](https://nodejs.org/api/fs.html#fspromisesreadfilepath-options) ja muutetaan JS-olioksi [`JSON.parse`-funktiolla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse). Koska tiedostojen lukeminen ja parsiminen tapahtuvat ajonaikaisesti, TypeScript ei pysty etukäteen päättelemään niiden tietotyyppejä. Tyypit tulee siis määritellä itse.

`User`-tyyppi on ennalta määritetty omassa [valmiissa tiedostossaan](./src/types/User.ts), mutta sinun tulee itse määritellä `Post`-tietotyypille sopiva tyyppi [omaan tiedostoonsa](./src/types/Post.ts).


## Osa 1: Post-tyyppi (40 %)

Tehtävän 1. osassa sinun tulee määritellä [posts.json](./data/posts.json) -tiedoston datalle oma tietotyyppi `type Post`. Yksittäinen Post-olio on muodoltaan esimerkiksi seuraavanlainen:

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

Kaikkia attribuutteja ei ole aivan välttämätöntä määritellä osaksi tyyppiä, koska niitä ei käytetä tehtävän seuraavassa osassa. Määrittele **vähintään** attribuutit `id`, `title`, `body` ja `userId`. Tyyppi tulee tallentaa tiedostoon [src/types/Post.ts](./src/types/Post.ts), josta löydät myös valmiin pohjan, jota voit täydentää.

> [!NOTE]
> TypeScript-tyyppejä voidaan muodostaa "käsin", mutta tyyppejä voidaan myös generoida varsin suoraviivaisesti olemassa oleville JSON-tietorakenteille esim. kielimallien tai [online-työkalujen](https://www.google.com/search?q=json+to+typescript+type+online) avulla.
>
> Jos generoit tyypit automaattisesti, lisää koodiisi kommenttina vapaamuotoinen lähdeviite käyttämääsi työkaluun tai palveluun.


## Osa 2: Käyttäjien ja postausten yhdisteleminen (60 %)

Tehtävän toisessa osassa sinun tulee toteuttaa skripti [usersAndPosts.ts](./src/usersAndPosts.ts), joka lukee edellä esitellyt JSON-tiedostot ja tulostaa niissä olevien käyttäjien nimet sekä postausten otsikot. Tiedot tulee tulostaa siten, että kunkin käyttäjän nimi tulostetaan muodossa `firstName lastName`, minkä jälkeen tulostetaan kaikkien kyseisen käyttäjän tekemien postausten otsikot (`title`).

Postaukset voidaan yhdistää käyttäjiin vertailemalla `Post`-olioiden `userId`-attribuutteja `user`-olioiden `id`-attribuutteihin. Suosittelemme tulostamaan tiedot siten, että ohjelman tuloste noudattaa [Markdown-syntaksia](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax), eli esimerkiksi seuraavasti:

```markdown
# Terry Medhurst

- They rushed out the door.
- The paper was blank.
- So what is the answer? How can you stand

# Sheldon Quigley

- It's an unfortunate reality that we don't teach people how to make money
- Things aren't going well at all
- He swung back the fishing pole and cast the line
- Are you getting my texts???

...
```

Ratkaisusi käyttöliittymän ei tarvitse noudattaa pilkulleen yllä olevaa esimerkkiä, mutta toimintalogiikan tulee olla oleellisilta osin samanlainen. Automaattisen arvioinnin vuoksi ohjelmasi tulee myös esimerkiksi kääntyä käynnistyä samoilla komennoilla kuin tehtävänannossa on esitetty.

Arvioinnin kannalta tulosteen yksityiskohdilla ei ole painoarvoa, kunhan et muuta datassa esiintyviä nimiä, otsikoita tai niiden keskinäistä järjestystä. **Käyttäjien ja kunkin käyttäjän omien postausten tulee olla samassa järjestyksessä keskenään kuin annetuissa JSON-tiedostoissa**.

> [!TIP]
> 💡 Logiikka voidaan toteuttaa esimerkiksi sisäkkäisillä toistorakenteilla, mutta tässä tehtävässä tarkoituksena on harjoitella ECMAScriptin edistyneempiä ominaisuuksia sekä esimerkiksi `map`-, `filter`- ja `forEach`-taulukkofunktioita. Suosittelemme siis vahvasti perehtymään esimerkiksi seuraaviin lähteisiin:
>
> - [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
> - [filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
> - [forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
> - [reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
>
> MDN Web Docs, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array


## Ohjelman kääntäminen ja suorittaminen

Varmista, että olet ensin asentanut tehtäväpohjan riippuvuudet `npm install`-komennolla.

Asennuksen jälkeen voit kääntää TypeScript-koodin JavaScriptiksi suorittamalla projektin juuressa seuraavan komennon:

```sh
npm run build
```

Build-komento on määritetty [package.json](./package.json)-tiedostossa. Se suorittaa TypeScriptin `tsc`-kääntäjän ja tuottaa `dist`-hakemistoon käännetyt JavaScript-tiedostot. Tämän jälkeen voit suorittaa ohjelman komennolla:

```sh
node dist/usersAndPosts.js
```

[package.json-tiedostossa](./package.json) on määritetty myös `start`-skripti, joka suorittaa saman tiedoston:

```sh
npm start
```

> [!NOTE]
> Kun teet muutoksia TypeScript-koodiin, muista aina kääntää koodi uudelleen ennen ohjelman suorittamista, jotta muutokset tulevat voimaan.
>
> Halutessasi voit suorittaa kääntämisen ja suorittamisen yhdellä komennolla esimerkiksi seuraavasti:
>
> ```sh
> npm run build && npm start    # unix-tyyppiset komentorivit
> npm run build; npm start      # PowerShell
> ```
>
> Halutessasi voit myös tutustua Node.js:n dokumentaatiossa sivuun ["Running TypeScript with a runner"](https://nodejs.org/learn/typescript/run#running-typescript-code-with-tsx).


## Ohjelman testaaminen

Tehtävälle on toteutettu valmiit testit, jotka löytyvät [./tests/usersAndPosts.test.ts](./tests/usersAndPosts.test.ts)-tiedostosta.

Testeissä hyödynnetään [Vitest-testityökalua](https://vitest.dev/) ja voit suorittaa testit `npm test`-komennolla:

```sh
npm test
```

Mikäli testit eivät mene läpi, kiinnitä erityisesti huomiota saamasi virheraportin *AssertionError*-kohtiin, joissa on sanallinen kuvaus virheestä.

> [!NOTE]
> Kuten koodia suoritettaessa, myös testejä suoritettaessa TypeScript-koodi tulee ensin kääntää JavaScriptiksi. Voit suorittaa käännöksen ja testien ajon yhdellä komennolla esimerkiksi seuraavasti:
>
> ```sh
> npm run build && npm test   # unix-tyyppiset komentorivit
> npm run build ; npm test    # PowerShell
> ```


## Ratkaisun lähettäminen ja arviointi

Kun olet saanut tehtävän ratkaistua, voit lähettää ratkaisusi arvioitavaksi. Tehtävän arviointi tapahtuu automaattisesti GitHubin Actions-työkalulla, joka suorittaa testit ja tarkistaa niiden tulokset. Lähetä ratkaisusi `git status`, `git add`, `git commit` ja `git push` -komentojen avulla. Kun muutokset on pusattu GitHubiin, arviointi käynnistyy automaattisesti.

Tehtävän maksimipistemäärä on 100 pistettä, joka skaalataan arvosanaksi asteikolle 0-5 jakamalla saatu pistemäärä 20:lla.


# Lisenssit ja tekijänoikeudet

## Node.js

> _"Node.js is available under the [MIT license](https://opensource.org/licenses/MIT). Node.js also includes external libraries that are available under a variety of licenses. See [LICENSE](https://github.com/nodejs/node/blob/HEAD/LICENSE) for the full license text."_
>
> https://github.com/nodejs/node#license


## TypeScript

TypeScript itsessään on lisensoitu Apache-2.0 -lisenssillä: https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt


## Vitest

Vitest-työkalu on lisensoitu MIT-lisenssillä: https://github.com/vitest-dev/vitest/blob/main/LICENSE


## DummyJSON

Tehtävässä hyödynnetyn [DummyJSON](https://github.com/Ovi/DummyJSON/)-palvelun on kehittänyt [Muhammad Ovi (Owais)](https://github.com/Ovi/) ja se on lisensoitu MIT-lisenssillä: [https://github.com/Ovi/DummyJSON/blob/master/LICENSE](https://github.com/Ovi/DummyJSON/blob/master/LICENSE).


## Tämä tehtävä

Tämän tehtävän on kehittänyt Teemu Havulinna ja se on lisensoitu [Creative Commons BY-NC-SA -lisenssillä](https://creativecommons.org/licenses/by-nc-sa/4.0/). Tehtävänannon, lähdekoodien ja testien toteutuksessa on hyödynnetty ChatGPT-kielimallia sekä GitHub copilot -tekoälyavustinta.
