const testLinks = {
  lessonUsefulPhrases: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSewHnJaFJZZT2loQHe-JY3g5Y2tCbYecSM8u3TmY6IVEpPOqg/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSeLwvig7lLI9qebYTr86d4UWhX4w2NOJC0UEWRONH6LZeLXUA/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSc-ZrNV1mSxv13fdT_MJ4Ejk6rFNkqieWSvFUPeIF7ogG4Mcw/viewform?embedded=true"
  },
  lessonPastTense: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSfra5G2LjBzrseHYAZvA7J7f7LxG8NwJgsIvq-fIKXtEZ_gdQ/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSdnlKBKukZhaCntXIsbwAvk0Ot6E7DhjZIJVB4GxcxAo6_m2Q/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLScqel__49sAKmpt7mPuSAasaBdwosgI1JXnU-eDvEjj-QDMcw/viewform?embedded=true"
  },
  lessonQuestionWords: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLScsVbPr5F5YKSyODNvkWTJtjmS3hhN4x9g3kBUQqqn35l_ETg/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSfi-5Rn09tgKJU5NjzI0v46zIk32ofJH_5vYSpJz-UADzCa-Q/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSe97kaRbMfkGeuAvfJIhkWsNf1JQNnvtYE-R91eAGBYhL8K_Q/viewform?embedded=true"
  },
  lessonVerbsA: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSejr4XpkgapyX80VUh4XXkCxNbcEsB2lz52gacvDCNfpUPXTA/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSf57WkfQrew4l80doY_qyYZgnt1RZ8utSaVb7Li_KXal_injA/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSeAPuyct5epInStJG2w4VgA5otuLg4EnzCvyp1Nluz48YTlLw/viewform?embedded=true"
  },
  lessonVerbsI: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLScMAOuzSGomhPiSNiEioknbBOoOPEmGUpKsMpe-7tpHwi3iaw/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSeix_esJt2VpPNI9jiLGgA6fZmga4Il_YjxGZoc3U-zgERhUw/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSdqbFrpAkGiJI7V03xtowO4kcT8lL2w6x5opupUS9_Kon4nQg/viewform?embedded=true"
  },
  lessonVerbsE: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSdf9-IC9FVuA8IUqYlj_r_K_5ceS6Bjf9hLjlfciHNAh8pazQ/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSculIrBY3P2NmEgEU47K3LaDHruV5uwQr2UU0EqqwqqNVgQMg/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLScuHKqXu6NSbhPg4071qmY8bsI1IRpIUnn9seoQtDh_gEqfNQ/viewform?embedded=true"
  },
  lessonGenitive: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSeNvgp1MHw17HYgojyRvZ8iblo1QfdXs1PvtFKRFDsguvcZEg/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSdjZEfLe3W6vrdWQDMmrolehg9MVKn_v6j2QTmjsvCjkM5JEg/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSeXZWFbgs93yee9Gv0qJDEZpw1MhNcwSXTeUHNp-itz5V1ftQ/viewform?embedded=true"
  },
  lessonAccusative: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLScxGMFQeIBlptUquPU_gV4cihiFWdIe39QDodYP_numW9_tWw/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSenhpLX1isT7R3EsVtO-qCkIDOfi-Zxrr_4DCbFnxoxsT3RPQ/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSd4GfpiNFTXPsmPsZ3yJduATw55iBeP9GddA3jlEK3PCVeoOg/viewform?embedded=true"
  },
  lessonInstrumental: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLScIa355HlLBlWzepgiTmjBmVVzcs7vaXxAjbkZBQWnmLZm7yA/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSdB9ffnjO45Z_-DfS-_YVr0kl4V_ytsUJzZk6BpaUq7KMIiMg/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLScpAKCKyGPs3OIOMZtpQqvLZ86YJmcd_go4ZOZaquydar-Hxg/viewform?embedded=true"
  },
  lessonDative: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSdXHdX0SDZzzAPrtSYqLV2sxYFitVSCCyBB6VPfdpf3a6ymXw/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSdjZEfLe3W6vrdWQDMmrolehg9MVKn_v6j2QTmjsvCjkM5JEg/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSdpdvQpTAHu6iFiXkHHHQtdKCC0ZJQLGiu69P4xf_ecoUINHg/viewform?embedded=true"
  },
  lessonLocative: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSeNJwUHW_WdsSIRpfyCTmm_8wpvkeQaIKu8czJLokgJaYKzsA/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLScqkV6nBNHmTYOJPujkFwqOPqfZkn-nSxWYMDJqZEbOQ47TSw/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSe4BrnTap7s3IJ6twKGHe5rKaB8w29gVcDUX3Oqj0Or7gGNCw/viewform?embedded=true"
  },
  lessonPrefixes: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSfP2hhM1BBX7lg0H5dED3ecuMSIevxSYa9z2hIdtKHcdUoEsg/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSfP2hhM1BBX7lg0H5dED3ecuMSIevxSYa9z2hIdtKHcdUoEsg/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSfP2hhM1BBX7lg0H5dED3ecuMSIevxSYa9z2hIdtKHcdUoEsg/viewform?embedded=true"
  },
  lessonPerfective: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSdFGV7vQiaJFlPXJ3n7PBL4V-ATDklJbHqgrMht55_goy7K2A/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSdFGV7vQiaJFlPXJ3n7PBL4V-ATDklJbHqgrMht55_goy7K2A/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSdFGV7vQiaJFlPXJ3n7PBL4V-ATDklJbHqgrMht55_goy7K2A/viewform?embedded=true"
  },
  lessonAdverbsAdjectives: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSdIA29U2pCtwzCsQqcLewVIB8KDGEpYJwckVpxM_UNRn8Jh7w/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/.../viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/.../viewform?embedded=true"
  },
  lessonPronouns: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSfhJ1ZyY-3gb8pje-5NGuWMRN7HhwuAp0N9vmHI8nzqioNaOg/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/.../viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/.../viewform?embedded=true"
  },
  lessonNumbers: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSdlU6eIqujGLZkZu5i9B-W89DZXFkhO5UhFai7xpIKB4h8mzg/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSdlU6eIqujGLZkZu5i9B-W89DZXFkhO5UhFai7xpIKB4h8mzg/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSdlU6eIqujGLZkZu5i9B-W89DZXFkhO5UhFai7xpIKB4h8mzg/viewform?embedded=true"
  }
}; 


/* =========================
   A2 VOCABULARY TESTS
   ========================= */

const testLinksA2 = {
  lessonA2OsobniUdaje: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSek-IAiP7iMe8ZbFM8iVv4a-t0_7ZGsEAZpc2VxJbcHEovu8Q/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSd9vWH1fIM7uQFNZfhffGXDPKX63JkNTLhe1iSzkgOUQtLkBg/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSfwPrXZhtJUOSHofU4MorH39Kvns0cer2pujpEQy47LfxSF2A/viewform?embedded=true"
  },

  lessonA2Nakupovani: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSfVWDoMnN813LDSY8c_s7cWMvr2OM_tVomR9v8Jl1oWgl94Pg/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSekth1YgQwmUCEobbFlTNFIEMJxd6Q4Yh9gX80_17R8rGxmZA/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSd4otyFVFKJR8GqDLeio3k9bcmBLfv6Z_uAnIvJZz0IDmiocw/viewform?embedded=true"
  },

  lessonA2DenniRezim: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSdrqEE79U1ORz1VUiloI5DLkoynTsLxyKFhcE_t_bjho6BSPw/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSfjil6DG5J5ssoQfcdxH6jjQW3RsqAUECl2hdymx90qMPeK5Q/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSdOjdBl2iy3GMOOlFDrq6Bmk7PnMHFmUTzoUXkmqd1mxXkPrA/viewform?embedded=true"
  },

  lessonA2Cestovani: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSeIFYjaK1fSRMmoT7cvkq7sDRrF9PCsp8-wiDvQp5SXPi6eyw/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSeRf-ETNtv-t_-yCQzERKKPYc5lzpIpyLAqWirCJSkzP1QAVQ/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSdwehQVrpC0n0ZCqfPA4Mh1QYbe8nN-5_i9JaXixtC_6ERXbA/viewform?embedded=true"
  },

  lessonA2JidloPiti: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSe0hmZr9EH58w8qb2qdlBRUQ7EeKktLFUW-y6dYD1VX5w_y5g/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSdVqIOkxdUGTUkynCbUWWxkF7wTCeWCXfMns4ysUjls7u69SQ/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSeJALjWQkIuvQL8Xve1YlzBEjAd1qh1hu78JlKdhmn01vEAwg/viewform?embedded=true"
  },

  lessonA2Prace: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSdLKnm6hEYCZC5G-HbVD4LVsVETa-GGC1AUmF04hwVpnSsYeA/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSd0x9CmWjjne4siPrXsV86GBNO6qxRhhVHYi2F4Wet0eh48kg/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSce44fG028SfypuXKIVQ9cScIQPqTJLrKD0JL3cnpH0KPUJAg/viewform?embedded=true"
  },

  lessonA2Konicky: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSemqE4x-8Ze_-g7fI-ENWypqar_i4AsTlq-ESUxjCnyfwwTVg/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSce44fG028SfypuXKIVQ9cScIQPqTJLrKD0JL3cnpH0KPUJAg/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSc6uTBc426XFgfGve9_sp46oisbcbDn5MyGXOTjzachDjx70Q/viewform?embedded=true"
  },

  lessonA2Bydleni: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSf4BczLif5W3uxeynlycXCq2DbF04Sira7KgjvgG6lEyW7sbQ/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSf9ohjCiNt-bdV_jOvoM-naGCFn8D_LMtK88hj0HXGaHAa2OA/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLScwcUILKZ8Tf0fjp5ctI9y6qes8vzYkQ3eYgnovQLGLoaQRbA/viewform?embedded=true"
  },

  lessonA2Urady: {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSfkqi9lelErab-e6hWSkMFt39XZDaqJ-zaXr4iX3g127dDs0Q/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/1FAIpQLSflwPN2EBVmNUdnqoTVbrJIUYvZAk2m7_qiIebs3yVSrrvcdw/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/1FAIpQLSfi6iGUZz6q5-zaI1figrrIeysxiaK2Y0mGQHXmG1xypy8eTA/viewform?embedded=true"
  },

  lessonA2Vzdelavani: {
    en: "https://docs.google.com/forms/d/e/EN_FORM_ID_VZDELAVANI/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/EN_FORM_ID_VZDELAVANI/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/EN_FORM_ID_VZDELAVANI/viewform?embedded=true"
  },

  lessonA2Pocasi: {
    en: "https://docs.google.com/forms/d/e/EN_FORM_ID_POCASI/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/EN_FORM_ID_POCASI/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/EN_FORM_ID_POCASI/viewform?embedded=true"
  },

  lessonA2Zdravi: {
    en: "https://docs.google.com/forms/d/e/EN_FORM_ID_ZDRAVI/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/EN_FORM_ID_ZDRAVI/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/EN_FORM_ID_ZDRAVI/viewform?embedded=true"
  },

  lessonA2Kontakt: {
    en: "https://docs.google.com/forms/d/e/EN_FORM_ID_KONTAKT/viewform?embedded=true",
    es: "https://docs.google.com/forms/d/e/EN_FORM_ID_KONTAKT/viewform?embedded=true",
    de: "https://docs.google.com/forms/d/e/EN_FORM_ID_KONTAKT/viewform?embedded=true"
  },
};