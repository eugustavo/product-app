interface JsonObject {
  [key: string]: any;
}

function isEqual(online: JsonObject, offline: JsonObject): boolean {
  return JSON.stringify(online) === JSON.stringify(offline);
}

function findObjectDiff(online: JsonObject, offline: JsonObject): JsonObject {
  const diff: JsonObject = {};

  for (const key in online) {
    if (online.hasOwnProperty(key) && online[key] !== offline[key]) {
      diff[key] = [online[key], offline[key]];
    }
  }

  for (const key in offline) {
    if (offline.hasOwnProperty(key) && !online.hasOwnProperty(key)) {
       diff[key] = [undefined, offline[key]];
    }
  }

  return diff;
}

export function diffBetweenDBS(dbOnline: JsonObject[], dbOffline: JsonObject[]): JsonObject[] {
  const modifiedObjects: JsonObject[] = [];

  dbOnline.forEach(online => {
    const match = dbOffline.find(offline => isEqual(online, offline));

    if (!match) {
      modifiedObjects.push(online);
    } else {
      const diff = findObjectDiff(online, match);
      if (Object.keys(diff).length > 0) {
        modifiedObjects.push(online);
      }
    }
  });

  return modifiedObjects;
}
