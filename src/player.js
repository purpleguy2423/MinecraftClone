export class Player {
  constructor(game) {
    this._game = game;
    this.health = 20;
    this.hunger = 20;
    this.inventory = [];
    this.position = [0, 100, 0]; // Y=100 spawns above world
    this.alive = true;
    this.respawnPosition = [0, 100, 0];
  }

  damage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
    }
  }

  eat(foodValue) {
    this.hunger = Math.min(this.hunger + foodValue, 20);
  }

  addItem(item) {
    this.inventory.push(item);
  }

  respawn() {
    this.health = 20;
    this.hunger = 20;
    this.position = [...this.respawnPosition];
    this.alive = true;
  }

  die() {
    this.alive = false;
    setTimeout(() => this.respawn(), 2000);
  }

  update(timeInSeconds) {
    // Slow hunger drain
    this.hunger -= 0.01 * timeInSeconds;
    if (this.hunger <= 0) {
      this.damage(0.025 * timeInSeconds);
      this.hunger = 0;
    }
  }
}