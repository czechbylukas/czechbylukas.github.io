// data.js
export const gameState = {
    isLoggedIn: false,
    language: "en",

    // ROBUSNÍ SLOVNÍK (Infinitiv + komplet 6 osob pro každé sloveso)
    data: [
        // 1. čekat
        { cs: "čekat", en: "to wait", type: "verb", person: "infinitive" },
        { cs: "čekám", en: "I wait", type: "verb", person: "já" },
        { cs: "čekáš", en: "You wait", type: "verb", person: "ty" },
        { cs: "čeká", en: "He/She waits", type: "verb", person: "on/ona" },
        { cs: "čekáme", en: "We wait", type: "verb", person: "my" },
        { cs: "čekáte", en: "You (pl.) wait", type: "verb", person: "vy" },
        { cs: "čekají", en: "They wait", type: "verb", person: "oni" },

        // 2. stěžovat si
        { cs: "stěžovat si", en: "to complain", type: "verb", person: "infinitive" },
        { cs: "stěžuji si", en: "I complain", synonym: "stěžuju si", type: "verb", person: "já" },
        { cs: "stěžuješ si", en: "You complain", type: "verb", person: "ty" },
        { cs: "stěžuje si", en: "He/She complains", type: "verb", person: "on/ona" },
        { cs: "stěžujeme si", en: "We complain", type: "verb", person: "my" },
        { cs: "stěžujete si", en: "You (pl.) complain", type: "verb", person: "vy" },
        { cs: "stěžují si", en: "They complain", synonym: "stěžujou si", type: "verb", person: "oni" },

        // 3. předpokládat
        { cs: "předpokládat", en: "to assume", type: "verb", person: "infinitive" },
        { cs: "předpokládám", en: "I assume", type: "verb", person: "já" },
        { cs: "předpokládáš", en: "You assume", type: "verb", person: "ty" },
        { cs: "předpokládá", en: "He/She assumes", type: "verb", person: "on/ona" },
        { cs: "předpokládáme", en: "We assume", type: "verb", person: "my" },
        { cs: "předpokládáte", en: "You (pl.) assume", type: "verb", person: "vy" },
        { cs: "předpokládají", en: "They assume", type: "verb", person: "oni" },

        // 4. doporučovat
        { cs: "doporučovat", en: "to recommend", type: "verb", person: "infinitive" },
        { cs: "doporučuji", en: "I recommend", synonym: "doporučuju", type: "verb", person: "já" },
        { cs: "doporučuješ", en: "You recommend", type: "verb", person: "ty" },
        { cs: "doporučuje", en: "He/She recommends", type: "verb", person: "on/ona" },
        { cs: "doporučujeme", en: "We recommend", type: "verb", person: "my" },
        { cs: "doporučujete", en: "You (pl.) recommend", type: "verb", person: "vy" },
        { cs: "doporučují", en: "They recommend", synonym: "doporučujou", type: "verb", person: "oni" },

        // 5. vyřizovat
        { cs: "vyřizovat", en: "to handle / settle", type: "verb", person: "infinitive" },
        { cs: "vyřizuji", en: "I handle", synonym: "vyřizuju", type: "verb", person: "já" },
        { cs: "vyřizuješ", en: "You handle", type: "verb", person: "ty" },
        { cs: "vyřizuje", en: "He/She handles", type: "verb", person: "on/ona" },
        { cs: "vyřizujeme", en: "We handle", type: "verb", person: "my" },
        { cs: "vyřizujete", en: "You (pl.) handle", type: "verb", person: "vy" },
        { cs: "vyřizují", en: "They handle", synonym: "vyřizujou", type: "verb", person: "oni" },

        // 6. spoléhat na
        { cs: "spoléhat na", en: "to rely on", type: "verb", person: "infinitive" },
        { cs: "spoléhám na", en: "I rely on", type: "verb", person: "já" },
        { cs: "spoléháš na", en: "You rely on", type: "verb", person: "ty" },
        { cs: "spoléhá na", en: "He/She relies on", type: "verb", person: "on/ona" },
        { cs: "spoléháme na", en: "We rely on", type: "verb", person: "my" },
        { cs: "spoléháte na", en: "You (pl.) rely on", type: "verb", person: "vy" },
        { cs: "spoléhají na", en: "They rely on", type: "verb", person: "oni" },

        // 7. zúčastňovat se
        { cs: "zúčastňovat se", en: "to take part in", type: "verb", person: "infinitive" },
        { cs: "zúčastňuji se", en: "I take part", synonym: "zúčastňuju se", type: "verb", person: "já" },
        { cs: "zúčastňuješ se", en: "You take part", type: "verb", person: "ty" },
        { cs: "zúčastňuje se", en: "He/She takes part", type: "verb", person: "on/ona" },
        { cs: "zúčastňujeme se", en: "We take part", type: "verb", person: "my" },
        { cs: "zúčastňujete se", en: "You (pl.) take part", type: "verb", person: "vy" },
        { cs: "zúčastňují se", en: "They take part", synonym: "zúčastňujou se", type: "verb", person: "oni" },

        // 8. souhlasit / nesouhlasit
        { cs: "souhlasit", en: "to agree", type: "verb", person: "infinitive" },
        { cs: "souhlasím", en: "I agree", type: "verb", person: "já" },
        { cs: "souhlasíš", en: "You agree", type: "verb", person: "ty" },
        { cs: "souhlasí", en: "He/She agrees", type: "verb", person: "on/ona" },
        { cs: "souhlasíme", en: "We agree", type: "verb", person: "my" },
        { cs: "souhlasíte", en: "You (pl.) agree", type: "verb", person: "vy" },
        { cs: "souhlasí", en: "They agree", type: "verb", person: "oni" },

        // 9. ucházet se
        { cs: "ucházet se", en: "to apply for", type: "verb", person: "infinitive" },
        { cs: "ucházím se", en: "I apply", type: "verb", person: "já" },
        { cs: "ucházíš se", en: "You apply", type: "verb", person: "ty" },
        { cs: "uchází se", en: "He/She applies", type: "verb", person: "on/ona" },
        { cs: "ucházíme se", en: "We apply", type: "verb", person: "my" },
        { cs: "ucházíte se", en: "You (pl.) apply", type: "verb", person: "vy" },
        { cs: "ucházejí se", en: "They apply", synonym: "uchází se", type: "verb", person: "oni" },

        // 10. starat se
        { cs: "starat se", en: "to take care of", type: "verb", person: "infinitive" },
        { cs: "starám se", en: "I take care", type: "verb", person: "já" },
        { cs: "staráš se", en: "You take care", type: "verb", person: "ty" },
        { cs: "stará se", en: "He/She takes care", type: "verb", person: "on/ona" },
        { cs: "staráme se", en: "We take care", type: "verb", person: "my" },
        { cs: "staráte se", en: "You (pl.) take care", type: "verb", person: "vy" },
        { cs: "starají se", en: "They take care", type: "verb", person: "oni" },

        // 11. vyžadovat
        { cs: "vyžadovat", en: "to require", type: "verb", person: "infinitive" },
        { cs: "vyžaduji", en: "I require", synonym: "vyžaduju", type: "verb", person: "já" },
        { cs: "vyžaduješ", en: "You require", type: "verb", person: "ty" },
        { cs: "vyžaduje", en: "It/He/She requires", type: "verb", person: "on/ona" },
        { cs: "vyžadujeme", en: "We require", type: "verb", person: "my" },
        { cs: "vyžadujete", en: "You (pl.) require", type: "verb", person: "vy" },
        { cs: "vyžadují", en: "They require", synonym: "vyžadujou", type: "verb", person: "oni" },

        // 12. vážit si
        { cs: "vážit si", en: "to value / appreciate", type: "verb", person: "infinitive" },
        { cs: "vážím si", en: "I appreciate", type: "verb", person: "já" },
        { cs: "vážíš si", en: "You appreciate", type: "verb", person: "ty" },
        { cs: "váží si", en: "He/She appreciates", type: "verb", person: "on/ona" },
        { cs: "vážíme si", en: "We appreciate", type: "verb", person: "my" },
        { cs: "vážíte si", en: "You (pl.) appreciate", type: "verb", person: "vy" },
        { cs: "váží si", en: "They appreciate", type: "verb", person: "oni" },

        // 13. váhat
        { cs: "váhat", en: "to hesitate", type: "verb", person: "infinitive" },
        { cs: "váhám", en: "I hesitate", type: "verb", person: "já" },
        { cs: "váháš", en: "You hesitate", type: "verb", person: "ty" },
        { cs: "váhá", en: "He/She hesitates", type: "verb", person: "on/ona" },
        { cs: "váháme", en: "We hesitate", type: "verb", person: "my" },
        { cs: "váháte", en: "You (pl.) hesitate", type: "verb", person: "vy" },
        { cs: "váhají", en: "They hesitate", type: "verb", person: "oni" },

        // 14. nabízet
        { cs: "nabízet", en: "to offer", type: "verb", person: "infinitive" },
        { cs: "nabízím", en: "I offer", type: "verb", person: "já" },
        { cs: "nabízíš", en: "You offer", type: "verb", person: "ty" },
        { cs: "nabízí", en: "He/She offers", type: "verb", person: "on/ona" },
        { cs: "nabízíme", en: "We offer", type: "verb", person: "my" },
        { cs: "nabízíte", en: "You (pl.) offer", type: "verb", person: "vy" },
        { cs: "nabízejí", en: "They offer", synonym: "nabízí", type: "verb", person: "oni" },

        // 15. vzpomínat
        { cs: "vzpomínat", en: "to recall / reminisce", type: "verb", person: "infinitive" },
        { cs: "vzpomínám", en: "I recall", type: "verb", person: "já" },
        { cs: "vzpomínáš", en: "You recall", type: "verb", person: "ty" },
        { cs: "vzpomíná", en: "He/She recalls", type: "verb", person: "on/ona" },
        { cs: "vzpomínáme", en: "We recall", type: "verb", person: "my" },
        { cs: "vzpomínáte", en: "You (pl.) recall", type: "verb", person: "vy" },
        { cs: "vzpomínají", en: "They recall", type: "verb", person: "oni" },

        // 16. projednávat
        { cs: "projednávat", en: "to discuss / negotiate", type: "verb", person: "infinitive" },
        { cs: "projednávám", en: "I discuss", type: "verb", person: "já" },
        { cs: "projednáváš", en: "You discuss", type: "verb", person: "ty" },
        { cs: "projednává", en: "He/She discusses", type: "verb", person: "on/ona" },
        { cs: "projednáváme", en: "We discuss", type: "verb", person: "my" },
        { cs: "projednáváte", en: "You (pl.) discuss", type: "verb", person: "vy" },
        { cs: "projednávají", en: "They discuss", type: "verb", person: "oni" },

        // 17. povídat si
        { cs: "povídat si", en: "to chat", type: "verb", person: "infinitive" },
        { cs: "povídám si", en: "I chat", type: "verb", person: "já" },
        { cs: "povídáš si", en: "You chat", type: "verb", person: "ty" },
        { cs: "povídá si", en: "He/She chats", type: "verb", person: "on/ona" },
        { cs: "povídáme si", en: "We chat", type: "verb", person: "my" },
        { cs: "povídáte si", en: "You (pl.) chat", type: "verb", person: "vy" },
        { cs: "povídají si", en: "They chat", type: "verb", person: "oni" },

        // 18. zvyšovat
        { cs: "zvyšovat", en: "to increase", type: "verb", person: "infinitive" },
        { cs: "zvyšuji", en: "I increase", synonym: "zvyšuju", type: "verb", person: "já" },
        { cs: "zvyšuješ", en: "You increase", type: "verb", person: "ty" },
        { cs: "zvyšuje", en: "It/He/She increases", type: "verb", person: "on/ona" },
        { cs: "zvyšujeme", en: "We increase", type: "verb", person: "my" },
        { cs: "zvyšujete", en: "You (pl.) increase", type: "verb", person: "vy" },
        { cs: "zvyšují", en: "They increase", synonym: "zvyšujou", type: "verb", person: "oni" },

        // 19. pochybovat
        { cs: "pochybovat", en: "to doubt", type: "verb", person: "infinitive" },
        { cs: "pochybuji", en: "I doubt", synonym: "pochybuju", type: "verb", person: "já" },
        { cs: "pochybuješ", en: "You doubt", type: "verb", person: "ty" },
        { cs: "pochybuje", en: "He/She doubts", type: "verb", person: "on/ona" },
        { cs: "pochybujeme", en: "We doubt", type: "verb", person: "my" },
        { cs: "pochybujete", en: "You (pl.) doubt", type: "verb", person: "vy" },
        { cs: "pochybují", en: "They doubt", synonym: "pochybujou", type: "verb", person: "oni" },

        // 20. vysvětlovat
        { cs: "vysvětlovat", en: "to explain", type: "verb", person: "infinitive" },
        { cs: "vysvětluji", en: "I explain", synonym: "vysvětluju", type: "verb", person: "já" },
        { cs: "vysvětluješ", en: "You explain", type: "verb", person: "ty" },
        { cs: "vysvětluje", en: "He/She explains", type: "verb", person: "on/ona" },
        { cs: "vysvětlujeme", en: "We explain", type: "verb", person: "my" },
        { cs: "vysvětlujete", en: "You (pl.) explain", type: "verb", person: "vy" },
        { cs: "vysvětlují", en: "They explain", synonym: "vysvětlujou", type: "verb", person: "oni" },

        // 21. připravovat se
        { cs: "připravovat se", en: "to prepare oneself", type: "verb", person: "infinitive" },
        { cs: "připravuji se", en: "I prepare", synonym: "připravuju se", type: "verb", person: "já" },
        { cs: "připravuješ se", en: "You prepare", type: "verb", person: "ty" },
        { cs: "připravuje se", en: "He/She prepares", type: "verb", person: "on/ona" },
        { cs: "připravujeme se", en: "We prepare", type: "verb", person: "my" },
        { cs: "připravujete se", en: "You (pl.) prepare", type: "verb", person: "vy" },
        { cs: "připravují se", en: "They prepare", synonym: "připravujou se", type: "verb", person: "oni" },

        // 22. zavádět
        { cs: "zavádět", en: "to introduce / implement", type: "verb", person: "infinitive" },
        { cs: "zavádím", en: "I introduce", type: "verb", person: "já" },
        { cs: "zavádíš", en: "You introduce", type: "verb", person: "ty" },
        { cs: "zavádí", en: "He/She introduces", type: "verb", person: "on/ona" },
        { cs: "zavádíme", en: "We introduce", type: "verb", person: "my" },
        { cs: "zavádíte", en: "You (pl.) introduce", type: "verb", person: "vy" },
        { cs: "zavádějí", en: "They introduce", synonym: "zavádí", type: "verb", person: "oni" },

        // 23. dít se
        { cs: "dít se", en: "to happen / take place", type: "verb", person: "infinitive" },
        { cs: "děje se", en: "It happens", type: "verb", person: "on/ona" },
        { cs: "dějí se", en: "They happen", synonym: "dějou se", type: "verb", person: "oni" },

        // 24. dodržovat
        { cs: "dodržovat", en: "to comply / abide by", type: "verb", person: "infinitive" },
        { cs: "dodržuji", en: "I abide", synonym: "dodržuju", type: "verb", person: "já" },
        { cs: "dodržuješ", en: "You abide", type: "verb", person: "ty" },
        { cs: "dodržuje", en: "He/She abides", type: "verb", person: "on/ona" },
        { cs: "dodržujeme", en: "We abide", type: "verb", person: "my" },
        { cs: "dodržujete", en: "You (pl.) abide", type: "verb", person: "vy" },
        { cs: "dodržují", en: "They abide", synonym: "dodržujou", type: "verb", person: "oni" },

        // 25. těšit se
        { cs: "těšit se", en: "to look forward to", type: "verb", person: "infinitive" },
        { cs: "těším se", en: "I look forward", type: "verb", person: "já" },
        { cs: "těšíš se", en: "You look forward", type: "verb", person: "ty" },
        { cs: "těší se", en: "He/She looks forward", type: "verb", person: "on/ona" },
        { cs: "těšíme se", en: "We look forward", type: "verb", person: "my" },
        { cs: "těšíte se", en: "You (pl.) look forward", type: "verb", person: "vy" },
        { cs: "těší se", en: "They look forward", synonym: "těší se (oni)", type: "verb", person: "oni" },

        // 26. sledovat
        { cs: "sledovat", en: "to watch / track", type: "verb", person: "infinitive" },
        { cs: "sleduji", en: "I watch", synonym: "sleduju", type: "verb", person: "já" },
        { cs: "sleduješ", en: "You watch", type: "verb", person: "ty" },
        { cs: "sleduje", en: "He/She watches", type: "verb", person: "on/ona" },
        { cs: "sledujeme", en: "We watch", type: "verb", person: "my" },
        { cs: "sledujete", en: "You (pl.) watch", type: "verb", person: "vy" },
        { cs: "sledují", en: "They watch", synonym: "sledujou", type: "verb", person: "oni" },

        // 27. ujasnit si
        { cs: "ujasnit si", en: "to clarify for oneself", type: "verb", person: "infinitive" },
        { cs: "ujasním si", en: "I clarify", type: "verb", person: "já" },
        { cs: "ujasníš si", en: "You clarify", type: "verb", person: "ty" },
        { cs: "ujasní si", en: "He/She clarifies", type: "verb", person: "on/ona" },
        { cs: "ujasníme si", en: "We clarify", type: "verb", person: "my" },
        { cs: "ujasníte si", en: "You (pl.) clarify", type: "verb", person: "vy" },
        { cs: "ujasní si", en: "They clarify", type: "verb", person: "oni" },

        // 28. vyhýbat se
        { cs: "vyhýbat se", en: "to avoid", type: "verb", person: "infinitive" },
        { cs: "vyhýbám se", en: "I avoid", type: "verb", person: "já" },
        { cs: "vyhýbáš se", en: "You avoid", type: "verb", person: "ty" },
        { cs: "vyhýbá se", en: "He/She avoids", type: "verb", person: "on/ona" },
        { cs: "vyhýbáme se", en: "We avoid", type: "verb", person: "my" },
        { cs: "vyhýbáte se", en: "You (pl.) avoid", type: "verb", person: "vy" },
        { cs: "vyhýbají se", en: "They avoid", type: "verb", person: "oni" },

        // 29. připravovat
        { cs: "připravovat", en: "to prepare (something)", type: "verb", person: "infinitive" },
        { cs: "připravuji", en: "I prepare", synonym: "připravuju", type: "verb", person: "já" },
        { cs: "připravuješ", en: "You prepare", type: "verb", person: "ty" },
        { cs: "připravuje", en: "He/She prepares", type: "verb", person: "on/ona" },
        { cs: "připravujeme", en: "We prepare", type: "verb", person: "my" },
        { cs: "připravujete", en: "You (pl.) prepare", type: "verb", person: "vy" },
        { cs: "připravují", en: "They prepare", synonym: "připravujou", type: "verb", person: "oni" },

        // 30. zajišťovat
        { cs: "zajišťovat", en: "to secure / ensure", type: "verb", person: "infinitive" },
        { cs: "zajišťuji", en: "I ensure", synonym: "zajišťuju", type: "verb", person: "já" },
        { cs: "zajišťuješ", en: "You ensure", type: "verb", person: "ty" },
        { cs: "zajišťuje", en: "He/She ensures", type: "verb", person: "on/ona" },
        { cs: "zajišťujeme", en: "We ensure", type: "verb", person: "my" },
        { cs: "zajišťujete", en: "You (pl.) ensure", type: "verb", person: "vy" },
        { cs: "zajišťují", en: "They ensure", synonym: "zajišťujou", type: "verb", person: "oni" },

        // 31. zvládat
        { cs: "zvládat", en: "to manage / master", type: "verb", person: "infinitive" },
        { cs: "zvládám", en: "I manage", type: "verb", person: "já" },
        { cs: "zvládáš", en: "You manage", type: "verb", person: "ty" },
        { cs: "zvládá", en: "He/She manages", type: "verb", person: "on/ona" },
        { cs: "zvládáme", en: "We manage", type: "verb", person: "my" },
        { cs: "zvládáte", en: "You (pl.) manage", type: "verb", person: "vy" },
        { cs: "zvládají", en: "They manage", type: "verb", person: "oni" },

        // 32. zlepšovat
        { cs: "zlepšovat", en: "to improve", type: "verb", person: "infinitive" },
        { cs: "zlepšuji", en: "I improve", synonym: "zlepšuju", type: "verb", person: "já" },
        { cs: "zlepšuješ", en: "You improve", type: "verb", person: "ty" },
        { cs: "zlepšuje", en: "It/He/She improves", type: "verb", person: "on/ona" },
        { cs: "zlepšujeme", en: "We improve", type: "verb", person: "my" },
        { cs: "zlepšujete", en: "You (pl.) improve", type: "verb", person: "vy" },
        { cs: "zlepšují", en: "They improve", synonym: "zlepšujou", type: "verb", person: "oni" },

        // 33. strachovat se
        { cs: "strachovat se", en: "to worry", type: "verb", person: "infinitive" },
        { cs: "strachuji se", en: "I worry", synonym: "strachuju se", type: "verb", person: "já" },
        { cs: "strachuješ se", en: "You worry", type: "verb", person: "ty" },
        { cs: "strachuje se", en: "He/She worries", type: "verb", person: "on/ona" },
        { cs: "strachujeme se", en: "We worry", type: "verb", person: "my" },
        { cs: "strachujete se", en: "You (pl.) worry", type: "verb", person: "vy" },
        { cs: "strachují se", en: "They worry", synonym: "strachujou se", type: "verb", person: "oni" },

        // 34. vyprávět
        { cs: "vyprávět", en: "to tell / narrate", type: "verb", person: "infinitive" },
        { cs: "vyprávím", en: "I tell", type: "verb", person: "já" },
        { cs: "vyprávíš", en: "You tell", type: "verb", person: "ty" },
        { cs: "vypráví", en: "He/She tells", type: "verb", person: "on/ona" },
        { cs: "vyprávíme", en: "We tell", type: "verb", person: "my" },
        { cs: "vyprávíte", en: "You (pl.) tell", type: "verb", person: "vy" },
        { cs: "vyprávějí", en: "They tell", synonym: "vypráví", type: "verb", person: "oni" },

        // 35. respektovat
        { cs: "respektovat", en: "to respect", type: "verb", person: "infinitive" },
        { cs: "respektuji", en: "I respect", synonym: "respektuju", type: "verb", person: "já" },
        { cs: "respektuješ", en: "You respect", type: "verb", person: "ty" },
        { cs: "respektuje", en: "He/She respects", type: "verb", person: "on/ona" },
        { cs: "respektujeme", en: "We respect", type: "verb", person: "my" },
        { cs: "respektujete", en: "You (pl.) respect", type: "verb", person: "vy" },
        { cs: "respektují", en: "They respect", synonym: "respektujou", type: "verb", person: "oni" },

        // 36. půjčovat si
        { cs: "půjčovat si", en: "to borrow", type: "verb", person: "infinitive" },
        { cs: "půjčuji si", en: "I borrow", synonym: "půjčuju si", type: "verb", person: "já" },
        { cs: "půjčuješ si", en: "You borrow", type: "verb", person: "ty" },
        { cs: "půjčuje si", en: "He/She borrows", type: "verb", person: "on/ona" },
        { cs: "půjčujeme si", en: "We borrow", type: "verb", person: "my" },
        { cs: "půjčujete si", en: "You (pl.) borrow", type: "verb", person: "vy" },
        { cs: "půjčují si", en: "They borrow", synonym: "půjčujou si", type: "verb", person: "oni" },

        // 37. poskytovat
        { cs: "poskytovat", en: "to provide", type: "verb", person: "infinitive" },
        { cs: "poskytuji", en: "I provide", synonym: "poskytuju", type: "verb", person: "já" },
        { cs: "poskytuješ", en: "You provide", type: "verb", person: "ty" },
        { cs: "poskytuje", en: "He/She provides", type: "verb", person: "on/ona" },
        { cs: "poskytujeme", en: "We provide", type: "verb", person: "my" },
        { cs: "poskytujete", en: "You (pl.) provide", type: "verb", person: "vy" },
        { cs: "poskytují", en: "They provide", synonym: "poskytujou", type: "verb", person: "oni" },

        // 38. orientovat se
        { cs: "orientovat se", en: "to navigate / orient oneself", type: "verb", person: "infinitive" },
        { cs: "orientuji se", en: "I navigate", synonym: "orientuju se", type: "verb", person: "já" },
        { cs: "orientuješ se", en: "You navigate", type: "verb", person: "ty" },
        { cs: "orientuje se", en: "He/She navigates", type: "verb", person: "on/ona" },
        { cs: "orientujeme se", en: "We navigate", type: "verb", person: "my" },
        { cs: "orientujete se", en: "You (pl.) navigate", type: "verb", person: "vy" },
        { cs: "orientují se", en: "They navigate", synonym: "orientujou se", type: "verb", person: "oni" },

        // 39. kreslit
        { cs: "kreslit", en: "to draw", type: "verb", person: "infinitive" },
        { cs: "kreslím", en: "I draw", type: "verb", person: "já" },
        { cs: "kreslíš", en: "You draw", type: "verb", person: "ty" },
        { cs: "kreslí", en: "He/She draws", type: "verb", person: "on/ona" },
        { cs: "kreslíme", en: "We draw", type: "verb", person: "my" },
        { cs: "kreslíte", en: "You (pl.) draw", type: "verb", person: "vy" },
        { cs: "kreslí", en: "They draw", type: "verb", person: "oni" },

        // 40. kupovat
        { cs: "kupovat", en: "to buy", type: "verb", person: "infinitive" },
        { cs: "kupuji", en: "I buy", synonym: "kupuju", type: "verb", person: "já" },
        { cs: "kupuješ", en: "You buy", type: "verb", person: "ty" },
        { cs: "kupuje", en: "He/She buys", type: "verb", person: "on/ona" },
        { cs: "kupujeme", en: "We buy", type: "verb", person: "my" },
        { cs: "kupujete", en: "You (pl.) buy", type: "verb", person: "vy" },
        { cs: "kupují", en: "They buy", synonym: "kupujou", type: "verb", person: "oni" },

        // 41. trávit
        { cs: "trávit", en: "to spend time", type: "verb", person: "infinitive" },
        { cs: "trávím", en: "I spend", type: "verb", person: "já" },
        { cs: "trávíš", en: "You spend", type: "verb", person: "ty" },
        { cs: "tráví", en: "He/She spends", type: "verb", person: "on/ona" },
        { cs: "trávíme", en: "We spend", type: "verb", person: "my" },
        { cs: "trávíte", en: "You (pl.) spend", type: "verb", person: "vy" },
        { cs: "tráví", en: "They spend", type: "verb", person: "oni" },

        // 42. popisovat
        { cs: "popisovat", en: "to describe", type: "verb", person: "infinitive" },
        { cs: "popisuji", en: "I describe", synonym: "popisuju", type: "verb", person: "já" },
        { cs: "popisuješ", en: "You describe", type: "verb", person: "ty" },
        { cs: "popisuje", en: "He/She describes", type: "verb", person: "on/ona" },
        { cs: "popisujeme", en: "We describe", type: "verb", person: "my" },
        { cs: "popisujete", en: "You (pl.) describe", type: "verb", person: "vy" },
        { cs: "popisují", en: "They describe", synonym: "popisujou", type: "verb", person: "oni" },

        // 43. řešit
        { cs: "řešit", en: "to solve / deal with", type: "verb", person: "infinitive" },
        { cs: "řeším", en: "I solve", type: "verb", person: "já" },
        { cs: "řešíš", en: "You solve", type: "verb", person: "ty" },
        { cs: "řeší", en: "He/She solves", type: "verb", person: "on/ona" },
        { cs: "řešíme", en: "We solve", type: "verb", person: "my" },
        { cs: "řešíte", en: "You (pl.) solve", type: "verb", person: "vy" },
        { cs: "řeší", en: "They solve", type: "verb", person: "oni" },

        // 44. používat
        { cs: "používat", en: "to use", type: "verb", person: "infinitive" },
        { cs: "používám", en: "I use", type: "verb", person: "já" },
        { cs: "používáš", en: "You use", type: "verb", person: "ty" },
        { cs: "používá", en: "He/She uses", type: "verb", person: "on/ona" },
        { cs: "používáme", en: "We use", type: "verb", person: "my" },
        { cs: "používáte", en: "You (pl.) use", type: "verb", person: "vy" },
        { cs: "používají", en: "They use", type: "verb", person: "oni" },

        // 45. zabývat se
        { cs: "zabývat se", en: "to deal with / engage in", type: "verb", person: "infinitive" },
        { cs: "zabývám se", en: "I engage in", type: "verb", person: "já" },
        { cs: "zabýváš se", en: "You engage in", type: "verb", person: "ty" },
        { cs: "zabývá se", en: "He/She engages in", type: "verb", person: "on/ona" },
        { cs: "zabýváme se", en: "We engage in", type: "verb", person: "my" },
        { cs: "zabýváte se", en: "You (pl.) engage in", type: "verb", person: "vy" },
        { cs: "zabývají se", en: "They engage in", type: "verb", person: "oni" },

        // 46. plnit
        { cs: "plnit", en: "to fulfill / complete", type: "verb", person: "infinitive" },
        { cs: "plním", en: "I fulfill", type: "verb", person: "já" },
        { cs: "plníš", en: "You fulfill", type: "verb", person: "ty" },
        { cs: "plní", en: "He/She fulfills", type: "verb", person: "on/ona" },
        { cs: "plníme", en: "We fulfill", type: "verb", person: "my" },
        { cs: "plníte", en: "You (pl.) fulfill", type: "verb", person: "vy" },
        { cs: "plní", en: "They fulfill", type: "verb", person: "oni" },

        // 47. pomáhat
        { cs: "pomáhat", en: "to help", type: "verb", person: "infinitive" },
        { cs: "pomáhám", en: "I help", type: "verb", person: "já" },
        { cs: "pomáháš", en: "You help", type: "verb", person: "ty" },
        { cs: "pomáhá", en: "He/She helps", type: "verb", person: "on/ona" },
        { cs: "pomáháme", en: "We help", type: "verb", person: "my" },
        { cs: "pomáháte", en: "You (pl.) help", type: "verb", person: "vy" },
        { cs: "pomáhají", en: "They help", type: "verb", person: "oni" },

        // 48. bavit se
        { cs: "bavit se", en: "to talk / enjoy oneself", type: "verb", person: "infinitive" },
        { cs: "bavím se", en: "I talk", type: "verb", person: "já" },
        { cs: "bavíš se", en: "You talk", type: "verb", person: "ty" },
        { cs: "baví se", en: "He/She talks", type: "verb", person: "on/ona" },
        { cs: "bavíme se", en: "We talk", type: "verb", person: "my" },
        { cs: "bavíte se", en: "You (pl.) talk", type: "verb", person: "vy" },
        { cs: "baví se", en: "They talk", type: "verb", person: "oni" },

        // 49. podporovat
        { cs: "podporovat", en: "to support", type: "verb", person: "infinitive" },
        { cs: "podporuji", en: "I support", synonym: "podporuju", type: "verb", person: "já" },
        { cs: "podporuješ", en: "You support", type: "verb", person: "ty" },
        { cs: "podporuje", en: "He/She supports", type: "verb", person: "on/ona" },
        { cs: "podporujeme", en: "We support", type: "verb", person: "my" },
        { cs: "podporujete", en: "You (pl.) support", type: "verb", person: "vy" },
        { cs: "podporují", en: "They support", synonym: "podporujou", type: "verb", person: "oni" },

        // 50. tlumit
        { cs: "tlumit", en: "to dull / suppress", type: "verb", person: "infinitive" },
        { cs: "tlumím", en: "I dull", type: "verb", person: "já" },
        { cs: "tlumíš", en: "You dull", type: "verb", person: "ty" },
        { cs: "tlumí", en: "It/He/She dulls", type: "verb", person: "on/ona" },
        { cs: "tlumíme", en: "We dull", type: "verb", person: "my" },
        { cs: "tlumíte", en: "You (pl.) dull", type: "verb", person: "vy" },
        { cs: "tlumí", en: "They dull", type: "verb", person: "oni" }
    ],

    // COMPLETE 100 QUESTIONS DATASET (Přesně 100 větných otázek)
    questions: [
        { text: "Já každý den {{gap}} na svého kolegu před kanceláří.", answers: ["čekám"], infinitiv: "čekat", forms: ["čekám", "čekáš", "čeká", "čekáme"], cs: "čekám", en: "I wait for my colleague in front of the office every day." },
        { text: "Pavel si často {{gap}} na hlučné sousedy.", answers: ["stěžuje"], infinitiv: "stěžovat si", forms: ["stěžuji", "stěžuješ", "stěžuje", "stěžujeme"], cs: "stěžuje", en: "Pavel often complains about noisy neighbors." },
        { text: "Náš šéf {{gap}}, že všichni zaměstnanci přijdou včas.", answers: ["předpokládá"], infinitiv: "předpokládat", forms: ["předpokládám", "předpokládáš", "předpokládá", "předpokládáme"], cs: "předpokládá", en: "Our boss assumes that all employees will arrive on time." },
        { text: "Lékař mi {{gap}}, abych pil více vody a hodně odpočíval.", answers: ["doporučuje"], infinitiv: "doporučovat", forms: ["doporučuji", "doporučuješ", "doporučuje", "doporučujeme"], cs: "doporučuje", en: "The doctor recommends that I drink more water and rest a lot." },
        { text: "Já právě {{gap}} všechny potřebné dokumenty na úřadě.", answers: ["vyřizuji", "vyřizuju"], infinitiv: "vyřizovat", forms: ["vyřizuji", "vyřizuješ", "vyřizuje", "vyřizujeme"], cs: "vyřizuji", en: "I am currently handling all necessary documents at the office." },
        { text: "My plně {{gap}} na pomoc našich partnerů.", answers: ["spoléháme"], infinitiv: "spoléhat na", forms: ["spoléhám", "spoléháš", "spoléháme", "spoléhají"], cs: "spoléháme", en: "We fully rely on the help of our partners." },
        { text: "Studenti se pravidelně {{gap}} diskusí o politice.", answers: ["zúčastňují", "zúčastňujou"], infinitiv: "zúčastňovat se", forms: ["zúčastňuji", "zúčastňuješ", "zúčastňuje", "zúčastňují"], cs: "zúčastňují", en: "Students regularly participate in political discussions." },
        { text: "Já s tímto názorem absolutně {{gap}}.", answers: ["nesouhlasím"], infinitiv: "nesouhlasit", forms: ["nesouhlasím", "nesouhlasíš", "nesouhlasí", "nesouhlasíme"], cs: "nesouhlasím", en: "I completely disagree with this opinion." },
        { text: "Eva se právě {{gap}} o novou pracovní pozici.", answers: ["uchází"], infinitiv: "ucházet se", forms: ["ucházím", "ucházíš", "uchází", "ucházíme"], cs: "uchází", en: "Eva is currently applying for a new job position." },
        { text: "Rodiče se vždycky {{gap}} o své děti.", answers: ["starají"], infinitiv: "starat se", forms: ["starám", "staráš", "stará", "starají"], cs: "starají", en: "Parents always take care of their children." },
        { text: "Současný stav ekonomiky {{gap}} rychlé řešení.", answers: ["vyžaduje"], infinitiv: "vyžadovat", forms: ["vyžaduji", "vyžaduješ", "vyžaduje", "vyžadujeme"], cs: "vyžaduje", en: "The current state of the economy requires a quick solution." },
        { text: "Já si velmi {{gap}} vaší pomoci v této situaci.", answers: ["vážím"], infinitiv: "vážit si", forms: ["vážím", "vážíš", "váží", "vážíme"], cs: "vážím", en: "I greatly appreciate your help in this situation." },
        { text: "Já pořád {{gap}}, zda mám tu nabídku přijmout.", answers: ["váhám"], infinitiv: "váhat", forms: ["váhám", "váháš", "váhá", "váháme"], cs: "váhám", en: "I am still hesitating whether I should accept the offer." },
        { text: "Tato firma {{gap}} kvalitní služby svým zákazníkům.", answers: ["nabízí"], infinitiv: "nabízet", forms: ["nabízím", "nabízíš", "nabízí", "nabízíme"], cs: "nabízí", en: "The company offers quality services to its customers." },
        { text: "Já často {{gap}} na krásná léta strávená na univerzitě.", answers: ["vzpomínám"], infinitiv: "vzpomínat", forms: ["vzpomínám", "vzpomínáš", "vzpomíná", "vzpomínáme"], cs: "vzpomínám", en: "I often recall the wonderful years spent at the university." },
        { text: "Kolegové právě {{gap}} podrobnosti nového projektu.", answers: ["projednávají"], infinitiv: "projednávat", forms: ["projednávám", "projednáváš", "projednává", "projednávají"], cs: "projednávají", en: "Colleagues are currently discussing the details of the new project." },
        { text: "My si rádi {{gap}} o moderním umění.", answers: ["povídáme"], infinitiv: "povídat si", forms: ["povídám", "povídáš", "povídá", "povídáme"], cs: "povídáme", en: "We like chatting about modern art." },
        { text: "Tento nový systém {{gap}} efektivitu práce.", answers: ["zvyšuje"], infinitiv: "zvyšovat", forms: ["zvyšuji", "zvyšuješ", "zvyšuje", "zvyšujeme"], cs: "zvyšuje", en: "This new system increases work efficiency." },
        { text: "Ty proč pořád {{gap}} o jeho upřímnosti?", answers: ["pochybuješ"], infinitiv: "pochybovat", forms: ["pochybuji", "pochybuješ", "pochybuje", "pochybujeme"], cs: "pochybuješ", en: "Why do you constantly doubt his sincerity?" },
        { text: "Učitel trpělivě {{gap}} novou gramatiku.", answers: ["vysvětluje"], infinitiv: "vysvětlovat", forms: ["vysvětluji", "vysvětluješ", "vysvětluje", "vysvětluujeme"], cs: "vysvětluje", en: "The teacher patiently explains the new grammar." },
        { text: "Martina se intenzivně {{gap}} na závěrečnou zkoušku.", answers: ["připravuje"], infinitiv: "připravovat se", forms: ["připravuji", "připravuješ", "připravuje", "připravujeme"], cs: "připravuje", en: "Martina is preparing intensively for her final exam." },
        { text: "Vláda postupně {{gap}} nová bezpečnostní opatření.", answers: ["zavádí"], infinitiv: "zavádět", forms: ["zavádím", "zavádíš", "zavádí", "zavádíme"], cs: "zavádí", en: "The government is gradually introducing new safety measures." },
        { text: "Co se vlastně v tomto městě {{gap}}?", answers: ["děje"], infinitiv: "dít se", forms: ["děje", "dějí"], cs: "děje", en: "What is actually happening in this town?" },
        { text: "Všichni zaměstnanci {{gap}} platné předpisy.", answers: ["dodržují", "dodržujou"], infinitiv: "dodržovat", forms: ["dodržuji", "dodržuješ", "dodržuje", "dodržují"], cs: "dodržují", en: "All employees abide by valid regulations." },
        { text: "Děti se hrozně {{gap}} na letní prázdniny.", answers: ["těší"], infinitiv: "těšit se", forms: ["těším", "těšíš", "těší", "těšíme"], cs: "těší", en: "The children are really looking forward to summer holidays." },
        { text: "Můj bratr pravidelně {{gap}} sportovní zápasy v televizi.", answers: ["sleduje"], infinitiv: "sledovat", forms: ["sleduji", "sleduješ", "sleduje", "sledujeme"], cs: "sleduje", en: "My brother regularly watches sports games on TV." },
        { text: "Já si právě {{gap}}, co od této práce vlastně očekávám.", answers: ["ujasňuji", "ujasňuju"], infinitiv: "ujasňovat si", forms: ["ujasňuji", "ujasňuješ", "ujasňuje", "ujasňujeme"], cs: "ujasňuji", en: "I am currently clarifying what I actually expect from this job." },
        { text: "Já se snažím a {{gap}} se stresovým situacím.", answers: ["vyhýbám"], infinitiv: "vyhýbat se", forms: ["vyhýbám", "vyhýbáš", "vyhýbá", "vyhýbáme"], cs: "vyhýbám", en: "I try and avoid stressful situations." },
        { text: "Tato restaurace {{gap}} nejlepší svíčkovou ve městě.", answers: ["připravuje"], infinitiv: "připravovat", forms: ["připravuji", "připravuješ", "připravuje", "připravujeme"], cs: "připravuje", en: "This restaurant prepares the best sirloin in town." },
        { text: "Rodiče dětem {{gap}} bezpečný a stabilní domov.", answers: ["zajišťují", "zajišťujou"], infinitiv: "zajišťovat", forms: ["zajišťuji", "zajišťuješ", "zajišťuje", "zajišťují"], cs: "zajišťují", en: "Parents ensure a safe and stable home for children." },
        { text: "Studenti postupně {{gap}} náročné gramatické poučky.", answers: ["zvládají"], infinitiv: "zvládat", forms: ["zvládám", "zvládáš", "zvládá", "zvládají"], cs: "zvládají", en: "Students are gradually mastering challenging grammar rules." },
        { text: "Pravidelné cvičení výrazně {{gap}} vaši kondici.", answers: ["zlepšuje"], infinitiv: "zlepšovat", forms: ["zlepšuji", "zlepšuješ", "zlepšuje", "zlepšujeme"], cs: "zlepšuje", en: "Regular exercise significantly improves your fitness." },
        { text: "Ty proč se pořád {{gap}} o věcech, které nemůžeš ovlivnit?", answers: ["strachuješ"], infinitiv: "strachovat se", forms: ["strachuji", "strachuješ", "strachuje", "strachujeme"], cs: "strachuješ", en: "Why do you constantly worry about things you can't control?" },
        { text: "Můj dědeček rád {{gap}} o historii naší rodiny.", answers: ["vypráví"], infinitiv: "vyprávět", forms: ["vyprávím", "vyprávíš", "vypráví", "vyprávíme"], cs: "vypráví", en: "My grandfather likes telling stories about our family history." },
        { text: "Všichni členové týmu se navzájem {{gap}}.", answers: ["respektují", "respektujou"], infinitiv: "respektovat", forms: ["respektuji", "respektuješ", "respektuje", "respektují"], cs: "respektují", en: "All team members respect each other." },
        { text: "Sestra si každý týden {{gap}} nové knížky z knihovny.", answers: ["půjčuje"], infinitiv: "půjčovat si", forms: ["půjčuji", "půjčuješ", "půjčuje", "půjčujeme"], cs: "půjčuje", en: "My sister borrows new books from the library every week." },
        { text: "Tato univerzita {{gap}} výborné podmínky pro výzkum.", answers: ["poskytuje"], infinitiv: "poskytovat", forms: ["poskytuji", "poskytuješ", "poskytuje", "poskytujeme"], cs: "poskytuje", en: "This university provides excellent conditions for research." },
        { text: "Jan se v české společnosti {{gap}} velmi dobře.", answers: ["orientuje"], infinitiv: "orientovat se", forms: ["orientuji", "orientuješ", "orientuje", "orientujeme"], cs: "orientuje", en: "Jan navigates Czech society very well." },
        { text: "Architekt právě {{gap}} návrh nového rodinného domu.", answers: ["kreslí"], infinitiv: "kreslit", forms: ["kreslím", "kreslíš", "kreslí", "kreslíme"], cs: "kreslí", en: "The architect is currently drawing the draft of a new family house." },
        { text: "Já každé ráno {{gap}} čerstvé pečivo v místní pekárně.", answers: ["kupuji", "kupuju"], infinitiv: "kupovat", forms: ["kupuji", "kupuješ", "kupuje", "kupujeme"], cs: "kupuji", en: "Every morning I buy fresh pastries at the local bakery." },
        { text: "My rádi {{gap}} čas v přírodě se svojí rodinou.", answers: ["trávíme"], infinitiv: "trávit", forms: ["trávím", "trávíš", "tráví", "trávíme"], cs: "trávíme", en: "We like spending time in nature with our family." },
        { text: "Autor v nové knize {{gap}} složité mezilidské vztahy.", answers: ["popisuje"], infinitiv: "popisovat", forms: ["popisuji", "popisuješ", "popisuje", "popisujeme"], cs: "popisuje", en: "The author describes complex interpersonal relationships in the new book." },
        { text: "Pracovníci technické podpory okamžitě {{gap}} problém.", answers: ["řeší"], infinitiv: "řešit", forms: ["řeším", "řešíš", "řeší", "řešíme"], cs: "řeší", en: "Technical support workers are immediately solving the problem." },
        { text: "Mladí lidé dnes čím dál více {{gap}} digitální technologie.", answers: ["používají"], infinitiv: "používat", forms: ["používám", "používáš", "používá", "používají"], cs: "používají", en: "Young people today use digital technology more and more." },
        { text: "Naše firma se dlouhodobě {{gap}} vývojem softwaru.", answers: ["zabývá"], infinitiv: "zabývat se", forms: ["zabývám", "zabýváš", "zabývá", "zabýváme"], cs: "zabývá", en: "Our company has long been engaged in software development." },
        { text: "Všichni účastníci kurzu pravidelně {{gap}} úkoly.", answers: ["plní"], infinitiv: "plnit", forms: ["plním", "plníš", "plní", "plníme"], cs: "plní", en: "All course participants regularly complete their assignments." },
        { text: "Odborný poradce nám ochotně {{gap}} s výběrem hypotéky.", answers: ["pomáhá"], infinitiv: "pomáhat", forms: ["pomáhám", "pomáháš", "pomáhá", "pomáháme"], cs: "pomáhá", en: "The financial advisor willingly helps us with choosing a mortgage." },
        { text: "Sousedé se spolu moc často {{gap}}.", answers: ["nebaví"], infinitiv: "bavit se", forms: ["nebavím", "nebavíš", "nebaví", "nebavíme"], cs: "nebaví", en: "The neighbors don't talk to each other very often." },
        { text: "Rodiče mě vždy {{gap}} v mých zálibách a studiích.", answers: ["podporují", "podporujou"], infinitiv: "podporovat", forms: ["podporuji", "podporuješ", "podporuje", "podporují"], cs: "podporují", en: "My parents always support me in my hobbies and studies." },
        { text: "Tento nový lék účinně {{gap}} bolest hlavy.", answers: ["tlumí"], infinitiv: "tlumit", forms: ["tlumím", "tlumíš", "tlumí", "tlumíme"], cs: "tlumí", en: "This new medication effectively dulls headaches." },
        { text: "Já už více než hodinu na tebe {{gap}} před stanicí metra.", answers: ["čekám"], infinitiv: "čekat", forms: ["čekám", "čekáš", "čeká", "čekáme"], cs: "čekám", en: "I have been waiting for you in front of the metro station for over an hour." },
        { text: "Bratr si neustále {{gap}} na náročnou práci v kanceláři.", answers: ["stěžuje"], infinitiv: "stěžovat si", forms: ["stěžuji", "stěžuješ", "stěžuje", "stěžujeme"], cs: "stěžuje", en: "My brother is constantly complaining about demanding office work." },
        { text: "Odborníci {{gap}}, že ceny nemovitostí budou dále růst.", answers: ["předpokládají"], infinitiv: "předpokládat", forms: ["předpokládám", "předpokládáš", "předpokládá", "předpokládají"], cs: "předpokládají", en: "Experts assume that property prices will continue to grow." },
        { text: "Učitelka žákům {{gap}} číst více českých knih.", answers: ["doporučuje"], infinitiv: "doporučovat", forms: ["doporučuji", "doporučuješ", "doporučuje", "doporučujeme"], cs: "doporučuje", en: "The teacher recommends students to read more Czech books." },
        { text: "Kolegové v práci zrovna {{gap}} roční závěrku.", answers: ["vyřizují", "vyřizujou"], infinitiv: "vyřizovat", forms: ["vyřizuji", "vyřizuješ", "vyřizuje", "vyřizují"], cs: "vyřizují", en: "Colleagues at work are currently handling the annual report." },
        { text: "Naši klienti plně {{gap}} na naše odborné zkušenosti.", answers: ["spoléhají"], infinitiv: "spoléhat na", forms: ["spoléhám", "spoléháš", "spoléhá", "spoléhají"], cs: "spoléhají", en: "Our clients fully rely on our professional experience." },
        { text: "Mladí vědci se aktivně {{gap}} výzkumu nových technologií.", answers: ["zúčastňují", "zúčastňujou"], infinitiv: "zúčastňovat se", forms: ["zúčastňuji", "zúčastňuješ", "zúčastňuje", "zúčastňují"], cs: "zúčastňují", en: "Young scientists actively participate in research on new technologies." },
        { text: "Já s vaším návrhem bohužel vůbec {{gap}}.", answers: ["nesouhlasím"], infinitiv: "nesouhlasit", forms: ["nesouhlasím", "nesouhlasíš", "nesouhlasí", "nesouhlasíme"], cs: "nesouhlasím", en: "Unfortunately, I completely disagree with your proposal." },
        { text: "Petr se usilovně {{gap}} o prestižní akademické stipendium.", answers: ["uchází"], infinitiv: "ucházet se", forms: ["ucházím", "ucházíš", "uchází", "ucházíme"], cs: "uchází", en: "Petr is diligently applying for a prestigious academic scholarship." },
        { text: "Sestřičky v nemocnici se obětavě {{gap}} o starší pacienty.", answers: ["starají"], infinitiv: "starat se", forms: ["starám", "staráš", "stará", "starají"], cs: "starají", en: "Nurses in the hospital selflessly take care of elderly patients." },
        { text: "Moderní doba {{gap}} flexibilitu a rychlé rozhodování.", answers: ["vyžaduje"], infinitiv: "vyžadovat", forms: ["vyžaduji", "vyžaduješ", "vyžaduje", "vyžadujeme"], cs: "vyžaduje", en: "Modern times require flexibility and quick decision-making." },
        { text: "Já si velmi {{gap}}, že jste si na nás našli čas.", answers: ["vážím"], infinitiv: "vážit si", forms: ["vážím", "vážíš", "váží", "vážíme"], cs: "vážím", en: "I greatly appreciate that you made time for us." },
        { text: "Já stále {{gap}}, zda mám jet na víkend do hory.", answers: ["váhám"], infinitiv: "váhat", forms: ["váhám", "váháš", "váhá", "váháme"], cs: "váhám", en: "I am still hesitating whether I should go to the mountains for the weekend." },
        { text: "Supermarket v našem městě {{gap}} velké slevy na potraviny.", answers: ["nabízí"], infinitiv: "nabízet", forms: ["nabízím", "nabízíš", "nabízí", "nabízíme"], cs: "nabízí", en: "The supermarket in our town offers big discounts on groceries." },
        { text: "Babička s láskou {{gap}} na svoje dětství na venkově.", answers: ["vzpomíná"], infinitiv: "vzpomínat", forms: ["vzpomínám", "vzpomínáš", "vzpomíná", "vzpomínáme"], cs: "vzpomíná", en: "Grandmother warmly recalls her childhood in the countryside." },
        { text: "Manažeři firmy právě {{gap}} novou strategií prodeje.", answers: ["projednávají"], infinitiv: "projednávat", forms: ["projednávám", "projednáváš", "projednává", "projednávají"], cs: "projednávají", en: "Company managers are currently discussing a new sales strategy." },
        { text: "Dědeček a vnoučata si rádi {{gap}} o přírodě.", answers: ["povídají"], infinitiv: "povídat si", forms: ["povídám", "povídáš", "povídá", "povídají"], cs: "povídají", en: "Grandfather and grandchildren like chatting about nature." },
        { text: "Výrobce každoročně {{gap}} kvalitu svých produktů.", answers: ["zvyšuje"], infinitiv: "zvyšovat", forms: ["zvyšuji", "zvyšuješ", "zvyšuje", "zvyšujeme"], cs: "zvyšuje", en: "The manufacturer increases the quality of its products every year." },
        { text: "Lidé někdy zbytečně {{gap}} o svých vlastních schopnostech.", answers: ["pochybují", "pochybujou"], infinitiv: "pochybovat", forms: ["pochybuji", "pochybuješ", "pochybuje", "pochybují"], cs: "pochybují", en: "People sometimes unnecessarily doubt their own abilities." },
        { text: "Lektor srozumitelně {{gap}} těžká pravidla výslovnosti.", answers: ["vysvětluje"], infinitiv: "vysvětlovat", forms: ["vysvětluji", "vysvětluješ", "vysvětluje", "vysvětluujeme"], cs: "vysvětluje", en: "The instructor clearly explains hard pronunciation rules." },
        { text: "Studenti se po večerech {{gap}} na státní zkoušky.", answers: ["připravují", "připravujou"], infinitiv: "připravovat se", forms: ["připravuji", "připravuješ", "připravuje", "připravují"], cs: "připravují", en: "Students prepare for state exams in the evenings." },
        { text: "Vedení města právě {{gap}} nový systém veřejné dopravy.", answers: ["zavádí"], infinitiv: "zavádět", forms: ["zavádím", "zavádíš", "zavádí", "zavádíme"], cs: "zavádí", en: "City management is currently introducing a new public transport system." },
        { text: "V centru města se v tuto chvíli {{gap}} velký koncert.", answers: ["koná"], infinitiv: "konat se", forms: ["konám", "konáš", "koná", "konáme"], cs: "koná", en: "A big concert is taking place in the city center right now." },
        { text: "Řidiči na dálnici většinou {{gap}} maximální povolenou rychlost.", answers: ["dodržují", "dodržujou"], infinitiv: "dodržovat", forms: ["dodržuji", "dodržuješ", "dodržuje", "dodržují"], cs: "dodržují", en: "Drivers on the highway mostly comply with the speed limit." },
        { text: "My všichni se moc {{gap}} na vánoční svátky s rodinou.", answers: ["těšíme"], infinitiv: "těšit se", forms: ["těším", "těšíš", "těší", "těšíme"], cs: "těšíme", en: "We are all looking forward to Christmas holidays with family." },
        { text: "Vědci pozorně {{gap}} klimatické změny v Arktidě.", answers: ["sledují", "sledujou"], infinitiv: "sledovat", forms: ["sleduji", "sleduješ", "sleduje", "sledují"], cs: "sledují", en: "Scientists closely track climate changes in the Arctic." },
        { text: "Šéf si v duchu {{gap}} hlavní priority nového roku.", answers: ["ujasňuje"], infinitiv: "ujasnit si", forms: ["ujasním", "ujasníš", "ujasní", "ujasňujeme"], cs: "ujasňuje", en: "The boss is clarifying main new year priorities in his mind." },
        { text: "Chytrý člověk se vědomě {{gap}} toxickým lidem.", answers: ["vyhýbá"], infinitiv: "vyhýbat se", forms: ["vyhýbám", "vyhýbáš", "vyhýbá", "vyhýbáme"], cs: "vyhýbá", en: "A smart person consciously avoids toxic people." },
        { text: "Maminka pečlivě {{gap}} slavnostní oběd pro hosty.", answers: ["připravuje"], infinitiv: "připravovat", forms: ["připravuji", "připravuješ", "připravuje", "připravujeme"], cs: "připravuje", en: "Mom carefully prepares a festive lunch for guests." },
        { text: "Organizace {{gap}} pitnou vodu pro lidi v nouzi.", answers: ["zajišťuje"], infinitiv: "zajišťovat", forms: ["zajišťuji", "zajišťuješ", "zajišťuje", "zajišťujeme"], cs: "zajišťuje", en: "The organization ensures drinking water for people in need." },
        { text: "Mladý řidič už skvěle {{gap}} parkování ve městě.", answers: ["zvládá"], infinitiv: "zvládat", forms: ["zvládám", "zvládáš", "zvládá", "zvládáme"], cs: "zvládá", en: "The young driver already masters city parking well." },
        { text: "Pravidelný trénink viditelně {{gap}} tvou fyzickou sílu.", answers: ["zlepšuje"], infinitiv: "zlepšovat", forms: ["zlepšuji", "zlepšuješ", "zlepšuje", "zlepšujeme"], cs: "zlepšuje", en: "Regular training visibly improves your physical strength." },
        { text: "On proč se otec neustále {{gap}} o budoucnost své firmy?", answers: ["strachuje"], infinitiv: "strachovat se", forms: ["strachuji", "strachuješ", "strachuje", "strachujeme"], cs: "strachuje", en: "Why does father constantly worry about his company's future?" },
        { text: "Průvodce záživně {{gap}} historii starého hradu.", answers: ["vypráví"], infinitiv: "vyprávět", forms: ["vyprávím", "vyprávíš", "vypráví", "vyprávíme"], cs: "vypráví", en: "The guide engagingly narrates the history of the old castle." },
        { text: "Kolegové se v práci vzájemně {{gap}} a pomáhají si.", answers: ["respektují", "respektujou"], infinitiv: "respektovat", forms: ["respektuji", "respektuješ", "respektuje", "respektují"], cs: "respektují", en: "Colleagues respect each other at work and help one another." },
        { text: "Studenti si často {{gap}} odbornou literaturu v knihovně.", answers: ["půjčují", "půjčujou"], infinitiv: "půjčovat si", forms: ["půjčuji", "půjčuješ", "půjčuje", "půjčují"], cs: "půjčují", en: "Students often borrow specialized literature in the library." },
        { text: "Nemocnice {{gap}} špičkovou péči všem pacientům.", answers: ["poskytuje"], infinitiv: "poskytovat", forms: ["poskytuji", "poskytuješ", "poskytuje", "poskytujeme"], cs: "poskytuje", en: "The hospital provides top care to all patients." },
        { text: "Turista se v neznámém městě rychle {{gap}} podle mapy.", answers: ["orientuje"], infinitiv: "orientovat se", forms: ["orientuji", "orientuješ", "orientuje", "orientujeme"], cs: "orientuje", en: "The tourist quickly navigates an unfamiliar city using a map." },
        { text: "Mladá malířka krásně {{gap}} přírodní krajiny.", answers: ["kreslí"], infinitiv: "kreslit", forms: ["kreslím", "kreslíš", "kreslí", "kreslíme"], cs: "kreslí", en: "The young painter beautifully draws natural landscapes." },
        { text: "Lidé o víkendu rádi {{gap}} čerstvou zeleninu na trhu.", answers: ["kupují", "kupujou"], infinitiv: "kupovat", forms: ["kupuji", "kupuješ", "kupuje", "kupují"], cs: "kupují", en: "People like buying fresh vegetables at the market on weekends." },
        { text: "Rodina obvykle {{gap}} letní dovolenou u moře.", answers: ["tráví"], infinitiv: "trávit", forms: ["trávím", "trávíš", "tráví", "trávíme"], cs: "tráví", en: "The family usually spends summer vacation by the sea." },
        { text: "Spisovatel v románu detailně {{gap}} život v minulém století.", answers: ["popisuje"], infinitiv: "popisovat", forms: ["popisuji", "popisuješ", "popisuje", "popisujeme"], cs: "popisuje", en: "The writer describes life in the last century in detail in the novel." },
        { text: "IT specialisté okamžitě {{gap}} výpadek počítačové sítě.", answers: ["řeší"], infinitiv: "řešit", forms: ["řeším", "řešíš", "řeší", "řešíme"], cs: "řeší", en: "IT specialists are immediately dealing with the computer network outage." },
        { text: "Čím dál více lidí v práci {{gap}} umělou inteligenci.", answers: ["používá"], infinitiv: "používat", forms: ["používám", "používáš", "používá", "používají"], cs: "používá", en: "More and more people use artificial intelligence at work." },
        { text: "Vědecký tým se dlouhodobě {{gap}} výzkumem lidského mozku.", answers: ["zabývá"], infinitiv: "zabývat se", forms: ["zabývám", "zabýváš", "zabývá", "zabýváme"], cs: "zabývá", en: "The scientific team has long been engaged in human brain research." },
        { text: "Poctivý student zodpovědně {{gap}} své školní povinnosti.", answers: ["plní"], infinitiv: "plnit", forms: ["plním", "plníš", "plní", "plníme"], cs: "plní", en: "A conscientious student responsibly fulfills school duties." },
        { text: "Dobrovolníci nezištně {{gap}} dětem ze sociálně slabých rodin.", answers: ["pomáhají"], infinitiv: "pomáhat", forms: ["pomáhám", "pomáháš", "pomáhá", "pomáhají"], cs: "pomáhají", en: "Volunteers unselfishly help children from underprivileged families." },
        { text: "Lidé se na oslavě narozenin skvěle {{gap}}.", answers: ["baví"], infinitiv: "bavit se", forms: ["bavím", "bavíš", "baví", "bavíme"], cs: "baví", en: "People are enjoying themselves greatly at the birthday party." },
        { text: "Stát finančně {{gap}} výzkumné projekty a inovace.", answers: ["podporuje"], infinitiv: "podporovat", forms: ["podporuji", "podporuješ", "podporuje", "podporujeme"], cs: "podporuje", en: "The state financially supports research projects and innovation." },
        { text: "Tento nový lék pacientovi {{gap}} silnou bolest.", answers: ["tlumí"], infinitiv: "tlumit", forms: ["tlumím", "tlumíš", "tlumí", "tlumíme"], cs: "tlumí", en: "This new medication suppresses severe pain for the patient." }
    ]
};