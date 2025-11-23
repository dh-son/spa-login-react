import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import AppRouter from "./AppRouter";

// root 엘리먼트를 DOM에서 선택 (React 앱이 마운트될 위치)
const container = document.getElementById("root");

// createRoot를 통해 root 객체 생성 (React 18 방식)
const root = createRoot(container);

// AppRouter 컴포넌트를 root에 렌더링 (초기 탭 prop는 "home")
root.render(<AppRouter tab="home" />);
