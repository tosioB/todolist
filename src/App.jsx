import React, { useEffect, useRef, useState } from "react";
import "./assets/style/App.scss";
import TodoItem from "./components/TodoItem";

function App() {
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // 로컬 저장소에서 'todolist' 항목 가져오기
    const localGetTodo = localStorage.getItem("todolist");

    if (localGetTodo === null) {
      localStorage.setItem("todolist", JSON.stringify([])); // 초기값으로 빈 배열 저장
    } else {
      const parseTodo = JSON.parse(localGetTodo); // 가져온 JSON 문자열을 객체로 변환
      setTodos(parseTodo); // 상태 업데이트
    }
  }, []); // 빈 배열을 의존성으로 사용하여 컴포넌트 마운트 시 한 번만 실행

  const localstorageSetItem = (updatedTodos) => {
    // 새로운 배열을 로컬스토리지에 저장
    localStorage.setItem("todolist", JSON.stringify(updatedTodos));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: Number(new Date()),
      title: inputRef.current.value.trim(),
      complete: false,
      isEditing: false
    };

    if (newTodo.title) {
      const updatedTodos = [...todos, newTodo]; // 새로운 todos 배열 생성
      setTodos(updatedTodos); // 상태 업데이트
      localstorageSetItem(updatedTodos); // 로컬 저장소에 저장
      inputRef.current.value = ""; // 인풋 초기화
    } else {
      alert("내용을 입력하세요.");
    }
  };

  const handleDelete = (id) => {
    // 인자로 전달된 id와 일치하지 않는 todo 항목(객체)만 필터링하여 새로운 리스트를 생성
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos); // 상태를 업데이트하여 삭제된 항목이 반영된 투두리스트로 변경
    localstorageSetItem(updatedTodos); // 로컬 저장소에 저장
  };

  const handleToggleEdit = (id) => {
    // todos 배열을 map 메서드로 순회하여 각 todo 항목을 검사
    const updatedTodos = todos.map((todo) =>
      // 전달된 id와 일치하는 todo의 isEditing 값을 반전시킴
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    // 상태를 업데이트하여 변경된 todos 배열로 반영
    setTodos(updatedTodos);
  };

  const handleEditSave = (id, newTitle) => {
    // newTitle이 비어있지 않은 경우에만 수정 진행
    if (newTitle) {
      // todos 배열을 map 메서드로 순회하면서 수정할 항목을 찾음
      const updatedTodos = todos.map((todo) =>
        todo.id === id
          ? { ...todo, title: newTitle, isEditing: !todo.isEditing }
          : todo
      );
      // 상태를 업데이트하여 변경된 todo 리스트로 반영
      setTodos(updatedTodos);
      localstorageSetItem(updatedTodos); // 로컬 저장소에 저장
    }
  };

  const handleCheckbox = (id, complete) => {
    // todos 배열을 map 메서드로 순회하여 id가 일치하는 todo 항목을 찾음
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, complete: !complete } : todo
    );

    // 상태를 업데이트하여 완료 상태가 반영된 todo 리스트로 변경
    setTodos(updatedTodos);
    localstorageSetItem(updatedTodos); // 로컬 저장소에 저장
  };

  return (
    <div className="todolist">
      <h1 className="main-title">To-Do-List 🍖</h1>

      {/* form 영역 */}
      <form className="todolist-form" onSubmit={handleSubmit}>
        <span className="inp-box">
          <input type="text" ref={inputRef} />
          <button type="submit" className="btn add-btn">
            추가
          </button>
        </span>
      </form>

      {/* To-Do-List 영역 */}
      <ul className="todolist-box">
        {todos?.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              editInputRef={editInputRef}
              handleDelete={handleDelete}
              handleToggleEdit={handleToggleEdit}
              handleEditSave={handleEditSave}
              handleCheckbox={handleCheckbox}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
