// combinations.js

window.ANIMAL_DATABASE = {
  verbTemplates: [
    {
      id: "videti",
      infinitive: "VIDĚT",
      caseKey: "acc",
      caseName: "4. pád (Akuzativ)",
      buildSentence: (animal, form, isPlural) => {
        const past = isPlural ? "Viděli jsme" : (animal.gender === "F" ? "Viděla jsem" : "Viděl jsem");
        return `${past} [___].`;
      }
    },
    {
      id: "rikati",
      infinitive: "ŘÍKAT",
      caseKey: "dat",
      caseName: "3. pád (Dativ)",
      buildSentence: (animal, form, isPlural) => {
        const verb = isPlural ? "Říkali jsme" : "Říkám";
        return `${verb} [___] tajemství.`;
      }
    },
    {
      id: "jiti_s",
      infinitive: "JÍT S",
      caseKey: "inst",
      caseName: "7. pád (Instrumentál)",
      buildSentence: (animal, form, isPlural) => {
        const prep = /^[vf]/i.test(form) ? "se" : "s";
        return `Jdu na procházku ${prep} [___].`;
      }
    },
    {
      id: "mluviti_o",
      infinitive: "MLUVIT O",
      caseKey: "loc",
      caseName: "6. pád (Lokál)",
      buildSentence: (animal, form, isPlural) => {
        const verb = isPlural ? "Mluvili jsme" : "Mluvil jsem";
        return `${verb} o [___].`;
      }
    },
    {
      id: "bat_se",
      infinitive: "BÁT SE",
      caseKey: "gen",
      caseName: "2. pád (Genitiv)",
      buildSentence: (animal, form, isPlural) => {
        const verb = isPlural ? "Báli jsme se" : "Bál jsem se";
        return `${verb} [___].`;
      }
    },
    {
      id: "to_je_krasny",
      infinitive: "BÝT (Přídavné jméno)",
      caseKey: "nom",
      caseName: "1. pád (Nominativ)",
      buildSentence: (animal, form, isPlural) => {
        if (isPlural) {
          return animal.gender === "M_ANIM" ? "To jsou krásní [___]." : "To jsou krásné [___].";
        }
        if (animal.gender === "F") return "To je krásná [___].";
        if (animal.gender === "N") return "To je krásné [___].";
        return "To je krásný [___].";
      }
    }
  ],

  levels: {
    1: {
      name: "A1 – Začátečník",
      icon: "🌱",
      animals: [
        {
          id: "pes", approved: true, nominative: "pes", english: "Dog", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "pes", gen: "psa", dat: "psovi", acc: "psa", voc: "pse", loc: "psovi", inst: "psem" }, plural: { nom: "psi", gen: "psů", dat: "psům", acc: "psy", voc: "psi", loc: "psech", inst: "psy" } }
        },
        {
          id: "kocka", approved: true, nominative: "kočka", english: "Cat", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "kočka", gen: "kočky", dat: "kočce", acc: "kočku", voc: "kočko", loc: "kočce", inst: "kočkou" }, plural: { nom: "kočky", gen: "koček", dat: "kočkám", acc: "kočky", voc: "kočky", loc: "kočkách", inst: "kočkami" } }
        },
        {
          id: "kun", approved: true, nominative: "kůň", english: "Horse", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "kůň", gen: "koně", dat: "koni", acc: "koně", voc: "koni", loc: "koni", inst: "koněm" }, plural: { nom: "koně", gen: "koní", dat: "koním", acc: "koně", voc: "koně", loc: "koních", inst: "koňmi" } }
        },
        {
          id: "krava", approved: true, nominative: "kráva", english: "Cow", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "kráva", gen: "krávy", dat: "krávě", acc: "krávu", voc: "krávo", loc: "krávě", inst: "právou" }, plural: { nom: "krávy", gen: "krav", dat: "kravám", acc: "krávy", voc: "krávy", loc: "kravách", inst: "kravami" } }
        },
        {
          id: "byk", approved: false, nominative: "býk", english: "Bull", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1545468843-27956a3a7ef8?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "býk", gen: "býka", dat: "býkovi", acc: "býka", voc: "býku", loc: "býkovi", inst: "býkem" }, plural: { nom: "býci", gen: "býků", dat: "býkům", acc: "býky", voc: "býci", loc: "býcích", inst: "býky" } }
        },
        {
          id: "tele", approved: false, nominative: "tele", english: "Calf", gender: "N", symbol: "⚧", color: "text-amber-400",
          image: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "tele", gen: "telete", dat: "teleti", acc: "tele", voc: "tele", loc: "teleti", inst: "teletem" }, plural: { nom: "telata", gen: "telat", dat: "telatům", acc: "telata", voc: "telata", loc: "telatech", inst: "telaty" } }
        },
        {
          id: "ovce", approved: true, nominative: "ovce", english: "Sheep", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "ovce", gen: "ovce", dat: "ovci", acc: "ovci", voc: "ovce", loc: "ovci", inst: "ovcí" }, plural: { nom: "ovce", gen: "ovcí", dat: "ovcím", acc: "ovce", voc: "ovce", loc: "ovcích", inst: "ovcemi" } }
        },
        {
          id: "koza", approved: true, nominative: "koza", english: "Goat", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "koza", gen: "kozy", dat: "koze", acc: "kozu", voc: "kozo", loc: "koze", inst: "kozou" }, plural: { nom: "kozy", gen: "koz", dat: "kozám", acc: "kozy", voc: "kozy", loc: "kozách", inst: "kozami" } }
        },
        {
          id: "prase", approved: true, nominative: "prase", english: "Pig", gender: "N", symbol: "⚧", color: "text-amber-400",
          image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "prase", gen: "prasete", dat: "praseti", acc: "prase", voc: "prase", loc: "praseti", inst: "prasetem" }, plural: { nom: "prasata", gen: "prasat", dat: "prasatům", acc: "prasata", voc: "prasata", loc: "prasatech", inst: "prasaty" } }
        },
        {
          id: "slepice", approved: false, nominative: "slepice", english: "Hen", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "slepice", gen: "slepice", dat: "slepici", acc: "slepici", voc: "slepice", loc: "slepici", inst: "slepicí" }, plural: { nom: "slepice", gen: "slepic", dat: "slepicím", acc: "slepice", voc: "slepice", loc: "slepicích", inst: "slepicemi" } }
        },
        {
          id: "kohout", approved: false, nominative: "kohout", english: "Rooster", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "kohout", gen: "kohouta", dat: "kohoutovi", acc: "kohouta", voc: "kohoute", loc: "kohoutovi", inst: "kohoutem" }, plural: { nom: "kohouti", gen: "kohoutů", dat: "kohoutům", acc: "kohouty", voc: "kohouti", loc: "kohoutech", inst: "kohouty" } }
        },
        {
          id: "kure", approved: false, nominative: "kuře", english: "Chicken", gender: "N", symbol: "⚧", color: "text-amber-400",
          image: "https://images.unsplash.com/photo-1563281577-a7be47e20db9?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "kuře", gen: "kuřete", dat: "kuřeti", acc: "kuře", voc: "kuře", loc: "kuřeti", inst: "kuřetem" }, plural: { nom: "kuřata", gen: "kuřat", dat: "kuřatům", acc: "kuřata", voc: "kuřata", loc: "kuřatech", inst: "kuřaty" } }
        },
        {
          id: "mys", approved: true, nominative: "myš", english: "Mouse", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "myš", gen: "myši", dat: "myši", acc: "myš", voc: "myši", loc: "myši", inst: "myší" }, plural: { nom: "myši", gen: "myší", dat: "myším", acc: "myši", voc: "myši", loc: "myších", inst: "myšmi" } }
        },
        {
          id: "medved", approved: true, nominative: "medvěd", english: "Bear", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "medvěd", gen: "medvěda", dat: "medvědovi", acc: "medvěda", voc: "medvěde", loc: "medvědovi", inst: "medvědem" }, plural: { nom: "medvědi", gen: "medvědů", dat: "medvědům", acc: "medvědy", voc: "medvědi", loc: "medvědech", inst: "medvědy" } }
        }
      ]
    },
    2: {
      name: "A2 – Mírně pokročilý",
      icon: "🌿",
      animals: [
        {
          id: "vlk", approved: false, nominative: "vlk", english: "Wolf", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1691433790054-5b3821080f4f?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "vlk", gen: "vlka", dat: "vlkovi", acc: "vlka", voc: "vlku", loc: "vlkovi", inst: "vlkem" }, plural: { nom: "vlci", gen: "vlků", dat: "vlkům", acc: "vlky", voc: "vlci", loc: "vlcích", inst: "vlky" } }
        },
        {
          id: "ryba", approved: false, nominative: "ryba", english: "Fish", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "ryba", gen: "ryby", dat: "rybě", acc: "rybu", voc: "rybo", loc: "rybě", inst: "rybou" }, plural: { nom: "ryby", gen: "ryb", dat: "rybám", acc: "ryby", voc: "ryby", loc: "rybách", inst: "rybami" } }
        },
        {
          id: "losos", approved: false, nominative: "losos", english: "Salmon", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "losos", gen: "lososa", dat: "lososovi", acc: "lososa", voc: "losose", loc: "lososovi", inst: "lososem" }, plural: { nom: "lososi", gen: "lososů", dat: "lososům", acc: "lososy", voc: "lososi", loc: "lososech", inst: "lososy" } }
        },
        {
          id: "uhor", approved: false, nominative: "úhoř", english: "Eel", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "úhoř", gen: "úhoře", dat: "úhořovi", acc: "úhoře", voc: "úhoři", loc: "úhořovi", inst: "úhořem" }, plural: { nom: "úhoři", gen: "úhořů", dat: "úhořům", acc: "úhoře", voc: "úhoři", loc: "úhořích", inst: "úhoři" } }
        },
        {
          id: "kapr", approved: false, nominative: "kapr", english: "Carp", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1520301251406-844222f7f9aa?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "kapr", gen: "kapra", dat: "kaprovi", acc: "kapra", voc: "kapře", loc: "kaprovi", inst: "kaprem" }, plural: { nom: "kapři", gen: "kaprů", dat: "kaprům", acc: "kapry", voc: "kapři", loc: "kaprech", inst: "kapry" } }
        },
        {
          id: "pstruh", approved: false, nominative: "pstruh", english: "Trout", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "pstruh", gen: "pstruha", dat: "pstruhovi", acc: "pstruha", voc: "pstruhu", loc: "pstruhovi", inst: "pstruhem" }, plural: { nom: "pstruzi", gen: "pstruhů", dat: "pstruhům", acc: "pstruhy", voc: "pstruzi", loc: "pstruzích", inst: "pstruhy" } }
        },
        {
          id: "treska", approved: false, nominative: "treska", english: "Cod", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "treska", gen: "tresky", dat: "tresce", acc: "tresku", voc: "tresko", loc: "tresce", inst: "treskou" }, plural: { nom: "tresky", gen: "tresek", dat: "treskám", acc: "tresky", voc: "tresky", loc: "treskách", inst: "treskami" } }
        },
        {
          id: "liska", approved: false, nominative: "liška", english: "Fox", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "liška", gen: "lišky", dat: "lišce", acc: "lišku", voc: "liško", loc: "lišce", inst: "liškou" }, plural: { nom: "lišky", gen: "lišek", dat: "liškám", acc: "lišky", voc: "lišky", loc: "liškách", inst: "liškami" } }
        },
        {
          id: "zajic", approved: false, nominative: "zajíc", english: "Hare", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1520638023360-6def43369781?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "zajíc", gen: "zajíce", dat: "zajícovi", acc: "zajíce", voc: "zajíci", loc: "zajícovi", inst: "zajícem" }, plural: { nom: "zajíci", gen: "zajíců", dat: "zajícům", acc: "zajíce", voc: "zajíci", loc: "zajících", inst: "zajíci" } }
        },
        {
          id: "kralik", approved: false, nominative: "králík", english: "Rabbit", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "králík", gen: "králíka", dat: "králíkovi", acc: "králíka", voc: "králíku", loc: "králíkovi", inst: "králíkem" }, plural: { nom: "králíci", gen: "králíků", dat: "králíkům", acc: "králíky", voc: "králíci", loc: "králících", inst: "králíky" } }
        },
        {
          id: "jezek", approved: false, nominative: "ježek", english: "Hedgehog", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1605369179729-4036b4d829cb?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "ježek", gen: "ježka", dat: "ježkovi", acc: "ježka", voc: "ježku", loc: "ježkovi", inst: "ježkem" }, plural: { nom: "ježci", gen: "ježků", dat: "ježkům", acc: "ježky", voc: "ježci", loc: "ježcích", inst: "ježky" } }
        },
        {
          id: "veverka", approved: false, nominative: "veverka", english: "Squirrel", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1504006833117-8886a355efbf?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "veverka", gen: "veverky", dat: "veverce", acc: "veverku", voc: "veverko", loc: "veverce", inst: "veverkou" }, plural: { nom: "veverky", gen: "veverek", dat: "veverkám", acc: "veverky", voc: "veverky", loc: "veverkách", inst: "veverkami" } }
        },
        {
          id: "krecek", approved: false, nominative: "křeček", english: "Hamster", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "křeček", gen: "křečka", dat: "křečkovi", acc: "křečka", voc: "křečku", loc: "křečkovi", inst: "křečkem" }, plural: { nom: "křečci", gen: "křečků", dat: "křečkům", acc: "křečky", voc: "křečci", loc: "křečcích", inst: "křečky" } }
        },
        {
          id: "morce", approved: false, nominative: "morče", english: "Guinea pig", gender: "N", symbol: "⚧", color: "text-amber-400",
          image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "morče", gen: "morčete", dat: "morčeti", acc: "morče", voc: "morče", loc: "morčeti", inst: "morčetem" }, plural: { nom: "morčata", gen: "morčat", dat: "morčatům", acc: "morčata", voc: "morčata", loc: "morčatech", inst: "morčaty" } }
        },
        {
          id: "osel", approved: false, nominative: "osel", english: "Donkey", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "osel", gen: "osla", dat: "oslovi", acc: "osla", voc: "osle", loc: "oslovi", inst: "oslem" }, plural: { nom: "osli", gen: "oslů", dat: "oslům", acc: "osly", voc: "osli", loc: "oslech", inst: "osly" } }
        },
        {
          id: "had", approved: false, nominative: "had", english: "Snake", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "had", gen: "hada", dat: "hadovi", acc: "hada", voc: "hade", loc: "hadovi", inst: "hadem" }, plural: { nom: "hadi", gen: "hadů", dat: "hadům", acc: "hady", voc: "hadi", loc: "hadech", inst: "hady" } }
        },
        {
          id: "zaba", approved: false, nominative: "žába", english: "Frog", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1559253664-ca249d4608c6?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "žába", gen: "žáby", dat: "žábě", acc: "žábu", voc: "žábo", loc: "žábě", inst: "žábou" }, plural: { nom: "žáby", gen: "žab", dat: "žábám", acc: "žáby", voc: "žáby", loc: "žábách", inst: "žábami" } }
        },
        {
          id: "komar", approved: false, nominative: "komár", english: "Mosquito", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "komár", gen: "komára", dat: "komárovi", acc: "komára", voc: "komáre", loc: "komárovi", inst: "komárem" }, plural: { nom: "komáři", gen: "komárů", dat: "komárům", acc: "komáry", voc: "komáři", loc: "komárech", inst: "komáry" } }
        },
        {
          id: "kachna", approved: false, nominative: "kachna", english: "Duck", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "kachna", gen: "kachny", dat: "kachně", acc: "kachnu", voc: "kachno", loc: "kachně", inst: "kachnou" }, plural: { nom: "kachny", gen: "kachen", dat: "kachnám", acc: "kachny", voc: "kachny", loc: "kachnách", inst: "kachnami" } }
        },
        {
          id: "husa", approved: false, nominative: "husa", english: "Goose", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "husa", gen: "husy", dat: "huse", acc: "husu", voc: "huso", loc: "huse", inst: "husou" }, plural: { nom: "husy", gen: "hus", dat: "husám", acc: "husy", voc: "husy", loc: "husách", inst: "husami" } }
        },
        {
          id: "labut", approved: false, nominative: "labuť", english: "Swan", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "labuť", gen: "labutě", dat: "labuti", acc: "labuť", voc: "labuti", loc: "labuti", inst: "labutí" }, plural: { nom: "labutě", gen: "labutí", dat: "labutím", acc: "labutě", voc: "labutě", loc: "labutích", inst: "labutěmi" } }
        },
        {
          id: "papousek", approved: false, nominative: "papoušek", english: "Parrot", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "papoušek", gen: "papouška", dat: "papouškovi", acc: "papouška", voc: "papoušku", loc: "papouškovi", inst: "papouškem" }, plural: { nom: "papoušci", gen: "papoušků", dat: "papouškům", acc: "papoušky", voc: "papoušci", loc: "papoušcích", inst: "papoušky" } }
        },
        {
          id: "kanar", approved: false, nominative: "kanár", english: "Canary", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "kanár", gen: "kanára", dat: "kanárovi", acc: "kanára", voc: "kanáre", loc: "kanárovi", inst: "kanárem" }, plural: { nom: "kanáři", gen: "kanárů", dat: "kanárům", acc: "kanáry", voc: "kanáři", loc: "kanárech", inst: "kanáry" } }
        },
        {
          id: "orel", approved: false, nominative: "orel", english: "Eagle", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "orel", gen: "orla", dat: "orlovi", acc: "orla", voc: "orle", loc: "orlovi", inst: "orlem" }, plural: { nom: "orli", gen: "orlů", dat: "orlům", acc: "orly", voc: "orli", loc: "orlech", inst: "orly" } }
        },
        {
          id: "sova", approved: false, nominative: "sova", english: "Owl", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "sova", gen: "sovy", dat: "sově", acc: "sovu", voc: "sovo", loc: "sově", inst: "sovou" }, plural: { nom: "sovy", gen: "sov", dat: "sovám", acc: "sovy", voc: "sovy", loc: "sovách", inst: "sovami" } }
        },
        {
          id: "zralok", approved: false, nominative: "žralok", english: "Shark", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1560275619-4660e43ab900?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "žralok", gen: "žraloka", dat: "žralokovi", acc: "žraloka", voc: "žraloku", loc: "žralokovi", inst: "žralokem" }, plural: { nom: "žraloci", gen: "žraloků", dat: "žralokům", acc: "žraloky", voc: "žraloci", loc: "žralocích", inst: "žraloky" } }
        },
        {
          id: "delfin", approved: false, nominative: "delfín", english: "Dolphin", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "delfín", gen: "delfína", dat: "delfínovi", acc: "delfína", voc: "delfíne", loc: "delfínovi", inst: "delfínem" }, plural: { nom: "delfíni", gen: "delfínů", dat: "delfínům", acc: "delfíny", voc: "delfíni", loc: "delfínech", inst: "delfíny" } }
        },
        {
          id: "velryba", approved: false, nominative: "velryba", english: "Whale", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1568430460464-02e3456542c2?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "velryba", gen: "velryby", dat: "velrybě", acc: "velrybu", voc: "velrybo", loc: "velrybě", inst: "velrybou" }, plural: { nom: "velryby", gen: "velryb", dat: "velrybám", acc: "velryby", voc: "velryby", loc: "velrybách", inst: "velrybami" } }
        },
        {
          id: "tulen", approved: false, nominative: "tuleň", english: "Seal", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1551085254-e96b210df58a?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "tuleň", gen: "tulení", dat: "tuleni", acc: "tuleně", voc: "tuleni", loc: "tuleni", inst: "tuleněm" }, plural: { nom: "tuleni", gen: "tuleňů", dat: "tuleňům", acc: "tuleně", voc: "tuleni", loc: "tuleních", inst: "tuleni" } }
        },
        {
          id: "krokodil", approved: false, nominative: "krokodýl", english: "Crocodile", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "krokodýl", gen: "krokodýla", dat: "krokodýlovi", acc: "krokodýla", voc: "krokodýle", loc: "krokodýlovi", inst: "krokodýlem" }, plural: { nom: "krokodýli", gen: "krokodýlů", dat: "krokodýlům", acc: "krokodýly", voc: "krokodýli", loc: "krokodýlech", inst: "krokodýly" } }
        },
        {
          id: "hroch", approved: false, nominative: "hroch", english: "Hippo", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "hroch", gen: "hrocha", dat: "hrochovi", acc: "hrocha", voc: "hrochu", loc: "hrochovi", inst: "hrochem" }, plural: { nom: "hroši", gen: "hrochů", dat: "hrochům", acc: "hrochy", voc: "hroši", loc: "hroších", inst: "hrochy" } }
        },
        {
          id: "nosorozec", approved: false, nominative: "nosorožec", english: "Rhino", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "nosorožec", gen: "nosorožce", dat: "nosorožcovi", acc: "nosorožce", voc: "nosorožče", loc: "nosorožcovi", inst: "nosorožcem" }, plural: { nom: "nosorožci", gen: "nosorožců", dat: "nosorožcům", acc: "nosorožce", voc: "nosorožci", loc: "nosorožcích", inst: "nosorožci" } }
        },
        {
          id: "gepard", approved: false, nominative: "gepard", english: "Cheetah", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "gepard", gen: "geparda", dat: "gepardovi", acc: "geparda", voc: "geparde", loc: "gepardovi", inst: "gepardem" }, plural: { nom: "gepardi", gen: "gepardů", dat: "gepardům", acc: "gepardy", voc: "gepardi", loc: "gepardech", inst: "gepardy" } }
        },
        {
          id: "zirafa", approved: false, nominative: "žirafa", english: "Giraffe", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "žirafa", gen: "žirafy", dat: "žirafě", acc: "žirafu", voc: "žirafo", loc: "žirafě", inst: "žirafou" }, plural: { nom: "žirafy", gen: "žiraf", dat: "žirafám", acc: "žirafy", voc: "žirafy", loc: "žirafách", inst: "žirafami" } }
        },
        {
          id: "zebra", approved: false, nominative: "zebra", english: "Zebra", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1501706362039-c06b2d715385?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "zebra", gen: "zebry", dat: "zebře", acc: "gebru", voc: "zebro", loc: "zebře", inst: "gebrou" }, plural: { nom: "zebry", gen: "zeber", dat: "zebrám", acc: "zebry", voc: "zebry", loc: "zebrách", inst: "zebrami" } }
        },
        {
          id: "gorila", approved: false, nominative: "gorila", english: "Gorilla", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "gorila", gen: "gorily", dat: "gorile", acc: "gorilu", voc: "gorilo", loc: "gorile", inst: "gorilou" }, plural: { nom: "gorily", gen: "goril", dat: "gorilám", acc: "gorily", voc: "gorily", loc: "gorilách", inst: "gorilami" } }
        },
        {
          id: "panda", approved: false, nominative: "panda", english: "Panda", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef9?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "panda", gen: "pandy", dat: "pandě", acc: "pandu", voc: "pando", loc: "pandě", inst: "pandou" }, plural: { nom: "pandy", gen: "pand", dat: "pandám", acc: "pandy", voc: "pandy", loc: "pandách", inst: "pandami" } }
        },
        {
          id: "klokan", approved: false, nominative: "klokan", english: "Kangaroo", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1529101091764-9352478b14f3?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "klokan", gen: "klokana", dat: "klokanovi", acc: "klokana", voc: "klokane", loc: "klokanovi", inst: "klokanem" }, plural: { nom: "klokani", gen: "klokanů", dat: "klokanům", acc: "klokany", voc: "klokani", loc: "klokanech", inst: "klokany" } }
        }
      ]
    },
    3: {
      name: "B1 – Středně pokročilý",
      icon: "🌳",
      animals: [
        {
          id: "jelen", approved: false, nominative: "jelen", english: "Deer", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "jelen", gen: "jelena", dat: "jelenovi", acc: "jelena", voc: "jelene", loc: "jelenovi", inst: "jelenem" }, plural: { nom: "jeleni", gen: "jelenů", dat: "jelenům", acc: "jeleny", voc: "jeleni", loc: "jelenech", inst: "jeleny" } }
        },
        {
          id: "srnec", approved: false, nominative: "srnec", english: "Roe deer", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "srnec", gen: "srnce", dat: "srncovi", acc: "srnce", voc: "srnče", loc: "srncovi", inst: "srncem" }, plural: { nom: "srnci", gen: "srnců", dat: "srncům", acc: "srnce", voc: "srnci", loc: "srncích", inst: "srnci" } }
        },
        {
          id: "divocak", approved: false, nominative: "divočák", english: "Wild boar", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "divočák", gen: "divočáka", dat: "divočákovi", acc: "divočáka", voc: "divočáku", loc: "divočákovi", inst: "divočákem" }, plural: { nom: "divočáci", gen: "divočáků", dat: "divočákům", acc: "divočáky", voc: "divočáci", loc: "divočácích", inst: "divočáky" } }
        },
        {
          id: "lisak", approved: false, nominative: "lišák", english: "Male fox", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "lišák", gen: "lišáka", dat: "lišákovi", acc: "lišáka", voc: "lišáku", loc: "lišákovi", inst: "lišákem" }, plural: { nom: "lišáci", gen: "lišáků", dat: "lišákům", acc: "lišáky", voc: "lišáci", loc: "lišácích", inst: "lišáky" } }
        },
        {
          id: "netopyr", approved: false, nominative: "netopýr", english: "Bat", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1696766418617-e23603fe88b5?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "netopýr", gen: "netopýra", dat: "netopýrovi", acc: "netopýra", voc: "netopýre", loc: "netopýrovi", inst: "netopýrem" }, plural: { nom: "netopýři", gen: "netopýrů", dat: "netopýrům", acc: "netopýry", voc: "netopýři", loc: "netopýrech", inst: "netopýry" } }
        },
        {
          id: "vydra", approved: false, nominative: "vydra", english: "Otter", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "vydra", gen: "vydry", dat: "vydře", acc: "vydru", voc: "vydro", loc: "vydře", inst: "vydrou" }, plural: { nom: "vydry", gen: "vydr", dat: "vydrám", acc: "vydry", voc: "vydry", loc: "vydrách", inst: "vydrami" } }
        },
        {
          id: "bobr", approved: false, nominative: "bobr", english: "Beaver", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "bobr", gen: "bobra", dat: "bobrovi", acc: "bobra", voc: "bobre", loc: "bobrovi", inst: "bobrem" }, plural: { nom: "bobři", gen: "bobrů", dat: "bobrům", acc: "bobry", voc: "bobři", loc: "bobrech", inst: "bobry" } }
        },
        {
          id: "jezevec", approved: false, nominative: "jezevec", english: "Badger", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1500479694472-551d1fb6258d?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "jezevec", gen: "jezevce", dat: "jezevcovi", acc: "jezevce", voc: "jezevče", loc: "jezevcovi", inst: "jezevcem" }, plural: { nom: "jezevci", gen: "jezevců", dat: "jezevcům", acc: "jezevce", voc: "jezevci", loc: "jezevcích", inst: "jezevci" } }
        },
        {
          id: "rys", approved: false, nominative: "rys", english: "Lynx", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "rys", gen: "rysa", dat: "rysovi", acc: "rysa", voc: "ryse", loc: "rysovi", inst: "rysem" }, plural: { nom: "rysi", gen: "rysů", dat: "rysům", acc: "rysy", voc: "rysi", loc: "rysech", inst: "rysy" } }
        },
        {
          id: "los", approved: false, nominative: "los", english: "Moose", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "los", gen: "losa", dat: "losovi", acc: "losa", voc: "lose", loc: "losovi", inst: "losem" }, plural: { nom: "losi", gen: "losů", dat: "losům", acc: "losy", voc: "losi", loc: "losech", inst: "losy" } }
        },
        {
          id: "opice", approved: false, nominative: "opice", english: "Monkey", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1540573133985-778788177421?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "opice", gen: "opice", dat: "opici", acc: "opici", voc: "opice", loc: "opici", inst: "opicí" }, plural: { nom: "opice", gen: "opic", dat: "opicím", acc: "opice", voc: "opice", loc: "opicích", inst: "opicemi" } }
        },
        {
          id: "slon", approved: false, nominative: "slon", english: "Elephant", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "slon", gen: "slona", dat: "slonovi", acc: "slona", voc: "slone", loc: "slonovi", inst: "slonem" }, plural: { nom: "sloni", gen: "slonů", dat: "slonům", acc: "slony", voc: "sloni", loc: "slonech", inst: "slony" } }
        },
        {
          id: "lev", approved: false, nominative: "lev", english: "Lion", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "lev", gen: "lva", dat: "lvovi", acc: "lva", voc: "lve", loc: "lvovi", inst: "lvem" }, plural: { nom: "lvi", gen: "lvů", dat: "lvům", acc: "lvy", voc: "lvi", loc: "lvech", inst: "lvy" } }
        },
        {
          id: "tygr", approved: false, nominative: "tygr", english: "Tiger", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "tygr", gen: "tygra", dat: "tygrovi", acc: "tygra", voc: "tygře", loc: "tygrovi", inst: "tygrem" }, plural: { nom: "tygři", gen: "tygrů", dat: "tygrům", acc: "tygry", voc: "tygři", loc: "tygrech", inst: "tygry" } }
        },
        {
          id: "velbloud", approved: false, nominative: "velbloud", english: "Camel", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "velbloud", gen: "velblouda", dat: "velbloudovi", acc: "velblouda", voc: "velbloude", loc: "velbloudovi", inst: "velbloudem" }, plural: { nom: "velbloudi", gen: "velbloudů", dat: "velbloudům", acc: "velbloudy", voc: "velbloudi", loc: "velbloudech", inst: "velbloudy" } }
        },
        {
          id: "tucnak", approved: false, nominative: "tučňák", english: "Penguin", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "tučňák", gen: "tučňáka", dat: "tučňákovi", acc: "tučňáka", voc: "tučňáku", loc: "tučňákovi", inst: "tučňákem" }, plural: { nom: "tučňáci", gen: "tučňáků", dat: "tučňákům", acc: "tučňáky", voc: "tučňáci", loc: "tučňácích", inst: "tučňáky" } }
        },
        {
          id: "plamenak", approved: false, nominative: "plameňák", english: "Flamingo", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1518992028580-6d57bd80f2dd?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "plameňák", gen: "plameňáka", dat: "plameňákovi", acc: "plameňáka", voc: "plameňáku", loc: "plameňákovi", inst: "plameňákem" }, plural: { nom: "plameňáci", gen: "plameňáků", dat: "plameňákům", acc: "plameňáky", voc: "plameňáci", loc: "plameňácích", inst: "plameňáky" } }
        },
        {
          id: "pelikan", approved: false, nominative: "pelikán", english: "Pelican", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "pelikán", gen: "pelikána", dat: "pelikánovi", acc: "pelikána", voc: "pelikáne", loc: "pelikánovi", inst: "pelikánem" }, plural: { nom: "pelikáni", gen: "pelikánů", dat: "pelikánům", acc: "pelikány", voc: "pelikáni", loc: "pelikánech", inst: "pelikány" } }
        },
        {
          id: "racek", approved: false, nominative: "racek", english: "Seagull", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "racek", gen: "racka", dat: "rackovi", acc: "racka", voc: "racku", loc: "rackovi", inst: "rackem" }, plural: { nom: "racci", gen: "racků", dat: "rackům", acc: "racky", voc: "racci", loc: "racích", inst: "racky" } }
        },
        {
          id: "datel", approved: false, nominative: "datel", english: "Woodpecker", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "datel", gen: "datla", dat: "datlovi", acc: "datla", voc: "datle", loc: "datlovi", inst: "datlem" }, plural: { nom: "datli", gen: "datlů", dat: "datlům", acc: "datly", voc: "datli", loc: "datlech", inst: "datly" } }
        },
        {
          id: "kukacka", approved: false, nominative: "kukačka", english: "Cuckoo", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1518992028580-6d57bd80f2dd?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "kukačka", gen: "kukačky", dat: "kukačce", acc: "kukačku", voc: "kukačko", loc: "kukačce", inst: "kukačkou" }, plural: { nom: "kukačky", gen: "kukaček", dat: "kukačkám", acc: "kukačky", voc: "kukačky", loc: "kukačkách", inst: "kukačkami" } }
        },
        {
          id: "krab", approved: false, nominative: "krab", english: "Crab", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "krab", gen: "kraba", dat: "krabovi", acc: "kraba", voc: "krabe", loc: "krabovi", inst: "krabem" }, plural: { nom: "krabi", gen: "krabů", dat: "krabům", acc: "kraby", voc: "krabi", loc: "krabech", inst: "kraby" } }
        },
        {
          id: "humr", approved: false, nominative: "humr", english: "Lobster", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "humr", gen: "humra", dat: "humrovi", acc: "humra", voc: "humře", loc: "humrovi", inst: "humrem" }, plural: { nom: "humři", gen: "humrů", dat: "humrům", acc: "humry", voc: "humři", loc: "humrech", inst: "humry" } }
        },
        {
          id: "snek", approved: false, nominative: "šnek", english: "Snail", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "šnek", gen: "šneka", dat: "šnekovi", acc: "šneka", voc: "šneku", loc: "šnekovi", inst: "šnekem" }, plural: { nom: "šneci", gen: "šneků", dat: "šnekům", acc: "šneky", voc: "šneci", loc: "šnecích", inst: "šneky" } }
        },
        {
          id: "zizala", approved: false, nominative: "žížala", english: "Earthworm", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "žížala", gen: "žížaly", dat: "žížale", acc: "žížalu", voc: "žížalo", loc: "žížale", inst: "žížalou" }, plural: { nom: "žížaly", gen: "žížal", dat: "žížalám", acc: "žížaly", voc: "žížaly", loc: "žížalách", inst: "žížalami" } }
        },
        {
          id: "vcela", approved: false, nominative: "včela", english: "Bee", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "včela", gen: "včely", dat: "včele", acc: "včelu", voc: "včelo", loc: "včele", inst: "včelou" }, plural: { nom: "včely", gen: "včel", dat: "včelám", acc: "včely", voc: "včely", loc: "včelách", inst: "včelami" } }
        },
        {
          id: "mravenec", approved: false, nominative: "mravenec", english: "Ant", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "mravenec", gen: "mravence", dat: "mravencovi", acc: "mravence", voc: "mravenče", loc: "mravencovi", inst: "mravencem" }, plural: { nom: "mravenci", gen: "mravenců", dat: "mravencům", acc: "mravence", voc: "mravenci", loc: "mravencích", inst: "mravenci" } }
        },
        {
          id: "pavouk", approved: false, nominative: "pavouk", english: "Spider", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1520301251406-844222f7f9aa?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "pavouk", gen: "pavouka", dat: "pavoukovi", acc: "pavouka", voc: "pavouku", loc: "pavoukovi", inst: "pavoukem" }, plural: { nom: "pavouci", gen: "pavouků", dat: "pavoukům", acc: "pavouky", voc: "pavouci", loc: "pavoucích", inst: "pavouky" } }
        },
        {
          id: "moucha", approved: false, nominative: "moucha", english: "Fly", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "moucha", gen: "mouchy", dat: "mouše", acc: "mouchu", voc: "moucho", loc: "mouše", inst: "mouchou" }, plural: { nom: "mouchy", gen: "mouch", dat: "mouchám", acc: "mouchy", voc: "mouchy", loc: "mouchách", inst: "mouchami" } }
        },
        {
          id: "motyl", approved: false, nominative: "motýl", english: "Butterfly", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "motýl", gen: "motýla", dat: "motýlovi", acc: "motýla", voc: "motýle", loc: "motýlovi", inst: "motýlem" }, plural: { nom: "motýli", gen: "motýlů", dat: "motýlům", acc: "motýly", voc: "motýli", loc: "motýlech", inst: "motýly" } }
        },
        {
          id: "blecha", approved: false, nominative: "blecha", english: "Flea", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "blecha", gen: "blechy", dat: "bleše", acc: "blechu", voc: "blecho", loc: "bleše", inst: "blechou" }, plural: { nom: "blechy", gen: "blech", dat: "blechám", acc: "blechy", voc: "blechy", loc: "blechách", inst: "blechami" } }
        },
        {
          id: "zelva", approved: false, nominative: "želva", english: "Turtle", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "želva", gen: "želvy", dat: "želvě", acc: "želvu", voc: "želvo", loc: "želvě", inst: "želvou" }, plural: { nom: "želvy", gen: "želv", dat: "želvám", acc: "želvy", voc: "želvy", loc: "želvách", inst: "želvami" } }
        }
      ]
    },
    4: {
      name: "B2 – Vyšší střední",
      icon: "🦅",
      animals: [
        {
          id: "chobotnice", approved: false, nominative: "chobotnice", english: "Octopus", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "chobotnice", gen: "chobotnice", dat: "chobotnici", acc: "chobotnici", voc: "chobotnice", loc: "chobotnici", inst: "chobotnicí" }, plural: { nom: "chobotnice", gen: "chobotnic", dat: "chobotnicím", acc: "chobotnice", voc: "chobotnice", loc: "chobotnicích", inst: "chobotnicemi" } }
        },
        {
          id: "meduza", approved: false, nominative: "medúza", english: "Jellyfish", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "medúza", gen: "medúzy", dat: "medúze", acc: "medúzu", voc: "medúzo", loc: "medúze", inst: "medúzou" }, plural: { nom: "medúzy", gen: "medúz", dat: "medúzám", acc: "medúzy", voc: "medúzy", loc: "medúzách", inst: "medúzami" } }
        },
        {
          id: "rejnok", approved: false, nominative: "rejnok", english: "Stingray", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "rejnok", gen: "rejnoka", dat: "rejnokovi", acc: "rejnoka", voc: "rejnoku", loc: "rejnokovi", inst: "rejnokem" }, plural: { nom: "rejnoci", gen: "rejnoků", dat: "rejnokům", acc: "rejnoky", voc: "rejnoci", loc: "rejnocích", inst: "rejnoky" } }
        },
        {
          id: "zmije", approved: false, nominative: "zmije", english: "Viper", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "zmije", gen: "zmije", dat: "zmiji", acc: "zmiji", voc: "zmije", loc: "zmiji", inst: "zmijí" }, plural: { nom: "zmije", gen: "zmijí", dat: "zmijím", acc: "zmije", voc: "zmije", loc: "zmijích", inst: "zmijemi" } }
        },
        {
          id: "mlok", approved: false, nominative: "mlok", english: "Salamander", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1559253664-ca249d4608c6?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "mlok", gen: "mloka", dat: "mlokovi", acc: "mloka", voc: "mloku", loc: "mlokovi", inst: "mlokem" }, plural: { nom: "mloci", gen: "mloků", dat: "mlokům", acc: "mloky", voc: "mloci", loc: "mlocích", inst: "mloky" } }
        },
        {
          id: "colek", approved: false, nominative: "čolek", english: "Newt", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1559253664-ca249d4608c6?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "čolek", gen: "čolka", dat: "čolkovi", acc: "čolka", voc: "čolku", loc: "čolkovi", inst: "čolkem" }, plural: { nom: "čolci", gen: "čolků", dat: "čolkům", acc: "čolky", voc: "čolci", loc: "čolcích", inst: "čolky" } }
        },
        {
          id: "svetluska", approved: false, nominative: "světluška", english: "Firefly", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "světluška", gen: "světlušky", dat: "světlušce", acc: "světlušku", voc: "světluško", loc: "světlušce", inst: "světluškou" }, plural: { nom: "světlušky", gen: "světlušek", dat: "světluškám", acc: "světlušky", voc: "světlušky", loc: "světluškách", inst: "světluškami" } }
        },
        {
          id: "lednacek", approved: false, nominative: "ledňáček", english: "Kingfisher", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1518992028580-6d57bd80f2dd?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "ledňáček", gen: "ledňáčka", dat: "ledňáčkovi", acc: "ledňáčka", voc: "ledňáčku", loc: "ledňáčkovi", inst: "ledňáčkem" }, plural: { nom: "ledňáčci", gen: "ledňáčků", dat: "ledňáčkům", acc: "ledňáčky", voc: "ledňáčci", loc: "ledňáčcích", inst: "ledňáčky" } }
        },
        {
          id: "bazant", approved: false, nominative: "bažant", english: "Pheasant", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1518992028580-6d57bd80f2dd?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "bažant", gen: "bažanta", dat: "bažantovi", acc: "bažanta", voc: "bažante", loc: "bažantovi", inst: "bažantem" }, plural: { nom: "bažanti", gen: "bažantů", dat: "bažantům", acc: "bažanty", voc: "bažanti", loc: "bažantech", inst: "bažanty" } }
        },
        {
          id: "cap", approved: false, nominative: "čáp", english: "Stork", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "čáp", gen: "čápa", dat: "čápovi", acc: "čápa", voc: "čápe", loc: "čápovi", inst: "čápem" }, plural: { nom: "čápi", gen: "čápů", dat: "čápům", acc: "čápy", voc: "čápi", loc: "čápech", inst: "čápy" } }
        },
        {
          id: "vlastovka", approved: false, nominative: "vlaštovka", english: "Swallow", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "vlaštovka", gen: "vlaštovky", dat: "vlaštovce", acc: "vlaštovku", voc: "vlaštovko", loc: "vlaštovce", inst: "vlaštovkou" }, plural: { nom: "vlaštovky", gen: "vlaštovek", dat: "vlaštovkám", acc: "vlaštovky", voc: "vlaštovky", loc: "vlaštovkách", inst: "vlaštovkami" } }
        },
        {
          id: "vrana", approved: false, nominative: "vrána", english: "Crow", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "vrána", gen: "vrány", dat: "vráně", acc: "vránu", voc: "vráno", loc: "vráně", inst: "vránou" }, plural: { nom: "vrány", gen: "vran", dat: "vránám", acc: "vrány", voc: "vrány", loc: "vránách", inst: "vranami" } }
        },
        {
          id: "havran", approved: false, nominative: "havran", english: "Raven", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "havran", gen: "havrana", dat: "havranovi", acc: "havrana", voc: "havrane", loc: "havranovi", inst: "havranem" }, plural: { nom: "havrani", gen: "havranů", dat: "havranům", acc: "havrany", voc: "havrani", loc: "havranech", inst: "havrany" } }
        },
        {
          id: "pstros", approved: false, nominative: "pštros", english: "Ostrich", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1518992028580-6d57bd80f2dd?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "pštros", gen: "pštrosa", dat: "pštrosovi", acc: "pštrosa", voc: "pštrose", loc: "pštrosovi", inst: "pštrosem" }, plural: { nom: "pštrosi", gen: "pštrosů", dat: "pštrosům", acc: "pštrosy", voc: "pštrosi", loc: "pštrosech", inst: "pštrosy" } }
        },
        {
          id: "sup", approved: false, nominative: "sup", english: "Vulture", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "sup", gen: "supa", dat: "supovi", acc: "supa", voc: "supe", loc: "supovi", inst: "supem" }, plural: { nom: "supi", gen: "supů", dat: "supům", acc: "supy", voc: "supi", loc: "supech", inst: "supy" } }
        },
        {
          id: "jesterka", approved: false, nominative: "ještěrka", english: "Lizard", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "ještěrka", gen: "ještěrky", dat: "ještěrce", acc: "ještěrku", voc: "ještěrko", loc: "ještěrce", inst: "ještěrkou" }, plural: { nom: "ještěrky", gen: "ještěrek", dat: "ještěrkám", acc: "ještěrky", voc: "ještěrky", loc: "ještěrkách", inst: "ještěrkami" } }
        },
        {
          id: "hyena", approved: false, nominative: "hyena", english: "Hyena", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "hyena", gen: "hyeny", dat: "hyeně", acc: "hyenu", voc: "hyeno", loc: "hyeně", inst: "hyenou" }, plural: { nom: "hyeny", gen: "hyen", dat: "hyenám", acc: "hyeny", voc: "hyeny", loc: "hyenách", inst: "hyenami" } }
        },
        {
          id: "puma", approved: false, nominative: "puma", english: "Puma", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "puma", gen: "pumy", dat: "pumě", acc: "pumu", voc: "pumo", loc: "pumě", inst: "pumou" }, plural: { nom: "pumy", gen: "pum", dat: "pumám", acc: "pumy", voc: "pumy", loc: "pumách", inst: "pumami" } }
        },
        {
          id: "jaguar", approved: false, nominative: "jaguár", english: "Jaguar", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "jaguár", gen: "jaguára", dat: "jaguárovi", acc: "jaguára", voc: "jaguáre", loc: "jaguárovi", inst: "jaguárem" }, plural: { nom: "jaguáři", gen: "jaguárů", dat: "jaguárům", acc: "jaguáry", voc: "jaguáři", loc: "jaguárech", inst: "jaguáry" } }
        }
      ]
    },
    5: {
      name: "C1 – Pokročilý",
      icon: "👑",
      animals: [
        {
          id: "kamzik", approved: false, nominative: "kamzík", english: "Chamois", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "kamzík", gen: "kamzíka", dat: "kamzíkovi", acc: "kamzíka", voc: "kamzíku", loc: "kamzíkovi", inst: "kamzíkem" }, plural: { nom: "kamzíci", gen: "kamzíků", dat: "kamzíkům", acc: "kamzíky", voc: "kamzíci", loc: "kamzících", inst: "kamzíky" } }
        },
        {
          id: "jestrab", approved: false, nominative: "jestřáb", english: "Hawk", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "jestřáb", gen: "jestřába", dat: "jestřábovi", acc: "jestřába", voc: "jestřábe", loc: "jestřábovi", inst: "jestřábem" }, plural: { nom: "jestřábi", gen: "jestřábů", dat: "jestřábům", acc: "jestřáby", voc: "jestřábi", loc: "jestřábech", inst: "jestřáby" } }
        },
        {
          id: "sokol", approved: false, nominative: "sokol", english: "Falcon", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "sokol", gen: "sokola", dat: "sokolovi", acc: "sokola", voc: "sokole", loc: "sokolovi", inst: "sokolem" }, plural: { nom: "sokoli", gen: "sokolů", dat: "sokolům", acc: "sokoly", voc: "sokoli", loc: "sokolech", inst: "sokoly" } }
        },
        {
          id: "slephys", approved: false, nominative: "slepýš", english: "Slow worm", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "slepýš", gen: "slepýše", dat: "slepýšovi", acc: "slepýše", voc: "slepýši", loc: "slepýšovi", inst: "slepýšem" }, plural: { nom: "slepýši", gen: "slepýšů", dat: "slepýšům", acc: "slepýše", voc: "slepýši", loc: "slepýších", inst: "slepýši" } }
        },
        {
          id: "tetrev", approved: false, nominative: "tetřev", english: "Capercaillie", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1518992028580-6d57bd80f2dd?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "tetřev", gen: "tetřeva", dat: "tetřevovi", acc: "tetřeva", voc: "tetřeve", loc: "tetřevovi", inst: "tetřevem" }, plural: { nom: "tetřevi", gen: "tetřevů", dat: "tetřevům", acc: "tetřevy", voc: "tetřevi", loc: "tetřevech", inst: "tetřevy" } }
        },
        {
          id: "svinucha", approved: false, nominative: "sviňucha", english: "Porpoise", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "sviňucha", gen: "sviňuchy", dat: "sviňuše", acc: "sviňuchu", voc: "sviňucho", loc: "sviňuše", inst: "sviňuchou" }, plural: { nom: "sviňuchy", gen: "sviňuch", dat: "sviňuchám", acc: "sviňuchy", voc: "sviňuchy", loc: "sviňuchách", inst: "sviňuchami" } }
        },
        {
          id: "vosa", approved: false, nominative: "vosa", english: "Wasp", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "vosa", gen: "vosy", dat: "vose", acc: "vosu", voc: "voso", loc: "vose", inst: "vosou" }, plural: { nom: "vosy", gen: "vos", dat: "vosám", acc: "vosy", voc: "vosy", loc: "vosách", inst: "vosami" } }
        },
        {
          id: "srsen", approved: false, nominative: "sršeň", english: "Hornet", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "sršeň", gen: "sršně", dat: "sršňovi", acc: "sršně", voc: "sršni", loc: "sršňovi", inst: "sršněm" }, plural: { nom: "sršni", gen: "sršňů", dat: "sršňům", acc: "sršně", voc: "sršni", loc: "sršních", inst: "sršni" } }
        },
        {
          id: "kliste", approved: false, nominative: "klíště", english: "Tick", gender: "N", symbol: "", color: "text-amber-400",
          image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "klíště", gen: "klíštěte", dat: "klíštěti", acc: "klíště", voc: "klíště", loc: "klíštěti", inst: "klíštětem" }, plural: { nom: "klíšťata", gen: "klíšťat", dat: "klíšťatům", acc: "klíšťata", voc: "klíšťata", loc: "klíšťatech", inst: "klíšťaty" } }
        },
        {
          id: "stonozka", approved: false, nominative: "stonožka", english: "Centipede", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "stonožka", gen: "stonožky", dat: "stonožce", acc: "stonožku", voc: "stonožko", loc: "stonožce", inst: "stonožkou" }, plural: { nom: "stonožky", gen: "stonožek", dat: "stonožkám", acc: "stonožky", voc: "stonožky", loc: "stonožkách", inst: "stonožkami" } }
        }
      ]
    },
    6: {
      name: "C2 – Mistr / Exotika",
      icon: "🐉",
      animals: [
        {
          id: "rosnicka", approved: false, nominative: "rosnička", english: "Tree frog", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1559253664-ca249d4608c6?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "rosnička", gen: "rosničky", dat: "rosničce", acc: "rosničku", voc: "rosničko", loc: "rosničce", inst: "rosničkou" }, plural: { nom: "rosničky", gen: "rosniček", dat: "rosničkám", acc: "rosničky", voc: "rosničky", loc: "rosničkách", inst: "rosničkami" } }
        },
        {
          id: "manta", approved: false, nominative: "manta", english: "Manta ray", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "manta", gen: "manty", dat: "mantě", acc: "mantu", voc: "manto", loc: "mantě", inst: "mantou" }, plural: { nom: "manty", gen: "mant", dat: "mantám", acc: "manty", voc: "manty", loc: "mantách", inst: "mantami" } }
        },
        {
          id: "koroptev", approved: false, nominative: "koroptev", english: "Partridge", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1518992028580-6d57bd80f2dd?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "koroptev", gen: "koroptve", dat: "koroptvi", acc: "koroptev", voc: "koroptvi", loc: "koroptvi", inst: "koroptví" }, plural: { nom: "koroptve", gen: "koroptví", dat: "koroptvím", acc: "koroptve", voc: "koroptve", loc: "koroptvích", inst: "koroptvemi" } }
        },
        {
          id: "korela", approved: false, nominative: "korela", english: "Cockatiel", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "korela", gen: "korely", dat: "korele", acc: "korelu", voc: "korelo", loc: "korele", inst: "korelou" }, plural: { nom: "korely", gen: "korel", dat: "korelám", acc: "korely", voc: "korely", loc: "korelách", inst: "korelami" } }
        },
        {
          id: "sasanka", approved: false, nominative: "sasanka", english: "Sea anemone", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "sasanka", gen: "sasanky", dat: "sasance", acc: "sasanku", voc: "sasanko", loc: "sasance", inst: "sasankou" }, plural: { nom: "sasanky", gen: "sasanek", dat: "sasankám", acc: "sasanky", voc: "sasanky", loc: "sasankách", inst: "sasankách" } }
        },
        {
          id: "lumik", approved: false, nominative: "lumík", english: "Lemming", gender: "M_ANIM", symbol: "♂", color: "text-blue-400",
          image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "lumík", gen: "lumíka", dat: "lumíkovi", acc: "lumíka", voc: "lumíku", loc: "lumíkovi", inst: "lumíkem" }, plural: { nom: "lumíci", gen: "lumíků", dat: "lumíkům", acc: "lumíky", voc: "lumíci", loc: "lumících", inst: "lumíky" } }
        },
        {
          id: "mandelinka", approved: false, nominative: "mandelinka", english: "Potato beetle", gender: "F", symbol: "♀", color: "text-rose-400",
          image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80",
          declension: { singular: { nom: "mandelinka", gen: "mandelinky", dat: "mandelince", acc: "mandelinku", voc: "mandelinko", loc: "mandelince", inst: "mandelinkou" }, plural: { nom: "mandelinky", gen: "mandelinek", dat: "mandelinkám", acc: "mandelinky", voc: "mandelinky", loc: "mandelinkách", inst: "mandelinkami" } }
        }
      ]
    }
  }
};

window.getAnimalsForLevel = function(targetLevel, cumulative = false) {
  let list = [];
  const levels = window.ANIMAL_DATABASE.levels;
  if (cumulative) {
    for (let i = 1; i <= targetLevel; i++) {
      if (levels[i]) {
        // Filter out animals that are not approved
        const approvedAnimals = levels[i].animals.filter(a => a.approved === true);
        list = list.concat(approvedAnimals);
      }
    }
  } else {
    if (levels[targetLevel]) {
      list = levels[targetLevel].animals.filter(a => a.approved === true);
    }
  }
  return list.length ? list : levels[1].animals.filter(a => a.approved === true);
};

window.generateAnimalQuestion = function(userLevel) {
  const pool = window.getAnimalsForLevel(userLevel, true);
  const selectedAnimal = pool[Math.floor(Math.random() * pool.length)];

  const templates = window.ANIMAL_DATABASE.verbTemplates;
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];

  const isPlural = Math.random() < 0.2;
  const numberKey = isPlural ? "plural" : "singular";
  const targetCaseKey = selectedTemplate.caseKey;
  
  const correctTarget = selectedAnimal.declension[numberKey][targetCaseKey];
  const sentenceTemplate = selectedTemplate.buildSentence(selectedAnimal, correctTarget, isPlural);
  const fullCorrectSentence = sentenceTemplate.replace("[___]", correctTarget);

  let distractor = selectedAnimal.nominative;
  if (distractor.toLowerCase() === correctTarget.toLowerCase()) {
    distractor = selectedAnimal.declension.singular.inst;
  }

  const optionSet = new Set();
  optionSet.add(correctTarget);
  Object.values(selectedAnimal.declension.singular).forEach(v => optionSet.add(v));
  Object.values(selectedAnimal.declension.plural).forEach(v => optionSet.add(v));

  let finalOptions = Array.from(optionSet).slice(0, 4);
  finalOptions.sort(() => Math.random() - 0.5);

  return {
    animal: selectedAnimal,
    template: selectedTemplate,
    isPlural: isPlural,
    sentenceTemplate: sentenceTemplate,
    fullCorrectSentence: fullCorrectSentence,
    correctTarget: correctTarget,
    distractor: distractor,
    options: finalOptions
  };
};