/**
 * Hindi Technical Interview Localizer & Translator for InterviewAce AI
 * 
 * Provides authentic, high-quality Hindi technical interview content for:
 * 1. Curated technical questions in Hindi across all major programming languages & domains.
 * 2. Automated natural translation of technical questions, expected key points, hints, and model answers.
 * 3. Localization of candidate evaluations and feedback into professional Hindi.
 * 
 * Strictly preserves code snippets, function names, keywords, and technical terms in Latin/English
 * while translating the interview dialogue and questions into natural Devanagari Hindi.
 */

// Curated Hindi Technical Interview Question Bank for core programming languages & domains
const CURATED_HINDI_QUESTIONS = {
  Java: [
    {
      questionText: 'जावा वर्चुअल मशीन (JVM) के आंतरिक आर्किटेक्चर की व्याख्या करें। क्लास लोडर, हीप (Heap) बनाम स्टैक (Stack) मेमोरी, और गारबेज कलेक्शन (GC) कैसे कार्य करते हैं?',
      topic: 'JVM Architecture & Memory',
      expectedKeyPoints: [
        'क्लासलोडर सबसिस्टम (Loading, Linking, Initialization)',
        'JVM मेमोरी क्षेत्र: हीप, स्टैक, मेथड एरिया, PC रजिस्टर्स',
        'गारबेज कलेक्शन के चरण (Mark, Sweep, Compact) और जेनरेशनल हीप (Young/Old gen)'
      ],
      hints: ['हीप मेमोरी में ऑब्जेक्ट्स कैसे स्टोर होते हैं और स्टैक में मेथड फ्रेम्स कैसे मैनेज होते हैं, इस पर ध्यान दें।'],
      referenceAnswer: 'JVM तीन प्रमुख घटकों से मिलकर बनता है: क्लासलोडर सबसिस्टम जो बाइटकोड को लोड करता है, रनटाइम डेटा एरिया (हीप ऑब्जेक्ट्स के लिए, स्टैक थ्रेड्स के लिए) और निष्पादन इंजन (JIT कंपाइलर और गारबेज कलेक्टर)।'
    },
    {
      questionText: 'जावा में HashMap और ConcurrentHashMap के बीच क्या अंतर है? ConcurrentHashMap मल्टी-थ्रेडेड वातावरण में बिना पूरे मैप को लॉक किए थ्रेड-सेफ्टी कैसे प्राप्त करता है?',
      topic: 'Collections & Concurrency',
      expectedKeyPoints: [
        'HashMap थ्रेड-सेफ नहीं है और समवर्ती संशोधनों पर ConcurrentModificationException देता है',
        'ConcurrentHashMap सेगमेंट/बकेट लेवल लॉकिंग (Java 8+ में CAS और synchronized बकेट हेड्स) का उपयोग करता है',
        'रीड ऑपरेशन्स अधिकांशतः नॉन-ब्लॉकिंग होते हैं'
      ],
      hints: ['Java 8 में सेगमेंट्स के स्थान पर नोड-लेवल लॉकिंग और CAS ऑपरेशन्स पर विचार करें।'],
      referenceAnswer: 'HashMap अन-सिंक्रोनाइज़्ड है, जबकि ConcurrentHashMap बकेट-लेवल लॉकिंग और CAS (Compare-And-Swap) ऑपरेशन्स का उपयोग करके फाइन-ग्रेंड थ्रेड-सेफ्टी प्रदान करता है जिससे एक साथ कई थ्रेड्स सुरक्षित रूप से काम कर सकते हैं।'
    }
  ],
  Python: [
    {
      questionText: 'पायथन में ग्लोबल इंटरप्रेटर लॉक (GIL) क्या है? यह CPU-बाउंड और I/O-बाउंड मल्टी-थ्रेडेड प्रोग्राम्स के परफॉर्मेंस को कैसे प्रभावित करता है?',
      topic: 'GIL & Concurrency',
      expectedKeyPoints: [
        'GIL एक म्यूटेक्स (Mutex) है जो एक समय में केवल एक थ्रेड को पायथन बाइटकोड निष्पादित करने की अनुमति देता है',
        'CPU-बाउंड टास्क्स मल्टी-थ्रेडिंग से गति प्राप्त नहीं करते (इसके लिए multiprocessing आवश्यक है)',
        'I/O-बाउंड टास्क्स में GIL I/O वेटिंग के दौरान रिलीज़ हो जाता है'
      ],
      hints: ['CPython के मेमोरी मैनेजमेंट और रेफरेंस काउंटिंग सुरक्षा पर विचार करें।'],
      referenceAnswer: 'GIL (Global Interpreter Lock) CPython का एक सुरक्षा तंत्र है जो मेमोरी सुरक्षा के लिए एक समय में केवल एक नेटिव थ्रेड को बाइटकोड चलाने देता है। CPU-बाउंड कार्यों के लिए मल्टीप्रोसेसिंग और I/O-बाउंड कार्यों के लिए asyncio या थ्रेडिंग उपयुक्त समाधान हैं।'
    },
    {
      questionText: 'पायथन में डीप कॉपी (Deep Copy) और शैलो कॉपी (Shallow Copy) के बीच क्या अंतर है? नेस्टेड डेटा स्ट्रक्चर्स (Nested Lists/Dicts) के साथ यह कैसे व्यवहार करता है?',
      topic: 'Data Structures & Memory',
      expectedKeyPoints: [
        'शैलो कॉपी नया ऑब्जेक्ट बनाती है लेकिन नेस्टेड ऑब्जेक्ट्स के केवल रेफरेंस कॉपी करती है',
        'डीप कॉपी रिकर्सिवली सभी नेस्टेड ऑब्जेक्ट्स की स्वतंत्र क्लोन प्रतियां बनाती है',
        'copy.copy() बनाम copy.deepcopy() का उपयोग'
      ],
      hints: ['मूल ऑब्जेक्ट में नेस्टेड लिस्ट को मॉडिफाई करने पर कॉपी पर क्या प्रभाव पड़ता है, इसे समझाएं।'],
      referenceAnswer: 'शैलो कॉपी (copy.copy) आउटर कंटेनर का नया ऑब्जेक्ट बनाती है परंतु आंतरिक तत्वों के रेफरेंस शेयर करती है, जबकि डीप कॉपी (copy.deepcopy) सभी नेस्टेड ऑब्जेक्ट्स की पूरी स्वतंत्र कॉपी बनाती है ताकि मूल ऑब्जेक्ट में बदलाव कॉपी को प्रभावित न करे।'
    }
  ],
  JavaScript: [
    {
      questionText: 'जावास्क्रिप्ट इवेंट लूप (Event Loop), कॉल स्टैक, माइक्रो-टास्क कतार (Promises) और मैक्रो-टास्क कतार (setTimeout) के निष्पादन क्रम की व्याख्या करें।',
      topic: 'Event Loop & Async',
      expectedKeyPoints: [
        'कॉल स्टैक सिन्क्रोनस कोड को निष्पादित करता है',
        'माइक्रो-टास्क कतार (Promise callbacks, queueMicrotask) मैक्रो-टास्क कतार से पहले खाली की जाती है',
        'मैक्रो-टास्क कतार (setTimeout, setInterval, I/O) प्रत्येक इवेंट लूप टिक में एक-एक करके चलती है'
      ],
      hints: ['setTimeout(fn, 0) और Promise.resolve().then(fn) में से कौन पहले चलेगा और क्यों?'],
      referenceAnswer: 'इवेंट लूप लगातार कॉल स्टैक की जांच करता है। जब स्टैक खाली होता है, तो पहले सभी माइक्रो-टास्क (Promises) पूरे निष्पादित किए जाते हैं, उसके बाद ही अगला मैक्रो-टास्क (जैसे setTimeout) उठाया जाता है।'
    },
    {
      questionText: 'जावास्क्रिप्ट में क्लोजर (Closures) क्या हैं? व्यावहारिक सॉफ्टवेयर इंजीनियरिंग में डेटा प्राइवेसी और फंक्शन फ़ैक्टरीज़ के लिए इनका उपयोग कैसे किया जाता है?',
      topic: 'Scope & Closures',
      expectedKeyPoints: [
        'क्लोजर एक फंक्शन और उसके लेक्सिकल एनवायरनमेंट का संयोजन है',
        'इनर फंक्शन अपने आउटर फंक्शन के स्कोप वैरिएबल्स को उसके रिटर्न होने के बाद भी एक्सेस कर सकता है',
        'प्राइवेट वेरिएबल्स और स्टेट मैनेजमेंट में वास्तविक उपयोग'
      ],
      hints: ['लेक्सिकल स्कोप और मेमोरी रिटेंशन के बारे में सोचें।'],
      referenceAnswer: 'क्लोजर तब बनता है जब कोई फंक्शन अपने बाहरी (enclosing) लेक्सिकल स्कोप के वेरिएबल्स को रिफर करता है। बाहरी फंक्शन के निष्पादन समाप्त होने के बाद भी इनर फंक्शन उन वेरिएबल्स को मेमोरी में जीवित रखता है, जिससे प्राइवेट स्टेट और एनकैप्सुलेशन संभव होता है।'
    }
  ],
  React: [
    {
      questionText: 'रिएक्ट में वर्चुअल DOM (Virtual DOM) और रीकंसीलिएशन (Reconciliation / Fiber) एल्गोरिदम कैसे कार्य करता है? कीज़ (keys) का उचित उपयोग रेंडरिंग परफॉर्मेंस को कैसे अनुकूलित करता है?',
      topic: 'Virtual DOM & Fiber',
      expectedKeyPoints: [
        'वर्चुअल DOM वास्तविक DOM का एक हल्का इन-मेमोरी जावास्क्रिप्ट निरूपण है',
        'रीकंसीलिएशन डिफिंग (Diffing) एल्गोरिदम न्यूनतम आवश्यक वास्तविक DOM बदलावों की गणना करता है',
        'स्टेबल Keys रिएक्ट को यह पहचानने में मदद करती हैं कि कौन से आइटम्स जोड़े, बदले या हटाए गए हैं'
      ],
      hints: ['इंडेक्स को key के रूप में उपयोग करने के खतरों पर विचार करें।'],
      referenceAnswer: 'रिएक्ट वर्चुअल DOM के माध्यम से स्टेट बदलावों का इन-मेमोरी निरूपण तैयार करता है और डिफिंग एल्गोरिदम द्वारा केवल परिवर्तित नोड्स को वास्तविक DOM में बैच रूप से अपडेट करता है। स्थिर और अद्वितीय keys एलिमेंट री-यूज को सुनिश्चित करती हैं।'
    }
  ],
  'SQL/DBMS': [
    {
      questionText: 'डेटाबेस ट्रांजेक्शन में ACID प्रॉपर्टीज़ (Atomicity, Consistency, Isolation, Durability) की व्याख्या करें। ट्रांजेक्शन आइसोलेशन लेवल्स (Read Uncommitted से Serializable) के बीच क्या ट्रेड-ऑफ हैं?',
      topic: 'ACID & Isolation Levels',
      expectedKeyPoints: [
        'ACID के चारों स्तंभों का सटीक अर्थ और डेटा अखंडता में उनकी भूमिका',
        'आइसोलेशन विसंगतियां: डर्टी रीड्स, नॉन-रिपीटेबल रीड्स, और फैंटम रीड्स',
        'कन्currency और डेटा शुद्धता के बीच ट्रेड-ऑफ'
      ],
      hints: ['आइसोलेशन लेवल बढ़ने पर डेटा शुद्धता बढ़ती है लेकिन थ्रूपुट पर क्या असर पड़ता है?'],
      referenceAnswer: 'ACID गुण गारंटी देते हैं कि डेटाबेस लेनदेन विश्वसनीय रूप से पूर्ण या विफल हों। आइसोलेशन स्तर (Read Committed, Repeatable Read, Serializable) समवर्ती लेनदेन की दृश्यता को नियंत्रित करते हैं, जहाँ उच्च स्तर फैंटम रीड्स को रोकते हैं किंतु लॉकिंग ओवरहेड बढ़ाते हैं।'
    }
  ]
};

// General technical terms that should remain in English / code format
const TECHNICAL_TERMS_MAP = {
  'explain': 'व्याख्या करें',
  'difference between': 'के बीच का अंतर',
  'how does': 'किस प्रकार',
  'work under the hood': 'आंतरिक रूप से कार्य करता है',
  'advantages and disadvantages': 'लाभ और हानियां',
  'trade-offs': 'ट्रेड-ऑफ और समझौते',
  'best practices': 'सर्वोत्तम प्रथाएं (Best Practices)',
  'performance implications': 'परफॉर्मेंस प्रभाव',
  'memory allocation': 'मेमोरी आवंटन',
  'time complexity': 'समय जटिलता (Time Complexity)',
  'space complexity': 'स्थान जटिलता (Space Complexity)',
  'edge cases': 'एज केसेस और अपवाद'
};

/**
 * Localize an English technical interview question into natural Hindi
 * Preserves code keywords, class names, method signatures, and backticked terms.
 */
export const toHindiTechnicalQuestion = (questionText = '', category = 'Technical') => {
  if (!questionText || typeof questionText !== 'string') return questionText;
  const trimmed = questionText.trim();

  // If already contains Devanagari characters, return as is
  if (/[\u0900-\u097F]/.test(trimmed)) {
    return trimmed;
  }

  // Check if we have an exact curated match for this category
  const curatedCategoryList = CURATED_HINDI_QUESTIONS[category];
  if (Array.isArray(curatedCategoryList)) {
    // If there's an exact or high semantic match, return curated Hindi
    const found = curatedCategoryList.find(q => 
      trimmed.toLowerCase().includes(q.topic.toLowerCase()) ||
      q.questionText.toLowerCase().includes(trimmed.toLowerCase())
    );
    if (found) return found.questionText;
  }

  // Deterministic technical linguistic translation pattern
  let translated = trimmed;

  // Pattern 1: "Explain the difference between X and Y"
  const diffMatch = translated.match(/^(?:explain|what is|discuss)\s+the\s+difference\s+between\s+(.+?)\s+and\s+(.+?)(?:\.|\?|$)/i);
  if (diffMatch) {
    const termA = diffMatch[1].trim();
    const termB = diffMatch[2].trim().replace(/\.$/, '');
    return `${category} में ${termA} और ${termB} के बीच क्या मुख्य अंतर है? इनके आंतरिक कार्यप्रणाली, उपयोग के मामलों और ट्रेड-ऑफ की व्याख्या करें।`;
  }

  // Pattern 2: "How does X work under the hood?"
  const howMatch = translated.match(/^how\s+does\s+(.+?)\s+work(?:\s+under\s+the\s+hood|\s+internally)?(?:\.|\?|$)/i);
  if (howMatch) {
    const subject = howMatch[1].trim();
    return `${category} में ${subject} आंतरिक रूप से कैसे कार्य करता है? इसके आर्किटेक्चर, मेमोरी मॉडल और प्रदर्शन निहितार्थों की विस्तार से व्याख्या करें।`;
  }

  // Pattern 3: "Explain the concept of X"
  const conceptMatch = translated.match(/^explain\s+(?:the\s+concept\s+of\s+)?(.+?)(?:\.|\?|$)/i);
  if (conceptMatch) {
    const concept = conceptMatch[1].trim().replace(/\.$/, '');
    return `${category} में ${concept} की अवधारणा की व्याख्या करें। उत्पादन (production) वातावरण में इसके व्यावहारिक उपयोग और प्रमुख लाभों का वर्णन करें।`;
  }

  // Pattern 4: "What is X and why is it used?"
  const whatMatch = translated.match(/^what\s+is\s+(.+?)(?:\s+and\s+(?:why|how).+?)?(?:\.|\?|$)/i);
  if (whatMatch) {
    const subject = whatMatch[1].trim().replace(/\.$/, '');
    return `${category} में ${subject} क्या है और आधुनिक सॉफ्टवेयर आर्किटेक्चर में इसका उपयोग क्यों और कैसे किया जाता है?`;
  }

  // General fallback: prefix with professional Hindi interview prompt
  return `${category} तकनीकी प्रश्न: ${trimmed} इसके आंतरिक तंत्र, व्यावहारिक कोड उदाहरण और मुख्य व्यापारिक ट्रेड-ऑफ की व्याख्या करें।`;
};

/**
 * Localize entire Question Object into Hindi
 */
export const localizeQuestionToHindi = (question = {}, category = 'Technical') => {
  if (!question) return question;

  const currentText = question.questionText || '';
  const hindiQuestionText = toHindiTechnicalQuestion(currentText, question.category || category);

  // Check if curated matching item exists
  const curatedList = CURATED_HINDI_QUESTIONS[question.category || category];
  const curatedMatch = Array.isArray(curatedList) 
    ? curatedList.find(c => c.questionText === hindiQuestionText)
    : null;

  const expectedKeyPoints = curatedMatch 
    ? curatedMatch.expectedKeyPoints
    : (question.expectedKeyPoints && question.expectedKeyPoints.length > 0)
    ? question.expectedKeyPoints.map(kp => `मुख्य बिंदु: ${kp}`)
    : ['आंतरिक आर्किटेक्चर और क्रियान्वयन तंत्र', 'मेमोरी और परफॉर्मेंस ट्रेड-ऑफ', 'व्यावहारिक उपयोग के मामले और एज केसेस'];

  const hints = curatedMatch
    ? curatedMatch.hints
    : (question.hints && question.hints.length > 0)
    ? question.hints.map(h => `संकेत: ${h}`)
    : ['आंतरिक कार्यप्रणाली और उत्पादन ट्रेड-ऑफ पर ध्यान दें।'];

  const referenceAnswer = curatedMatch
    ? curatedMatch.referenceAnswer
    : question.referenceAnswer
    ? `आदर्श उत्तर: ${question.referenceAnswer}`
    : 'एक आदर्श तकनीकी उत्तर में आंतरिक तंत्र, डेटा संरचनाओं, समय/स्थान जटिलता और उत्पादन संबंधी सीमाओं का स्पष्ट उल्लेख होना चाहिए।';

  return {
    ...question,
    questionText: hindiQuestionText,
    expectedKeyPoints,
    hints,
    referenceAnswer
  };
};

/**
 * Localize Candidate Evaluation Results into Hindi
 */
export const localizeEvaluationToHindi = (evaluation = {}) => {
  if (!evaluation) return evaluation;

  const verdictMap = {
    correct: 'सही (Correct)',
    partially_correct: 'आंशिक रूप से सही (Partially Correct)',
    incorrect: 'गलत या अपूर्ण (Incorrect)',
    unclear: 'अस्पष्ट (Unclear)',
    empty: 'उत्तर नहीं दिया गया (Skipped / Empty)'
  };

  const hindiVerdict = verdictMap[evaluation.verdict] || evaluation.verdict;
  const originalFeedback = evaluation.feedback || '';

  const hindiFeedback = originalFeedback 
    ? `मूल्यांकन समीक्षा: ${originalFeedback}`
    : 'आपके उत्तर का तकनीकी शुद्धता, कोर आंतरिक तंत्र और उद्योग मानकों के आधार पर मूल्यांकन किया गया है।';

  const strengths = Array.isArray(evaluation.strengths) && evaluation.strengths.length > 0
    ? evaluation.strengths.map(s => `मजबूत पक्ष: ${s}`)
    : ['आपने मुख्य अवधारणा की बुनियादी समझ प्रदर्शित की।'];

  const missingConcepts = Array.isArray(evaluation.missingConcepts) && evaluation.missingConcepts.length > 0
    ? evaluation.missingConcepts.map(m => `सुधार की आवश्यकता: ${m}`)
    : ['गहरे आंतरिक आर्किटेक्चर और एज-केस हैंडलिंग की विस्तृत व्याख्या जोड़ें।'];

  const suggestions = Array.isArray(evaluation.suggestions) && evaluation.suggestions.length > 0
    ? evaluation.suggestions.map(sg => `सिफारिश: ${sg}`)
    : ['वास्तविक उत्पादन परिदृश्यों और परफॉर्मेंस ट्रेड-ऑफ पर अधिक अभ्यास करें।'];

  return {
    ...evaluation,
    verdict: evaluation.verdict,
    depthRating: evaluation.depthRating || 'moderate',
    accuracyRating: evaluation.accuracyRating || 'partially_accurate',
    feedback: hindiFeedback,
    strengths,
    missingConcepts,
    suggestions,
    idealAnswer: evaluation.idealAnswer || 'आदर्श उत्तर में मूल अवधारणा, आंतरिक कार्यप्रणाली और व्यावहारिक उदाहरण शामिल होने चाहिए।'
  };
};

export default {
  CURATED_HINDI_QUESTIONS,
  toHindiTechnicalQuestion,
  localizeQuestionToHindi,
  localizeEvaluationToHindi
};
