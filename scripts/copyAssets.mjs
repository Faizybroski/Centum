import fs from "fs";
import path from "path";

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  console.log(`Copied: ${src} → ${dest}`);
}

console.log("\n🚀 Copying standalone assets...");

copyRecursive(".next/static", ".next/standalone/.next/static");
copyRecursive("public", ".next/standalone/public");

console.log("✅ Standalone assets copied successfully!\n");
