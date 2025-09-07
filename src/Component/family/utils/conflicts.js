export function overlaps(aStart, aEnd, bStart, bEnd) {
  return new Date(aStart) < new Date(bEnd) && new Date(bStart) < new Date(aEnd);
}

export function detectConflicts(tasks) {
  const conflicts = [];
  const byRes = new Map();
  const byPerson = new Map();

  tasks.forEach(t => {
    if (!t.start || !t.end) return;
    if (t.resource) {
      const a = byRes.get(t.resource) || [];
      a.push(t);
      byRes.set(t.resource, a);
    }
    if (t.assignee) {
      const a = byPerson.get(t.assignee) || [];
      a.push(t);
      byPerson.set(t.assignee, a);
    }
  });

  for (const [res, arr] of byRes) {
    arr.sort((a,b) => new Date(a.start) - new Date(b.start));
    for (let i=0;i<arr.length;i++) for (let j=i+1;j<arr.length;j++) {
      if (overlaps(arr[i].start, arr[i].end, arr[j].start, arr[j].end)) {
        conflicts.push({ type: "resource", message: `Resource "${res}" conflict: "${arr[i].title}" vs "${arr[j].title}"`, ids: [arr[i].id, arr[j].id] });
      }
    }
  }

  for (const [p, arr] of byPerson) {
    arr.sort((a,b) => new Date(a.start) - new Date(b.start));
    for (let i=0;i<arr.length;i++) for (let j=i+1;j<arr.length;j++) {
      if (overlaps(arr[i].start, arr[i].end, arr[j].start, arr[j].end)) {
        conflicts.push({ type: "person", message: `${p} overlap: "${arr[i].title}" vs "${arr[j].title}"`, ids: [arr[i].id, arr[j].id] });
      }
    }
  }

  return conflicts;
}
