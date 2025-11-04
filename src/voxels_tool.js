// ...all existing code...
// In the DeleteTool class:
PerformAction() {
  const camera = this._parent._game._graphics._camera;
  const forward = new THREE.Vector3(0, 0, -1);
  forward.applyQuaternion(camera.quaternion);

  const ray = new THREE.Ray(camera.position, forward);
  const intersections = this._parent._FindIntersections(ray, 5);
  if (!intersections.length) {
    return;
  }

  const block = intersections[0].voxel;
  intersections[0].cell.RemoveVoxel(intersections[0].voxel.key);

  // Add block type to player inventory
  if (this._parent._game && this._parent._game._player && block && block.type) {
    this._parent._game._player.addItem({ type: block.type });
  }
}