# 그로잉세일즈 프론트엔드 개발자 채용 과제

개발 기간 : 2022.03.22 ~ 2021.03.25


<img width="1387" alt="스크린샷 2022-03-25 19 37 40" src="https://user-images.githubusercontent.com/37180000/160105485-6cf71461-ffa2-4d2a-b8b3-e5b600efc930.png">
<img width="1400" alt="스크린샷 2022-03-25 19 37 56" src="https://user-images.githubusercontent.com/37180000/160105542-53111e7c-415d-44fe-9567-3e6310ce1525.png">
<img width="1411" alt="스크린샷 2022-03-25 19 38 12" src="https://user-images.githubusercontent.com/37180000/160105474-ef37df41-b013-4bb2-8322-f26aec14e0fc.png">



<br/>     


## 프로젝트 개요
공휴일 API 연동 캘린더 웹페이지
  
<br/>  

## 과제 구현 사항
- 달력 UI는 첨부한 '샘플이미지1' 같이 구현
- 오른쪽 상단의 화살표를 선택했을 때 이전/다음 달로 변경
- '오늘' 버튼을 선택했을 때 해당 월로 화면 이동 후, 오늘에 해당하는 날짜 하이라이트
- [공공데이터포털 사이트의 특일정보 API](https://www.data.go.kr/data/15012690/openapi.do)를 활용하여 공휴일 정보 안내
- 날짜 선택 시 첨부한 '샘플이미지2'와 같이 간단한 스케줄 추가 및 삭제

 ** 스케줄 추가 시 날짜와 스케줄 이름을 받음 <br/>
 ** 스케줄 추가 및 삭제 부분 UI는 임의로 구현 <br/>
 ** 브라우저 새로고침 전까지 데이터 유지 <br/>
 ** UI Framework(React) 사용 가능 (React 사용 시 필수 사항은 아니나 redux, redux-saga 활용을 추천) <br/>

<br/>

### 샘플이미지1
![샘플이미지1](https://user-images.githubusercontent.com/37180000/160102859-b682bddc-48c0-45f0-bd73-6a93e70ae3de.png)
<br/>

### 샘플이미지2
![샘플이미지2](https://user-images.githubusercontent.com/37180000/160102910-5418dae4-ab0e-4be9-b702-a8f02e7aff82.png)

<br/>

## 실행 방법
Project setup   
```npm install```

Project start for development   
```npm run start```   
 

<br/>

## 기술 스택
React, Redux, Redux-saga, Styled-Components, antd
