// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

// Components
import Spinner from '../Spinner';
import Task from '../Task';

export default class Scheduler extends Component {
    state = {
        tasks:           [],
        isTasksFetching: false,
        tasksFilter:     '',
        newTaskMessage:  '',
    };

    componentDidMount () {}

    _updateTasksFilter = (event) => {
        const { value: tasksFilter } = event.target;

        this.setState((prevstate) => ({
            tasksFilter,
            isSpinning: true,
            //tasks: prevstate.tasks.filter()
        }));
    };

    _updateNewTaskMessage = (event) => {
        const { value: newTaskMessage } = event.target;

        this.setState({ newTaskMessage });
    };

    _getAllCompleted = () => {};

    _setTasksFetchingState = (state) => {
        this.setState({ isTasksFetching: state });
    };

    _fetchTasksAsync = async () => {
        try {
            this._setTasksFetchingState(true);

            const tasks = await api.fetchTasks();

            this.setState(() => ({
                tasks,
            }));
            this._setTasksFetchingState(false);
        } catch (error) {
            console.log(error.message);
            this._setTasksFetchingState(false);
        }
    };

    _createTaskAsync = async (event) => {
        event.preventDefault();
        if (this.state.newTaskMessage === '') {
            return null;
        }
        try {
            this._setTasksFetchingState(true);

            const task = await api.createTask(this.state.newTaskMessage);

            this.setState((prevState) => ({
                tasks:          [task, ...prevState.tasks],
                newTaskMessage: '',
            }));
            this._setTasksFetchingState(false);
        } catch (error) {
            console.log(error.message);
            this._setTasksFetchingState(false);
        }
    };

    _updateTaskAsync = async (task) => {
        try {
            this._setTasksFetchingState(true);

            await api.updateTask(task);
        } catch (error) {
            console.log(error.message);
        } finally {
            this._setTasksFetchingState(false);
        }
    };

    _removeTaskAsync = async (taskId) => {
        try {
            this._setTasksFetchingState(true);

            await api.removeTask(taskId);
        } catch (error) {
            console.log(error.message);
        } finally {
            this._setTasksFetchingState(false);
        }
    };

    _completeAllTasksAsync = async () => {
        try {
            this._setTasksFetchingState(true);

            await api.completeAllTasks(this.state.tasks); // TODO: filter not completed tasks
        } catch (error) {
            console.log(error.message);
        } finally {
            this._setTasksFetchingState(false);
        }
    };

    render () {
        const { isTasksFetching, newTaskMessage, tasksFilter } = this.state;
        const messageMaxLength = 50;

        return (
            
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isTasksFetching } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = "search" value = { tasksFilter } onChange = { this._updateTasksFilter } />
                    </header>
                    <section>
                        <form onSubmit = { this._createTaskAsync } >
                            <input
                                maxLength = { messageMaxLength }
                                placeholder = 'Описaние моей новой задачи'
                                type = 'text'
                                value = { newTaskMessage }
                                onChange = { this._updateNewTaskMessage }
                            />
                            <button>Добавить задачу</button>
                        </form>
                    </section>
                    <Task />
                </main>
            </section>
        );
    }
}
