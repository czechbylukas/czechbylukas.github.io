// grammar_engine.js - Universal Linguistic Engine

export const VocabEngine = {
    /**
     * @param {Object} word - The row from the 'words' table
     * @param {Object} pattern - The row from 'grammar_patterns'
     * @param {Array} overrides - Any matching rows from 'irregular_overrides'
     * @param {String} targetKey - e.g., 'sg_p4' or 'pl_p1'
     */
    getForm: function(word, pattern, overrides, targetKey) {
        // 1. Priority: Check if there is a manual override
        const override = overrides.find(o => o.form_key === targetKey);
        if (override) return override.override_value;

        // 2. Regular Logic: Apply the pattern
        const [type, caseNum] = targetKey.split('_p'); // e.g., 'sg', '4'
        const isPlural = type === 'pl';
        
        const suffixes = JSON.parse(isPlural ? pattern.plural_suffixes : pattern.singular_suffixes);
        const suffix = suffixes[parseInt(caseNum) - 1];

        // 3. Apply suffix to the stem
        return this.applyStemLogic(word.lemma, suffix, pattern.pattern_id);
    },

    applyStemLogic: function(lemma, suffix, patternId) {
        // This is where you handle dropping 'o' or 'a' 
        // Example: auto -> aut + a = auta
        let stem = lemma;
        if (patternId === 'město' && lemma.endsWith('o')) stem = lemma.slice(0, -1);
        if (patternId === 'žena' && lemma.endsWith('a')) stem = lemma.slice(0, -1);
        
        return stem + suffix;
    }
};