const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const publicDir = path.join(__dirname, '../public');

  // Convertir les faux SVG en WebP
  const fakesvgs = [
    'leftCloudMobile.svg',
    'rightCloudMobile.svg'
  ];

  console.log('🚀 Optimisation des images...\n');

  for (const file of fakesvgs) {
    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(publicDir, file.replace('.svg', '.webp'));

    try {
      const stats = fs.statSync(inputPath);
      const originalSize = (stats.size / 1024).toFixed(2);

      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      const newSize = (newStats.size / 1024).toFixed(2);
      const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);

      console.log(`✅ ${file}`);
      console.log(`   ${originalSize} KB → ${newSize} KB (${savings}% de réduction)\n`);
    } catch (error) {
      console.error(`❌ Erreur avec ${file}:`, error.message);
    }
  }

  // Optimiser les PNG
  const pngs = [
    'planes.png',
    'leftCloud.png',
    'rightCloud.png',
    'deviceLeftCloud.png',
    'deviceRightCloud.png',
    'deviceLeftCloudMobile.png',
    'deviceRightCloudMobile.png',
    'CloudsEffects/topLeft.png',
    'CloudsEffects/topRight.png',
    'CloudsEffects/bottomLeft.png',
    'CloudsEffects/bottomRight.png'
  ];

  for (const file of pngs) {
    const inputPath = path.join(publicDir, file);

    if (!fs.existsSync(inputPath)) {
      console.log(`⏭️  ${file} n'existe pas, ignoré\n`);
      continue;
    }

    const outputPath = path.join(publicDir, file.replace('.png', '.webp'));

    try {
      const stats = fs.statSync(inputPath);
      const originalSize = (stats.size / 1024).toFixed(2);

      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      const newSize = (newStats.size / 1024).toFixed(2);
      const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);

      console.log(`✅ ${file}`);
      console.log(`   ${originalSize} KB → ${newSize} KB (${savings}% de réduction)\n`);
    } catch (error) {
      console.error(`❌ Erreur avec ${file}:`, error.message);
    }
  }

  console.log('🎉 Optimisation terminée !');
}

optimizeImages().catch(console.error);
