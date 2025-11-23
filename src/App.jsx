import "./App.css";
import Todo from "./Todo";
import React, { useState, useEffect } from "react";
import {
  Container,
  List,
  Paper,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import AddTodo from "./AddTodo";
import { call, signout } from "./service/ApiService";

function App() {
  const [items, setItems] = useState([]); // 할 일 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 컴포넌트 마운트 시 할 일 목록 불러오기 (앱 시작 시 할 일 목록을 자동으로 불러옴)
  useEffect(() => {
    call("/todo", "GET", null) // GET 요청으로 할 일 목록 요청
      .then((response) => {
        setItems(response.data); // 받은 데이터를 상태로 변경
      })
      .catch((error) => {
        console.error("Error fetching todo items:", error); // 에러 로깅
      })
      .finally(() => {
        setLoading(false); // 로딩 완료
      });
  }, []);

  // 새 항목 추가
  const addItem = (item) => {
    call("/todo", "POST", item).then((response) => setItems(response.data)); // 서버에 POST 후 목록 업데이트
  };

  // 항목 수정
  const editItem = (item) => {
    call("/todo", "PUT", item).then((response) => setItems(response.data));
  };

  // 항목 삭제
  const deleteItem = (item) => {
    call("/todo", "DELETE", item).then((response) => setItems(response.data));
  };

  // 할 일 목록이 있을 경우 화면에 표시할 컴포넌트 구성
  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo
            item={item}
            key={item.id}
            editItem={editItem}
            deleteItem={deleteItem}
          />
        ))}
      </List>
    </Paper>
  );

  // 상단 네비게이션 바 구성
  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" raised onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  // 메인 화면 구성: 네이게이션바 + 입력 컴포넌트 + 할 일 목록
  let todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );

  let loadingPage = <h1> 로딩중.. </h1>;
  let content = loadingPage; // 기본 화면은 로딩 페이지

  // 로딩이 끝나면 todoListPage를 보여줌
  if (!loading) {
    content = todoListPage;
  }

  // 전체 앱 콘텐츠 반환
  return <div className="App">{content}</div>;
}

export default App;
