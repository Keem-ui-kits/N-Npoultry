const fs = require('fs');

const content = fs.readFileSync('src/app/components/Products.tsx', 'utf8');

// The file has several parts. Let's do a simple extraction based on \"function \" or \"const \"

function extractBlock(content, regexStart) {
   const match = content.match(regexStart);
   if (!match) return null;
   
   const startIndex = match.index;
   let openBraces = 0;
   let i = startIndex + match[0].length;
   
   // find first {
   while (i < content.length && content[i] !== '{') i++;
   if (i >= content.length) return null;
   openBraces = 1;
   i++;
   
   while (i < content.length && openBraces > 0) {
      if (content[i] === '{') openBraces++;
      if (content[i] === '}') openBraces--;
      i++;
   }
   
   return content.slice(startIndex, i);
}

const productCard = extractBlock(content, /function ProductCard/);
const bentoCard = extractBlock(content, /function BentoCard/);
const navDot = extractBlock(content, /function NavigationDot/);
const scrollText = extractBlock(content, /function ScrollingBackgroundText/);

const productsData = content.match(/const products = \[\s*\{[\s\S]*?\}\s*\];/)[0];

const typeDef = xport interface Product {
  id: string;
  title: string;
  titleAccent: string;
  description: string;
  details: string[];
  image: string;
  color: string;
  gradient: string;
};

// Write products-data.ts
fs.writeFileSync('src/app/components/products/products-data.ts', 
  typeDef + '\n\nexport ' + productsData + '\n'
);

// Write NavigationDot.tsx
fs.writeFileSync('src/app/components/products/NavigationDot.tsx', 
  import { mapRange, lerp } from "../../utils/math";\n\nexport  + navDot + '\n'
);

// Write ScrollingTextWrapper.tsx (it uses motion)
fs.writeFileSync('src/app/components/products/ScrollingTextWrapper.tsx', 
  import React from "react";\nimport { motion } from "motion/react";\n\nexport  + scrollText + '\n'
);

// Write ProductCard.tsx
fs.writeFileSync('src/app/components/products/ProductCard.tsx', 
  import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { type Product } from "./products-data";
import { lerp, mapRange, getValueFromRanges } from "../../utils/math";

// Keep this locally or extract
type ProductCardProps = {
  product: Product;
  index: number;
  scrollYProgress: number;
  isMobile: boolean;
};

export  + productCard.replace(/function ProductCard/, 'function ProductCard') + '\n'
);

// Write BentoCard.tsx
fs.writeFileSync('src/app/components/products/BentoCard.tsx', 
  import Image from "next/image";\nimport { type Product } from "./products-data";\n\nexport  + bentoCard + '\n'
);

console.log('Split successful');

