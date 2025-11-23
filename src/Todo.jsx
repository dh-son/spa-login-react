import React, { useState, useEffect } from "react";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

// Todo 항목 하나를 나타내는 컴포넌트
const Todo = (props) => {
  const [item, setItem] = useState(props.item); // 부모로부터 받은 todo 항목 상태로 초기화
  const [readOnly, setReadOnly] = useState(true); // 텍스트 입력 필드 읽기 전용 여부 상태

  const deleteItem = props.deleteItem; // 삭제 함수 props에서 전달받음
  const editItem = props.editItem; // 수정 함수 props에서 전달받음

  // 입력값이 변경되었을 때 실행되는 함수
  const editEventHandler = (e) => {
    setItem({ ...item, title: e.target.value }); // title 속성만 변경하여 상태 업데이트
  };

  // 체크박스 클릭 시 실행되는 함수
  const checkboxEventHandler = (e) => {
    item.done = e.target.checked; // 완료상태 변경
    editItem(item); // 수정된 항목을 부모로 전달
  };

  // 삭제 버튼 클릭 시 실행되는 함수
  const deleteEventHandler = () => {
    deleteItem(item); // 현재 항목 삭제 요청
  };

  // 텍스트 클릭 시 읽기 전용 해제 (수정 가능 상태로 전환)
  const turnOffReadOnly = () => {
    setReadOnly(false);
  };

  // 입력 필드에서 엔터키 누를 경우 읽기 전용으로 되돌리고 수정 반영
  const turnOnReadOnly = (e) => {
    if (e.key === "Enter" && readOnly === false) {
      setReadOnly(true);
      editItem(item);
    }
  };

  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{
            "aria-label": "naked",
            readOnly: readOnly,
          }}
          onClick={turnOffReadOnly}
          onKeyDown={turnOnReadOnly}
          onChange={editEventHandler}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo" onClick={deleteEventHandler}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;
