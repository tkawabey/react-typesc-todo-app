import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
   
  // Typescriptでデータの型を宣言します。
     type Todo = {
    inputValue: string;
    id: number; //keyを指定するため
    checked: boolean;
  };

  //useStateでTodoデータをデータ型Todoの配列を指定して、宣言します。
  const [todos, setTodos] = useState<Todo[]>([]);

  // Textボックスの入力を変数にセットします。
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // useStateの変数inputTextに入力されたテキストをセットします。
    setInputText(e.target.value);
  };

  // Submit時のハンドラーを実装します。
  //  - 入力された値を元に新しいTodoデータを作成して、
  //    todos配列に追加します。
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //Submit時の画面の再描画を抑制します。
    e.preventDefault();
    
    if (!inputText) {
      return;
    }
    //新しいTodo型のデータを作成
    const newTodo: Todo = {
      inputValue: inputText,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    //console.log(inputText);
    setInputText("");
  };

  //todo編集
  const handleEdit = (id: number, inputValue: string) => {
    /* ディープコピー(完全にコピーされた別の配列)に変えよう(ミューテートから守るため) */
    const deepCopy = todos.map((todo) => ({ ...todo }));
    console.log(deepCopy);

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });

    // /* シャローコピー */
    // const newTodos = todos.map((todo) => {
    //   if (todo.id === id) {
    //     todo.inputValue = inputValue;
    //   }
    //   return todo;
    // });

    setTodos(newTodos);
  };
  //完了未完了
  const handleChecked = (id: number, checked: boolean) => {
    /* ディープコピー(完全にコピーされた別の配列)に変えよう(ミューテートから守るため) */
    const deepCopy = todos.map((todo) => ({ ...todo }));
    // console.log(deepCopy);

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        //反転
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  //削除
  const handleDelete = (id: number) => {
    //idが正しくないのは残す。正しいと消す。
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  return (

    <div className="App">
      <div>
        <h2>Todoリスト with Typescript</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className="inputText"
            value={inputText}
          />
          <input type="submit" value="作成" className="submitButton" />
        </form>
        {/* タスク設定が完了したら */}
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.inputValue}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleChecked(todo.id, todo.checked)}
              />
              <button onClick={() => handleDelete(todo.id)}>消</button>
            </li>
          ))}
        </ul>        
      </div>
    </div>
  );
}

export default App;
