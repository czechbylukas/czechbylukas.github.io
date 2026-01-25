-- VocabSQL_database Master Schema

CREATE TABLE words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lemma TEXT NOT NULL,
    pos TEXT NOT NULL, 
    level TEXT NOT NULL, 
    lesson INTEGER NOT NULL,
    pattern_id TEXT, 
    is_irregular BOOLEAN DEFAULT 0,
    trans_en TEXT,
    trans_es TEXT,
    trans_de TEXT,
    category TEXT, 
    note TEXT,
    ext1 TEXT, ext2 TEXT, ext3 TEXT 
);

CREATE TABLE grammar_patterns (
    pattern_id TEXT PRIMARY KEY,
    pos TEXT NOT NULL,
    singular_suffixes TEXT, 
    plural_suffixes TEXT    
);

CREATE TABLE irregular_overrides (
    word_id INTEGER,
    form_key TEXT, 
    override_value TEXT,
    FOREIGN KEY (word_id) REFERENCES words(id)
);

CREATE INDEX idx_words_lesson ON words(lesson);
CREATE INDEX idx_words_level ON words(level);
CREATE INDEX idx_words_lemma ON words(lemma);