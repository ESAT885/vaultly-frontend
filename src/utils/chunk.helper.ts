export function createChunks(file: File, size = 5 * 1024 * 1024) {
  const chunks = [];
  let start = 0;

  while (start < file.size) {
    chunks.push(file.slice(start, start + size));
    start += size;
  }

  return chunks;
}
