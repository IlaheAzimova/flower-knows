
export function toSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')   // herf/reqem olmayani tire ile evez et
        .replace(/(^-|-$)/g, '');      // evvel/sonda qalan tireni sil
}