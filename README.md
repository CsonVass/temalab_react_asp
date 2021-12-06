# `React` és `ASP.NET Core` alapú Canban tábla alkalmazás  
Vass Csongor - AHQQ3A  
Konzulens: Dudás Ákos  
/2021. ősz/  

## Feladat
>A konkrét feladat egy teendőket kezelő webalkalmazás backendjének és frontendjének elkészítése. A teendőket adatbázisban tároljuk és a webes felületen jelenítjük meg, a kiszolgáló pedig REST interfészen keresztül érhető el.  

>A teendők rendelkeznek címmel, leírással, határidővel és állapottal (függőben, folyamatban, kész, elhalasztva). A határidő helyett a prioritást a teendők sorrendje határozza meg, tehát az előbbi adataik mellett még az egymáshoz képesti sorrendet is tároljuk és megjelenítjük.  


## Frontend
### Használat
A `New Column` gomb megnyomásával hozhatunk létre új oszlopot, ami automatikusan New Column névvel jön létre.  
Az oszlopon szereplő három gomb közül a `piros szemetes` gomb az oszlopot (tartalmával együtt) törli, a `sárga ceruza` gombbal szerkeszthető az oszlop neve, valamint a `zöld plusz` gombbal új taskot illeszt az oszlop végére.  
A task kártyákon szerepel a task neve, határideje, leírása. Ezek létrehozáskor rendre "New Task", a mai dátum, "-". A `piros szemetes` gombbal törölhető a task. A szürke `ceruza gomb` megnyomására a kártya szerkeszthetővé válik, és a felsorolt tulajdonságok mellett legördülő menüvel az oszlop is változtatható. A ˙Save` gombbal mentehőek a változtatások.
A taskok közötti sorrend **drag and drop** módszerrel változtatható.  
### Felépítés
A frontend egy JavaScript nyevlven, React technológiával elkészített webalkalmazás. A kinézet **Bootstrap** megjelenítési van kialakítva valamint tartalmaz néhány **Material UI** elemet (pl: task szerkesztési form) is. A kódellenőrzést eslint linter végzi.  
Adatokat a kialakított API-n kersztül éri el REST megközelítéssel. Ezeket az adatokat **a felhasználó által létrehozott oszlopokba** és azokon belül taskokba rendezi.  
#### Osztályok
* api.js - Az API-val kommunikáló komponens, axiost-t használ
* column.js - Az oszlopot reprezentáló React komponens
* index.js - A frontend belépési pontja, adatok betöltése backendről, világ létrehozása
* table.js - A táblázatot reprezentáló React komponens. Tárolja az oszlopok és taskok adatait, ezekhez definiál függvényeket
* task.js - A taskot reprezentáló React komponens

## Backend
### Felépítés
A backend egy ASP.NET Core alkalmazás, melyben az adattárolás Entity Framework Core alapon működik. A TodoItem és Column osztályok segítségével képezzük le az adatokat, amelyeket egy lokális, code-first megközelítésű SQL adatbázisban tárolnuk. A repository tervezési mintával kialakított adatelérési réteg fölé egy vékony üzleti réteg épül, amely segítségével még jobban kikényszeríthetjük a felelősségek elkülönítését. Az API és az adatbázis közötti kommunikációt ezen rétegben elhelyezkedő CanbanManagar osztály végzi.  
#### Osztályok
* DAL
    * CanbanContext.cs - A DbContext osztályból leszármazó kontextus osztály, mely az adatbázist reprezentálja
    * Column.cs - Az oszlop adatbázis elem reprezentációja
    * TodoItem.cs - A todoItem adatbázis elem reprezentációja
    * IColumnRepository - Interfész, melyen keresztül az oszlopok változtathatóak a repository tervezési minta alapján
    * ColumnRepository - Az IColumnRepository implementálása
    * ITodoItemRepository - Interfész, melyen keresztül a todoItemek változtathatóak a repository tervezési minta alapján
    * TodoItemRepository - Az ITodoItemRepository implementálása
* BL
    * CanbanManager - Az adatbázison végezhető műveleteket fogja össze. Függvényeket definiál a repositoryk helyes eléréséhez

### Testing
A backend (üzleti réteg) teszteléséhez pár egyszerű tesztmetódus tartozik. Ezek nem biztosítanak tényleges hozzáférést az adatbázishoz, csak mock-olják azt.  
Tesztmetódusok:
* Nem létező oszlop törlése
* Nem létező task törlése
* Nem létező oszlop frissítése
* Nem létező task frissítése

## API
### Felépítés
A frontend és backend közötti kommunikációt egy rest megközelítési api teszi lehetővé. Az adatok http kéréseken belül utaznak json formátumban. A konzisztens elnevezések miatt ezekből közvetlenül, külön explicit konvertálás nélkül tudják a komponensek az adatokat kezelni.  
Az api az üzleti réteg CanbanManager osztály függvényeit hívja a megkapott paraméterekkel. Különböző hibák esetén eltérő válaszkódokat ad vissza. Program osztálya a backend solution belépési pontja.
Elérése a `https://localhost:44370/` címen lehetséges a definiált végpontokkal.  
#### Osztályok
* ColumnsController.cs - Az API interfészé. A definiált végpontokra az üzleti rétegen keresztül elvégzi a műveleteket
* Program.cs - A backend belépési pontja, itt szerepel a Main függvény
* Startup.cs - A backend konfigurációját végzi, többek közt: dependency injection, Cors beállítások, lazy loading

### Végpontok
* Get
    * api/columns
    * api/columns/<columnId>
    * api/columns/<columnId>/todoItems
    * api/columns/<columnId>/todoItems/<todoItemId>
* Post
    * api/columns
    * api/columns/<columnId>/todoItems
* Put
    * api/columns/<columnId>
    * api/columns/<columnId>/todoItems
    * api/columns/<columnId>/todoItems/<todoItemId>
* Delete
    * api/columns/<column_id>
    * api/columns/<columnId>/todoItems/<todoItemId>


## Telepítés
A repository leklónozását követően telepítetünk kell a következő csomagokat:
* Frontend
    * @emotion/react 11.4.
    * @emotion/styled 11.3.0
    * @mui/material 5.0.3
    * @testing-library/jest-dom 5.14.1
    * @testing-library/react 11.2.7
    * @testing-library/user-event 12.8.3
    * axios 0.24.0
    * bootstrap 5.1.3
    * bootstrap-icons 1.7.0
    * prop-types 15.7.2
    * react 17.0.2
    * react-beautiful-dnd 13.1.0
    * react-bootstrap 2.0.2
    * react-dom 17.0.2
* Backend & API
    * Microsoft.EntityFrameworkCore.Proxies 3.1.7
    * Microsoft.EntityFrameworkCore.SqlServer 3.1.7
    * Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore 3.1.7
    * Microsoft.EntityFrameworkCore.Tools 3.1.21
    * Microsoft.VisualStudio.Web.CodeGeneration.Design 3.1.5

A programot a backend/Backend.sln futtatásával elindítjuk az adatbázisszervert és az API-t. Előbbi a `localhost:443730`-on lesz elérhető. A fronted mappában az `npm start` paranccsal elindíthat a frontend, ami meg is nyílik a `localhost:3000`-on.

## Források
* https://www.aut.bme.hu/Task/21-22-osz/React-es-ASPNET-Core-alapu oldal forrásai
* BME VIAUAC01 (Adatvezérelt rendszerek) tárgy elérhető anyagai
