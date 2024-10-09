export const matchesExtension = (
  filename: string | undefined,
  extensions: string | string[] = ['.md'],
) => {
  if (!filename) return false;
  const exts = Array.isArray(extensions) ? extensions : [extensions];
  return exts.some((ext) => filename.endsWith(ext));
};
