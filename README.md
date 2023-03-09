# Traviary
여행을 떠난 당신을 위한 다이어리 웹/앱

## 최종 구현
- 소셜 로그인
- 다이어리 올리기
- 다이어리 확인하기
- 다이어리 수정 및 삭제

## 설치 및 환경설정
```
yarn
yarn add react-router-dom
yarn add firebase
yarn add recoil
yarn add @tanstack/react-query
yarn add styled-components
yarn add @react-icons/all-files
yarn add @types/react-slick
yarn add slick-carousel
```

## 구현 요구 사항 목록
- 파이어베이스와의 연동 (소셜로그인, 파이어스토어, 스토리지)
- 해당 Auth에만 해당 데이터를 볼 수 있게
- 파이어스토어와 스토리지에 한 번에 여러 파일을 올리기
- CSS-in-JS를 얼마나 잘 활용할지
- PWA

## 프레임워크 및 라이브러리
- Vite, React, firebase, react-query, styled-components 등등
- 사용한 이유 제시하기

## 폴더구조
```
.
├── node_modules
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public
├── sw.js
└── src
│   ├── App.tsx
│   ├── components
│   │   ├── Auth
│   │   ├── Cards
│   │   ├── common
│   │   │   ├── Footer
│   │   │   └── Header
│   │   ├── constant
│   │   ├── CreateCard
│   │   └── Main.tsx
│   ├── data
│   ├── pages
│   ├── router
│   ├── Store
│   ├── types
│   ├── fbase.ts
│   ├── main.tsx
│   └── vite-env.d.ts
```
