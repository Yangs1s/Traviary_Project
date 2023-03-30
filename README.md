
## Traviary
여행을 떠난 당신을 위한 다이어리 웹/앱

<a href="https://elegant-syrniki-a5072c.netlify.app">배포</a>

## 최종 구현
<table align="center">
<thead>
<tr margin-bottom=3px>
<td width="300" align="center">
<b style="color:#8fe3d9">소셜 로그인<b>
</td>
<td width="300" align="center">
<b>
카드 생성
</b>
  
</td>
</tr>
</thead>
<tbody>
<tr>
<td width="300" align="center">
<img src="https://user-images.githubusercontent.com/97148877/224933428-f1cda08a-418a-4b8b-9f08-ff4abe06f816.gif" width="350" />
</td>

<td width="300" align="center">
<img src="https://user-images.githubusercontent.com/97148877/224933548-2fefda9a-e93f-47ed-b6c0-31467fca90ee.gif" width="350" />
</td>
</tr>
<tr>
<td width="300" align="center">

<b>
카드 정보
</b>
</td>
<td width="300" align="center">

<b>
카드 수정
</b>
</td>
</tr>
<tr>
<td width="300" align="center">
<img src= "https://user-images.githubusercontent.com/97148877/224933720-e5676969-0c06-4d40-9057-7b0bd2651543.gif" width="350" />

</td>
<td width="300" align="center">
<img src ="https://user-images.githubusercontent.com/97148877/224934084-d0f89b85-3d2d-4710-b9ea-c54d71e4754e.gif" width="350" />

</td>
</tr>
<tr>
<td width="300" align="center">

<b>
카드 삭제
</b>
</td>
<td width="300" align="center">

<b>
그외 추가기능
</b>
</td>
</tr>
<tr>
<td width="300" align="center">
<img src="https://user-images.githubusercontent.com/97148877/224934265-f6a52848-91d2-4da2-bc51-16932355025f.gif" width="350" />


</td>
<td width="300" align="center">
<img src="https://user-images.githubusercontent.com/97148877/224934344-2aed78f8-5c43-41f5-9fe6-fb00694c745e.gif" width="350" />

</td>
</tr>
</tbody>
</table>

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
- 해당 Auth에만 해당 데이터를 볼 수 있게 고도화 시키기
- 파이어스토어와 스토리지에 한 번에 여러 파일을 올리기
- CSS-in-JS를 얼마나 잘 활용할지
- PWA

## 프레임워크 및 라이브러리
### FrontEnd

<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"> <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Styledcomponents-DB7093?style=for-the-badge&logo=Styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">

### BackEnd
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white"> <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=Netlify&logoColor=white">

### Collaboration tools
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"> <img src="https://img.shields.io/badge/Notion-FFFFFF?style=for-the-badge&logo=Notion&logoColor=000000"> <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white">

### Rule
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white">

- webpack을 사용하는 CRA보다 더 빠른 esbuild를 사용하는 Vite를 사용하기로 했습니다.
- 손 쉽게 백엔드 서버를 구축하고자 Firebase를 사용했습니다. 스토어 구성을 하고 해당 코드로 불러오기까지 매우 편해서 선택을 했습니다.

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
1. 파이어베이스에 문자열만 다중으로 올려도 괜찮은데 여러 _이미지 파일 -> 문서화 -> 스토리지에 올리는 시간 -> 컬렉션에 올리는 시간 + 클라이언트에 확인_ 까지 시간이 걸립니다.

## 한계점 및 개선사항
1.
