/**
 * Created by LDQ on 2017/6/27.
 */
import {observable, computed} from "mobx";


class TodoList {
    @observable todos = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}


module.exports = TodoList;