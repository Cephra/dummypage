export const constants = {
  width: 800,
  height: 600,
  playerSpeed: 300,
  playerDrag: 600,
  projectileSpeed: 500,
  maxProjectiles: 50,
  playerColor: 0x00ff00,
  enemyColor: 0xff0000,
  projectileColor: 0xffffff,
  starColor: 0x00ff00,
  starTileSize: 64,
  starCount: 100,
  starScrollSpeed: 0.5,
  maxEnemies: 50,
  scorePerTier: 100,
  baseInterval: 2000,
  intervalDecrement: 300,
  minInterval: 500,
  enemySpawnMinX: 50,
  enemySpawnMaxX: 750,
  enemyBaseSpeed: 100,
  enemySpeedIncrement: 50,
  pointsPerHit: 10,
    // …existing…
  // how often an enemy will start an evasion (in ms)
  evasionIntervalMin: 800,
  evasionIntervalMax: 2500,
  // how long each evasion lasts (in ms)
  evasionDurationMin: 300,
  evasionDurationMax: 800,
  // how fast they dodge laterally (pixels/sec)
  evasionSpeed: 200,
};
