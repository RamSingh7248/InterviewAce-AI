/**
 * Curated Question Bank - Web Technologies (JavaScript, React, Node.js)
 * Structured progression from scope/closures to event loops, virtual DOM, hooks, and streams.
 */

export const JAVASCRIPT_QUESTIONS = [
  {
    questionId: "js_scope_hoisting_001",
    questionText: "Explain the difference between var, let, and const in JavaScript. How do lexical scoping, hoisting, and the Temporal Dead Zone (TDZ) govern variable lifecycle?",
    category: "JavaScript",
    topic: "Scope, Closures, Event Loop, Prototypes, Promises & ES6+ Modules",
    subtopic: "Variable Declarations, Hoisting & TDZ",
    difficulty: "Easy",
    questionType: "conceptual",
    sequenceOrder: 1,
    learningStage: "Fundamentals",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Frontend Developer", "Full Stack Developer", "JavaScript Engineer"],
    interviewMode: "conceptual",
    tags: ["javascript", "scope", "hoisting", "tdz", "es6"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "var is function-scoped (or globally scoped if declared outside functions) and is hoisted with 'undefined'",
      "let and const are block-scoped (bounded by curly braces {}) and cannot be re-declared in the same scope",
      "Temporal Dead Zone (TDZ): let and const are hoisted to top of block, but remain uninitialized; accessing them before declaration throws ReferenceError",
      "const enforces immutable variable binding; primitive values cannot change, but object/array properties can still be mutated"
    ],
    referenceAnswer: "The distinction between var, let, and const lies in scoping rules and hoisting behavior. Variables declared with 'var' are function-scoped; during the creation phase of the execution context, they are hoisted to the top of the function and initialized to 'undefined'. In contrast, 'let' and 'const' (introduced in ES6) are block-scoped, existing only within the enclosing curly braces {}. While let and const are also hoisted, they are NOT initialized. The time between entering the scope block and reaching the line where let/const is declared is known as the Temporal Dead Zone (TDZ); accessing the variable within the TDZ throws a ReferenceError instead of returning undefined. Finally, const prevents reassignment of the variable identifier; for reference types (objects/arrays), the underlying properties remain mutable unless frozen with Object.freeze().",
    stepByStepExplanation: "1. Scope: 'var' ignores if/for blocks; 'let/const' respect any block {...}.\n2. Hoisting: JS engine scans declarations during memory allocation phase.\n3. TDZ: from start of block until initialization statement executes, variable is in uninitialized state.\n4. Reassignment: let can be reassigned; const throws TypeError on reassignment.",
    practicalExample: "console.log(a); // undefined (var hoisted and initialized)\nvar a = 10;\n\n// console.log(b); // ReferenceError: Cannot access 'b' before initialization (in TDZ)\nlet b = 20;\n\nconst user = { name: 'Alice' };\nuser.name = 'Bob'; // Allowed (object mutation)\n// user = {};      // TypeError: Assignment to constant variable",
    commonMistakes: [
      "Believing let and const are not hoisted; they are hoisted, but trapped in the TDZ",
      "Assuming const creates deep immutability; it only prevents rebinding the reference variable",
      "Using var in for-loops with asynchronous callbacks (setTimeout), causing all callbacks to print the final loop value"
    ],
    suggestedFollowUps: ["How did closures or IIFEs solve the 'var in for-loop' issue before let was introduced?"]
  },
  {
    questionId: "js_closures_002",
    questionText: "What is a closure in JavaScript, and how does the lexical environment preserve outer variables? Provide real-world engineering use-cases and explain how closures can lead to memory leaks.",
    category: "JavaScript",
    topic: "Scope, Closures, Event Loop, Prototypes, Promises & ES6+ Modules",
    subtopic: "Closures & Lexical Scoping",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 2,
    learningStage: "Core Concepts",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Frontend Developer", "Full Stack Developer", "Software Engineer"],
    interviewMode: "conceptual",
    tags: ["javascript", "closures", "lexical-scope", "memory-leak", "encapsulation"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "A closure is the combination of a function bundled together with references to its surrounding lexical environment",
      "An inner function retains access to outer variables even after the outer function has finished executing and returned",
      "Use cases: Data encapsulation / private variables (module pattern), function currying, memoization, event handlers, and callbacks",
      "Memory risk: Retaining unnecessary references in long-lived closures (e.g. global listeners) prevents garbage collection of outer scopes"
    ],
    referenceAnswer: "A closure is a function's ability to remember and access its lexical scope even when that function is executed outside of that lexical scope. In JavaScript, whenever a function is created, it retains a hidden reference to its enclosing Lexical Environment via its [[Environment]] internal property. When an outer function finishes execution and its execution context pops off the call stack, any variables referenced by an inner function that remains accessible (e.g., returned or passed as a callback) are not garbage collected; they remain allocated in the heap. Real-world applications include creating private variables in factory functions, memoization caches, and event listeners. However, closures can cause memory leaks if an event handler or timer retains large objects in its outer scope without being deregistered.",
    stepByStepExplanation: "1. Outer function executes; creates local variable.\n2. Inner function accesses local variable.\n3. Outer function returns inner function.\n4. JavaScript engine retains outer Lexical Environment on the heap because inner function maintains a live reference.\n5. Calling inner function later accesses the preserved outer variable.",
    practicalExample: "// Data Privacy / Encapsulation via Closure\nfunction createCounter(initialValue = 0) {\n    let count = initialValue; // Private variable encapsulated by closure\n    return {\n        increment: () => ++count,\n        decrement: () => --count,\n        getCount: () => count\n    };\n}\nconst counter = createCounter(10);\ncounter.increment(); // 11\nconsole.log(counter.getCount()); // 11 (count cannot be directly accessed or modified externally)",
    commonMistakes: [
      "Believing closures copy variable values; closures hold live references to the variables themselves",
      "Creating functions inside tight loops unnecessarily, allocating multiple closure instances in memory",
      "Failing to clear event listeners that reference component state, preventing garbage collection"
    ],
    suggestedFollowUps: ["How do JavaScript engines optimize closures by eliminating unused outer variables from the scope chain?"]
  },
  {
    questionId: "js_event_loop_003",
    questionText: "How does the JavaScript Event Loop work? Distinguish between the Call Stack, Web APIs, the Microtask Queue (Promises), and the Macrotask Queue (setTimeout). Predict execution order for async code.",
    category: "JavaScript",
    topic: "Scope, Closures, Event Loop, Prototypes, Promises & ES6+ Modules",
    subtopic: "Event Loop, Microtasks & Asynchronous Execution",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 3,
    learningStage: "Common Interview Questions",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Frontend Developer", "Full Stack Developer", "Node.js Developer"],
    interviewMode: "conceptual",
    tags: ["javascript", "event-loop", "microtasks", "macrotasks", "promises"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "JavaScript has a single-threaded runtime with a single synchronous Call Stack",
      "Asynchronous operations (timers, fetch, DOM events) are offloaded to browser Web APIs or Node.js Libuv",
      "Microtask Queue (Promises, queueMicrotask, MutationObserver) has strict higher priority than Macrotask Queue (setTimeout, setInterval, I/O)",
      "Event Loop rule: After the Call Stack empties, the Event Loop drains the ENTIRE Microtask Queue before picking the next single Macrotask from the Macrotask Queue"
    ],
    referenceAnswer: "JavaScript is single-threaded; its concurrency model is powered by the Event Loop. When synchronous code runs, frames push and pop on the Call Stack. Asynchronous tasks (like timers or fetch requests) are delegated to browser Web APIs. When an async task completes, its callback enters either the Microtask Queue or the Macrotask Queue. The Microtask Queue holds Promise callbacks (.then, .catch, .finally) and queueMicrotask. The Macrotask Queue holds setTimeout, setInterval, setImmediate, and I/O callbacks. The Event Loop's fundamental rule is: When the Call Stack is empty, it drains all pending jobs in the Microtask Queue completely (including microtasks queued by other microtasks) before fetching and executing the next single macrotask from the Macrotask Queue. Rendering steps occur between macrotasks after microtasks are drained.",
    stepByStepExplanation: "1. Synchronous code executes immediately on the Call Stack.\n2. setTimeout schedules a timer in Web APIs; when complete, its callback enters Macrotask Queue.\n3. Promise.resolve().then() schedules its callback directly in the Microtask Queue.\n4. Call stack empties.\n5. Event loop inspects Microtask Queue: executes all microtasks.\n6. Event loop inspects Macrotask Queue: picks first macrotask and executes it.",
    practicalExample: "// Predict output order:\nconsole.log('1');\nsetTimeout(() => console.log('2'), 0); // Macrotask\nPromise.resolve().then(() => console.log('3')); // Microtask\nconsole.log('4');\n// Output: 1 -> 4 -> 3 -> 2",
    commonMistakes: [
      "Believing setTimeout(fn, 0) runs immediately; it only queues to the Macrotask queue and must wait for current stack and all microtasks to finish",
      "Recursively queueing microtasks (e.g. infinite Promise loop), which starves the event loop and completely freezes UI rendering",
      "Thinking async/await creates separate threads; async/await is syntactic sugar over Promises and uses the Microtask queue"
    ],
    suggestedFollowUps: ["What is the difference between process.nextTick() in Node.js and standard Promise microtasks?"]
  }
];

export const REACT_QUESTIONS = [
  {
    questionId: "react_vdom_001",
    questionText: "How does the React Virtual DOM and the Fiber Reconciliation algorithm work? Why is the 'key' prop mandatory when rendering dynamic lists, and what bugs occur when using array indices as keys?",
    category: "React",
    topic: "Hooks, Virtual DOM, State Management, Component Lifecycle & Performance",
    subtopic: "Virtual DOM & Reconciliation Heuristics",
    difficulty: "Easy",
    questionType: "conceptual",
    sequenceOrder: 1,
    learningStage: "Fundamentals",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Frontend Developer", "React Developer", "Full Stack Developer"],
    interviewMode: "conceptual",
    tags: ["react", "virtual-dom", "fiber", "reconciliation", "keys"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Virtual DOM is an in-memory lightweight JavaScript object tree mirroring the actual DOM",
      "Fiber architecture enables incremental rendering by breaking reconciliation into units of work that can pause, resume, or abort",
      "Heuristic diffing (O(n) instead of O(n^3)): elements of different types produce different trees; child reconciliation uses stable keys",
      "The 'key' prop provides a stable identity between renders so React knows whether an item was inserted, deleted, or reordered",
      "Using array indices as keys breaks component state and input values when items are inserted at the beginning, filtered, or reordered"
    ],
    referenceAnswer: "The React Virtual DOM is a lightweight in-memory representation of the real DOM. When state changes, React constructs a new Virtual DOM tree and compares it against the previous tree using the Fiber reconciliation algorithm. Standard tree comparison is O(N^3); React achieves O(N) by applying heuristics: (1) Two elements of different types produce entirely different trees (unmounting the old and mounting the new), and (2) Child lists are tracked across renders using unique, stable 'key' props. The key prop gives each element a persistent identity. When items are reordered, inserted, or removed, React matches keys to preserve element identity and internal component state. If array indices are used as keys, inserting or deleting an item shifts all subsequent indices; React incorrectly assumes existing nodes merely received updated props, causing stateful child components (such as input text fields, focus, or animations) to remain attached to the wrong data.",
    stepByStepExplanation: "1. Render Phase: JSX compiles to React.createElement(), producing Fiber node trees (workInProgress tree) asynchronously.\n2. Diffing with keys: React matches existing child fibers with new virtual nodes by key.\n3. Commit Phase: React applies the calculated mutations to the real DOM synchronously in a single batch.\n4. Index as key bug: Insert item at index 0 -> index 0 gets new data, but old index 0 DOM node with its internal input state is reused.",
    practicalExample: "// Dangerous: Index as key breaks input state on reorder/deletion\n{items.map((item, index) => <TodoItem key={index} text={item.text} />)}\n\n// Correct: Stable unique business ID\n{items.map(item => <TodoItem key={item.id} text={item.text} />)}",
    commonMistakes: [
      "Using Math.random() as a key, which forces React to completely destroy and re-create the DOM node on every single render",
      "Using array index as key for dynamic, re-orderable, or filterable lists",
      "Believing the Virtual DOM is faster than direct native DOM manipulation; its advantage is declarative abstraction and batched rendering"
    ],
    suggestedFollowUps: ["How did React 16 Fiber change reconciliation from synchronous stack recursion to cooperative concurrency?"]
  },
  {
    questionId: "react_useeffect_002",
    questionText: "Explain the lifecycle and dependency array mechanics of React's useEffect hook. How do cleanup functions work, and how do you prevent stale closures and async race conditions in data fetching?",
    category: "React",
    topic: "Hooks, Virtual DOM, State Management, Component Lifecycle & Performance",
    subtopic: "useEffect, Stale Closures & Cleanup",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 2,
    learningStage: "Core Concepts",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Frontend Developer", "React Developer", "Full Stack Developer"],
    interviewMode: "conceptual",
    tags: ["react", "hooks", "useeffect", "stale-closures", "race-conditions"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "useEffect runs asynchronously AFTER the browser paints the screen (unlike useLayoutEffect, which runs synchronously before paint)",
      "Dependency array: omitted = runs on every render; [] = runs on mount only; [dep] = runs when Object.is(prevDep, nextDep) is false",
      "Cleanup function runs before the effect re-runs with new props/state and when component unmounts",
      "Stale closure occurs when an effect or async callback captures an outdated value from a previous render",
      "Data fetching race conditions: Rapid input changes cause old network responses to resolve after newer responses; fixed with an active boolean flag or AbortController"
    ],
    referenceAnswer: "The useEffect hook synchronizes a React component with an external system (DOM, network, timers). It runs asynchronously after the render commit and browser paint. The dependency array governs its execution: omitting it runs on every render, an empty array runs once on mount, and specifying dependencies re-triggers the effect only when Object.is() detects changes. A cleanup function returned by the effect executes immediately before the effect re-executes with new values and upon component unmount, preventing resource leaks (e.g. unregistering event listeners, clearing timers, or aborting HTTP requests). Async race conditions happen when a user triggers multiple fetches in quick succession: an older request may resolve after a newer request, overwriting current state with stale data. We resolve this by using an AbortController or a boolean 'isCancelled' flag in the cleanup function.",
    stepByStepExplanation: "1. Component renders with prop id = 1.\n2. Effect initiates fetch(id=1).\n3. User changes selection to id = 2; component re-renders.\n4. Cleanup function for id = 1 executes: aborts request or sets 'isCurrent = false'.\n5. Effect runs for id = 2.\n6. If response for id = 1 arrives late, the isCurrent check ignores it, preventing state corruption.",
    practicalExample: "useEffect(() => {\n    const controller = new AbortController();\n    \n    async function loadUser() {\n        try {\n            const res = await fetch(`/api/users/${userId}`, { signal: controller.signal });\n            const data = await res.json();\n            setUser(data);\n        } catch (err) {\n            if (err.name !== 'AbortError') setError(err.message);\n        }\n    }\n    loadUser();\n    \n    // Cleanup runs before next effect execution or on unmount\n    return () => controller.abort();\n}, [userId]);",
    commonMistakes: [
      "Lying to the dependency array by omitting variables referenced inside the effect (causes stale closure bugs)",
      "Making the useEffect callback function directly 'async' (e.g. useEffect(async () => ...)); effects must return a cleanup function or undefined, not a Promise",
      "Using useEffect for state transformations that could be calculated directly during render"
    ],
    suggestedFollowUps: ["When is useLayoutEffect strictly required instead of useEffect?"]
  },
  {
    questionId: "react_memoization_003",
    questionText: "Compare React.memo, useMemo, and useCallback. When does memoization improve performance, and when is premature memoization counterproductive or wasteful?",
    category: "React",
    topic: "Hooks, Virtual DOM, State Management, Component Lifecycle & Performance",
    subtopic: "Memoization & Performance Optimization",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 3,
    learningStage: "Performance & Optimization",
    interviewRelevanceLabel: "Common interview topic",
    targetRoles: ["Frontend Developer", "React Developer", "Senior Frontend Engineer"],
    interviewMode: "conceptual",
    tags: ["react", "performance", "usememo", "usecallback", "react-memo"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "React.memo is a higher-order component that skips re-rendering a component if its props have not changed (shallow comparison)",
      "useMemo caches the result of an expensive calculation between renders",
      "useCallback caches a function definition between renders to preserve referential equality when passed as props to memoized children",
      "Every memoization hook incurs a memory allocation and comparison cost on every single render",
      "Premature memoization: wrapping trivial functions or primitive computations adds overhead with zero rendering savings"
    ],
    referenceAnswer: "React.memo, useMemo, and useCallback are tools for optimizing render performance by preserving referential equality. React.memo wraps a functional component, performing shallow comparison on incoming props to skip re-rendering if props are unchanged. However, if a parent passes an inline function or newly allocated object as a prop, its reference changes on every render, invalidating React.memo. To solve this, useCallback caches the function definition reference across renders, and useMemo caches the result of an expensive calculation. Memoization is genuinely beneficial when: (1) Passing callbacks to heavily rendered React.memo children, (2) Executing computationally expensive transformations (like filtering or sorting thousands of records), or (3) Providing stable references to useEffect dependency arrays. Premature memoization is wasteful for trivial calculations (e.g., adding two numbers or inline handlers on native <button> elements) because the memory allocation and dependency array checks cost more than standard re-creation.",
    stepByStepExplanation: "1. Without useCallback: 'const handleClick = () => {}' creates a new function address every render.\n2. Child component wrapped in React.memo sees new prop reference and re-renders anyway.\n3. With useCallback: 'const handleClick = useCallback(() => {}, [])' maintains same reference; React.memo shallow equals returns true; re-render skipped.\n4. useMemo: 'const sorted = useMemo(() => heavySort(list), [list])' skips re-sorting unless list reference changes.",
    practicalExample: "const UserList = React.memo(({ users, onSelectUser }) => {\n    // Re-renders ONLY if users or onSelectUser reference changes\n    return users.map(u => <UserCard key={u.id} user={u} onSelect={onSelectUser} />);\n});\n\nfunction ParentContainer({ users }) {\n    // useCallback guarantees onSelectUser maintains stable reference\n    const handleSelect = useCallback((id) => {\n        console.log('Selected user:', id);\n    }, []);\n    return <UserList users={users} onSelectUser={handleSelect} />;\n}",
    commonMistakes: [
      "Wrapping functions in useCallback without wrapping the child component in React.memo (renders child regardless)",
      "Omitting reactive values from the dependency array, causing the memoized function to execute with stale state",
      "Using useMemo everywhere indiscriminately, increasing memory footprint without measurable latency improvements"
    ],
    suggestedFollowUps: ["How does React 19's React Compiler automate memoization without manual useMemo/useCallback?"]
  }
];

export const NODE_QUESTIONS = [
  {
    questionId: "node_event_loop_001",
    questionText: "Explain the architecture of the Node.js Event Loop. Detail its six execution phases in Libuv, the role of the worker thread pool, and the difference between process.nextTick() and setImmediate().",
    category: "Node.js",
    topic: "Event Loop, Libuv, Streams, Express Middleware, REST APIs & Security",
    subtopic: "Libuv Event Loop Architecture & Phases",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 1,
    learningStage: "Fundamentals",
    interviewRelevanceLabel: "Core interview question",
    targetRoles: ["Backend Developer", "Node.js Engineer", "Full Stack Developer"],
    interviewMode: "conceptual",
    tags: ["node.js", "event-loop", "libuv", "thread-pool", "nexttick"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Node.js runs V8 JavaScript in a single main thread, delegating asynchronous I/O to the OS kernel or the Libuv worker thread pool (default 4 threads)",
      "Six event loop phases: Timers -> Pending I/O callbacks -> Idle/Prepare -> Poll (I/O) -> Check (setImmediate) -> Close callbacks",
      "Worker thread pool handles blocking operations: fs file I/O, DNS lookups, crypto operations, and zlib compression",
      "process.nextTick() does NOT belong to the event loop phases; it is a microtask queue that executes immediately after the current operation before moving to any event loop phase",
      "setImmediate() queues callbacks in the Check phase of the event loop"
    ],
    referenceAnswer: "Node.js achieves scalable non-blocking I/O by executing JavaScript on a single V8 thread while offloading asynchronous I/O tasks to Libuv. Libuv delegates network sockets directly to native OS asynchronous mechanisms (such as epoll on Linux, kqueue on macOS, and IOCP on Windows). For operations that the OS cannot handle asynchronously (such as file system calls, DNS resolution, cryptographic hashes, and zlib compression), Libuv uses an internal worker thread pool (configured via UV_THREADPOOL_SIZE, default 4). The Libuv Event Loop cycles through six distinct phases: (1) Timers (executing setTimeout and setInterval callbacks), (2) Pending callbacks, (3) Idle/Prepare, (4) Poll (retrieving and processing new I/O events and blocking when appropriate), (5) Check (executing setImmediate callbacks), and (6) Close callbacks (e.g. socket.on('close')). Critically, process.nextTick() is not an event loop phase; it drains immediately upon completion of the current operation on the Call Stack, having higher priority than even Promise microtasks.",
    stepByStepExplanation: "1. V8 runs synchronous script.\n2. Call stack empties -> drains process.nextTick queue -> drains Promise microtask queue.\n3. Enters Event Loop:\n   - Phase 1 (Timers): executes expired setTimeout callbacks.\n   - Phase 4 (Poll): checks for incoming network connections and reads.\n   - Phase 5 (Check): executes setImmediate callbacks.\n4. Difference: setImmediate executes in Phase 5; process.nextTick executes immediately before next phase transitions.",
    practicalExample: "// Execution order:\nsetImmediate(() => console.log('1: setImmediate'));\nprocess.nextTick(() => console.log('2: nextTick'));\nPromise.resolve().then(() => console.log('3: Promise'));\nconsole.log('4: synchronous');\n// Output: 4: synchronous -> 2: nextTick -> 3: Promise -> 1: setImmediate",
    commonMistakes: [
      "Assuming Node.js executes all async code in the thread pool; network I/O is non-blocking via OS kernel mechanisms, not thread pool",
      "Overusing process.nextTick() in recursive loops, which completely starves the event loop I/O phases",
      "Thinking setImmediate always runs after setTimeout(fn, 0); outside of I/O cycles, their ordering is non-deterministic"
    ],
    suggestedFollowUps: ["How does UV_THREADPOOL_SIZE affect throughput when handling heavy crypto or fs operations?"]
  },
  {
    questionId: "node_streams_002",
    questionText: "How do Node.js Streams work, and why are they essential when processing large files or high-throughput network requests? Explain backpressure and how pipeline() handles it.",
    category: "Node.js",
    topic: "Event Loop, Libuv, Streams, Express Middleware, REST APIs & Security",
    subtopic: "Streams, Buffers & Backpressure",
    difficulty: "Medium",
    questionType: "conceptual",
    sequenceOrder: 2,
    learningStage: "Practical Applications",
    interviewRelevanceLabel: "Practical scenario",
    targetRoles: ["Backend Developer", "Node.js Engineer", "Full Stack Developer", "Systems Engineer"],
    interviewMode: "conceptual",
    tags: ["node.js", "streams", "backpressure", "pipeline", "buffers"],
    companyStyleLabel: "General Tech",
    expectedKeyPoints: [
      "Four stream types: Readable, Writable, Duplex (e.g. sockets), and Transform (e.g. zlib, crypto cipher)",
      "Streams process data sequentially chunk-by-chunk in memory buffers (highWaterMark, default 64KB/16KB), avoiding loading entire gigabyte files into RAM",
      "Backpressure occurs when the readable stream pushes data faster than the writable stream can write to disk/network",
      "When writable.write(chunk) returns false, highWaterMark buffer is full; readable must pause until writable emits the 'drain' event",
      "pipeline() utility (stream/promises) handles backpressure, proper cleanup, and error propagation automatically, preventing memory leaks"
    ],
    referenceAnswer: "Node.js Streams process continuous flows of data in manageable chunks rather than loading entire payloads into memory at once. If an application uses fs.readFile() on a 2GB file, it attempts to allocate a 2GB Buffer in V8 heap, causing memory exhaustion or crashes. With Streams, data is consumed in small discrete chunks (controlled by the highWaterMark threshold, default 64KB for object streams or 16KB for byte streams). Backpressure is a critical flow-control mechanism that arises when a fast Readable source pushes chunks faster than a slow Writable destination can consume them (e.g., reading from high-speed SSD and writing over a slow 3G cellular network). When the writable stream's internal buffer fills to highWaterMark, writable.write(chunk) returns false. The readable stream must pause reading until the destination drains and emits the 'drain' event. While pipe() offers basic piping, modern Node.js applications use stream.pipeline() because pipeline automatically handles backpressure, propagates errors across all stages, and ensures all descriptors close cleanly.",
    stepByStepExplanation: "1. Readable emits 'data' chunks.\n2. Writable consumes chunk; returns false when internal buffer hits highWaterMark.\n3. Readable halts reading ('pause').\n4. Writable flushes buffer to disk/network; emits 'drain'.\n5. Readable resumes pushing chunks.\n6. stream.pipeline(readable, transform, writable) abstracts this entire cycle safely with Promise support.",
    practicalExample: "import { pipeline } from 'node:stream/promises';\nimport fs from 'node:fs';\nimport zlib from 'node:zlib';\n\n// Efficient streaming compression without loading entire file into memory:\nasync function compressLargeFile(sourcePath, destPath) {\n    await pipeline(\n        fs.createReadStream(sourcePath),\n        zlib.createGzip(),\n        fs.createWriteStream(destPath)\n    );\n    console.log('Streaming compression completed with zero memory spike.');\n}",
    commonMistakes: [
      "Using fs.readFile() for file downloads or video streaming, which causes server memory spikes under concurrent user traffic",
      "Using readable.pipe(writable) in production without error handling; pipe() does not automatically close descriptors on error, creating file descriptor leaks",
      "Ignoring backpressure by pushing to writable streams in a fast while-loop without listening for 'drain'"
    ],
    suggestedFollowUps: ["How do Transform streams differ from standard Duplex streams?"]
  }
];
