import { arraysAndHashingProblems } from './arraysAndHashing.js';
import { twoPointersProblems } from './twoPointers.js';
import { slidingWindowProblems } from './slidingWindow.js';
import { stacksAndQueuesProblems } from './stacksAndQueues.js';
import { recursionBacktrackingProblems } from './recursionBacktracking.js';
import { sortingSearchingProblems } from './sortingSearching.js';
import { linkedListLogicProblems } from './linkedListLogic.js';
import { dynamicProgrammingProblems } from './dynamicProgramming.js';
import { intervalsAndBitTricksProblems } from './intervalsAndBitTricks.js';
import CodingProblem from '../../models/CodingProblem.js';
import crypto from 'crypto';

export const allCodingProblems = [
  ...arraysAndHashingProblems,
  ...twoPointersProblems,
  ...slidingWindowProblems,
  ...stacksAndQueuesProblems,
  ...recursionBacktrackingProblems,
  ...sortingSearchingProblems,
  ...linkedListLogicProblems,
  ...dynamicProgrammingProblems,
  ...intervalsAndBitTricksProblems
];

export async function seedCodingProblems() {
  console.log(`Seeding ${allCodingProblems.length} coding problems...`);
  let createdCount = 0;
  let updatedCount = 0;

  for (const prob of allCodingProblems) {
    const hash = crypto.createHash('sha256').update(prob.title.toLowerCase().trim()).digest('hex');
    const updatePayload = {
      ...prob,
      normalizedHash: hash
    };

    const res = await CodingProblem.updateOne(
      { slug: prob.slug },
      { $set: updatePayload },
      { upsert: true }
    );

    if (res.upsertedCount > 0) createdCount++;
    else updatedCount++;
  }

  console.log(`✓ Coding problems seeded: ${createdCount} created, ${updatedCount} updated (Total: ${allCodingProblems.length})`);
  return { total: allCodingProblems.length, createdCount, updatedCount };
}
