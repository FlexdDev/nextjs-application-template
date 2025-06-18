# Key Drop Clone

Bu proje, key-drop.gg sitesinin eğitim amaçlı bir klonudur.

## Kurulum Adımları

1. Öncelikle projeyi bilgisayarınıza indirin.

2. Proje klasörünüzde aşağıdaki klasör yapısını oluşturun:
```
your-project/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── glow.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── upgrade/
│   │       └── page.tsx
│   ├── components/
│   │   ├── CaseOpeningModal.tsx
│   │   ├── UpgradePanel.tsx
│   │   ├── UpgradeWheel.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── dialog.tsx
│   ├── hooks/
│   └── lib/
└── public/
    └── cases/
```

3. Terminal veya Komut İstemcisini açın ve proje klasörüne gidin:
```bash
cd your-project
```

4. Gerekli bağımlılıkları yükleyin:
```bash
npm install next@latest react@latest react-dom@latest
npm install @radix-ui/react-dialog @radix-ui/react-slot
npm install tailwindcss postcss autoprefixer
npm install class-variance-authority clsx tailwindcss-animate
```

5. Next.js yapılandırmasını oluşturun:

`next.config.js` dosyası oluşturun:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
```

6. Tailwind CSS yapılandırmasını oluşturun:

`tailwind.config.js` dosyası oluşturun:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
}
```

7. TypeScript yapılandırmasını oluşturun:

`tsconfig.json` dosyası oluşturun:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

8. Projeyi başlatın:
```bash
npm run dev
```

Site http://localhost:3000 adresinde çalışmaya başlayacaktır.

## Sık Karşılaşılan Hatalar

1. "Couldn't find any `pages` or `app` directory" hatası:
   - `src/app` klasörünün ve içindeki dosyaların doğru yerde olduğundan emin olun
   - `src/app/page.tsx` dosyasının var olduğundan emin olun

2. Modal kapanmama sorunu:
   - En son güncellemede bu sorun giderildi. Eğer hala devam ediyorsa kodunuzu güncelleyin.

## Önemli Notlar

- Tüm dosyaların doğru konumda olduğundan emin olun
- TypeScript ve Next.js sürümlerinin uyumlu olduğundan emin olun
- Node.js'in 16.14 veya daha yüksek bir sürümünü kullanın

## Yardım ve Destek

Herhangi bir sorunla karşılaşırsanız:
1. Klasör yapısını kontrol edin
2. `npm install` komutunu tekrar çalıştırın
3. `.next` klasörünü silip `npm run dev` ile yeniden deneyin
