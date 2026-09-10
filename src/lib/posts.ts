/** Blog content ids look like "<lang>/<slug>"; URLs use only the slug. */
export const slugOf = (id: string): string => id.split('/').pop()!;
