import React, { useState } from 'react';

const TranslationDemo = () => {
    const [activeLanguage, setActiveLanguage] = useState('es');

    const sampleContent = {
        original: {
            title: "Chapter 1: The Beginning",
            content: `It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.

The hallway smelt of boiled cabbage and old rag mats. At one end of it a coloured poster, too large for indoor display, had been tacked to the wall. It depicted simply an enormous face, more than a metre wide: the face of a man of about forty-five, with a heavy black moustache and ruggedly handsome features.`
        },
        translations: {
            es: {
                title: "Capítulo 1: El Comienzo",
                content: `Era un día frío y brillante de abril, y los relojes daban las trece. Winston Smith, con la barbilla hundida en el pecho en un esfuerzo por escapar del viento vil, se deslizó rápidamente por las puertas de vidrio de los Victory Mansions, aunque no lo suficientemente rápido como para evitar que un remolino de polvo arenoso entrara con él.

El pasillo olía a repollo hervido y a viejas alfombras de trapo. En un extremo, un cartel de colores, demasiado grande para exhibirlo en interiores, había sido clavado en la pared. Representaba simplemente un rostro enorme, de más de un metro de ancho: el rostro de un hombre de unos cuarenta y cinco años, con un bigote negro espeso y facciones rudamente atractivas.`
            },
            de: {
                title: "Kapitel 1: Der Anfang",
                content: `Es war ein heller, kalter Apriltag, und die Uhren schlugen dreizehn. Winston Smith, das Kinn an die Brust gedrückt, um dem üblen Wind zu entgehen, schlüpfte schnell durch die Glastüren der Victory Mansions, allerdings nicht schnell genug, um zu verhindern, dass eine wirbelnde Böe von grobem Staub mit hereinkam.

Der Flur roch nach gekochtem Kohl und alten Lumpenteppichen. An einem Ende war ein farbiges Plakat, das für die Innenaufstellung zu groß war, an die Wand geheftet worden. Es zeigte einfach ein riesiges Gesicht, mehr als einen Meter breit: das Gesicht eines Mannes von etwa fünfundvierzig Jahren, mit einem buschigen schwarzen Schnurrbart und robusten, gutaussehenden Gesichtszügen.`
            },
            hi: {
                title: "अध्याय 1: शुरुआत",
                content: `अप्रैल का एक चमकीला ठंडा दिन था, और घड़ियाँ तेरह बजा रही थीं। विंस्टन स्मिथ, अपनी ठुड्डी को अपनी छाती में दबाए हुए, उस भद्दी हवा से बचने की कोशिश में, विक्टरी मैन्शन के कांच के दरवाजों से तेजी से निकल गया, हालाँकि इतना तेज नहीं कि एक घूमती हुई बारीक धूल उसके साथ अंदर आने से रोक सके।

बरामदे से उबली हुई गोभी और पुराने चीथड़े के गलीचों की गंध आ रही थी। उसके एक छोर पर एक रंगीन पोस्टर, जो इंडोर प्रदर्शन के लिए बहुत बड़ा था, दीवार पर टांग दिया गया था। इसमें केवल एक विशाल चेहरा दिखाया गया था, एक मीटर से अधिक चौड़ा: लगभग पैंतालीस वर्ष के एक आदमी का चेहरा, जिसमें भारी काले मूंछें और बेदाग सुंदर विशेषताएं थीं।`
            }
        }
    };

    const languages = [
        { code: 'es', name: 'Spanish' },
        { code: 'de', name: 'German' },
        { code: 'hi', name: 'Hindi' }
    ];

    return (
        <div className="container py-5">
            <div className="row mb-5">
                <div className="col text-center">
                    <h2 className="fw-bold">Translation Demo</h2>
                    <p className="lead">See how our AI translates content while preserving structure</p>
                </div>
            </div>

            <div className="translation-demo">
                <div className="row">
                    <div className="col-md-6">
                        <h4 className="mb-3">Original English Text</h4>
                        <div className="translation-content">
                            <h5>{sampleContent.original.title}</h5>
                            <p>{sampleContent.original.content}</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4 className="mb-3">Translated Version</h4>
                        <ul className="nav nav-tabs language-tabs" id="languageTabs" role="tablist">
                            {languages.map(lang => (
                                <li key={lang.code} className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeLanguage === lang.code ? 'active' : ''}`}
                                        onClick={() => setActiveLanguage(lang.code)}
                                    >
                                        {lang.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-3">
                            <div className="translation-content">
                                <h5>{sampleContent.translations[activeLanguage].title}</h5>
                                <p>{sampleContent.translations[activeLanguage].content}</p>
                            </div>
                        </div>
                        <div className="export-options">
                            <button className="export-btn"><i className="far fa-file-word me-2"></i> DOCX</button>
                            <button className="export-btn"><i className="far fa-file-pdf me-2"></i> PDF</button>
                            <button className="export-btn"><i className="far fa-file-alt me-2"></i> EPUB</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TranslationDemo;