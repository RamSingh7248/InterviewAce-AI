import { executeCode } from '../services/codeExecution.service.js';

async function testAll() {
  console.log('--- 1. Testing Valid Java ---');
  const r1 = await executeCode({
    code: `public class Main {
      public static void main(String[] args) {
        System.out.println("Computed value: " + (12 * 12));
      }
    }`,
    language: 'java'
  });
  console.log('Result 1 (Java Valid):', r1);

  console.log('\n--- 2. Testing Java Syntax Error ---');
  const r2 = await executeCode({
    code: `public class Main {
      public static void main(String[] args) {
        System.out.println("Missing semicolon")
      }
    }`,
    language: 'java'
  });
  console.log('Result 2 (Syntax Error):', r2);

  console.log('\n--- 3. Testing Execution Timeout ---');
  const r3 = await executeCode({
    code: `public class Main {
      public static void main(String[] args) {
        while(true) {}
      }
    }`,
    language: 'java',
    timeout: 1500
  });
  console.log('Result 3 (Timeout):', r3);

  console.log('\n--- 4. Testing JavaScript ---');
  const r4 = await executeCode({
    code: `console.log("Hello from JS:", [1,2,3].map(x => x * 2));`,
    language: 'javascript'
  });
  console.log('Result 4 (JS):', r4);
}

testAll();
