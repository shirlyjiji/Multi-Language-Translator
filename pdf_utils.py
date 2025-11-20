import unicodedata
import re
import uharfbuzz as hb
import freetype
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont


# ------------------ HarfBuzz Shape ------------------
def hb_shape_text(text, font_path, size=12):
    if not text.strip():
        return ""

    with open(font_path, "rb") as f:
        font_data = f.read()

    hb_face = hb.Face(font_data)
    hb_font = hb.Font(hb_face)

    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()

    hb.shape(hb_font, buf)
    return text


# ------------------ Normalization ------------------
def normalize(t):
    return unicodedata.normalize("NFC", t)


# ------------------ Extract Title ------------------
def extract_title_and_body(full_text: str):
    lines = full_text.split("\n")
    title = None
    body = []
    for line in lines:
        if title is None and line.strip():
            title = line.strip()
            continue
        body.append(line)
    return title or "Untitled", "\n".join(body)


# ------------------ Chapter Recognition ------------------
HINDI_NUMBER_WORDS = [
    "पहला", "दूसरा", "तीसरा", "चौथा", "पांचवां",
    "छठा", "सातवां", "आठवां", "नौवां", "दसवां",
]

CHAPTER_PATTERNS = [
    r"^chapter\s+\d+",
    r"^chap\s+\d+",
    r"^ch\s+\d+",
    r"^अध्याय\s+\d+",
    r"^अध्याय\s+(%s)" % "|".join(HINDI_NUMBER_WORDS),
]

CHAPTER_RE = re.compile("|".join(CHAPTER_PATTERNS), re.IGNORECASE)


def split_chapters(text):
    lines = text.split("\n")
    chapters = []
    current_title = None
    current_lines = []

    for line in lines:
        stripped = normalize(line.strip())
        if CHAPTER_RE.match(stripped):
            if current_title:
                chapters.append((current_title, "\n".join(current_lines)))
            current_title = stripped
            current_lines = []
        else:
            current_lines.append(stripped)

    if current_title:
        chapters.append((current_title, "\n".join(current_lines)))

    if not chapters:
        return [("Chapter 1", text)]

    return chapters


# ------------------ PDF Generator ------------------
def generate_shaped_pdf(text, pdf_path, font_path, language_name="Language"):
    pdfmetrics.registerFont(TTFont("MainFont", font_path))

    title, body = extract_title_and_body(text)
    chapters = split_chapters(body)

    doc = SimpleDocTemplate(pdf_path, pagesize=A4)

    title_style = ParagraphStyle(
        "Title",
        fontName="MainFont",
        fontSize=28,
        alignment=TA_CENTER,
        spaceAfter=30,
    )

    sub_style = ParagraphStyle(
        "Sub",
        fontName="MainFont",
        fontSize=14,
        alignment=TA_CENTER,
        spaceAfter=40,
    )

    chapter_style = ParagraphStyle(
        "Chapter",
        fontName="MainFont",
        fontSize=18,
        alignment=TA_LEFT,
        spaceAfter=20,
    )

    body_style = ParagraphStyle(
        "Body",
        fontName="MainFont",
        fontSize=13,
        leading=20,
        alignment=TA_LEFT,
        spaceAfter=8,
    )

    story = []

    story.append(Paragraph(normalize(title), title_style))
    story.append(Paragraph(f"Translated – {language_name}", sub_style))
    story.append(PageBreak())

    # Add chapters
    for i, (chapter_title, chapter_body) in enumerate(chapters):
        shaped_title = hb_shape_text(chapter_title, font_path)
        story.append(Paragraph(normalize(shaped_title), chapter_style))

        for line in chapter_body.split("\n"):
            shaped = hb_shape_text(line, font_path)
            story.append(Paragraph(normalize(shaped) or "&nbsp;", body_style))

        if i < len(chapters) - 1:
            story.append(PageBreak())

    doc.build(story)
