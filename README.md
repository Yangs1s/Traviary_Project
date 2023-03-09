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
### FrontEnd

<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"> <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Styled-components-DB7093?style=for-the-badge&logo=Styled-components&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">

### BackEnd
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white">

### Collaboration tools
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"> <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white">

### Rule
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white">

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
└── └── vite-env.d.ts
└── index.html
```
### 폴더구조 설명
1. 컴포넌트와 페이지, 라우터 폴더를 역할별로 구분
2. 공통으로 사용되는 컴포넌트는 common 폴더에 분리, 공통으로 사용되는 데이터는 data 폴더에 분리
3. type에 선택 사용을 위해 types 폴더에 분리

## 주안점
1.
2.
3.

## 한계점 및 개선사항
1.
2.
3.
