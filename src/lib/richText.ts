/**
 * Post-processes Quill rich-text HTML before it's injected with dangerouslySetInnerHTML.
 * Turns plain-text authoring tokens (inserted via the RichTextEditor "Insert" buttons) into markup:
 *
 *  - `[[cols-1]]` / `[[cols-2]]` on their own line just before a bullet list → sets the list's
 *    column layout (1 = row-by-row, 2 = two per row). Lists with no marker keep the default 2-col.
 *  - `[[eligibility]]` anywhere (incl. mid-paragraph) → a "Check Your Eligibility" button linking
 *    to the eligibility section (`/#eligibility`).
 *  - `[[img-left]]` / `[[img-right]]` on their own line just before an image → floats that image
 *    left/right so the following text wraps beside it (full-width on mobile).
 */
export function renderRichHtml(html: string): string {
  if (!html) return html
  let out = html

  // Pasted content often glues every word with non-breaking spaces (&nbsp; / U+00A0),
  // which prevents normal line wrapping and makes paragraphs overflow their column.
  // Convert them to regular spaces so text wraps whole-word at the column edge.
  out = out.replace(/&nbsp;| /g, ' ')

  // List-column markers placed on their own line immediately before a <ul>.
  out = out.replace(/<p>\s*(?:<br\s*\/?>)?\s*\[\[cols-1\]\]\s*<\/p>\s*<ul>/gi, '<ul class="sb-cols-1">')
  out = out.replace(/<p>\s*(?:<br\s*\/?>)?\s*\[\[cols-2\]\]\s*<\/p>\s*<ul>/gi, '<ul class="sb-cols-2">')

  // Floated images: marker on its own line just before an image (Quill wraps images in <p>).
  // Pull the <img> out of its paragraph and float it so adjacent text wraps around it.
  // The "Image left/right" toolbar button inserts the marker with surrounding newlines, so Quill
  // often leaves one or more empty `<p><br></p>` paragraphs between the marker and the image —
  // allow (and drop) those so the float still applies.
  // Matches: marker paragraph, then any number of empty paragraphs, then the paragraph that
  // opens with the <img>. We don't require the <img> to be alone in its paragraph — a caption
  // typed on the next line often lands in the same <p>, which must still float.
  out = out.replace(
    /<p>\s*\[\[img-(left|right)\]\]\s*(?:<br\s*\/?>)?\s*<\/p>(?:\s*<p>\s*<br\s*\/?>\s*<\/p>)*\s*<p>(\s*)(<img\b[^>]*>)/gi,
    (_m, dir, ws, img) => `<p>${ws}` + (img as string).replace(/<img/i, `<img class="sb-img-${dir}"`),
  )

  // Eligibility button — works inline, anywhere in the content.
  out = out.replace(
    /\[\[eligibility\]\]/gi,
    '<a href="/#eligibility" class="sb-eligibility-btn">Check Your Eligibility</a>',
  )

  // Strip any leftover markers (e.g. a marker not directly followed by its target).
  out = out.replace(/\[\[(?:cols-1|cols-2|eligibility|img-left|img-right)\]\]/gi, '')

  return out
}
