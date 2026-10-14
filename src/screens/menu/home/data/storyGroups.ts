import { Story, StoryGroup } from './home.data';

function timestamp(story: Story) {
  return Date.parse(story.createdAt || '') || 0;
}

// Regroupe par identifiant MongoDB, jamais par nom (deux comptes peuvent avoir le meme nom).
export function groupStoriesByUser(
  stories: Story[],
  currentUserId: string | undefined,
  myStory: Story,
): StoryGroup[] {
  const groups = new Map<string, Story[]>();
  for (const story of stories) {
    const key = story.userId || `story:${story.id}`;
    const items = groups.get(key) || [];
    items.push(story);
    groups.set(key, items);
  }

  const others: StoryGroup[] = [];
  let ownGroup: StoryGroup = { ...myStory, items: [] };
  for (const [userId, entries] of groups) {
    const items = [...entries].sort(
      (a, b) => timestamp(a) - timestamp(b) || a.id.localeCompare(b.id),
    );
    // La vignette montre le dernier moment ; le lecteur commence par le premier.
    const latest = items[items.length - 1];
    if (currentUserId && userId === currentUserId) {
      ownGroup = {
        ...latest,
        ...myStory,
        img: latest.img,
        type: latest.type,
        text: latest.text,
        backgroundColor: latest.backgroundColor,
        items,
      };
    } else {
      others.push({ ...latest, id: `user:${userId}`, userId, items });
    }
  }
  others.sort(
    (a, b) => timestamp(b) - timestamp(a) || a.id.localeCompare(b.id),
  );
  return [ownGroup, ...others];
}
