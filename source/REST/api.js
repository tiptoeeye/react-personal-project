import { MAIN_URL, TOKEN } from './config';

export const api = new class {
    async fetchTasks () {
        const response = await fetch(MAIN_URL, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error('Tasks were not loaded!');
        }

        const { data: tasks } = await response.json();

        return tasks;
    }

    async createTask (message) {
        const response = await fetch(MAIN_URL, {
            method:  'POST',
            headers: {
                authorization:  TOKEN,
                'content-type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (response.status !== 200) {
            throw new Error('Task was not created!');
        }

        const { data: task } = await response.json();

        return task;
    }

    async updateTask (task) {
        const response = await fetch(MAIN_URL, {
            method:  'POST',
            headers: {
                authorization:  TOKEN,
                'content-type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (response.status !== 200) {
            throw new Error('Task was not updated!');
        }

        const { data: updatedTask } = await response.json();

        return updatedTask;
    }

    async removeTask (id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method:  'DELETE',
            headers: {
                authorization: TOKEN,
            },
        });

        if (response.status !== 204) {
            throw new Error('Task was not deleted!');
        }
    }

    async completeAllTasks (tasks) {

    }
}();
