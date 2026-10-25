/**
 * Curated Question Bank - Catalog Disciplines (Python, C, C++, C#, Mobile, Cloud, Security, etc.)
 */

export const CATALOG_QUESTIONS = [
  {
    "questionId": "full_stack_001",
    "questionText": "What is Cross-Origin Resource Sharing (CORS), why does the browser send an HTTP `OPTIONS` preflight request, and how do you configure it securely?",
    "category": "Full Stack",
    "topic": "Web Security (CORS, CSRF, XSS, SQLi)",
    "subtopic": "CORS & Preflight Mechanism",
    "difficulty": "Easy",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Software Engineer Intern",
      "Junior Software Engineer",
      "Frontend Developer",
      "Full Stack Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "fullstack",
      "cors",
      "http",
      "security",
      "options"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "CORS is a browser security mechanism enforcing the Same-Origin Policy. When a frontend makes a non-simple cross-origin request (e.g. using PUT/DELETE, JSON Content-Type, or custom headers), the browser automatically sends an HTTP `OPTIONS` preflight request with `Origin`, `Access-Control-Request-Method`, and `Access-Control-Request-Headers`. The server must respond with matching `Access-Control-Allow-Origin` and allowed methods. Secure configuration requires whitelisting explicit trusted origins rather than using wildcard `*` with `credentials: true`.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Same-Origin Policy enforces restrictions on cross-origin requests",
      "Browser sends OPTIONS preflight for non-simple requests before actual request",
      "Server responds with Access-Control-Allow-Origin, Methods, and Headers",
      "Wildcard '*' cannot be used alongside Access-Control-Allow-Credentials: true"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains Same-Origin Policy and role of CORS",
        "Identifies triggers for OPTIONS preflight",
        "Describes secure origin whitelisting with credentials"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "What makes a request 'non-simple' according to the fetch spec?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "full_stack_002",
    "questionText": "Compare storing JWTs in `localStorage` versus `HttpOnly` `SameSite` Cookies. How do you protect a modern Single Page Application against both XSS and CSRF?",
    "category": "Full Stack",
    "topic": "Authentication Flows (JWT, Sessions, OAuth)",
    "subtopic": "Token Storage & Attack Vectors",
    "difficulty": "Medium",
    "questionType": "scenario",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Junior Software Engineer",
      "SDE-1",
      "Full Stack Developer",
      "Backend Developer"
    ],
    "interviewMode": "scenario",
    "tags": [
      "fullstack",
      "jwt",
      "security",
      "xss",
      "csrf",
      "cookies"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "Storing tokens in `localStorage` makes them completely accessible to any JavaScript running on the page, making them vulnerable to Cross-Site Scripting (XSS). Storing JWTs in `HttpOnly` cookies prevents JavaScript access via `document.cookie`, mitigating XSS token theft. However, cookies are automatically sent with cross-site requests, exposing the app to CSRF. To protect against both: store tokens in `HttpOnly`, `Secure`, `SameSite=Lax` (or `Strict`) cookies, and use CSRF anti-forgery tokens or custom headers (`X-Requested-With`) for mutating requests.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "localStorage is vulnerable to XSS exfiltration",
      "HttpOnly cookies prevent JS read access, mitigating XSS token theft",
      "Cookies introduce CSRF vulnerability if not secured with SameSite flags or anti-CSRF tokens",
      "Optimal approach: HttpOnly, Secure, SameSite cookies + short-lived access tokens"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Compares XSS risks of localStorage",
        "Explains HttpOnly protection and CSRF trade-off",
        "Recommends SameSite + Secure cookie flags"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Can malicious JavaScript read an HttpOnly cookie? What about an injected script reading localStorage?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "oop_001",
    "questionText": "Explain the four core pillars of Object-Oriented Programming (Encapsulation, Abstraction, Inheritance, Polymorphism) with a real-world software design scenario.",
    "category": "OOP",
    "topic": "The 4 Pillars of OOP",
    "subtopic": "Core OOP Principles",
    "difficulty": "Easy",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Software Engineer Intern",
      "Graduate Engineer Trainee",
      "Junior Software Engineer",
      "Java Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "oop",
      "pillars",
      "encapsulation",
      "polymorphism"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "In a Payment Gateway scenario: (1) Encapsulation: The `CreditCard` class hides CVV and balance with private fields, exposing controlled methods `charge()` and `validate()`. (2) Abstraction: A `PaymentProcessor` interface exposes `processPayment(amount)` without revealing internal banking API connections. (3) Inheritance: `StripeProcessor` and `PayPalProcessor` inherit common retry logic from an abstract `BasePaymentProcessor`. (4) Polymorphism: The checkout service calls `processor.processPayment(amount)` on any payment type at runtime without knowing its concrete class.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Encapsulation: bundling state and restricting direct external mutation",
      "Abstraction: hiding implementation complexity behind clean interfaces",
      "Inheritance: deriving specialized types while reusing shared behavior",
      "Polymorphism: uniform interface for varying underlying types (overriding / dynamic dispatch)"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Correctly defines all 4 pillars",
        "Applies them to a cohesive real-world software example"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Use a concrete domain like banking, ecommerce, or vehicle rentals to illustrate each pillar."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "oop_002",
    "questionText": "Explain the SOLID design principles in detail and give a practical example where violating the Single Responsibility Principle (SRP) causes system fragility.",
    "category": "OOP",
    "topic": "SOLID Design Principles",
    "subtopic": "SOLID Principles & Refactoring",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Junior Software Engineer",
      "SDE-1",
      "Full Stack Developer",
      "Java Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "oop",
      "solid",
      "srp",
      "design-principles"
    ],
    "companyStyleLabel": "Enterprise / FinTech",
    "referenceAnswer": "S: Single Responsibility (one reason to change), O: Open/Closed (open for extension, closed for modification), L: Liskov Substitution (subtypes must be substitutable for base types), I: Interface Segregation (small, specific interfaces), D: Dependency Inversion (depend on abstractions, not concretions). Violating SRP: An `Invoice` class that calculates totals, prints PDF formatting, and writes to MySQL has 3 reasons to change (business rules, presentation, database schema). A change to the PDF library can break database persistence or alter calculation logic, causing cascading bugs.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Defines each letter of SOLID accurately",
      "Explains SRP as having a single axis of change / single actor",
      "Gives clear code refactoring example splitting an overloaded class into distinct cohesive classes"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Accurate definition of all 5 principles",
        "Concrete violation and refactored solution for SRP"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Remember Robert C. Martin's definition: a class should have one, and only one, reason to change."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "python_001",
    "questionText": "Explain how Python's Global Interpreter Lock (GIL) affects multithreaded CPU-bound versus I/O-bound programs. When would you use multiprocessing or asyncio instead of threading in Python?",
    "category": "Python",
    "topic": "GIL (Global Interpreter Lock) & Threading vs Multiprocessing",
    "subtopic": "Concurrency Model",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Junior Software Engineer",
      "Python Developer",
      "Backend Developer",
      "Data Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "python",
      "gil",
      "multithreading",
      "asyncio",
      "concurrency"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "The GIL is a mutex in CPython that prevents multiple native threads from executing Python bytecode simultaneously. For CPU-bound workloads (e.g. heavy computation or mathematical simulations), threading does not provide true parallelism because threads contend for the GIL and can even run slower due to context switching; multiprocessing should be used instead to spawn separate processes with independent memory spaces and GIL instances. For I/O-bound tasks (e.g. web scraping, network requests, DB calls), threads release the GIL during I/O wait, making threading or single-threaded cooperative multitasking with asyncio highly effective.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "GIL prevents simultaneous execution of Python bytecode across multiple threads in CPython",
      "CPU-bound tasks require multiprocessing to leverage multiple CPU cores",
      "I/O-bound tasks release the GIL during network/disk operations, making threading or asyncio ideal"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Accurately defines the GIL in CPython",
        "Contrasts CPU-bound vs I/O-bound behavior",
        "Justifies multiprocessing vs asyncio"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Consider whether threads release the GIL while waiting for network responses."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "python_002",
    "questionText": "How do Python decorators work under the hood? Explain how closures and functools.wraps enable you to inspect and modify function behavior with arguments.",
    "category": "Python",
    "topic": "Decorators, Context Managers & Closures",
    "subtopic": "Function Decorators & Closures",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Junior Software Engineer",
      "Python Developer",
      "Backend Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "python",
      "decorators",
      "closures",
      "functools"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "A decorator is a callable that accepts a function as an argument and returns a replacement callable (closure) that wraps around the original function. The wrapper uses *args and **kwargs to accept arbitrary parameters, invokes the wrapped function, and optionally manipulates the input or output. Using functools.wraps copies the original function's metadata (__name__, __doc__, __annotations__) onto the wrapper, preserving docstrings and introspection tools.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Decorators are higher-order functions returning a closure that wraps the original function",
      "Use *args and **kwargs in the wrapper to accept arbitrary parameters and return values",
      "functools.wraps preserves function metadata like __name__ and __doc__"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains higher-order function and closure mechanics",
        "Explains *args and **kwargs forwarding",
        "Mentions functools.wraps metadata preservation"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "What happens to func.__name__ if you do not use @functools.wraps?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "python_003",
    "questionText": "Explain the difference between mutable and immutable data types in Python. Why can a tuple containing a list have its contents modified, and why cannot such a tuple be used as a dictionary key?",
    "category": "Python",
    "topic": "Data Types, Mutability & Memory Model",
    "subtopic": "Mutability & Hashability",
    "difficulty": "Easy",
    "questionType": "conceptual",
    "sequenceOrder": 3,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Software Engineer Intern",
      "Junior Software Engineer",
      "Python Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "python",
      "mutability",
      "tuples",
      "hashability",
      "dictionaries"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Immutable types (int, float, str, tuple, frozenset) cannot have their state modified after creation; modifying them returns a new object. Mutable types (list, dict, set) can be updated in-place. A tuple is immutable in that its collection of references cannot change. However, if one reference points to a mutable list, that list's contents can be mutated in-place. Dict keys must be hashable (__hash__ and __eq__ returning invariant values). Because the tuple's hash depends on its contents, mutating the inner list changes the hash, breaking dict bucket lookups; hence Python raises TypeError: unhashable type: 'list'.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Immutable types cannot change state after allocation; mutable types allow in-place modification",
      "Tuples hold fixed object references, but referenced mutable objects can be altered",
      "Dict keys require hashability; containing a mutable object makes tuple unhashable"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Distinguishes mutable vs immutable types",
        "Explains tuple reference immutability vs inner object mutability",
        "Articulates hashability requirement for dict keys"
      ],
      "minimumPassingScore": 6
    },
    "hints": [
      "Consider what __hash__() evaluates to if one of the tuple's elements can mutate."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "python_004",
    "questionText": "How do Python Generators work, and what is the difference between `yield` and `return`? Explain the memory consumption difference between processing 10 million rows using a generator versus a list comprehension.",
    "category": "Python",
    "topic": "Comprehensions, Iterators & Generators",
    "subtopic": "Generators & Memory Efficiency",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 4,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Junior Software Engineer",
      "Python Developer",
      "Backend Developer",
      "Data Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "python",
      "generators",
      "iterators",
      "yield",
      "memory"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "A function containing `yield` produces a generator object implementing the iterator protocol (__iter__ and __next__). Calling next() resumes execution right after the last yield statement with local variables preserved in its frame. While a list comprehension creates all 10 million elements in memory simultaneously (consuming gigabytes of RAM), a generator expression evaluates lazily on-demand, holding only one element in memory at any instant (O(1) auxiliary space), preventing Out-Of-Memory errors.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "yield pauses execution and preserves local frame state; return terminates function",
      "Generators implement the iterator protocol with lazy evaluation",
      "List comprehension allocates full collection in RAM; generator streams one item at a time (O(1) memory)"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains yield pausing and resuming frame execution",
        "Contrasts eager vs lazy evaluation",
        "Explains dramatic memory savings of generators"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Think about streaming lines from a 50GB file vs reading the entire file into a list."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "python_005",
    "questionText": "Explain the Python Context Manager protocol. How do `__enter__` and `__exit__` handle exceptions, and how does the `@contextlib.contextmanager` decorator simplify creating custom context managers?",
    "category": "Python",
    "topic": "Decorators, Context Managers & Closures",
    "subtopic": "Context Managers & Resource Cleanup",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Junior Software Engineer",
      "Python Developer",
      "Backend Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "python",
      "context-manager",
      "with-statement",
      "contextlib"
    ],
    "companyStyleLabel": "Enterprise / FinTech",
    "referenceAnswer": "The `with` statement invokes `__enter__()` on the context manager, binding its return value to the `as` target. Upon block exit (normal or exceptional), `__exit__(exc_type, exc_val, exc_tb)` is called. If an exception occurred and `__exit__` returns True, the exception is suppressed; if it returns False or None, the exception propagates. `@contextlib.contextmanager` turns a generator function into a context manager where code before `yield` runs in enter and code inside a `finally` block after `yield` runs in exit.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "__enter__ sets up resource; __exit__ handles cleanup and receives exception details",
      "Returning True from __exit__ suppresses the exception; False propagates it",
      "contextlib.contextmanager uses yield and try-finally for concise definitions"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains __enter__ and __exit__ signatures and roles",
        "Explains exception suppression via boolean return from __exit__",
        "Explains generator-based contextmanager decorator"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Consider how file opening 'with open(...) as f:' guarantees closing even on errors."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "python_006",
    "questionText": "How does Python handle asynchronous concurrency with `asyncio`? Explain the roles of the Event Loop, Coroutines, Tasks, and compare `asyncio.gather()` versus `asyncio.wait()`.",
    "category": "Python",
    "topic": "Asyncio & Asynchronous Programming",
    "subtopic": "Asyncio Concurrency Architecture",
    "difficulty": "Hard",
    "questionType": "conceptual",
    "sequenceOrder": 6,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      "SDE-1",
      "Python Developer",
      "Backend Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "python",
      "asyncio",
      "coroutines",
      "event-loop",
      "gather"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "asyncio provides single-threaded cooperative multitasking. The Event Loop manages and distributes execution of tasks. Coroutines (`async def`) are paused and resumed via `await`. An asyncio Task wraps a coroutine and schedules it on the event loop for concurrent execution. `asyncio.gather()` aggregates multiple awaitables, runs them concurrently, and returns an ordered list of results, with optional `return_exceptions=True`. `asyncio.wait()` takes a set of Tasks and provides finer control, returning `(done, pending)` sets based on conditions like FIRST_COMPLETED, FIRST_EXCEPTION, or ALL_COMPLETED.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Event loop schedules and runs cooperative coroutines in a single thread",
      "Tasks schedule coroutines concurrently onto the event loop",
      "asyncio.gather returns ordered results list; asyncio.wait returns done/pending task sets with flexible return conditions"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Defines cooperative multitasking and event loop",
        "Explains Coroutine vs Task wrapper",
        "Contrasts gather vs wait accurately"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "Remember: coroutines do not run concurrently on the loop until wrapped in a Task or passed to gather."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "c_001",
    "questionText": "What is the difference between malloc() and calloc() in C? Explain what happens if you dereference a dangling pointer or fail to free() allocated memory.",
    "category": "C",
    "topic": "Dynamic Memory Allocation (malloc, calloc, realloc, free)",
    "subtopic": "Heap Allocation & Memory Hazards",
    "difficulty": "Easy",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Junior Software Engineer",
      "C/C++ Developer",
      "Systems Engineer",
      "Embedded Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "c",
      "pointers",
      "malloc",
      "memory-management"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "malloc(size_t size) allocates a single contiguous block of raw memory leaving it uninitialized with indeterminate garbage values. calloc(size_t num, size_t size) allocates memory for an array of num elements of size bytes each and initializes all allocated bytes to zero. If you fail to free() allocated memory, you cause a memory leak that permanently consumes heap address space until process termination. Dereferencing a dangling pointer (a pointer referencing freed memory) leads to undefined behavior, data corruption, or SIGSEGV segmentation faults.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "malloc allocates uninitialized memory containing garbage values",
      "calloc allocates zero-initialized memory for num elements",
      "Failing to free causes memory leaks; dangling pointer dereference causes undefined behavior or segfaults"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Accurately contrasts malloc and calloc initialization",
        "Defines memory leaks",
        "Defines dangling pointers and undefined behavior"
      ],
      "minimumPassingScore": 6
    },
    "hints": [
      "Consider what initial values the allocated memory holds in malloc vs calloc."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "c_002",
    "questionText": "Explain how pointer arithmetic works in C. Given an integer array 'int arr[5] = {10, 20, 30, 40, 50}; int *p = arr;', what is the value of *(p + 2), and by how many bytes does the address increment?",
    "category": "C",
    "topic": "Pointer Arithmetic & Multi-dimensional Arrays",
    "subtopic": "Memory Strides & Offsets",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Junior Software Engineer",
      "C/C++ Developer",
      "Systems Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "c",
      "pointers",
      "pointer-arithmetic",
      "arrays"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "In C, pointer arithmetic is scaled by the size of the underlying data type pointed to (sizeof(*p)). When 'p' points to arr[0], 'p + 2' advances the memory address by 2 * sizeof(int) bytes (typically 8 bytes on modern 32/64-bit systems where sizeof(int) is 4). Dereferencing *(p + 2) accesses arr[2], which yields the value 30.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Pointer arithmetic automatically scales address offsets by sizeof(T)",
      "Address increases by 2 * sizeof(int) (usually 8 bytes)",
      "*(p + 2) evaluates to 30 (the third element)"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains scaling by sizeof(T)",
        "Calculates byte offset correctly",
        "Identifies value 30"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Does adding 1 to a pointer add 1 byte or sizeof(int) bytes?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "c_003",
    "questionText": "Explain the difference between passing by value and passing by reference using pointers in C. Write a swap function 'void swap(int *a, int *b)' and explain stack frame memory changes during execution.",
    "category": "C",
    "topic": "Pointers & Memory Addresses",
    "subtopic": "Pass-by-Reference with Pointers",
    "difficulty": "Easy",
    "questionType": "coding",
    "sequenceOrder": 3,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Software Engineer Intern",
      "Junior Software Engineer",
      "C/C++ Developer"
    ],
    "interviewMode": "coding",
    "tags": [
      "c",
      "pointers",
      "pass-by-reference",
      "stack"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "In C, all arguments are strictly passed by value. To simulate pass-by-reference, the caller passes the memory addresses of variables (&x, &y) by value. The swap function receives copies of those pointer addresses: void swap(int *a, int *b) { int temp = *a; *a = *b; *b = temp; }. Dereferencing (*a) writes directly into the caller stack frame's variable memory, persisting changes after swap's stack frame pops.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "C strictly uses pass-by-value; pointers pass address values to achieve simulated pass-by-reference",
      "Correct swap implementation dereferencing pointers with temporary variable",
      "Modifies caller stack frame values directly via dereference (*a = *b)"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Correct pointer dereferencing swap code",
        "Explains address passing mechanism",
        "Describes caller stack memory mutation"
      ],
      "minimumPassingScore": 6
    },
    "hints": [
      "Why would 'void swap(int a, int b)' fail to affect the caller's variables?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "c_004",
    "questionText": "What are Structures and Unions in C, and how do member alignment and compiler padding affect 'sizeof(struct MyStruct)'?",
    "category": "C",
    "topic": "Structures, Unions & Bit Fields",
    "subtopic": "Struct Padding & Memory Alignment",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 4,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Junior Software Engineer",
      "Systems Engineer",
      "Embedded Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "c",
      "structs",
      "unions",
      "memory-alignment",
      "padding"
    ],
    "companyStyleLabel": "Enterprise / FinTech",
    "referenceAnswer": "In a struct, all members are stored sequentially in memory and each has its own distinct offset. In a union, all members share the same base memory address and sizeof(union) is the size of its largest member. CPUs access memory most efficiently on word-aligned boundaries (e.g. 4 or 8 bytes). Compilers insert unused padding bytes between members or at struct end so each member's offset is a multiple of its alignment requirement, often making sizeof(struct) larger than the sum of member sizes.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Struct stores all members sequentially; union overlays all members on same memory base",
      "Hardware alignment requirements mandate data offsets be multiples of type size",
      "Compiler inserts padding bytes causing sizeof(struct) > sum of individual members",
      "Reordering struct members from largest to smallest minimizes padding waste"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Contrasts struct vs union memory layout",
        "Explains why compiler inserts alignment padding",
        "Provides struct reordering optimization rule"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Consider 'struct { char a; int b; char c; }' vs 'struct { int b; char a; char c; }'."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "c_005",
    "questionText": "Explain Function Pointers in C. How are they declared, and how are they used to implement callbacks and custom comparator functions like in the standard library 'qsort()'?",
    "category": "C",
    "topic": "Functions, Function Pointers & Callbacks",
    "subtopic": "Function Pointers & Callbacks",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Junior Software Engineer",
      "C/C++ Developer",
      "Systems Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "c",
      "function-pointers",
      "callbacks",
      "qsort"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "A function pointer stores the memory address of executable code in the text segment. Declaration syntax: 'return_type (*ptr_name)(param_types)'. In qsort(void *base, size_t nitems, size_t size, int (*compar)(const void *, const void *)), qsort delegates element comparison to the caller's callback function pointer. The comparator dereferences cast pointers (const int *p1, const int *p2) and returns negative, zero, or positive, enabling generic polymorphic sorting in C without templates.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Syntax: return_type (*ptr_name)(param_types) with parentheses around pointer name",
      "Points to function entry point in code/text segment",
      "qsort uses function pointer callbacks to decouple sorting algorithm from element comparison"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Correct declaration syntax",
        "Explains qsort comparator contract (negative/zero/positive)",
        "Details const void* pointer casting"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Remember why parentheses are mandatory: 'int (*fp)()' vs 'int *fp()'."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "c_006",
    "questionText": "What constitutes Undefined Behavior (UB) in C? Give three concrete examples (e.g. buffer overflow, signed integer overflow, use-after-free) and explain why UB is dangerous in production systems.",
    "category": "C",
    "topic": "Undefined Behavior, Segmentation Faults & Memory Leaks",
    "subtopic": "Undefined Behavior & Memory Vulnerabilities",
    "difficulty": "Hard",
    "questionType": "scenario",
    "sequenceOrder": 6,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      "SDE-1",
      "C/C++ Developer",
      "Systems Engineer",
      "Security Engineer"
    ],
    "interviewMode": "scenario",
    "tags": [
      "c",
      "undefined-behavior",
      "memory-safety",
      "buffer-overflow"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "Undefined Behavior (UB) means the C standard imposes no requirements; the compiler is free to assume UB never occurs and may optimize away security checks, crash with SIGSEGV, corrupt memory, or format the drive. Examples: (1) Out-of-bounds array access (buffer overflow leading to stack smashing or code injection); (2) Signed integer overflow (INT_MAX + 1 which compilers assume impossible and optimize away bounds checks); (3) Use-after-free (accessing memory after free() has returned it to heap manager). UB is insidious because it may appear to work in debug mode but catastrophically fail under -O3 optimization.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "UB has zero standard guarantees; compiler assumes it never happens during optimization",
      "Examples: buffer overflow, signed overflow, use-after-free, uninitialized variable read",
      "Dangerous because compiler optimizations can eliminate critical security guard clauses"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Accurately defines Undefined Behavior vs Unspecified/Implementation-defined",
        "Provides 3 distinct real-world UB examples",
        "Explains compiler optimization hazards (-O3)"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "Why does the C standard distinguish between Implementation-Defined Behavior and Undefined Behavior?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "c___001",
    "questionText": "What is RAII (Resource Acquisition Is Initialization) in C++? Compare std::unique_ptr and std::shared_ptr, and explain how std::weak_ptr solves circular references.",
    "category": "C++",
    "topic": "Smart Pointers (unique_ptr, shared_ptr, weak_ptr)",
    "subtopic": "Memory Ownership & RAII",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Junior Software Engineer",
      "C/C++ Developer",
      "Systems Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "c++",
      "smart-pointers",
      "raii",
      "memory-management"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "RAII binds the lifecycle of a resource (heap memory, file handles, sockets) to the lifetime of an automatic object, guaranteeing destruction and resource cleanup when the object exits its scope even if an exception is thrown. std::unique_ptr enforces exclusive ownership; it cannot be copied, only moved via std::move(). std::shared_ptr provides shared ownership via reference counting, freeing the resource when the count reaches zero. If two shared_ptrs reference each other, their count never reaches zero, creating a memory leak; std::weak_ptr provides a non-owning observer reference that does not increment the reference count, breaking cyclic dependencies.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "RAII ties resource cleanup to object destructor and scope exit",
      "unique_ptr has exclusive ownership and move-only semantics",
      "shared_ptr uses reference counting; weak_ptr is a non-owning observer that breaks reference cycles"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Defines RAII and deterministic destruction",
        "Contrasts unique_ptr and shared_ptr ownership models",
        "Explains weak_ptr preventing circular reference leaks"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Consider what happens to shared_ptr refCount when Node A points to Node B and Node B points to Node A."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "c___002",
    "questionText": "Why must a base class destructor be declared virtual in C++ if derived classes are deleted through base class pointers? Explain the VTable mechanism.",
    "category": "C++",
    "topic": "OOP, Inheritance, Virtual Functions & VTable",
    "subtopic": "Dynamic Dispatch & Virtual Destructors",
    "difficulty": "Hard",
    "questionType": "conceptual",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      "SDE-1",
      "C/C++ Developer",
      "Systems Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "c++",
      "vtable",
      "virtual-destructor",
      "polymorphism"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "If a base class destructor is not virtual and an object of a derived class is deleted through a pointer to the base class, the compiler statically resolves the destructor call to Base::~Base(). As a result, the derived class destructor is never invoked, leaking any resources allocated by the derived class and causing undefined behavior. Declaring it virtual places the destructor entry into the class's Virtual Method Table (VTable), enabling dynamic dispatch through the vptr at runtime to execute Derived::~Derived() followed by Base::~Base().",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Deleting a derived object via non-virtual base pointer causes undefined behavior and resource leaks",
      "Derived destructor is bypassed without dynamic dispatch",
      "Virtual destructor places destructor in the VTable so runtime dispatch invokes the full destructor chain"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains slicing/leak when derived destructor is skipped",
        "Explains static vs dynamic dispatch",
        "Mentions VTable/vptr mechanism"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "What does the compiler generate when deleting through a pointer to a class with non-virtual methods?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "c___003",
    "questionText": "Compare `std::vector`, `std::list`, and `std::deque` in the C++ Standard Template Library (STL). When would you choose one container over another based on iterator invalidation and cache locality?",
    "category": "C++",
    "topic": "STL Containers (vector, map, unordered_map, set)",
    "subtopic": "STL Sequence Containers",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 3,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Junior Software Engineer",
      "C/C++ Developer",
      "Systems Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "c++",
      "stl",
      "vector",
      "deque",
      "list",
      "cache-locality"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "std::vector stores elements contiguously in heap memory, providing O(1) random access and excellent CPU cache locality, but reallocation invalidates all iterators and middle insertions are O(n). std::list is a doubly linked list offering O(1) insertions/deletions anywhere without invalidating other iterators, but suffers from poor cache locality and node pointer memory overhead. std::deque uses chunked contiguous buffers, offering O(1) push/pop at both front and back without full reallocations, balancing cache locality with non-invalidating growth at ends.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "std::vector provides contiguous memory, best cache locality, and O(1) random access",
      "std::list provides stable iterators on insertion/deletion but poor cache locality",
      "std::deque provides double-ended O(1) insertion across chunked buffers"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Contrasts memory layout and cache locality",
        "Explains iterator invalidation rules across all three",
        "Provides appropriate production use cases"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Consider CPU cache line prefetching for contiguous arrays vs pointer chasing in linked lists."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "c___004",
    "questionText": "Explain Move Semantics and Rvalue References (`&&`) in modern C++ (C++11). How does `std::move` avoid expensive deep copies when transferring ownership of dynamic resources?",
    "category": "C++",
    "topic": "Move Semantics, Rvalue References & std::move",
    "subtopic": "Rvalue References & Move Semantics",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 4,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Junior Software Engineer",
      "SDE-1",
      "C/C++ Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "c++",
      "move-semantics",
      "rvalue",
      "std-move",
      "c++11"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "Move semantics allow transferring ownership of heap resources from a temporary or dying object (rvalue) to a new object without allocating fresh memory or copying data. Rvalue references (`T&&`) bind to temporaries. `std::move` is an unconditional static_cast converting an lvalue into an rvalue reference, allowing the move constructor or move assignment operator to steal pointers (e.g. `data = other.data; other.data = nullptr;`), converting O(n) deep copies into O(1) pointer swaps.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Rvalue references (T&&) bind to temporary objects about to be destroyed",
      "std::move casts an expression to an rvalue to enable move construction",
      "Move constructors steal pointer references (O(1)) instead of performing deep copies (O(n))",
      "Moved-from object must be left in a valid, destructible state"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Defines rvalue vs lvalue",
        "Explains that std::move does not move anything by itself—it's a cast",
        "Details pointer stealing and nulling the source"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "What does std::move actually do at compile time? Is it a function call or a cast?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "c___005",
    "questionText": "Explain C++ Templates and Template Specialization (Full vs Partial). How does compile-time template instantiation compare with runtime polymorphism via virtual functions in terms of binary size and execution speed?",
    "category": "C++",
    "topic": "Templates, Metaprogramming & Type Traits",
    "subtopic": "Templates & Metaprogramming",
    "difficulty": "Hard",
    "questionType": "conceptual",
    "sequenceOrder": 5,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      "SDE-1",
      "C/C++ Developer",
      "Systems Engineer",
      "Quant Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "c++",
      "templates",
      "specialization",
      "metaprogramming",
      "polymorphism"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "Templates provide compile-time parametric polymorphism: the compiler generates specialized code for each concrete type used. Full specialization customizes the implementation for a specific type (e.g. template<> class Vector<bool>); partial specialization customizes for a subset of types (e.g. template<typename T> class Vector<T*>). Unlike virtual functions which incur runtime vtable pointer indirection and inhibit inlining, templates have zero runtime dispatch overhead and enable aggressive compiler inlining and vectorization, at the expense of potential code bloat and longer compilation times.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Templates instantiate distinct machine code per type at compile time",
      "Full specialization specializes all template parameters; partial specializes a subset or pointer/reference pattern",
      "Zero runtime indirection cost vs vtable dynamic dispatch (enables function inlining)",
      "Trade-off: potential binary bloat and extended compilation times"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Contrasts compile-time vs runtime polymorphism",
        "Explains full vs partial specialization syntax and mechanics",
        "Details execution speed advantages vs binary bloat"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "Why does std::vector<bool> have a specialized implementation in the standard library?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "c__001",
    "questionText": "In C# and .NET, what is the difference between IEnumerable and IQueryable? How does deferred execution impact database queries in Entity Framework?",
    "category": "C#",
    "topic": "LINQ (Language Integrated Query) & Expressions",
    "subtopic": "IEnumerable vs IQueryable & Deferred Execution",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      ".NET Developer",
      "Backend Developer",
      "Junior Software Engineer",
      "Full Stack Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "c#",
      ".net",
      "linq",
      "entity-framework"
    ],
    "companyStyleLabel": "Enterprise / FinTech",
    "referenceAnswer": "IEnumerable<T> represents in-memory collections and evaluates operations using C# delegates in application memory (client-side). IQueryable<T> inherits from IEnumerable and represents queryable data providers (like Entity Framework), storing queries as Expression Trees. When filtering with IQueryable, expressions are translated into optimized SQL executed on the database server. Deferred execution means the query is not executed when defined, but only when iterated (e.g. via foreach, ToList(), or Count()). If filtering occurs after casting to IEnumerable, all records are fetched into memory first, causing severe performance degradation.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "IEnumerable executes in-memory using C# delegates",
      "IQueryable parses Expression Trees to translate filters into database SQL",
      "Deferred execution executes SQL only upon materialization (ToList(), FirstOrDefault(), foreach)"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Contrasts in-memory vs provider expression tree evaluation",
        "Explains server-side SQL translation",
        "Explains deferred execution trigger"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "What happens if you call .AsEnumerable() before .Where() on an EF DbSet?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "go_001",
    "questionText": "Explain how Goroutines and Channels work in Go. What is the difference between buffered and unbuffered channels, and how does the 'select' statement handle non-blocking communication?",
    "category": "Go",
    "topic": "Channels (Buffered, Unbuffered) & select Statement",
    "subtopic": "Channel Mechanics & Multiplexing",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Go Developer",
      "Backend Developer",
      "Cloud Engineer",
      "SDE-1"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "go",
      "golang",
      "goroutines",
      "channels",
      "concurrency"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Goroutines are lightweight userspace threads managed by the Go runtime scheduler (costing ~2KB initial stack). Channels provide type-safe synchronization and communication between goroutines following CSP (Communicating Sequential Processes). An unbuffered channel (make(chan int)) has zero capacity; a send blocks until another goroutine is ready to receive (synchronous rendezvous). A buffered channel (make(chan int, N)) has capacity N; sending only blocks when the buffer is full, and receiving only blocks when the buffer is empty. The 'select' statement multiplexes channel operations, executing whichever case is ready. Adding a 'default' case makes channel sends/receives non-blocking if no channel is immediately ready.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Goroutines are lightweight green threads (~2KB stack) multiplexed onto OS threads",
      "Unbuffered channels block until sender and receiver sync; buffered channels block only when full/empty",
      "Select multiplexes channel operations; default case prevents blocking"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains goroutines vs OS threads",
        "Contrasts unbuffered vs buffered channel blocking semantics",
        "Explains select statement with default non-blocking behavior"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Think about what happens to a sender if nobody is reading from an unbuffered channel."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "rust_001",
    "questionText": "Explain Rust's Ownership and Borrowing system. What are the three core rules of the borrow checker, and how does Rust guarantee memory safety without a garbage collector?",
    "category": "Rust",
    "topic": "Ownership System, Move Semantics & Copy vs Clone",
    "subtopic": "Borrow Checker Rules",
    "difficulty": "Hard",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      "Rust Developer",
      "Systems Engineer",
      "Backend Developer",
      "SDE-1"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "rust",
      "ownership",
      "borrow-checker",
      "memory-safety"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "Rust achieves memory safety without a garbage collector through compile-time ownership tracking: 1. Each value has an owner variable. 2. There can only be one owner at a time; assigning or passing non-Copy types moves ownership. 3. When the owner goes out of scope, the value is automatically dropped (freed). The borrow checker enforces: You can have either any number of immutable references (&T) OR exactly one mutable reference (&mut T) at any given time, and references must always be valid (never outlive the owner). This statically eliminates data races, use-after-free, double-free, and dangling pointers at compile time.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Every value has exactly one owner, and dropping the owner cleans up memory",
      "Aliasing XOR Mutability: multiple &T OR one &mut T, never both simultaneously",
      "References must never outlive the referent, preventing dangling pointers and data races at compile time"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "States ownership rules and move semantics",
        "Explains immutable vs mutable reference constraints (Aliasing XOR Mutability)",
        "Explains compile-time elimination of data races and memory bugs"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "Think about what happens when two threads try to write to the same memory location at once."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "typescript_001",
    "questionText": "What is the difference between an interface and a type alias in TypeScript? In what situations would you specifically choose an interface over a type alias?",
    "category": "TypeScript",
    "topic": "Interfaces vs Type Aliases & Declaration Merging",
    "subtopic": "Type Modeling & Declaration Merging",
    "difficulty": "Easy",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Frontend Developer",
      "Full Stack Developer",
      "TypeScript Developer",
      "Junior Software Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "typescript",
      "interfaces",
      "types",
      "declaration-merging"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Both interfaces and type aliases can define object shapes. Key differences: 1. Declaration Merging: Multiple interface declarations with the same name automatically merge into one unified definition (critical for augmenting library types and global Window/Express types); type aliases cannot be reopened and will throw a duplicate identifier error. 2. Capabilities: Type aliases can model unions (type Status = 'a' | 'b'), primitives, tuples, and mapped types, whereas interfaces only describe object/function contracts. Use interfaces for public APIs, object definitions, and OOP class contracts ('implements'); use type aliases for unions, primitives, and complex utility transforms.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Interfaces support declaration merging; type aliases cannot be reopened",
      "Type aliases support unions, intersections, primitives, and utility types",
      "Interfaces are preferred for public API models and class contracts ('implements')"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Identifies declaration merging with interfaces",
        "Explains unions/primitives capability of type aliases",
        "Recommends appropriate use cases for each"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Think about extending an existing type definition provided by a third-party npm package."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "bash_001",
    "questionText": "How do file descriptors, pipes, and redirection work in Bash? Explain the syntax 'command > output.log 2>&1' and why the order of redirection matters.",
    "category": "Bash",
    "topic": "Pipes, Input/Output Redirection & File Descriptors",
    "subtopic": "Standard Streams & Redirection",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "DevOps Engineer",
      "Site Reliability Engineer",
      "Junior Software Engineer",
      "Backend Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "bash",
      "shell",
      "redirection",
      "linux"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Linux processes have three standard file descriptors: 0 (stdin), 1 (stdout), and 2 (stderr). 'command > output.log 2>&1' redirects stdout (FD 1) to output.log, and then duplicates stderr (FD 2) to point to the current destination of stdout (output.log), redirecting both output and errors into output.log. Redirection is evaluated strictly from left to right: if you wrote '2>&1 > output.log', stderr would first be redirected to wherever stdout currently points (the terminal), and then stdout would be redirected to the file, failing to capture errors in the log file.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "FD 0 = stdin, FD 1 = stdout, FD 2 = stderr",
      "> output.log redirects stdout; 2>&1 redirects stderr to stdout's target",
      "Redirections are evaluated left-to-right; ordering determines target file descriptor resolution"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Identifies standard file descriptors 0, 1, 2",
        "Explains left-to-right evaluation order",
        "Explains why reversing order fails to capture errors"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "What does file descriptor 2 represent, and why does &1 refer to descriptor 1?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "devops_001",
    "questionText": "Compare Blue/Green Deployments with Canary Deployments in CI/CD. How do you handle database schema migrations without incurring downtime during a Canary rollout?",
    "category": "DevOps",
    "topic": "Deployment Strategies: Blue/Green, Canary, Rolling, Feature Flags",
    "subtopic": "Zero-Downtime Deployments & Migrations",
    "difficulty": "Medium",
    "questionType": "scenario",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "DevOps Engineer",
      "Site Reliability Engineer",
      "Cloud Engineer",
      "Backend Developer"
    ],
    "interviewMode": "scenario",
    "tags": [
      "devops",
      "cicd",
      "canary",
      "blue-green",
      "database-migrations"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Blue/Green deployment maintains two identical production environments; traffic is switched instantly from Blue to Green via the router/load balancer, offering simple rollbacks. Canary deployment routes a tiny slice of production traffic (e.g. 2-5%) to the new version to monitor metrics and error rates before gradual promotion. For database migrations without downtime, use the Expand/Contract (Parallel Run) pattern: 1. Expand: Add new nullable columns or tables without breaking old code. 2. Write to both old and new schemas simultaneously in the application. 3. Backfill historical data. 4. Switch reads to the new schema. 5. Contract: Remove old deprecated columns once all traffic runs on the new version.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Blue/green switches 100% traffic between identical environments; Canary gradually ramps traffic based on telemetry",
      "Expand/Contract (Parallel Run) pattern decouples DB changes from application deployment",
      "New columns must be nullable or have safe defaults to maintain backwards compatibility with old code"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Contrasts Blue/Green vs Canary traffic routing",
        "Explains the Expand/Contract migration pattern",
        "Addresses backward compatibility of DB schemas"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Consider what happens when the old version of the app reads from a table modified by the new version."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "docker___kubernetes_001",
    "questionText": "What is the difference between Kubernetes Liveness, Readiness, and Startup Probes? What happens if a Readiness Probe fails versus when a Liveness Probe fails?",
    "category": "Docker & Kubernetes",
    "topic": "Pods, ReplicaSets, Deployments & StatefulSets",
    "subtopic": "Container Health Probes",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "DevOps Engineer",
      "Site Reliability Engineer",
      "Backend Developer",
      "Cloud Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "kubernetes",
      "docker",
      "k8s",
      "probes",
      "containers"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Startup Probes determine if legacy or slow-starting containers have initialized, disabling liveness and readiness checks until passing. Readiness Probes check if the pod is ready to accept traffic; if a readiness probe fails, Kubernetes removes the pod's IP address from Service endpoints so no requests are routed to it, but the container is NOT restarted. Liveness Probes check if the application is alive and healthy; if a liveness probe fails, the kubelet kills the container and initiates a restart according to its restartPolicy (e.g. CrashLoopBackOff on persistent failure).",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Startup probe protects slow-starting applications during initial boot",
      "Readiness failure isolates pod from Service endpoints without killing the container",
      "Liveness failure causes kubelet to restart/kill the unhealthy container"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Distinguishes traffic isolation (Readiness) from container restart (Liveness)",
        "Defines Startup probe purpose",
        "Explains impact on Service endpoints"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Think about what should happen when a pod is temporarily overloaded vs when it is deadlocked."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "web_security_001",
    "questionText": "How does Stored Cross-Site Scripting (XSS) differ from Reflected and DOM-based XSS? What defense-in-depth measures (Content Security Policy, contextual encoding, cookie flags) prevent exploitation?",
    "category": "Web Security",
    "topic": "Cross-Site Scripting (XSS: Stored, Reflected, DOM)",
    "subtopic": "XSS Types & Defenses",
    "difficulty": "Hard",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      "Security Engineer",
      "Application Security Engineer",
      "Full Stack Developer",
      "Backend Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "security",
      "xss",
      "csp",
      "owasp",
      "cookies"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Stored XSS persists malicious payload in the database, serving it to every victim who views the content. Reflected XSS reflects the payload immediately off the server (e.g. in error messages or search query parameters). DOM-based XSS executes entirely on the client when client-side JavaScript reads from an untrusted source (e.g. location.hash) and writes to an unsafe sink (e.g. innerHTML) without server interaction. Defense in depth: 1. Context-aware output encoding (HTML, JavaScript, CSS context) before rendering. 2. Strong Content Security Policy (CSP) restricting script execution sources and disallowing unsafe-inline. 3. Setting HttpOnly and SameSite flags on sensitive session cookies to prevent JavaScript exfiltration.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Stored persists in DB; Reflected reflects off immediate server response; DOM executes client-side via sink/source",
      "Context-aware output encoding sanitizes dynamic input before DOM insertion",
      "CSP restricts script execution sources; HttpOnly prevents cookie theft via document.cookie"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Accurately defines Stored, Reflected, and DOM XSS",
        "Explains CSP (Content Security Policy)",
        "Explains HttpOnly cookie defense"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "Does DOM-based XSS require any payload to be sent to or returned by the backend server?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "vector_db___rag_001",
    "questionText": "Explain the end-to-end architecture of a Retrieval-Augmented Generation (RAG) system. How do chunking strategies, dense embeddings, and cross-encoder re-rankers improve response quality?",
    "category": "Vector DB & RAG",
    "topic": "RAG Architecture & End-to-End Pipeline Workflow",
    "subtopic": "Chunking, Vector Search & Re-Ranking",
    "difficulty": "Medium",
    "questionType": "scenario",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "AI Engineer",
      "Machine Learning Engineer",
      "LLM Application Developer",
      "Backend Developer"
    ],
    "interviewMode": "scenario",
    "tags": [
      "ai",
      "rag",
      "vector-db",
      "embeddings",
      "llm"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "A RAG system augments LLMs with external proprietary knowledge: 1. Ingestion: Documents are segmented into semantically coherent chunks with overlap (e.g. 500 tokens with 50-token overlap) and transformed into dense vector embeddings using models like OpenAI text-embedding-3 or BGE. 2. Indexing: Stored in a vector database (Pinecone, Weaviate, Milvus) using HNSW (Hierarchical Navigable Small World) indexing. 3. Retrieval: Query embedding is matched against document vectors using cosine similarity or hybrid search (combining dense vectors + BM25 keyword search). 4. Re-ranking: A cross-encoder model scores top-K retrieved chunks to filter out noise. 5. Generation: Re-ranked top chunks are injected into the LLM system prompt as grounded context for synthesized, citation-backed answers.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Pipeline stages: Ingestion -> Chunking -> Vector Embedding -> Vector Indexing -> Retrieval -> Re-ranking -> LLM Generation",
      "Chunk size and overlap balance context granularity against lost cross-chunk relationships",
      "Hybrid search (BM25 + Dense) with Cross-Encoder re-ranking drastically cuts retrieval noise and hallucination"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains end-to-end ingestion and retrieval lifecycle",
        "Explains chunking with overlap trade-offs",
        "Explains re-ranking and hybrid search benefits"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Why is semantic vector search alone sometimes worse than keyword search for exact product serial numbers or acronyms?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "generative_ai___llms_001",
    "questionText": "How do Temperature, Top-K, and Top-P (Nucleus) sampling controls influence LLM generation? How do you prevent hallucinations in high-stakes production applications?",
    "category": "Generative AI & LLMs",
    "topic": "Tokenization, Context Windows & Temperature/Top-P Controls",
    "subtopic": "Sampling Parameters & Hallucination Prevention",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "AI Engineer",
      "Machine Learning Engineer",
      "Generative AI Engineer",
      "Full Stack Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "genai",
      "llm",
      "temperature",
      "prompt-engineering",
      "hallucinations"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Temperature flattens or sharpens the softmax probability distribution over vocabulary tokens: lower temperature (0.0 - 0.2) makes generation deterministic and focused on top probability tokens (ideal for code and factual tasks), while higher temperature (0.7 - 1.0) increases creativity and randomness. Top-K restricts candidate tokens to the K highest probability tokens. Top-P (Nucleus sampling) dynamically selects from the smallest set of tokens whose cumulative probability exceeds P (e.g. 0.9), adapting the candidate pool size based on distribution confidence. To prevent hallucinations: Ground prompts with verifiable retrieved context (RAG), enforce strict system instructions instructing the model to say 'I don't know', use structured outputs (JSON schema), and implement automated guardrail validators (e.g. NeMo Guardrails).",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Temperature scales logits before softmax, controlling randomness vs determinism",
      "Top-P sets dynamic probability cutoff; Top-K sets fixed count cutoff",
      "Hallucination mitigation requires grounded RAG context, low temperature, and guardrail validation"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Correctly defines Temperature, Top-K, and Top-P",
        "Explains softmax logit scaling",
        "Provides concrete hallucination reduction techniques"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Consider what happens to the token probability distribution when temperature approaches zero."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "distributed_systems_001",
    "questionText": "How does the Raft consensus algorithm handle leader election and log replication in distributed systems? How does it resolve network partitions and split-brain scenarios?",
    "category": "Distributed Systems",
    "topic": "Distributed Consensus Algorithms (Raft, Paxos)",
    "subtopic": "Leader Election & Split-Brain Prevention",
    "difficulty": "Hard",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      "Staff / Principal Engineer",
      "Distributed Systems Engineer",
      "Backend Developer",
      "Cloud Architect"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "distributed-systems",
      "raft",
      "consensus",
      "replication",
      "split-brain"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "Raft decomposes consensus into Leader Election, Log Replication, and Safety: 1. Roles: Nodes are in Leader, Follower, or Candidate state. If a follower detects leader heartbeat timeout, it increments its term and requests votes. 2. Quorum: A candidate requires a majority vote (> N/2) to become leader, ensuring at most one leader per term. 3. Log Replication: The leader appends client entries to its log and replicates to followers via AppendEntries RPCs; an entry is committed once replicated across a majority. 4. Split-Brain: In a network partition, the minority partition cannot gather a majority vote, so any writes to an isolated leader remain uncommitted. When the partition heals, the minority partition discovers the higher term and higher commit index of the majority leader, rolling back its uncommitted entries and syncing with the true leader.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Raft states: Follower, Candidate, Leader with randomized election timeouts",
      "Majority quorum (> N/2) guarantees at most one leader can commit entries in any given term",
      "Minority partitions cannot reach consensus, preventing split-brain writes; uncommitted entries roll back on reconnect"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains Leader Election and majority quorum",
        "Explains log replication and commitment threshold",
        "Explains partition handling and split-brain prevention"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "Why does Raft require an odd number of nodes (3, 5, 7) for fault tolerance?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "ruby_001",
    "questionText": "What is the difference between Blocks, Procs, and Lambdas in Ruby? How do argument checking and the `return` keyword behave differently between a Proc and a Lambda?",
    "category": "Ruby",
    "topic": "Blocks, Procs and Lambdas & Closures",
    "subtopic": "Proc vs Lambda Semantics & Return Behavior",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Ruby / Rails Developer",
      "Backend Developer",
      "Junior Software Engineer",
      "Full Stack Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "ruby",
      "procs",
      "lambdas",
      "closures",
      "blocks"
    ],
    "companyStyleLabel": "High-Growth Startup",
    "referenceAnswer": "In Ruby, a Block is syntax passed to a method via `yield` and is not an object. Procs and Lambdas are both instances of the `Proc` class, but differ in two critical ways: 1. Argument Checking: Lambdas enforce strict arity (raising an ArgumentError on mismatch), whereas Procs ignore missing arguments (assigning nil) and discard extras. 2. Return Behavior: A `return` inside a Lambda returns only from the lambda itself back to the caller, whereas a `return` inside a Proc attempts to return from the enclosing method where the Proc was defined, potentially raising a LocalJumpError if the enclosing scope has already exited.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Blocks are syntactic constructs executed with yield; Procs and Lambdas are Proc objects",
      "Lambdas enforce strict argument arity; Procs treat omitted arguments as nil",
      "return in a Lambda returns from the lambda; return in a Proc returns from the enclosing method scope"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Contrasts block syntax with Proc objects",
        "Explains strict vs lenient argument arity",
        "Explains return scoping difference"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Think about what happens when you call a proc with 3 arguments when it only expects 1."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "ruby_002",
    "questionText": "Explain what the N+1 query problem is in Ruby on Rails ActiveRecord. How do `includes`, `preload`, and `eager_load` resolve it differently?",
    "category": "Ruby",
    "topic": "ActiveRecord Associations, Scopes & N+1 Query Optimization",
    "subtopic": "ActiveRecord Eager Loading Strategies",
    "difficulty": "Medium",
    "questionType": "scenario",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Ruby / Rails Developer",
      "Backend Developer",
      "Software Development Engineer (SDE-1)"
    ],
    "interviewMode": "scenario",
    "tags": [
      "ruby",
      "rails",
      "activerecord",
      "n+1",
      "database-optimization"
    ],
    "companyStyleLabel": "High-Growth Startup",
    "referenceAnswer": "The N+1 problem occurs when fetching N records causes Rails to execute 1 initial query followed by N individual database queries to load child associations in a loop. `preload` always executes 2 separate SQL queries (one for parent records, one `WHERE parent_id IN (...)` for associations). `eager_load` forces a single SQL query using a `LEFT OUTER JOIN`. `includes` delegates intelligently: by default it acts like `preload` with two queries, but if you reference associated table columns in a `where` or `order` clause without explicit joins, it automatically falls back to `eager_load` with a `LEFT OUTER JOIN`.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "N+1 query is 1 parent query followed by N individual child queries",
      "preload always uses 2 queries with IN (...) clause",
      "eager_load uses a single query with LEFT OUTER JOIN",
      "includes defaults to 2 queries but falls back to LEFT OUTER JOIN when conditions reference associated tables"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Defines N+1 query problem clearly",
        "Differentiates preload (2 queries) vs eager_load (LEFT OUTER JOIN)",
        "Explains smart delegation in includes"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Which method allows you to filter parents by child attributes in a WHERE clause?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "php_001",
    "questionText": "What is the difference between PDO (PHP Data Objects) and MySQLi? How do prepared statements in PDO protect against SQL Injection vulnerabilities?",
    "category": "PHP",
    "topic": "Database Operations with PDO & Prepared Statements",
    "subtopic": "PDO Architecture & Prepared Statement Security",
    "difficulty": "Easy",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "PHP / Laravel Developer",
      "Backend Developer",
      "Junior Software Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "php",
      "pdo",
      "mysqli",
      "sql-injection",
      "security"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "PDO is a database abstraction layer supporting 12+ database drivers with a unified OOP interface, named parameter placeholders (:name), and transaction management. MySQLi works exclusively with MySQL databases. Prepared statements prevent SQL Injection by separating the SQL query structure from the user-supplied data: the database engine pre-compiles the query template with placeholders before binding parameters as raw literal values, guaranteeing that user input is never parsed or executed as executable SQL syntax.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "PDO supports multiple database systems; MySQLi supports only MySQL",
      "PDO allows named parameters (:id) in addition to positional (?)",
      "Prepared statements compile the query structure before binding user data, preventing input from altering SQL parsing"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Contrasts database driver support between PDO and MySQLi",
        "Explains pre-compilation vs data binding mechanics",
        "Explains SQL injection prevention"
      ],
      "minimumPassingScore": 6
    },
    "hints": [
      "How does the database distinguish between SQL commands and user data in a prepared statement?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "php_002",
    "questionText": "How do PHP 8.x Attributes differ from traditional PHPDoc docblock annotations? Explain what new capabilities PHP 8 introduced with Attributes, Match expressions, and Named Arguments.",
    "category": "PHP",
    "topic": "Modern PHP Features (PHP 8.x: Attributes, Match, JIT, Fibers)",
    "subtopic": "Modern PHP 8 Features & Reflection",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "PHP / Laravel Developer",
      "Backend Developer",
      "Software Development Engineer (SDE-1)"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "php",
      "php8",
      "attributes",
      "reflection",
      "modern-php"
    ],
    "companyStyleLabel": "Enterprise / FinTech",
    "referenceAnswer": "Traditional PHPDoc annotations were unstructured docblock comments parsed via regex or external AST parsers at runtime, with no compiler validation or type checking. PHP 8 Attributes (#[Attribute]) are first-class language syntax natively validated by the PHP parser and queried via the Reflection API (`getAttributes()`). Match expressions provide a strict, type-safe alternative to `switch` that returns a value and eliminates fall-through bugs without needing `break`. Named arguments allow passing values based on parameter names (`fn(count: 5)`), improving readability and skipping optional defaults.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Attributes are native language syntax validated at compile time, unlike docblock comments",
      "Queried via native Reflection API methods (getAttributes())",
      "Match expressions use strict identity (===) comparisons and return values directly",
      "Named arguments allow skipping defaults and self-documenting invocations"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Contrasts native attributes with docblock annotations",
        "Explains Reflection API integration",
        "Mentions strictness of match expression vs switch"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Remember: match expressions use strict === comparison and do not require break statements."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "kotlin_001",
    "questionText": "How does Kotlin achieve compile-time Null Safety? Explain the difference between safe call (`?.`), Elvis operator (`?:`), and the not-null assertion operator (`!!`).",
    "category": "Kotlin",
    "topic": "Null Safety, Safe Call (?.) & Elvis Operator (?:)",
    "subtopic": "Compile-Time Nullability Enforcement",
    "difficulty": "Easy",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Kotlin Developer",
      "Android Developer",
      "Backend Developer",
      "Junior Software Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "kotlin",
      "null-safety",
      "elvis-operator",
      "android"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Kotlin incorporates nullability directly into its type system by distinguishing non-nullable types (`String`) from nullable types (`String?`). The compiler forbids assigning null or invoking methods directly on nullable references without validation. The safe call operator (`?.`) executes a method or property access only if the reference is non-null, returning null otherwise. The Elvis operator (`?:`) provides a fallback default value when an expression evaluates to null. The not-null assertion (`!!`) forcibly converts a nullable reference into a non-nullable type, throwing a NullPointerException at runtime if the value is null.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Kotlin type system separates nullable (T?) and non-nullable (T) types at compile time",
      "Safe call (?.) evaluates conditionally and returns null if target is null",
      "Elvis operator (?:) provides fallback default when null",
      "Not-null assertion (!!) bypasses compile safety and throws NPE on null"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains type-system separation of nullable vs non-nullable",
        "Accurately defines ?., ?:, and !!",
        "Warns about runtime NPE risks with !!"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "What does the compiler output if you try to assign null to a variable declared as String?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "kotlin_002",
    "questionText": "Explain how Kotlin Coroutines achieve non-blocking concurrency. What is the difference between `launch` and `async`, and how does `withContext(Dispatchers.IO)` switch threads under the hood?",
    "category": "Kotlin",
    "topic": "Coroutines, Dispatchers, Scopes & Flow",
    "subtopic": "Coroutines Structured Concurrency & Dispatchers",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Kotlin Developer",
      "Android Developer",
      "Backend Developer",
      "Software Development Engineer (SDE-1)"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "kotlin",
      "coroutines",
      "dispatchers",
      "async",
      "concurrency"
    ],
    "companyStyleLabel": "High-Growth Startup",
    "referenceAnswer": "Kotlin Coroutines are suspendable computations that can pause execution at `suspend` functions without blocking underlying OS threads. Suspension is compiled into a state machine passing a `Continuation` object. `launch` is a fire-and-forget coroutine builder that returns a `Job` without a result, ideal for side effects. `async` starts a coroutine returning a `Deferred<T>` whose value is retrieved by calling `await()`. `withContext(Dispatchers.IO)` temporarily moves coroutine execution to an IO-optimized thread pool, runs the block, and restores context to the original dispatcher upon completion.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Coroutines suspend execution using state machines and Continuations without blocking threads",
      "launch returns a Job for fire-and-forget tasks; async returns Deferred<T> for computed values",
      "withContext switches dispatchers and automatically resumes on the original dispatcher",
      "Dispatchers.IO uses a shared pool optimized for blocking disk/network operations"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains non-blocking suspension mechanism",
        "Contrasts launch (Job) vs async (Deferred)",
        "Explains dispatcher context switching with withContext"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "How do you retrieve the result from an async coroutine?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "swift_001",
    "questionText": "What is the difference between Structs (Value Types) and Classes (Reference Types) in Swift? How does Automatic Reference Counting (ARC) manage memory, and how do `weak` and `unowned` prevent retain cycles?",
    "category": "Swift",
    "topic": "ARC (Automatic Reference Counting), Strong, Weak & Unowned",
    "subtopic": "ARC Memory Management & Retain Cycles",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Swift / iOS Developer",
      "Mobile App Developer",
      "Software Development Engineer (SDE-1)"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "swift",
      "ios",
      "arc",
      "struct-vs-class",
      "memory-management"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "In Swift, Structs are value types stored on the stack and copied upon assignment (with Copy-on-Write optimization for collections), whereas Classes are reference types allocated on the heap and shared across references. ARC tracks reference counts for class instances on the heap, deallocating memory when the strong reference count reaches zero. A retain cycle occurs when two class instances hold strong references to each other. `weak` creates a non-owning pointer that automatically zeroes out to `nil` when the referenced instance deallocates (must be an optional `var`). `unowned` assumes the referenced instance will never be nil during its lifetime and is non-optional; accessing it after deallocation causes a runtime trap.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Structs are value types (stack, copy semantics); Classes are reference types (heap, shared pointers)",
      "ARC tracks strong reference counts and frees instances when count reaches zero",
      "Retain cycles occur when mutual strong references prevent count from reaching zero",
      "weak references are optional and zero out to nil; unowned expects valid lifetime without nil"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Distinguishes value vs reference types clearly",
        "Explains retain cycles under ARC",
        "Contrasts weak (optional, zeroing) vs unowned (non-optional, non-zeroing)"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "Why can't you declare a `weak` reference as a `let` constant?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "swift_002",
    "questionText": "Explain Protocol-Oriented Programming (POP) in Swift. How do Protocol Extensions provide default implementations, and how does this contrast with traditional OOP inheritance?",
    "category": "Swift",
    "topic": "Protocols, Protocol Extensions & Protocol-Oriented Programming",
    "subtopic": "Protocol Extensions & Composition over Inheritance",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Swift / iOS Developer",
      "Mobile App Developer",
      "Software Development Engineer (SDE-1)"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "swift",
      "protocols",
      "pop",
      "extensions",
      "clean-architecture"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Protocol-Oriented Programming (POP) emphasizes building reusable capabilities through protocols and protocol composition rather than deep class inheritance hierarchies. Protocols can be adopted by Structs, Enums, and Classes, avoiding the single-inheritance restriction and reference type overhead of OOP. Protocol Extensions allow developers to supply default method implementations directly on protocols, giving conforming types instant functionality without subclasses. Furthermore, generic constraints on protocol extensions (`extension Collection where Element: Equatable`) enable specialized behavior conditional on type capabilities.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Protocols apply to value types (structs/enums) as well as reference types (classes)",
      "Protocol extensions supply default implementations, eliminating boilerplate and deep hierarchies",
      "Enables horizontal composition of capabilities rather than rigid vertical inheritance",
      "Conditional extensions allow specialization based on generic constraints"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains protocol adoption across value and reference types",
        "Explains default implementations in protocol extensions",
        "Contrasts horizontal composition with vertical inheritance"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Can a Swift struct inherit from another struct? How do protocols solve this limitation?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "dart_001",
    "questionText": "What is Sound Null Safety in Dart, and how does it optimize Ahead-of-Time (AOT) compilation compared to runtime null checks?",
    "category": "Dart",
    "topic": "Sound Null Safety & Type Inference",
    "subtopic": "Sound Type System & AOT Performance",
    "difficulty": "Easy",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Flutter Developer",
      "Mobile App Developer",
      "Junior Software Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "dart",
      "flutter",
      "null-safety",
      "aot-compiler",
      "types"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Dart's Sound Null Safety guarantees at the compiler level that an expression of type `T` will NEVER evaluate to null at runtime. Because null checks are enforced statically, the AOT (Ahead-of-Time) compiler can eliminate defensive null check instructions and optimize binary code generation, resulting in smaller native APK/IPA binaries, faster startup times, and reduced memory footprint. If an API accepts `int`, Dart guarantees it is always a valid integer without needing runtime validation guards.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Sound null safety guarantees non-nullable variables can never contain null at runtime",
      "AOT compiler strips defensive null checks, shrinking binary size and improving performance",
      "Separates types into T and T? with flow analysis and smart casts"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Defines sound null safety guarantees",
        "Explains compiler optimization benefits in AOT",
        "Mentions nullable vs non-nullable separation"
      ],
      "minimumPassingScore": 6
    },
    "hints": [
      "Consider why an AOT compiler doesn't need to generate `if (x == null)` checks for non-nullable types."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "dart_002",
    "questionText": "How does Dart's single-threaded Event Loop handle asynchronous execution with Microtask and Event Queues? When should you use an Isolate instead of `Future`?",
    "category": "Dart",
    "topic": "Asynchronous Programming: Future, async/await & Event Loop",
    "subtopic": "Event Loop, Microtasks & Isolates",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Flutter Developer",
      "Mobile App Developer",
      "Software Development Engineer (SDE-1)"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "dart",
      "flutter",
      "event-loop",
      "isolates",
      "async"
    ],
    "companyStyleLabel": "High-Growth Startup",
    "referenceAnswer": "Dart executes on a single thread driven by an Event Loop with two queues: the Microtask Queue (internal critical operations) and the Event Queue (I/O, timers, user taps, UI redraws). The Event Loop completely drains the Microtask Queue before processing any item from the Event Queue. `Future` and `async/await` do not spawn threads; they simply schedule callbacks on the event loop. If code performs heavy CPU-intensive work (e.g. image decoding, JSON parsing 50MB files, cryptography), it blocks the single thread and causes UI frame drops (jank). In such cases, developers must spawn an `Isolate`—Dart's isolated memory thread communicating exclusively via message passing (`SendPort`/`ReceivePort`).",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Dart has a single thread with Microtask Queue and Event Queue",
      "Microtasks take absolute priority and drain before the next Event item",
      "Futures execute asynchronously on the same thread without spawning OS threads",
      "CPU-bound tasks require Isolates with separate memory heaps communicating via message ports"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains Microtask vs Event queue prioritization",
        "Clarifies that Futures run on the main thread",
        "Justifies Isolates for CPU-intensive tasks"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "What happens to Flutter 60fps animations if a Future runs a 2-second for loop?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "scala_001",
    "questionText": "What are Case Classes in Scala, and how do they integrate with Sealed Traits to enable exhaustive Pattern Matching? What error does the compiler produce if a case is omitted?",
    "category": "Scala",
    "topic": "Case Classes, Sealed Traits & Pattern Matching",
    "subtopic": "Algebraic Data Types & Exhaustive Pattern Matching",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Data Engineer",
      "Backend Developer",
      "Scala Developer",
      "Software Development Engineer (SDE-1)"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "scala",
      "functional-programming",
      "pattern-matching",
      "case-classes",
      "adt"
    ],
    "companyStyleLabel": "Enterprise / FinTech",
    "referenceAnswer": "Case Classes in Scala automatically generate immutable constructor parameters, `equals`, `hashCode`, `toString`, `copy`, and companion object `apply`/`unapply` extractor methods for pattern matching. When combined with a `sealed trait`, all permitted subtypes must be declared in the same file. This allows the compiler to know the closed set of all possible subtypes (Algebraic Data Type). During pattern matching (`match`), the compiler performs exhaustiveness checking: if any subtype branch is missing and there is no default fallback (`case _`), it emits a compile-time warning (or error with `-Xfatal-warnings`), preventing runtime `MatchError` exceptions.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Case classes auto-generate immutability, structural equality, copy, and unapply extractors",
      "Sealed traits restrict all subtype declarations to the current source file",
      "Compiler checks pattern match exhaustiveness across all sealed subclasses",
      "Missing cases produce a compile-time exhaustiveness warning rather than failing silently"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Lists auto-generated features of case classes",
        "Explains sealed trait boundary constraints",
        "Explains compiler exhaustiveness checking"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Why does the compiler need the sealed trait to be in the same source file?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "scala_002",
    "questionText": "Explain how the `given` and `using` clauses in Scala 3 improve context abstraction over Scala 2's `implicit` mechanism.",
    "category": "Scala",
    "topic": "Given, Using & Context Parameters (Scala 3) vs Implicits (Scala 2)",
    "subtopic": "Scala 3 Context Abstractions",
    "difficulty": "Hard",
    "questionType": "conceptual",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      "Scala Developer",
      "Backend Developer",
      "Staff / Principal Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "scala",
      "scala3",
      "implicits",
      "context-parameters",
      "types"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "In Scala 2, `implicit` was overloaded to serve multiple distinct roles: implicit parameters, implicit conversions, extension methods, and type classes. This led to cryptic compiler errors and unintended implicit conversions. Scala 3 decomposed `implicit` into focused concepts: `given` declarations define contextual values and type class instances, while `using` clauses declare contextual parameters passed automatically at call sites. Furthermore, extension methods are declared explicitly (`extension`), and implicit conversions require an explicit `Conversion` type, providing cleaner syntax and deterministic resolution.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Scala 2 overloaded `implicit` for conversions, parameters, and extension methods",
      "Scala 3 replaces overloaded syntax with clear terms: `given` and `using`",
      "Context parameters (`using`) are resolved deterministically based on type",
      "Prevents dangerous implicit conversion bugs"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Critiques Scala 2 implicit overloading",
        "Accurately defines given vs using roles in Scala 3",
        "Mentions improved compile-time resolution"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "Think about why implicit conversions in Scala 2 were considered dangerous."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "r_001",
    "questionText": "What is Vectorization in R, and why is vectorized execution significantly faster than traditional `for` loops in performance-critical data analysis?",
    "category": "R",
    "topic": "Vectorization & Avoiding Explicit Loops",
    "subtopic": "Vectorized Operations vs C-Level Loops",
    "difficulty": "Easy",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Data Analyst",
      "Data Scientist",
      "Research Engineer",
      "Analytics Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "r",
      "vectorization",
      "performance",
      "data-science",
      "analytics"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Vectorization in R means operating on entire data vectors or matrices at once rather than indexing elements one by one in an explicit script loop. Because R is an interpreted dynamic language, each iteration of an R `for` loop incurs interpreter overhead, dynamic type checking, and memory allocation. Vectorized functions (such as `x + y`, `sqrt()`, or `apply`) delegate operations directly to compiled underlying C and Fortran routines, leveraging optimized SIMD CPU instructions and contiguous memory caches to run orders of magnitude faster.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Vectorization applies operations across all vector elements simultaneously",
      "R for loops suffer from interpreted dynamic type-checking overhead per iteration",
      "Vectorized operations call compiled C and Fortran libraries directly with SIMD optimizations"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains what vectorization means in R",
        "Identifies interpreter overhead in explicit loops",
        "Mentions compiled C/Fortran routines underlying vectorized operations"
      ],
      "minimumPassingScore": 6
    },
    "hints": [
      "Where does the actual iteration occur when you evaluate `x + y` on two vectors in R?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "r_002",
    "questionText": "Explain how the `dplyr` package structures data manipulation using its core verbs (`select`, `filter`, `mutate`, `group_by`, `summarise`). How does the native pipe operator `|>` improve analytic code readability?",
    "category": "R",
    "topic": "Data Wrangling with dplyr & tidyr",
    "subtopic": "Tidyverse Data Pipelines & Non-Standard Evaluation",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Data Analyst",
      "Business Intelligence Analyst",
      "Data Scientist",
      "Analytics Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "r",
      "dplyr",
      "tidyverse",
      "pipes",
      "data-wrangling"
    ],
    "companyStyleLabel": "Enterprise / FinTech",
    "referenceAnswer": "`dplyr` provides a grammar of data manipulation with five core verbs: `select()` picks columns by name, `filter()` extracts rows matching logical criteria, `mutate()` creates new transformed columns, `group_by()` partitions data into subsets, and `summarise()` aggregates groups into single statistical summary rows. The native pipe operator `|>` (or Magrittr `%>%`) passes the evaluated output of the left-hand expression as the first argument to the right-hand function. This eliminates nested function calls `h(g(f(x)))` in favor of a readable linear pipeline `x |> f() |> g() |> h()`, drastically improving maintainability.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Accurately defines the 5 core verbs: select, filter, mutate, group_by, summarise",
      "Explains group_by splits data into partitions for grouped aggregation in summarise",
      "Explains pipe operator (|>) forwards output as the first argument of the next function, avoiding nested calls"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Correctly defines dplyr verbs and purposes",
        "Explains pipe operator forwarding mechanism",
        "Contrasts linear pipeline readability with nested calls"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Compare reading `summarise(group_by(filter(df, age > 25), dept), avg_sal = mean(salary))` vs piping."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "perl_001",
    "questionText": "Explain the difference between Scalars, Arrays, and Hashes in Perl. How does Context (Scalar vs List context) change the return value of expressions like evaluating an array?",
    "category": "Perl",
    "topic": "Scalars, Arrays, Hashes & Context (Scalar vs List)",
    "subtopic": "Perl Context & Sigil Rules",
    "difficulty": "Easy",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Junior Software Engineer",
      "Systems Engineer",
      "DevOps Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "perl",
      "sigils",
      "context",
      "arrays",
      "scalars"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "In Perl, data structures are distinguished by sigils: Scalars (`$`) store a single string or number, Arrays (`@`) store ordered lists of scalars indexed by integers, and Hashes (`%`) store unordered key-value pairs indexed by strings. Perl is context-sensitive: an expression behaves differently based on whether it is evaluated in Scalar Context or List Context. For example, evaluating an array in List Context (`@b = @a`) copies all elements, whereas evaluating an array in Scalar Context (`$count = @a` or `scalar(@a)`) returns the integer count of elements in the array.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Identifies sigils: $ for scalars, @ for arrays, % for hashes",
      "Defines Scalar Context vs List Context in Perl",
      "Evaluating an array in scalar context returns the number of elements"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Identifies sigils and corresponding data types",
        "Explains Context sensitivity mechanism",
        "States that array in scalar context returns its length"
      ],
      "minimumPassingScore": 6
    },
    "hints": [
      "What does `$size = @my_array;` assign to `$size`?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "perl_002",
    "questionText": "How do References work in Perl? Explain the syntax to create a reference to an array or hash, and how the arrow operator (`->`) is used to access nested data structures like an Array of Hashes.",
    "category": "Perl",
    "topic": "References, Complex Data Structures & Dereferencing",
    "subtopic": "Reference Syntax & Complex Data Structures",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Systems Engineer",
      "Software Engineer",
      "DevOps Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "perl",
      "references",
      "dereferencing",
      "complex-structures"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "A Reference in Perl is a scalar holding the memory address of another variable, similar to a pointer. A reference is created using the backslash operator (`\\$var`, `\\@arr`, `\\%hash`) or anonymous constructors (`[1, 2, 3]` for anonymous array, `{ key => 'val' }` for anonymous hash). To dereference, prepend the appropriate sigil (`@$arr_ref`, `%$hash_ref`) or use the arrow operator (`->`) for clean element access: `$ao_hash[0]->{'name'}` or `$ao_hash[0]{'name'}`. References enable building multi-dimensional data structures in Perl without flattening.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "References are scalars storing memory addresses of variables",
      "Created with backslash operator (\\) or anonymous constructors ([] and {})",
      "Dereferenced with prefix sigil or arrow operator (->) for nested lookups"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Defines Perl references",
        "Shows backslash and anonymous constructor syntax",
        "Explains arrow operator dereferencing"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "What is the difference between `@arr = (1, 2);` and `$arr_ref = [1, 2];`?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "typescript_002",
    "questionText": "Implement a custom TypeScript utility type `DeepReadonly<T>` that recursively makes all nested object properties and arrays readonly.",
    "category": "TypeScript",
    "topic": "Utility Types (Partial, Required, Pick, Omit, Record, Readonly)",
    "subtopic": "Recursive Conditional Mapped Types",
    "difficulty": "Hard",
    "questionType": "coding",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      "Frontend Developer",
      "Full Stack Developer",
      "Software Development Engineer (SDE-1)"
    ],
    "interviewMode": "coding",
    "tags": [
      "typescript",
      "utility-types",
      "deep-readonly",
      "generics"
    ],
    "companyStyleLabel": "High-Growth Startup",
    "referenceAnswer": "type DeepReadonly<T> = T extends Function ? T : T extends Array<infer U> ? ReadonlyArray<DeepReadonly<U>> : T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : T; We handle functions first so their methods aren't mapped, recursively apply ReadonlyArray to array members, and use a mapped type for nested objects while leaving primitive types unchanged.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Uses conditional types (T extends ...) with type recursion",
      "Treats arrays with ReadonlyArray<DeepReadonly<U>>",
      "Applies mapped type { readonly [K in keyof T]: DeepReadonly<T[K]> } to objects",
      "Leaves functions and primitive values untouched"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Recursive definition covers nested objects",
        "Correctly handles arrays without type errors",
        "Preserves functions and primitive values"
      ],
      "minimumPassingScore": 8
    },
    "hints": [],
    "codingDetails": {
      "constraints": [
        "Must handle arbitrary nesting depth",
        "Must preserve primitives and arrays"
      ],
      "examples": [
        {
          "input": "type User = { profile: { name: string, tags: string[] } }",
          "output": "DeepReadonly<User> prevents modifying user.profile.name and user.profile.tags.push()",
          "explanation": "All levels become immutable"
        }
      ]
    }
  },
  {
    "questionId": "go_002",
    "questionText": "Explain how Goroutines and worker pools work in Go. Write an idiomatic Go function demonstrating how to process jobs concurrently using channels and `sync.WaitGroup`.",
    "category": "Go",
    "topic": "Sync Package (Mutex, RWMutex, WaitGroup, Once)",
    "subtopic": "Worker Pool Pattern with WaitGroup",
    "difficulty": "Medium",
    "questionType": "coding",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Go Developer",
      "Backend Developer",
      "Cloud Engineer"
    ],
    "interviewMode": "coding",
    "tags": [
      "go",
      "golang",
      "worker-pool",
      "channels",
      "waitgroup"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "func workerPool(numWorkers int, jobs <-chan int, results chan<- int) {\\n  var wg sync.WaitGroup\\n  for w := 1; w <= numWorkers; w++ {\\n    wg.Add(1)\\n    go func() {\\n      defer wg.Done()\\n      for j := range jobs {\\n        results <- j * 2\\n      }\\n    }()\\n  }\\n  wg.Wait()\\n  close(results)\\n}\\nThe pattern creates N worker goroutines reading from a shared `jobs` channel until closed. `sync.WaitGroup` tracks worker lifecycles, and `close(results)` signals downstream collectors that all work is complete.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Launches fixed number of worker goroutines",
      "Each worker drains jobs channel via `for job := range jobs`",
      "Uses `sync.WaitGroup` to wait for all workers before closing results channel"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Correct worker loop over channel",
        "Proper wg.Add(1) and wg.Done() usage",
        "Closes results channel after wg.Wait()"
      ],
      "minimumPassingScore": 8
    },
    "hints": [],
    "codingDetails": {
      "constraints": [
        "No goroutine leaks",
        "Must close results channel after workers complete"
      ],
      "examples": [
        {
          "input": "jobs = [1, 2, 3], workers = 2",
          "output": "results = [2, 4, 6]",
          "explanation": "Processed concurrently by pool"
        }
      ]
    }
  },
  {
    "questionId": "rust_002",
    "questionText": "Explain the difference between `Rc<T>` and `Arc<T>` in Rust. Why does `Arc<T>` require the `Send` and `Sync` marker traits, and why does Rust enforce interior mutability through `Mutex<T>` or `RwLock<T>`?",
    "category": "Rust",
    "topic": "Smart Pointers: Box, Rc, Arc, RefCell & Interior Mutability",
    "subtopic": "Thread-Safe Reference Counting & Interior Mutability",
    "difficulty": "Hard",
    "questionType": "conceptual",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      "Rust Developer",
      "Systems Engineer",
      "Backend Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "rust",
      "arc",
      "rc",
      "interior-mutability",
      "concurrency"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "`Rc<T>` provides reference counting on single-threaded execution using non-atomic increments, avoiding atomic instruction overhead. Attempting to send `Rc<T>` across threads fails at compile time because it does not implement `Send`. `Arc<T>` (Atomic Reference Counted) uses CPU atomic operations to synchronize reference counts across threads, requiring `T: Send + Sync`. However, `Arc<T>` only grants shared immutable references (`&T`). To mutate shared data across threads, Rust requires pairing `Arc<T>` with a synchronization primitive like `Mutex<T>` or `RwLock<T>` to provide safe Interior Mutability, ensuring mutual exclusion at runtime without data races.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Rc is non-atomic and single-threaded; Arc uses atomic operations for multi-threaded safety",
      "Rc does not implement Send/Sync, preventing compile-time thread transfer",
      "Arc only gives immutable references (&T); mutation requires Mutex or RwLock for interior mutability",
      "Guarantees memory safety and zero data races at compile time"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains atomic vs non-atomic reference counts",
        "Mentions Send and Sync marker traits",
        "Explains why Mutex/RwLock is needed for interior mutability with Arc"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "Why can't you mutate data directly through an `Arc<T>` reference?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "c__002",
    "questionText": "Explain how the `async` and `await` keywords are lowered by the Roslyn compiler into a state machine in C#. What is `SynchronizationContext` and why should library authors use `ConfigureAwait(false)`?",
    "category": "C#",
    "topic": "Asynchronous Programming (async, await, Task)",
    "subtopic": "Async State Machine & SynchronizationContext",
    "difficulty": "Hard",
    "questionType": "conceptual",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      ".NET Developer",
      "Backend Developer",
      "Software Development Engineer (SDE-1)"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "c#",
      ".net",
      "async-await",
      "state-machine",
      "synchronization-context"
    ],
    "companyStyleLabel": "Enterprise / FinTech",
    "referenceAnswer": "The Roslyn compiler transforms an `async` method into an `IAsyncStateMachine` struct. Each `await` represents a suspension point: the state machine captures local variables as fields, invokes the task awaiter, and registers a continuation to resume execution at the next state index when the task completes. `SynchronizationContext` captures the current execution environment (e.g. WPF/WinForms UI thread or ASP.NET request context) so continuations resume on the original context. Library authors should call `.ConfigureAwait(false)` to bypass capturing the synchronization context, avoiding thread-switch overhead and preventing deadlocks when consuming code blocks synchronously on tasks (`.Result` or `.Wait()`).",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Roslyn generates an IAsyncStateMachine struct storing locals as fields across await points",
      "SynchronizationContext marshals continuations back to the capturing thread (e.g. UI dispatcher)",
      "ConfigureAwait(false) ignores context capture to avoid overhead and prevent deadlocks"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Describes IAsyncStateMachine transformation",
        "Explains SynchronizationContext role",
        "Justifies ConfigureAwait(false) in non-UI libraries"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "What happens if a UI thread blocks with `.Result` while an awaited task tries to marshal back to the UI thread?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "bash_002",
    "questionText": "Write a robust Bash shell script snippet that iterates over a directory of log files, counts the total occurrences of HTTP 500 status codes, and exits immediately on any failure using `set -euo pipefail`.",
    "category": "Bash",
    "topic": "Error Handling & Script Safety (set -euo pipefail)",
    "subtopic": "Script Hardening & Pipefail Behavior",
    "difficulty": "Medium",
    "questionType": "coding",
    "sequenceOrder": 2,
    "learningStage": "Core Concepts",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "DevOps Engineer",
      "Site Reliability Engineer",
      "Systems Engineer",
      "Backend Developer"
    ],
    "interviewMode": "coding",
    "tags": [
      "bash",
      "shell",
      "pipefail",
      "grep",
      "scripting"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "#!/usr/bin/env bash\\nset -euo pipefail\\n\\nLOG_DIR=\"${1:-/var/log/nginx}\"\\ntotal_500=0\\n\\nshopt -s nullglob\\nfor log_file in \"$LOG_DIR\"/*.log; do\\n  count=$(grep -c ' 500 ' \"$log_file\" || true)\\n  total_500=$((total_500 + count))\\ndone\\n\\necho \"Total HTTP 500 errors found: $total_500\"\\n\\n`set -e` aborts on any non-zero exit, `-u` treats unset variables as errors, and `-o pipefail` ensures a pipeline fails if any command in it fails (not just the last one). `|| true` prevents `grep -c` from terminating the script when 0 matches occur.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Declares `set -euo pipefail` for strict defensive script execution",
      "Explains pipefail: returns exit code of first failing command in a pipeline",
      "Handles grep returning exit code 1 on 0 matches with `|| true` or test guard"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Correctly sets -euo pipefail",
        "Explains why grep needs || true under set -e",
        "Loops safely over log files with quoting"
      ],
      "minimumPassingScore": 7
    },
    "hints": [],
    "codingDetails": {
      "constraints": [
        "Must adhere to set -euo pipefail without crashing on zero match",
        "Proper quoting on all variable expansions"
      ],
      "examples": [
        {
          "input": "Directory with access.log containing five ' 500 ' lines",
          "output": "Total HTTP 500 errors found: 5",
          "explanation": "Aggregates counts safely"
        }
      ]
    }
  },
  {
    "questionId": "software_engineering_001",
    "questionText": "Explain the differences between Agile and Waterfall software engineering methodologies. Under what circumstances would Waterfall still be preferred over Agile, and how does Technical Debt accumulate during rapid iterative sprints?",
    "category": "Software Engineering",
    "topic": "Software Development Life Cycle (SDLC) Models",
    "subtopic": "SDLC Methodologies & Technical Debt",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Software Engineer Intern",
      "Junior Software Engineer",
      "Associate Software Engineer",
      "Technical Product Manager"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "software-engineering",
      "sdlc",
      "agile",
      "waterfall",
      "technical-debt"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Waterfall is a linear, sequential SDLC model where phases (Requirements -> Design -> Implementation -> Verification -> Maintenance) execute strictly one after another with rigid gate reviews. Agile is an iterative, incremental framework focusing on working software, collaboration, and rapid response to change through short sprints (1-2 weeks). Waterfall remains preferred in highly regulated, mission-critical environments (medical devices, aerospace, civil infrastructure) with immutable requirements and strict legal compliance certifications. Technical debt accumulates in Agile when teams prioritize shipping user stories over refactoring, architectural modularity, test automation, or documentation, requiring deliberate debt-repayment sprints to prevent velocity collapse.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Waterfall is sequential and rigid; Agile is iterative, incremental, and adaptable",
      "Waterfall is preferred for mission-critical, regulated hardware/aerospace domains with fixed specifications",
      "Technical debt is the implied cost of future rework caused by choosing an expedient solution over a better approach",
      "Managing technical debt requires refactoring, automated testing, and dedicated sprint capacity"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Accurately contrasts Agile vs Waterfall phases",
        "Provides valid use cases for Waterfall",
        "Explains technical debt causes and mitigations"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Consider what happens if you discover a design flaw in the verification phase of Waterfall."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "design_patterns_001",
    "questionText": "Explain the Single Responsibility Principle (SRP) and Dependency Inversion Principle (DIP) from SOLID. Provide a concrete code architecture example showing how DIP decouples high-level business logic from low-level database operations.",
    "category": "Design Patterns",
    "topic": "SOLID Principles & Clean Code Design",
    "subtopic": "SOLID Principles & Dependency Inversion",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Software Development Engineer (SDE-1)",
      "Software Development Engineer (SDE-2)",
      "Senior Software Engineer",
      "Backend Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "design-patterns",
      "solid",
      "srp",
      "dip",
      "clean-architecture"
    ],
    "companyStyleLabel": "Enterprise / FinTech",
    "referenceAnswer": "SRP states that a class should have one, and only one, reason to change, meaning it should encapsulate a single responsibility. DIP states that: (1) High-level modules should not depend on low-level modules; both should depend on abstractions. (2) Abstractions should not depend on details; details should depend on abstractions. In an Order Processing service: instead of `OrderService` directly instantiating `MySQLOrderRepository`, an abstraction `interface OrderRepository` is defined. `OrderService` accepts `OrderRepository` via constructor dependency injection. A concrete `SqlOrderRepository` implements this interface. If the persistence engine shifts from MySQL to DynamoDB or a mock repository for unit testing, `OrderService` requires zero code modifications.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "SRP: a class should have only one reason to change (single cohesive responsibility)",
      "DIP: high-level policies must not import low-level mechanisms; both rely on abstractions/interfaces",
      "Illustrates with an interface between a business service and a database repository",
      "Explains benefits: loose coupling, testability via mocks, and pluggable persistence"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Defines SRP and DIP accurately",
        "Provides clear decoupling example with repository interface",
        "Mentions testability and maintenance advantages"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "Who owns the interface in DIP: the high-level business module or the low-level database module?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "rest_apis_001",
    "questionText": "What makes an HTTP method idempotent? Explain why `PUT` is idempotent while `POST` is not, and how idempotency keys prevent duplicate payments in financial APIs.",
    "category": "REST APIs",
    "topic": "HTTP Methods (GET, POST, PUT, PATCH, DELETE) & Idempotency",
    "subtopic": "HTTP Idempotency & Financial Transaction Safety",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "API Developer",
      "Backend Developer",
      "Junior Software Engineer",
      "Full Stack Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "rest-apis",
      "http",
      "idempotency",
      "payments",
      "status-codes"
    ],
    "companyStyleLabel": "Enterprise / FinTech",
    "referenceAnswer": "An HTTP method is idempotent if executing multiple identical requests has the same intended effect and server state as a single request. `PUT` completely replaces the target resource at a specific URI: sending the same representation 1 time or 10 times results in the identical resource state (`/users/42`). `POST` creates subordinate resources on each invocation: sending 5 identical `POST /payments` requests will initiate 5 distinct transactions with 5 unique IDs. In financial APIs (like Stripe), clients generate a unique UUID `Idempotency-Key` header with `POST` requests. The server records the key with an atomic lock or unique constraint in Redis/DB; if a network timeout occurs and the client retries, the server detects the duplicate key and replays the cached original response without re-charging the customer.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Idempotency: multiple identical requests produce the identical server resource state",
      "PUT is idempotent (resource replacement); POST is non-idempotent (creates new subordinate resource)",
      "Idempotency keys allow clients to safely retry network timeouts without duplicate execution",
      "Server caches and returns prior response when duplicate idempotency key is detected"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Accurately defines idempotency",
        "Contrasts PUT vs POST semantics",
        "Explains Idempotency-Key header mechanism in payment gateways"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "If your internet disconnects right after clicking 'Pay Now', how does the server know you already clicked it?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "competitive_programming_001",
    "questionText": "Explain how a Fenwick Tree (Binary Indexed Tree) computes prefix sums and updates elements in O(log N) time. How does the bitwise operation `i & (-i)` isolate the lowest set bit?",
    "category": "Competitive Programming",
    "topic": "Segment Trees, Fenwick Trees (Binary Indexed Trees)",
    "subtopic": "Fenwick Tree Mechanics & Bitwise Manipulation",
    "difficulty": "Hard",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      "Software Development Engineer (SDE-1)",
      "Software Development Engineer (SDE-2)",
      "Graduate Engineer Trainee"
    ],
    "interviewMode": "coding",
    "tags": [
      "competitive-programming",
      "fenwick-tree",
      "bit",
      "bitwise",
      "algorithms"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "A Fenwick Tree (BIT) is a 1-indexed array structure where each index `i` stores the sum of a range of elements whose length is determined by the lowest set bit (LSB) in `i`'s binary representation. In two's complement representation, `-i = ~i + 1`. The bitwise AND `i & (-i)` isolates the lowest power of 2 dividing `i`. To query prefix sum `prefixSum(i)`, we add `tree[i]` and strip the lowest set bit `i -= i & (-i)` until `i == 0`, traversing at most log2(N) nodes. To update an element `update(i, delta)`, we add `delta` to `tree[i]` and add the lowest set bit `i += i & (-i)` up to N, updating all ancestor ranges in O(log N) time and O(N) space.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Each index i stores a range sum covering the length of its lowest set bit (LSB)",
      "i & (-i) isolates the LSB using two's complement arithmetic (~i + 1)",
      "Query traverses downwards by subtracting LSB (i -= i & (-i)) in O(log N)",
      "Update traverses upwards by adding LSB (i += i & (-i)) in O(log N) with O(N) space"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains binary range decomposition",
        "Derives i & (-i) via two's complement",
        "States O(log N) time complexity for query and update"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "Write 12 in binary (1100). What is -12 in two's complement, and what is 12 & (-12)?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "git___version_control_001",
    "questionText": "Explain the internal difference between `git merge` and `git rebase`. When should rebase be avoided on shared public branches, and how does `git reflog` help recover from a botched interactive rebase?",
    "category": "Git & Version Control",
    "topic": "Rebase vs Merge & Interactive Rebase Workflow",
    "subtopic": "Branch History Rewriting & Reflog Recovery",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Junior Software Engineer",
      "Associate Software Engineer",
      "DevOps Engineer",
      "Frontend Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "git",
      "version-control",
      "rebase",
      "merge",
      "reflog"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "`git merge` combines two histories by creating a new 3-way merge commit that has two parent commits, preserving the exact chronological commit history. `git rebase` rewrites history by calculating the patch differences of your feature branch commits and replaying them on top of the target base commit, creating brand-new commit SHAs and producing a linear commit history. Golden Rule of Rebase: Never rebase commits that have been pushed to a shared public branch (like `main` or `develop`), because changing commit SHAs forces collaborators into diverged histories requiring complex force pushes. `git reflog` (Reference Log) tracks every update to the HEAD pointer locally, even for orphaned or rebased-away commits. To undo a bad rebase, run `git reflog`, identify the SHA before the rebase started, and execute `git reset --hard HEAD@{n}` to instantly restore the branch state.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Merge creates a 3-way merge commit with two parents, preserving true chronology",
      "Rebase replays commits as new patches on top of target, generating new commit SHAs (linear history)",
      "Never rebase shared public branches because rewriting history breaks collaborators' branches",
      "git reflog records every local HEAD movement, allowing recovery via `git reset --hard <reflog-sha>`"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Contrasts merge commit creation vs rebase commit rewriting",
        "Explains the public branch rebase hazard",
        "Explains git reflog recovery mechanism"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Does `git log` show commits that were orphaned by a rebase? Does `git reflog`?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "testing___qa_001",
    "questionText": "Explain the Test Pyramid and the trade-offs between Unit Tests, Integration Tests, and End-to-End (E2E) Tests. What are Flaky Tests and how do you systematically diagnose and eliminate them?",
    "category": "Testing & QA",
    "topic": "Test Pyramid: Unit, Integration, Component & E2E",
    "subtopic": "Test Pyramid Economics & Flakiness Mitigation",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "QA Engineer",
      "Automation Test Engineer",
      "SDET (Software Dev Engineer in Test)",
      "Backend Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "testing",
      "qa",
      "test-pyramid",
      "flaky-tests",
      "automation"
    ],
    "companyStyleLabel": "High-Growth Startup",
    "referenceAnswer": "The Test Pyramid recommends having a large base of fast, isolated Unit Tests, a moderate layer of Integration Tests verifying cross-module or database contracts, and a small peak of slow End-to-End (E2E) tests testing realistic user flows. Unit tests are sub-millisecond and cheap to maintain but miss integration bugs; E2E tests provide high confidence but suffer from slow execution, external dependencies, and maintenance burden. A Flaky Test is a test that exhibits both a passing and a failing outcome under the identical code commit. Common causes include race conditions, hardcoded `sleep()` statements instead of dynamic polling/waits, shared state across test suites, timezone/clock variations, and asynchronous network dependencies. Diagnosis involves running the test 100 times in a loop (`--repeat-each`), isolating test state, injecting deterministic clock mocks, and replacing arbitrary sleeps with explicit condition polling.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Test Pyramid levels: Unit (broad, fast, cheap) -> Integration -> E2E (narrow, slow, high fidelity)",
      "Flaky tests pass or fail nondeterministically on the same code commit",
      "Root causes: race conditions, fixed sleeps, test order pollution, unmocked network/clocks",
      "Remedies: condition-based polling, test sandbox isolation, and deterministic test doubles"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Accurately describes pyramid layers and trade-offs",
        "Defines flaky tests clearly",
        "Lists actionable technical fixes for test flakiness"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Why is `sleep(5000)` in an automated test a code smell that leads to test flakiness?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "software_architecture_001",
    "questionText": "Compare Clean Architecture / Hexagonal Architecture (Ports and Adapters) with traditional N-Tier Layered Architecture. How does the Dependency Rule protect core domain entities from framework and UI volatility?",
    "category": "Software Architecture",
    "topic": "Clean Architecture & Onion / Hexagonal Architecture",
    "subtopic": "Hexagonal Ports & Adapters Architecture",
    "difficulty": "Hard",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      "Software Architect",
      "Solutions Architect",
      "Staff / Principal Engineer",
      "Senior Software Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "architecture",
      "clean-architecture",
      "hexagonal",
      "ports-and-adapters",
      "domain-driven"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "Traditional N-Tier layered architecture (UI -> Business Logic -> Data Access) inherently couples business logic to database schemas and ORM entities because dependencies point downward toward the database. Hexagonal / Clean Architecture places pure Domain Entities and Use Cases at the center. The Dependency Rule mandates that code dependencies must point strictly INWARD: inner circles know nothing of outer circles. Core business rules have zero dependencies on external frameworks, UI libraries, or database drivers. Communication occurs through Ports (interfaces defined by the domain) and Adapters (implementations in outer infrastructure like Express controllers, PostgreSQL adapters, or Kafka producers). This allows swapping databases or migrating from REST to gRPC without altering a single line of core business logic.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "N-Tier dependencies point toward the database; Clean Architecture points inward toward domain entities",
      "Dependency Rule: inner business layers have zero knowledge of outer frameworks, UI, or databases",
      "Ports are interfaces defined by domain; Adapters are outer infrastructure implementations",
      "Guarantees testability without mocking frameworks and isolates core rules from external changes"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Contrasts dependency direction of N-Tier vs Clean Architecture",
        "Explains Ports and Adapters concept",
        "Articulates business value of framework independence"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "If your business logic imports `@prisma/client` directly, does it violate Clean Architecture?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "microservices_001",
    "questionText": "How does the Saga Pattern manage distributed transactions across microservices without 2-Phase Commit (2PC)? Contrast Choreography vs Orchestration approaches with concrete failure compensation examples.",
    "category": "Microservices",
    "topic": "Saga Pattern (Choreography vs Orchestration)",
    "subtopic": "Distributed Sagas & Compensating Transactions",
    "difficulty": "Hard",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      "Backend Developer",
      "Software Development Engineer (SDE-2)",
      "Software Architect",
      "Solutions Architect"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "microservices",
      "saga-pattern",
      "distributed-transactions",
      "event-driven",
      "messaging"
    ],
    "companyStyleLabel": "High-Growth Startup",
    "referenceAnswer": "2-Phase Commit (2PC) relies on blocking locks across distributed databases, which creates single points of failure and destroys throughput in microservices. The Saga Pattern breaks a distributed business transaction into a sequence of local transactions: each local transaction updates the local database and publishes an event or message to trigger the next step. If a step fails (e.g. insufficient payment), the Saga executes Compensating Transactions backwards to undo previous committed changes (e.g. unreserving inventory, canceling order). Choreography is decentralized: services publish events and listen to each other's domain events; simple for 2-3 services but creates cyclic dependencies and debugging complexity as services grow. Orchestration uses a central Saga Orchestrator (e.g. Temporal, AWS Step Functions) that commands services sequentially via request/response commands, making workflow state, timeouts, and rollbacks explicitly observable.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "2PC requires distributed blocking locks; Saga uses local transactions + compensating actions",
      "Compensating transactions undo prior committed steps in reverse order upon failure",
      "Choreography: event-driven peer-to-peer pub/sub, prone to spaghetti coupling at scale",
      "Orchestration: centralized coordinator managing state transitions and compensation dispatch explicitly"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Contrasts Saga with 2PC blocking locks",
        "Explains compensating transaction mechanics",
        "Contrasts Choreography vs Orchestration trade-offs"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "In an e-commerce checkout saga, if the payment fails, what compensating action must the inventory service take?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "performance___optimization_001",
    "questionText": "How do you systematically identify and resolve a memory leak in a high-throughput backend service? Explain how to interpret CPU flame graphs, heap dump allocations, and GC pause times.",
    "category": "Performance & Optimization",
    "topic": "CPU & Memory Profiling, Flame Graphs & Heap Dumps",
    "subtopic": "Heap Profiling & Latency Bottleneck Analysis",
    "difficulty": "Hard",
    "questionType": "scenario",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      "Backend Developer",
      "Senior Software Engineer",
      "Site Reliability Engineer (SRE)",
      "Staff / Principal Engineer"
    ],
    "interviewMode": "scenario",
    "tags": [
      "performance",
      "profiling",
      "memory-leaks",
      "flame-graphs",
      "gc"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "1. Detection: Monitor resident memory (RSS) and JVM/Node heap over time; a sawtooth pattern where memory climbs and drops but baseline keeps trending upward indicates retained objects. Track GC pause durations (STW pauses) and CPU spikes caused by frequent Full GCs. 2. Diagnosis: Capture two heap dumps at separate intervals (e.g., 20 minutes apart). Use memory analysis tools (Eclipse MAT, Chrome DevTools, llnode) to calculate Dominator Trees and identify retained heap sizes. Look for unbounded caches (static maps without TTL/LRU), dangling event listeners, unclosed streams, or circular references in closures. 3. CPU Flame Graphs: Sample on-CPU stack traces; the horizontal width of a plateau represents the percentage of total CPU time consumed by that function, allowing instant identification of inefficient regex, JSON parsing, or tight loops without instrumenting production code.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Distinguishes normal memory growth from creeping baseline retained heap",
      "Compares baseline heap dumps via Dominator Trees to identify retained size objects",
      "Identifies common leaks: unbounded caches, dangling event listeners, unclosed resources",
      "Flame graphs: horizontal width represents CPU time spent in that function/call frame"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains metric indicators of leaks (RSS, GC frequency)",
        "Describes heap dump diffing methodology",
        "Accurately interprets flame graph width representation"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "In a flame graph, does the height of a stack represent time spent or call stack depth?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "cloud_computing_001",
    "questionText": "Explain the difference between AWS Lambda serverless compute and containerized workloads on ECS/EKS. What causes Cold Starts in serverless functions, and what architectural strategies mitigate them?",
    "category": "Cloud Computing",
    "topic": "Serverless Architecture (AWS Lambda, Cloud Functions, Cold Starts)",
    "subtopic": "Serverless Cold Starts & Optimization",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Cloud Engineer",
      "Cloud Architect",
      "DevOps Engineer",
      "Backend Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "cloud",
      "aws",
      "serverless",
      "lambda",
      "cold-starts",
      "ecs"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "AWS Lambda provides event-driven serverless compute where cloud providers manage OS patching, infrastructure provisioning, and auto-scaling to zero, charging strictly per millisecond of compute. ECS/EKS run Docker containers on dedicated or managed instances (Fargate), suited for continuous long-running services, background daemons, and microservices requiring custom OS dependencies or persistent TCP connections. A Cold Start occurs when Lambda must initialize a new microVM execution environment (Firecracker), download the deployment package, start the language runtime, and execute initialization code outside the handler. Mitigations include: (1) Provisioned Concurrency to keep warm microVMs ready, (2) Trimming bundle sizes and eliminating unused imports, (3) Using compiled runtimes (Go/Rust) instead of heavy JVM/Python runtimes, (4) Keeping functions outside VPCs unless required, and (5) Utilizing Lambda SnapStart (JVM checkpoint caching).",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Lambda scales to zero and bills per millisecond execution; containers suit continuous workloads",
      "Cold start is time spent provisioning microVM, downloading code, and initializing language runtime",
      "Mitigations: Provisioned Concurrency, smaller deployment packages, SnapStart, and compiled runtimes"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Contrasts serverless vs containerized infrastructure models",
        "Explains cold start lifecycle stages",
        "Lists 3+ valid mitigation strategies"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Why does code placed outside the Lambda handler function execute during a cold start?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "linux___shell_scripting_001",
    "questionText": "Explain how Linux filesystem permissions work in octal and symbolic formats. What are the SetUID, SetGID, and Sticky Bit flags, and why is the sticky bit critical for shared directories like `/tmp`?",
    "category": "Linux & Shell Scripting",
    "topic": "Linux Directory Hierarchy & Filesystem Permissions (chmod, chown, umask)",
    "subtopic": "Special Permissions (SetUID, SetGID, Sticky Bit)",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Linux / Shell Developer",
      "DevOps Engineer",
      "Systems Engineer",
      "Security Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "linux",
      "permissions",
      "sticky-bit",
      "setuid",
      "sysadmin"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Linux permissions apply to User (u), Group (g), and Others (o) with read (4), write (2), and execute (1) permissions, represented as octal numbers (e.g. 755 = rwxr-xr-x). In addition to standard permissions, three special bits exist: (1) SetUID (octal 4000): When set on an executable binary (e.g. `passwd`), the process executes with the permissions of the file owner (root) rather than the launching user. (2) SetGID (octal 2000): Files created in a directory automatically inherit the directory's group ownership. (3) Sticky Bit (octal 1000, displayed as `t`): In a shared writable directory like `/tmp` (permission 1777), any user can create files, but ONLY the file owner or root can delete or rename files. Without the sticky bit, any unauthorized user could delete or overwrite other users' temporary files.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Calculates read (4), write (2), execute (1) across User, Group, and Others",
      "SetUID (4000) runs binary with file owner privileges (e.g. root for passwd)",
      "SetGID (2000) forces new files to inherit parent directory's group ID",
      "Sticky bit (1000 / +t) prevents users from deleting or renaming files they do not own in shared directories"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Explains octal calculation accurately",
        "Defines SetUID and security implications",
        "Explains why sticky bit protects /tmp from unauthorized deletions"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "If `/tmp` has permissions 777 without the sticky bit, can user Alice delete user Bob's files?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "networking___infrastructure_001",
    "questionText": "Explain the full handshake lifecycle of TLS 1.3 compared to TLS 1.2. How does 1-RTT (and 0-RTT resumption) reduce round-trip latency, and what security threat does 0-RTT introduce?",
    "category": "Networking & Infrastructure",
    "topic": "TLS/SSL Handshake, Public Key Infrastructure (PKI) & Certificates",
    "subtopic": "TLS 1.3 Handshake & 0-RTT Replay Vulnerabilities",
    "difficulty": "Hard",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      "Network Engineer",
      "Infrastructure Engineer",
      "Security Engineer",
      "Backend Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "networking",
      "tls",
      "cryptography",
      "handshake",
      "security"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "TLS 1.2 required 2 full round-trips (2-RTT) to negotiate cipher suites and exchange keys before sending application data. TLS 1.3 cut this to 1-RTT by mandating Ephemeral Diffie-Hellman (DHE) and having the client send its public key shares in the initial `ClientHello`. In session resumption, TLS 1.3 supports 0-RTT (Early Data), where clients include application data directly in the initial flight using keys derived from a previous session ticket. However, 0-RTT is vulnerable to Replay Attacks: an attacker eavesdropping on the network can intercept and re-send the early data packet to the server multiple times. Therefore, 0-RTT must strictly be restricted to safe, idempotent HTTP methods (GET), and servers must implement replay-mitigation mechanisms like single-use ticket caches or client timestamp windows.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "TLS 1.2 requires 2-RTT; TLS 1.3 reduces initial handshake to 1-RTT via combined key share in ClientHello",
      "0-RTT resumption sends application data in the very first flight using prior session ticket",
      "0-RTT is vulnerable to Replay Attacks where eavesdropped requests are duplicated by attackers",
      "0-RTT should only be used for idempotent GET requests, not state-changing mutations"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Contrasts RTT overhead of TLS 1.2 vs 1.3",
        "Explains 0-RTT resumption mechanics",
        "Articulates Replay Attack vulnerability and safe idempotent restriction"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "What happens if an attacker replays a 0-RTT packet that executed a `POST /transfer-money`?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "data_engineering_001",
    "questionText": "Compare ETL with ELT pipeline architectures. When would an enterprise choose ELT over ETL, and how do modern Cloud Data Warehouses (Snowflake, BigQuery) enable this shift?",
    "category": "Data Engineering",
    "topic": "ETL vs ELT Architecture & Pipeline Design",
    "subtopic": "Modern ELT Data Warehousing Architectures",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Data Engineer",
      "Analytics Engineer",
      "Data Architect",
      "Big Data Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "data-engineering",
      "etl",
      "elt",
      "data-warehouse",
      "snowflake",
      "bigquery"
    ],
    "companyStyleLabel": "High-Growth Startup",
    "referenceAnswer": "In traditional ETL (Extract, Transform, Load), data is extracted from sources, transformed in a specialized compute cluster (like Informatica or Spark) to fit a rigid schema, and then loaded into a relational data warehouse. In ELT (Extract, Load, Transform), raw data is extracted and loaded immediately into the data warehouse (or data lakehouse) with minimal schema enforcement, and transformations are executed directly inside the warehouse using SQL (often orchestrated via dbt). ELT is enabled by modern Cloud Data Warehouses (Snowflake, BigQuery, Databricks) that decouple storage from compute and scale massively parallel processing (MPP) on demand. ELT prevents transformation bottlenecks, preserves raw historical data for future reprocessing, and empowers analytics engineers to iterate on SQL business logic without altering ingestion pipelines.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "ETL transforms data in-flight before storage; ELT loads raw data first and transforms inside warehouse",
      "Cloud Data Warehouses (Snowflake/BigQuery) provide MPP and decoupled compute/storage enabling ELT",
      "ELT preserves raw data for reprocessing, speeds up ingestion, and uses declarative SQL via tools like dbt"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Defines ETL vs ELT differences clearly",
        "Explains architectural decoupling enabling ELT",
        "Highlights business benefits of preserving raw data"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "If your business definition of 'active user' changes, why does ELT make recalculating history easier than ETL?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "data_analytics_001",
    "questionText": "How do you calculate User Cohort Retention over 30/60/90 days using SQL Window Functions? Explain how to distinguish natural churn from product friction in cohort metrics.",
    "category": "Data Analytics",
    "topic": "Cohort Analysis, Churn Rates & Retention Calculations",
    "subtopic": "SQL Cohort Analysis & Retention Curves",
    "difficulty": "Medium",
    "questionType": "scenario",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Data Analyst",
      "Business Intelligence Analyst",
      "Analytics Engineer",
      "Product Manager"
    ],
    "interviewMode": "scenario",
    "tags": [
      "data-analytics",
      "cohort-analysis",
      "retention",
      "sql",
      "churn"
    ],
    "companyStyleLabel": "High-Growth Startup",
    "referenceAnswer": "1. SQL Formulation: Define a CTE that identifies each user's acquisition date (`DATE_TRUNC('month', MIN(created_at)) OVER (PARTITION BY user_id)`). Join this against active transaction/event logs to calculate the interval difference (`DATEDIFF(event_date, cohort_date)` in months). Group by `cohort_month` and `month_number` to calculate active user counts as a percentage of the initial cohort size (Month 0). 2. Distinguishing Churn: Plot the retention curve over time. Normal churn flattens into a horizontal asymptote (product-market fit baseline where loyal users stick indefinitely). Product friction shows a steep drop immediately after onboarding (Day 1 / Day 7) followed by continuous steep decay, indicating poor user onboarding, broken UX flows, or misleading marketing promises.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Uses CTEs and window functions to group users into birth cohorts by signup date",
      "Calculates retention percentage across successive time intervals (Day 1, 7, 30, 90)",
      "Healthy retention curves flatten into a horizontal baseline (retention plateau)",
      "Steep initial drop indicates onboarding friction; continuous downward drift indicates lack of sustained utility"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Describes valid SQL cohort calculation approach",
        "Explains retention curve flattening",
        "Contrasts onboarding drop-off vs ongoing churn"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "What does a flat retention curve at month 3 tell you about your retained users?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "ai___machine_learning_001",
    "questionText": "Explain the Bias-Variance Tradeoff in machine learning. How do L1 (Lasso) and L2 (Ridge) regularization mathematically prevent overfitting, and which one induces feature sparsity?",
    "category": "AI & Machine Learning",
    "topic": "Overfitting, Underfitting & Bias-Variance Trade-off",
    "subtopic": "Regularization Mechanics (L1 vs L2)",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Data Scientist",
      "Machine Learning Engineer",
      "AI Engineer",
      "Research Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "ai",
      "machine-learning",
      "bias-variance",
      "regularization",
      "lasso",
      "ridge"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Bias is the error introduced by approximating a real-world problem with an overly simplistic model (causing underfitting). Variance is the error from sensitivity to small fluctuations in the training set (causing overfitting). The goal is to minimize total error = Bias^2 + Variance + Irreducible Error. Regularization adds a penalty to the loss function to constrain model weights: L2 Regularization (Ridge) adds `lambda * sum(w_i^2)`, shrinking weights smoothly toward zero without setting them exactly to zero. L1 Regularization (Lasso) adds `lambda * sum(|w_i|)`. Because the L1 diamond constraint boundary has sharp corners along the coordinate axes, optimization contours intersect at zero, driving non-essential coefficients exactly to zero and producing feature sparsity (automatic feature selection).",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Bias causes underfitting (high training error); Variance causes overfitting (high validation error)",
      "Total Error = Bias^2 + Variance + Irreducible Error",
      "L2 (Ridge) adds squared penalty sum(w^2), shrinking weights toward zero",
      "L1 (Lasso) adds absolute penalty sum(|w|), driving weights to exact zeros and creating feature sparsity"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Defines Bias and Variance trade-off accurately",
        "Explains L1 vs L2 penalty formulas",
        "Explains why L1 induces geometric sparsity"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Think about the geometry of the constraint region: a circle (L2) vs a diamond (L1)."
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "deep_learning_001",
    "questionText": "Explain the Self-Attention mechanism in Transformer architectures. What is the mathematical formulation of Scaled Dot-Product Attention, and why is the scaling factor `sqrt(d_k)` necessary?",
    "category": "Deep Learning",
    "topic": "Transformers, Self-Attention Mechanism & Multi-Head Attention",
    "subtopic": "Scaled Dot-Product Attention Mechanics",
    "difficulty": "Hard",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Advanced concept",
    "targetRoles": [
      "Machine Learning Engineer",
      "AI Engineer",
      "Deep Learning Engineer",
      "NLP Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "deep-learning",
      "transformers",
      "self-attention",
      "nlp",
      "neural-networks"
    ],
    "companyStyleLabel": "FAANG / Big Tech",
    "referenceAnswer": "Self-attention computes dynamic contextual relationships between all token positions in an input sequence. The input embeddings are projected into Query (Q), Key (K), and Value (V) matrices using learned weight matrices. Scaled Dot-Product Attention is formulated as: `Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V`. The dot product `Q * K^T` measures pairwise similarity between tokens. As the key dimensionality `d_k` grows large, the dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients (gradient vanishing problem during backpropagation). Dividing by `sqrt(d_k)` scales the variance of the dot products back to 1 (assuming components are independent zero-mean variables), stabilizing gradients and enabling effective optimization.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Projects inputs into Query (Q), Key (K), and Value (V) representations",
      "Computes Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V",
      "Pairwise dot product measures token relevance scores across the entire sequence",
      "Division by sqrt(d_k) prevents large dot products from saturating softmax and causing vanishing gradients"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Correctly states the attention formula",
        "Explains Query, Key, and Value roles",
        "Explains why sqrt(d_k) prevents softmax saturation"
      ],
      "minimumPassingScore": 8
    },
    "hints": [
      "What happens to the gradient of softmax when its input values are very large (e.g. 100 vs -100)?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "prompt_engineering_001",
    "questionText": "Explain the difference between Zero-Shot, Few-Shot, and Chain-of-Thought (CoT) prompting. How does the ReAct (Reason + Act) prompting framework allow LLMs to interact with external tools and APIs?",
    "category": "Prompt Engineering",
    "topic": "ReAct (Reason + Act) Framework for LLM Agents",
    "subtopic": "ReAct Framework & Tool Calling Architectures",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "AI Engineer",
      "Generative AI Engineer",
      "LLM Application Developer",
      "Prompt Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "prompt-engineering",
      "cot",
      "few-shot",
      "react",
      "llm-agents"
    ],
    "companyStyleLabel": "High-Growth Startup",
    "referenceAnswer": "Zero-Shot prompting provides a task instruction without exemplar demonstrations. Few-Shot prompting includes 2-5 input-output pairs demonstrating expected format and style. Chain-of-Thought (CoT) prompting instructs the model to generate intermediate reasoning steps ('Let's think step by step') before arriving at a final conclusion, drastically improving multi-step arithmetic, logic, and symbolic reasoning. The ReAct (Reasoning + Acting) framework interleaves verbal reasoning traces with task-specific actions. A ReAct loop follows: (1) Thought: LLM reasons about what information it needs, (2) Action: LLM outputs an action command to invoke an external tool (e.g. Search, DatabaseQuery, Calculator), (3) Observation: The execution environment runs the tool and returns the result, (4) Next Thought/Action until the final Answer is synthesized.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Contrasts Zero-shot (instruction only) vs Few-shot (in-context exemplars)",
      "CoT forces explicit step-by-step reasoning tokens before generating final answer",
      "ReAct interleaves Thought (reasoning), Action (tool invocation), and Observation (tool output)",
      "Enables autonomous agent workflows interacting with real-world databases and APIs"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Clearly differentiates Zero, Few-Shot, and CoT",
        "Explains Thought-Action-Observation loop in ReAct",
        "Explains why CoT improves reasoning accuracy"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Why does forcing an LLM to generate thinking tokens improve its final arithmetic answers?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "mlops_001",
    "questionText": "What is the difference between Data Drift and Concept Drift in production ML systems? How do you detect drift using statistical tests (e.g. KS test, PSI), and what automated retraining pipelines should be established?",
    "category": "MLOps",
    "topic": "Data Drift vs Concept Drift & Monitoring Techniques",
    "subtopic": "Statistical Drift Detection & Continuous Training",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "MLOps Engineer",
      "Machine Learning Engineer",
      "Data Engineer",
      "AI Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "mlops",
      "data-drift",
      "concept-drift",
      "monitoring",
      "model-retraining"
    ],
    "companyStyleLabel": "Enterprise / FinTech",
    "referenceAnswer": "Data Drift (Covariate Shift) occurs when the input feature distribution P(X) changes over time while the conditional probability P(Y|X) remains constant (e.g. users buying more expensive items during holidays). Concept Drift occurs when the statistical relationship between features and target labels P(Y|X) shifts (e.g. macroeconomic inflation changes what constitutes a high-risk credit applicant). Detection techniques: Kolmogorov-Smirnov (KS) test or Population Stability Index (PSI) compare current inference feature distributions against baseline training distributions (PSI > 0.2 indicates significant drift). Automated Continuous Training (CT) pipelines should trigger alerts, log model metrics to a Model Registry (MLflow), validate freshly trained models against shadow production traffic, and swap model endpoints via blue/green deployments only if performance exceeds baseline.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Data Drift: input distribution P(X) changes while label relationship P(Y|X) is intact",
      "Concept Drift: underlying relationship between inputs and targets P(Y|X) fundamentally alters",
      "Detection metrics: KS test (continuous features), PSI (> 0.2 represents significant shift)",
      "Automated CT pipeline triggers retraining, automated evaluation, and safe blue/green deployment"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Distinguishes Data Drift P(X) vs Concept Drift P(Y|X)",
        "Names statistical tests like KS or PSI",
        "Describes automated retraining and deployment verification"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "If consumer spending habits change permanently after an economic recession, is that Data Drift or Concept Drift?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "big_data_001",
    "questionText": "Explain the internal architecture of Apache Spark: Driver, Cluster Manager, and Executors. How do Resilient Distributed Datasets (RDDs) achieve fault tolerance via lineage graphs without replicating raw data?",
    "category": "Big Data",
    "topic": "Apache Spark Architecture: Driver, Executors & Memory Management",
    "subtopic": "Spark RDD Lineage & Lazy Evaluation",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Data Engineer",
      "Big Data Engineer",
      "Platform Engineer",
      "Cloud Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "big-data",
      "spark",
      "hadoop",
      "rdd",
      "distributed-computing"
    ],
    "companyStyleLabel": "Enterprise / FinTech",
    "referenceAnswer": "Apache Spark architecture consists of: (1) Driver Program: creates the `SparkContext`, translates user code into a Directed Acyclic Graph (DAG) of stages and tasks, and schedules execution. (2) Cluster Manager (YARN, Mesos, Kubernetes, Standalone): allocates physical cluster resources. (3) Executors: worker processes on cluster nodes that run tasks and store cached data partitions in RAM. An RDD (Resilient Distributed Dataset) achieves fault tolerance through its Lineage Graph (DAG of transformations). Instead of replicating huge datasets across disks, Spark records the exact sequence of deterministic operations used to build each partition. If a worker node crashes and loses an in-memory RDD partition, the Driver simply replays the lineage transformations on the original source partition to recompute the lost data slice.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Driver translates code into DAG of tasks; Cluster Manager allocates resources; Executors execute tasks",
      "RDD is an immutable, partitioned collection evaluated lazily via transformations and actions",
      "Fault tolerance relies on Lineage Graph: lost partitions are recomputed by replaying lineage",
      "Avoids heavy disk replication overhead by storing deterministic compute graphs"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Accurately describes Driver, Cluster Manager, and Executors",
        "Explains RDD lineage graph mechanics",
        "Explains fault recovery without data replication"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "What is the difference between a Spark Transformation (lazy) and an Action (eager)?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "cybersecurity_001",
    "questionText": "Explain the core principles of Zero Trust Architecture: 'Never Trust, Always Verify'. How does microsegmentation, continuous identity verification, and least privilege access mitigate lateral movement after a breach?",
    "category": "Cybersecurity",
    "topic": "Zero Trust Architecture & Least Privilege Access",
    "subtopic": "Zero Trust & Lateral Movement Mitigation",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Security Engineer",
      "Application Security Engineer",
      "Penetration Tester",
      "Cybersecurity Analyst",
      "SOC Analyst"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "cybersecurity",
      "zero-trust",
      "least-privilege",
      "microsegmentation",
      "soc"
    ],
    "companyStyleLabel": "Enterprise / FinTech",
    "referenceAnswer": "Traditional perimeter security ('Castle-and-Moat') assumes anyone inside the corporate intranet is trusted. Zero Trust assumes the network is already hostile and treats every request as if it originates from an open, untrusted network. Core principles: (1) Explicit Verification: Authenticate and authorize based on all available data points (identity, location, device health, service context). (2) Least Privilege Access: Grant access strictly with Just-In-Time (JIT) and Just-Enough-Access (JEA) policies. (3) Assume Breach: Minimize blast radius through Microsegmentation—dividing the network into granular isolated zones where individual services communicate only via authenticated, mutual TLS (mTLS) policies. If an attacker breaches an edge workstation, microsegmentation and continuous token validation prevent lateral movement to core databases or production secrets.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Replaces perimeter 'castle-and-moat' with 'never trust, always verify'",
      "Explicit continuous verification evaluates identity, device compliance, and anomaly scores",
      "Least privilege restricts access to just-in-time, minimal necessary roles",
      "Microsegmentation isolates network workloads so compromised nodes cannot laterally pivot"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Contrasts Castle-and-Moat with Zero Trust",
        "Names 3 core Zero Trust pillars (verify explicitly, least privilege, assume breach)",
        "Explains lateral movement prevention via microsegmentation"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "In a traditional corporate VPN, once an attacker compromises an employee laptop, what can they access?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "blockchain_001",
    "questionText": "Explain how Proof of Work (PoW) and Proof of Stake (PoS) achieve Byzantine Fault Tolerance in distributed consensus. How does the 51% attack differ in execution and economic penalty between the two mechanisms?",
    "category": "Blockchain",
    "topic": "Consensus Mechanisms: Proof of Work (PoW) vs Proof of Stake (PoS)",
    "subtopic": "PoW vs PoS Consensus & Economic Security",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Software Development Engineer (SDE-1)",
      "Backend Developer",
      "Staff / Principal Engineer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "blockchain",
      "consensus",
      "pow",
      "pos",
      "cryptography",
      "web3"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Byzantine Fault Tolerance ensures a distributed ledger reaches consensus despite malicious or failing nodes. Proof of Work (PoW) ties voting power to physical computational work: miners solve cryptographic hash puzzles (`SHA-256(header) < target`), spending real electricity and hardware capital. In PoW, a 51% attack requires controlling >50% of the network's total hashing power, allowing the attacker to reorganize blocks and double-spend without destroying their underlying hardware. Proof of Stake (PoS) ties voting power to locked economic capital (staked tokens). Validators are selected proportionally to stake. In PoS, executing a 51% attack requires acquiring >51% of all staked tokens. Crucially, PoS introduces Slashing: the consensus protocol detects malicious forks or double-signing and programmatically confiscates and burns the attacker's entire staked collateral, creating massive economic deterrence.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "PoW ties consensus weight to computational energy (hashrate); PoS ties it to bonded capital (tokens)",
      "PoW 51% attack requires majority hashrate, enabling chain reorgs and double-spends",
      "PoS 51% attack requires majority of staked tokens; malicious behavior triggers Slashing which burns collateral",
      "Slashing creates internal economic penalties absent in physical PoW mining"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Contrasts PoW vs PoS consensus mechanics",
        "Defines 51% attack execution",
        "Explains slashing mechanism and economic asymmetry"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Can a PoW blockchain destroy an attacker's physical mining rigs if they attack the network? Can PoS?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "mobile_development_001",
    "questionText": "Explain the Activity and Fragment lifecycle in Android or View Controller lifecycle in iOS. What happens to state during configuration changes (like screen rotation), and how do ViewModels prevent state loss?",
    "category": "Mobile Development",
    "topic": "Activity, Fragment & View Controller Lifecycles",
    "subtopic": "Lifecycle State Preservation & ViewModels",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Mobile App Developer",
      "Android Developer",
      "Swift / iOS Developer",
      "Flutter Developer"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "mobile",
      "android",
      "ios",
      "lifecycle",
      "viewmodel",
      "state"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "In Android, an Activity goes through `onCreate` -> `onStart` -> `onResume` when visible/active, and `onPause` -> `onStop` -> `onDestroy` when backgrounded or closed. During configuration changes (screen rotation, dark mode toggle, language change), the Android OS destroys and recreates the entire Activity instance by default, wiping out in-memory UI state and variables. Historically, developers used `onSaveInstanceState(Bundle)` to serialize small primitive states. Modern architecture uses Android Architecture Components `ViewModel`. A `ViewModel`'s lifecycle is scoped to the `ViewModelStoreOwner` and survives configuration recreation: it remains retained in memory until the Activity is explicitly finished (not destroyed by rotation), allowing continuous data holding and coroutine execution without memory leaks.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Activity lifecycle phases: onCreate, onStart, onResume, onPause, onStop, onDestroy",
      "Screen rotation causes OS to tear down and recreate the Activity instance",
      "onSaveInstanceState serializes small UI state across process death",
      "ViewModel survives configuration changes because its lifecycle outlasts Activity recreation"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Accurately lists lifecycle callbacks",
        "Explains recreation on configuration changes",
        "Explains how ViewModel survives configuration changes"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "Why shouldn't you hold a direct reference to an Activity or Context inside a ViewModel?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  },
  {
    "questionId": "accessibility___performance_001",
    "questionText": "Explain Google's Core Web Vitals: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). What causes high CLS, and how do you systematically eliminate it?",
    "category": "Accessibility & Performance",
    "topic": "Core Web Vitals: LCP (Largest Contentful Paint), INP, CLS",
    "subtopic": "Core Web Vitals Measurement & Optimization",
    "difficulty": "Medium",
    "questionType": "conceptual",
    "sequenceOrder": 1,
    "learningStage": "Fundamentals",
    "interviewRelevanceLabel": "Common interview topic",
    "targetRoles": [
      "Frontend Developer",
      "Full Stack Developer",
      "UI/UX Designer",
      "Software Development Engineer (SDE-1)"
    ],
    "interviewMode": "conceptual",
    "tags": [
      "web-performance",
      "accessibility",
      "core-web-vitals",
      "cls",
      "lcp",
      "inp"
    ],
    "companyStyleLabel": "General Tech",
    "referenceAnswer": "Core Web Vitals are user-centric metrics measuring real-world web performance: 1. LCP (Largest Contentful Paint): measures loading performance; good is <2.5s. 2. INP (Interaction to Next Paint): replaces FID to measure interaction responsiveness across the entire page lifecycle; good is <200ms. 3. CLS (Cumulative Layout Shift): measures visual stability; good is <0.1. High CLS occurs when visible DOM elements unexpectedly shift position while the user is reading or interacting. Common causes: images and videos without explicit `width` and `height` (or aspect-ratio) attributes, dynamic ads/embeds injected without reserved placeholder containers, web fonts causing FOIT/FOUT layout reflows, and dynamically inserted DOM content above existing content. Mitigation: always specify explicit dimensions on media, reserve container height with CSS `aspect-ratio` or skeleton placeholders, and use `font-display: optional` or matching fallback font metrics.",
    "stepByStepExplanation": "",
    "practicalExample": "",
    "commonMistakes": [],
    "expectedKeyPoints": [
      "Defines LCP (<2.5s), INP (<200ms), and CLS (<0.1) metrics and thresholds",
      "CLS measures unexpected visual layout displacement during browsing",
      "Root causes: unsized images/media, dynamically injected ads/banners, and web font swaps",
      "Mitigations: explicit width/height or aspect-ratio, CSS min-height placeholders, and font-display controls"
    ],
    "evaluationRubric": {
      "scoringCriteria": [
        "Accurately defines all 3 Core Web Vitals",
        "Explains root causes of layout shifting (CLS)",
        "Provides concrete CSS/HTML fixes for CLS"
      ],
      "minimumPassingScore": 7
    },
    "hints": [
      "What happens when an image loads asynchronously if its `<img>` tag lacks width and height attributes?"
    ],
    "codingDetails": {
      "constraints": [],
      "examples": []
    }
  }
];
