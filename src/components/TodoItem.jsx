import React from "react";
import PropTypes from "prop-types";

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired, // id는 필수로 숫자
    title: PropTypes.string.isRequired, // title은 필수로 문자열
    complete: PropTypes.bool.isRequired, // complete는 필수로 불리언
    isEditing: PropTypes.bool.isRequired // isEditing는 필수로 불리언
  }).isRequired,
  editInputRef: PropTypes.object.isRequired, // editInputRef는 필수로 문자열
  handleDelete: PropTypes.func.isRequired, // handleDelete는 필수로 함수
  handleToggleEdit: PropTypes.func.isRequired, // handleDelete는 필수로 함수
  handleEditSave: PropTypes.func.isRequired, // handleDelete는 필수로 함수
  handleCheckbox: PropTypes.func.isRequired // handleEdit 필수로 함수
};

function TodoItem({
  todo,
  editInputRef,
  handleDelete,
  handleToggleEdit,
  handleEditSave,
  handleCheckbox
}) {
  return (
    <li>
      <span className="chk-box">
        <input
          type="checkbox"
          id={todo.id}
          checked={todo.complete}
          onChange={() => {
            handleCheckbox(todo.id, todo.complete);
          }}
        />
        <label
          htmlFor={todo.id}
          className={todo.complete ? "complete" : undefined}
        >
          {todo.title}
        </label>
      </span>
      {todo.isEditing ? (
        <span className="inp-box inp-edit">
          <input type="text" ref={editInputRef} />
          <button
            className="btn btn-save"
            onClick={() => {
              handleEditSave(todo.id, editInputRef.current.value);
            }}
          >
            저장
          </button>
        </span>
      ) : null}
      <div className="btn-box">
        {!todo.isEditing && (
          <button
            className="btn btn-edit"
            onClick={() => {
              handleToggleEdit(todo.id);
              setTimeout(() => {
                if (editInputRef.current) {
                  editInputRef.current.focus(); // 포커스 주기
                }
              }, 0); // 상태 변경 후 즉시 실행
            }}
          >
            수정
          </button>
        )}
        <button
          className="btn btn-del"
          onClick={() => {
            handleDelete(todo.id);
          }}
        >
          삭제
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
