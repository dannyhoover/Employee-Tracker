


async function loop() {
  const value = Math.random();
  console.log(value);
  if (value < 0.9) {
    await loop();
  }
}

loop();