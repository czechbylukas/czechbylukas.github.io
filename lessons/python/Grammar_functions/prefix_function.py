def is_likely_perfective(lemma):
    prefixes = [
        "do", "na", "ná", "nad", "pod", "před", "pře", "ob", "od", 
        "pro", "při", "pří", "roz", "z", "za", "s", "v", "vy", "vý", "u", "o", "po"
    ]
    base = lemma.strip().lower().split(" ")[0]
    for pref in sorted(prefixes, key=len, reverse=True):
        if base.startswith(pref):
            return True
    return False