import v8 from 'node:v8';
import mongoose from 'mongoose';

/**
 * @function check
 * @description This function check the health of app in term of memory and database connection
 *
 * @async
 * @returns {Promise<boolean>} true if the app is healthy or false otherwise
 */
async function check() {
  let mongooseConnection = false;
  let connection = mongoose.connection.readyState;
  if (connection === 1) {
    mongooseConnection = true;
  }
  let memoryUsage = true;
  const memoryStat = v8.getHeapStatistics();
  const maxHeap = memoryStat.heap_size_limit;
  const maxHeapPercentageThreshold = 0.9;
  const usedHeapPercentage = memoryStat.used_heap_size / maxHeap;
  /** we ask is the used is bigger that the thershold */
  if (usedHeapPercentage > maxHeapPercentageThreshold) {
    memoryUsage = false;
  }
  return ![memoryUsage, mongooseConnection].includes(false);
}

export const healthService = Object.freeze({
  check,
});
