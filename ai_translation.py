import os
import requests
import unicodedata
from dotenv import load_dotenv
from typing import Optional, TypedDict, List
from translation_graph import run_translation_graph

load_dotenv()

FEATHERLESS_API_KEY = os.getenv("FEATHERLESS_API_KEY")
FEATHERLESS_MODEL_ID = os.getenv("FEATHERLESS_MODEL_ID")
HF_MODEL = os.getenv("HF_NLLB_MODEL", "facebook/nllb-200-distilled-600M")

# ------------------ Huggingface NLLB Loader ------------------
try:
    from transformers import NllbTokenizer, NllbForConditionalGeneration
except:
    NllbTokenizer = None
    NllbForConditionalGeneration = None

hf_tokenizer = None
hf_model = None

if NllbTokenizer and NllbForConditionalGeneration:
    try:
        hf_tokenizer = NllbTokenizer.from_pretrained(HF_MODEL)
        hf_model = NllbForConditionalGeneration.from_pretrained(HF_MODEL)
        print("NLLB Loaded Successfully")
    except Exception as e:
        print("NLLB load error:", e)

# ------------------ Language Map ------------------
LANG_MAP = {
    "hi": "hin_Deva",
    "es": "spa_Latn",
    "de": "deu_Latn",
}

LANG_NAMES = {
    "hi": "Hindi",
    "es": "Spanish",
    "de": "German",
}

# ------------------ Chapter Splitting ------------------
def split_into_chapters(text: str) -> List[str]:
    chapters = []
    buffer = []
    for line in text.splitlines():
        if line.strip().lower().startswith(("chapter ", "chap ", "ch ")):
            if buffer:
                chapters.append("\n".join(buffer))
                buffer = []
        buffer.append(line)
    if buffer:
        chapters.append("\n".join(buffer))
    return chapters


# ------------------ Featherless Translate ------------------
def featherless_translate(text: str, lang: str):
    if not FEATHERLESS_API_KEY or not FEATHERLESS_MODEL_ID:
        return None

    try:
        r = requests.post(
            "https://api.featherless.ai/v1/chat/completions",
            headers={"Authorization": f"Bearer {FEATHERLESS_API_KEY}"},
            json={
                "model": FEATHERLESS_MODEL_ID,
                "messages": [
                    {"role": "system", "content": "Translate accurately. Preserve structure."},
                    {"role": "user", "content": f"Translate to {LANG_NAMES.get(lang, lang)}:\n\n{text}"},
                ],
                "temperature": 0.0,
            },
            timeout=120,
        )
        r.raise_for_status()
        data = r.json()
        msg = data["choices"][0]
        return msg.get("message", {}).get("content", None) or msg.get("text", None)
    except Exception as e:
        print("Featherless error:", e)
        return None


# ------------------ HF NLLB Translate ------------------
def hf_nllb_translate(text: str, lang: str):
    if hf_model is None or hf_tokenizer is None:
        return None

    tgt = LANG_MAP.get(lang)
    if not tgt:
        return None

    try:
        bos = None
        if hasattr(hf_tokenizer, "lang_code_to_id"):
            bos = hf_tokenizer.lang_code_to_id.get(tgt)
        elif hasattr(hf_tokenizer, "get_lang_id"):
            bos = hf_tokenizer.get_lang_id(tgt)

        inputs = hf_tokenizer(text, return_tensors="pt", truncation=True, max_length=2000)

        kwargs = {"max_length": 3000, "num_beams": 4}
        if bos is not None:
            kwargs["forced_bos_token_id"] = bos

        out = hf_model.generate(**inputs, **kwargs)
        return hf_tokenizer.decode(out[0], skip_special_tokens=True)
    except Exception as e:
        print("HF error:", e)
        return None


# ------------------ Pipeline ------------------
class TranslationState(TypedDict):
    text: str
    target_lang: str
    translated: str
    used_model: str


def translate_text_pipeline(text: str, target_lang: str) -> TranslationState:
    chapters = split_into_chapters(text)
    out_chapters = []
    used = None

    for ch in chapters:
        res = run_translation_graph(ch, target_lang, hf_nllb_translate, featherless_translate)
        out_chapters.append(res["result"] or ch)
        used = res["used_model"]

    final = "\n\n".join(out_chapters)

    return {
        "text": text,
        "target_lang": target_lang,
        "translated": unicodedata.normalize("NFC", final),
        "used_model": used,
    }
